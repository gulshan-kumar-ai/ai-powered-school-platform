/**
 * Fast and Super API Chatbot Service
 * 
 * Connects the SmartSchool AI Chatbot to an OpenAI-compatible high-speed inference provider
 * (e.g. Groq, Cerebras, OpenAI, SuperAI, or any custom OpenAI-compatible REST endpoint).
 * 
 * Features:
 * - Server-side authentication (keeps API keys off client devices)
 * - School Knowledge Grounding (admissions, courses, hours, contacts, FAQs, events)
 * - Privacy Firewall rejecting private student records / marks / passwords
 * - Fallback to verified local school knowledge when no API key is configured or on provider outage
 * - Multi-turn conversation context support
 * - Configurable timeout, rate limit handling, and PII protection
 */

import { siteConfig } from "@/config/site";
import { schoolFaqs } from "@/data/faqs";
import { admissionSteps, admissionDates } from "@/data/admissions";
import { searchSchoolKnowledge } from "./rag-engine";
import { PublicChatbotMessage } from "@/types/portal";

export interface PublicFact {
  keywords: string[];
  title: string;
  url: string;
  answer: string;
}

export const PUBLIC_SCHOOL_KNOWLEDGE: PublicFact[] = [
  {
    keywords: ["admission", "apply", "enroll", "enrollment", "registration", "deadline"],
    title: "Admissions & Enrollment Process",
    url: "/admissions",
    answer:
      "Admissions at Govt. Boys Qazi Sultan Higher Secondary School, Kunri follow a comprehensive evaluation process: (1) Online Inquiry Submission, (2) Academic Verification, (3) Candidate Student Interview, (4) Records Review, and (5) Formal Admission Offer. Applications for the upcoming academic year are accepted for primary, secondary, and higher secondary classes.",
  },
  {
    keywords: ["fee", "tuition", "cost", "scholarship", "financial aid", "bursary"],
    title: "Tuition & Financial Aid Schedule",
    url: "/admissions",
    answer:
      "Govt. Boys Qazi Sultan Higher Secondary School, Kunri offers accessible public education under the School Education & Literacy Department, Government of Sindh. Detailed fee structures and scholarship programs can be viewed on our Admissions page or requested directly from the School Office.",
  },
  {
    keywords: ["hour", "office hours", "schedule", "open", "timing", "visit"],
    title: "Office Hours & Campus Access",
    url: "/contact",
    answer:
      `The Main Administrative Office and Admissions Desk are open ${siteConfig.contact.officeHours}. Campus visits and prospective tours take place on Tuesday and Thursday mornings (${siteConfig.contact.campusTourHours}) by prior appointment.`,
  },
  {
    keywords: ["contact", "phone", "email", "address", "location", "call"],
    title: "School Contact Information",
    url: "/contact",
    answer:
      "You can reach Govt. Boys Qazi Sultan Higher Secondary School, Kunri at: Address: Station Road Corridor, Bab-e-Ibraheem Momin Campus, Kunri, Sindh, Pakistan; Telephone: +92 238 558252; General Inquiries: info@qazisultanboys.edu.pk; Admissions: admissions@qazisultanboys.edu.pk.",
  },
  {
    keywords: ["academic", "curriculum", "ap", "stem", "program", "course", "subjects"],
    title: "Academic Programs & Curriculum",
    url: "/academics",
    answer:
      "Govt. Boys Qazi Sultan Higher Secondary School, Kunri delivers comprehensive education from primary to higher secondary levels (Class XI & XII), affiliated with the Board of Intermediate and Secondary Education (BISE) Mirpur Khas, featuring science, humanities, and computer studies curricula.",
  },
  {
    keywords: ["policy", "attendance", "uniform", "dress code", "integrity", "rule"],
    title: "Student Handbook & Code of Conduct",
    url: "/about",
    answer:
      "Scholars must maintain a minimum attendance rate of 85% in each enrolled subject. Our dress code emphasizes professional academic attire, and our Academic Integrity Policy requires all submissions to be the scholar's authentic work.",
  },
  {
    keywords: ["sport", "athletic", "club", "extracurricular", "activity", "music"],
    title: "Athletics & Student Life",
    url: "/events",
    answer:
      "Govt. Boys Qazi Sultan Higher Secondary School, Kunri offers over 32 student-run clubs, competitive sports tournaments (Cricket, Football, Athletics), quiz societies, and community self-reliance initiatives through the School Management Committee.",
  },
];

export interface FastSuperConfig {
  apiKey?: string;
  baseUrl: string;
  model: string;
  timeoutMs: number;
}

export interface ChatMessageParam {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionResult {
  content: string;
  citations: { title: string; url: string }[];
  isFallback: boolean;
  provider: "fast_and_super" | "verified_local_rag";
}

/**
 * Resolves standard OpenAI-compatible chat completions endpoint,
 * preventing accidental duplicate `/chat/completions` paths.
 */
export function resolveChatCompletionsEndpoint(baseUrl: string): string {
  const cleanUrl = baseUrl.trim().replace(/\/+$/, "");
  if (cleanUrl.endsWith("/chat/completions")) {
    return cleanUrl;
  }
  return `${cleanUrl}/chat/completions`;
}

/**
 * Resolves API configuration from environment variables with safe defaults
 */
export function getFastSuperConfig(): FastSuperConfig {
  const apiKey =
    process.env.FAST_SUPER_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.GROQ_API_KEY;

  const baseUrl = (
    process.env.FAST_SUPER_API_BASE_URL ||
    process.env.OPENAI_BASE_URL ||
    "https://api.openai.com/v1"
  ).trim().replace(/\/+$/, "");

  const model =
    process.env.FAST_SUPER_MODEL ||
    process.env.OPENAI_MODEL ||
    "gpt-4o-mini";

  const timeoutMs = parseInt(process.env.FAST_SUPER_TIMEOUT_MS || "20000", 10);

  return { apiKey: apiKey?.trim(), baseUrl, model: model.trim(), timeoutMs };
}

/**
 * Checks for sensitive/confidential queries that must be blocked by the privacy firewall
 */
export function checkPrivacyViolations(query: string): string | null {
  const q = query.toLowerCase();
  const violations = [
    "student mark",
    "student grade",
    "my marks",
    "my grade",
    "password",
    "passwords",
    "teacher salary",
    "staff salary",
    "private record",
    "transcript for student",
    "social security",
    "parent phone number",
    "internal mark",
    "exam question paper",
    "steal credentials",
  ];

  if (violations.some((v) => q.includes(v))) {
    return "Privacy & Security Notice: I am the public school AI assistant and can only share verified public details about admissions, academic programs, policies, office hours, and campus schedules. I cannot access private student records, grades, or staff credentials. Enrolled students and authorized parents should sign in to the secure Portal to view academic progress.";
  }

  return null;
}

/**
 * Retrieves relevant verified school facts across all official school data stores
 */
export function retrieveSchoolKnowledgeContext(query: string): {
  contextText: string;
  citations: { title: string; url: string }[];
  hasRelevantFacts: boolean;
} {
  const qLower = query.toLowerCase();
  const citations: { title: string; url: string }[] = [];
  const contextSnippets: string[] = [];

  // 1. Check verified PUBLIC_SCHOOL_KNOWLEDGE
  const matchedFact = PUBLIC_SCHOOL_KNOWLEDGE.find((fact) =>
    fact.keywords.some((kw) => qLower.includes(kw))
  );
  if (matchedFact) {
    contextSnippets.push(`[${matchedFact.title}]: ${matchedFact.answer}`);
    citations.push({ title: matchedFact.title, url: matchedFact.url });
  }

  // 2. Check curated FAQs
  const matchedFaq = schoolFaqs.find(
    (faq) =>
      qLower.includes(faq.question.toLowerCase().slice(0, 15)) ||
      faq.question.toLowerCase().split(" ").some((w) => w.length > 4 && qLower.includes(w))
  );
  if (matchedFaq) {
    contextSnippets.push(`[FAQ - ${matchedFaq.question}]: ${matchedFaq.answer}`);
    if (!citations.some((c) => c.title.includes("FAQ"))) {
      citations.push({ title: "Frequently Asked Questions", url: "/about" });
    }
  }

  // 3. Check Admissions pipeline if relevant
  if (qLower.includes("admiss") || qLower.includes("apply") || qLower.includes("enroll") || qLower.includes("deadline")) {
    const stepsSummary = admissionSteps.map((s) => `Step ${s.step}: ${s.title} - ${s.description}`).join("; ");
    const datesSummary = admissionDates.map((d) => `${d.title}: ${d.date}`).join("; ");
    contextSnippets.push(`[Admissions Process]: ${stepsSummary}. Key Dates: ${datesSummary}`);
    if (!citations.some((c) => c.url === "/admissions")) {
      citations.push({ title: "Admissions & Enrollment", url: "/admissions" });
    }
  }

  // 4. Check Office hours and Contact Details if relevant
  if (
    qLower.includes("hour") ||
    qLower.includes("timing") ||
    qLower.includes("open") ||
    qLower.includes("contact") ||
    qLower.includes("phone") ||
    qLower.includes("email") ||
    qLower.includes("address") ||
    qLower.includes("principal")
  ) {
    contextSnippets.push(
      `[Campus Contact & Schedule]: School: ${siteConfig.name}; Address: ${siteConfig.contact.addressLine1}, ${siteConfig.contact.cityStateZip}; Phone: ${siteConfig.contact.mainPhone}; Email: ${siteConfig.contact.mainEmail}; Principal: ${siteConfig.contact.principal}; Office Hours: ${siteConfig.contact.officeHours}; Campus Tours: ${siteConfig.contact.campusTourHours}.`
    );
    if (!citations.some((c) => c.url === "/contact")) {
      citations.push({ title: "School Contact & Office Hours", url: "/contact" });
    }
  }

  // 5. Query RAG engine for approved document chunks (isPublicOnly: true)
  const ragResults = searchSchoolKnowledge({
    query,
    isPublicOnly: true,
    topK: 2,
  });

  for (const doc of ragResults) {
    contextSnippets.push(`[Curriculum / Policy Document - ${doc.document_title}]: ${doc.excerpt}`);
    if (!citations.some((c) => c.title === doc.document_title)) {
      citations.push({ title: doc.document_title, url: "/about" });
    }
  }

  // Fallback default citation if none matched
  if (citations.length === 0) {
    citations.push({ title: "School Campus Overview", url: "/" });
  }

  return {
    contextText: contextSnippets.join("\n\n"),
    citations,
    hasRelevantFacts: contextSnippets.length > 0,
  };
}

/**
 * Builds the system prompt grounding the AI model in verified school records
 */
export function buildSystemPrompt(schoolContextText: string): string {
  return `You are the official SmartSchool AI Campus Guide for Govt. Boys Qazi Sultan Higher Secondary School, Kunri (${siteConfig.name}).
Your role is to deliver fast, accurate, concise, and helpful answers to students, parents, and prospective visitors.

CORE INSTRUCTIONS:
1. GENERAL QUESTIONS: If the user asks a general educational, historical, scientific, or greeting question (e.g. "Hello", "What is photosynthesis?", "Explain Newton's second law"), answer clearly, politely, and concisely using your broad knowledge.
2. SCHOOL-SPECIFIC QUESTIONS: If the user asks about Govt. Boys Qazi Sultan Higher Secondary School, Kunri (admissions, courses, office hours, campus events, dress code, policies, or contact details), base your answer STRICTLY on the VERIFIED SCHOOL INFORMATION provided below.
3. MISSING OR UNVERIFIED SCHOOL DETAILS: If a school-related inquiry asks for details NOT found in the VERIFIED SCHOOL INFORMATION below (e.g. unknown policies, specific teacher cellphone numbers, or unannounced fees), state clearly: "I do not have verified records on that specific topic in our public school handbook. For official guidance, please contact the School Office directly at ${siteConfig.contact.mainPhone} or email ${siteConfig.contact.mainEmail}." DO NOT invent or fabricate school facts.
4. PRIVACY PROTECTION: You cannot access or reveal private student grades, personal report cards, staff passwords, or private home addresses. Direct anyone asking for private records to sign in to the official Portal.
5. FORMATTING: Keep answers readable and well-structured with bullet points or bold text where appropriate.

VERIFIED SCHOOL INFORMATION:
${schoolContextText || "General institutional overview: Comprehensive public secondary and higher secondary school in Kunri, Sindh."}`;
}

/**
 * Executes a chat query using the Fast and Super API provider,
 * falling back gracefully to local verified knowledge if unconfigured or on error.
 */
export async function executeFastSuperChat(params: {
  userQuery: string;
  conversationHistory?: PublicChatbotMessage[];
  signal?: AbortSignal;
}): Promise<ChatCompletionResult> {
  const { userQuery, conversationHistory = [] } = params;

  // 1. Enforce privacy firewall
  const privacyNotice = checkPrivacyViolations(userQuery);
  if (privacyNotice) {
    return {
      content: privacyNotice,
      citations: [
        { title: "Portal Sign In", url: "/login" },
        { title: "Portal Directory", url: "/portal" },
      ],
      isFallback: false,
      provider: "verified_local_rag",
    };
  }

  // 2. Retrieve verified school knowledge context
  const { contextText, citations, hasRelevantFacts } = retrieveSchoolKnowledgeContext(userQuery);

  // 3. Check for configured Fast and Super API credentials
  const config = getFastSuperConfig();

  // If no external API key is set, use the verified local RAG engine
  if (!config.apiKey) {
    const localContent = generateLocalVerifiedResponse(userQuery, contextText, hasRelevantFacts);
    return {
      content: localContent,
      citations,
      isFallback: true,
      provider: "verified_local_rag",
    };
  }

  // 4. Construct messages payload
  const systemPrompt = buildSystemPrompt(contextText);
  const messagesPayload: ChatMessageParam[] = [
    { role: "system", content: systemPrompt },
  ];

  // Include relevant recent turns (up to last 6 messages) for conversational context
  const recentHistory = conversationHistory.slice(-6);
  for (const hist of recentHistory) {
    if (hist.role === "user" || hist.role === "assistant") {
      messagesPayload.push({
        role: hist.role,
        content: hist.content,
      });
    }
  }

  // Append current query
  messagesPayload.push({ role: "user", content: userQuery });

  // 5. Call OpenAI-compatible Fast and Super API endpoint
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeoutMs);

    const endpoint = resolveChatCompletionsEndpoint(config.baseUrl);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: messagesPayload,
        temperature: 0.3,
        max_tokens: 800,
        stream: false,
      }),
      signal: params.signal || controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      if (response.status === 401 || response.status === 403) {
        console.warn(
          `[FastSuperAPI] Authentication error (${response.status}): Invalid API key credentials. Falling back to local school records.`
        );
      } else if (response.status === 404) {
        console.warn(
          `[FastSuperAPI] Model or endpoint not found (${response.status}): model="${config.model}". Falling back to local school records.`
        );
      } else if (response.status === 429) {
        console.warn(
          `[FastSuperAPI] Rate limit reached (${response.status}). Falling back to local school records.`
        );
        return {
          content:
            "The AI service is currently handling high request volumes. Please pause for a moment and try again. For immediate inquiries, contact the School Office directly at " +
            siteConfig.contact.mainPhone +
            ".",
          citations,
          isFallback: true,
          provider: "verified_local_rag",
        };
      } else {
        console.warn(
          `[FastSuperAPI] Provider returned HTTP ${response.status}: ${errorText.slice(0, 150)}`
        );
      }

      // Fallback to local verified answer on provider error
      return {
        content: generateLocalVerifiedResponse(userQuery, contextText, hasRelevantFacts),
        citations,
        isFallback: true,
        provider: "verified_local_rag",
      };
    }

    const data = await response.json();
    const replyContent = data?.choices?.[0]?.message?.content?.trim();

    if (!replyContent) {
      throw new Error("Empty completion returned from Fast and Super API");
    }

    return {
      content: replyContent,
      citations,
      isFallback: false,
      provider: "fast_and_super",
    };
  } catch (err: unknown) {
    const isAbort = err instanceof Error && (err.name === "AbortError" || err.message.includes("abort"));
    if (isAbort) {
      console.warn("[FastSuperAPI] Request timed out. Falling back to local school knowledge.");
    } else {
      console.warn("[FastSuperAPI] Connection failed. Falling back to local school knowledge:", err);
    }

    // Fall back to local verified knowledge safely
    return {
      content: generateLocalVerifiedResponse(userQuery, contextText, hasRelevantFacts),
      citations,
      isFallback: true,
      provider: "verified_local_rag",
    };
  }
}

/**
 * Creates an SSE ReadableStream for real-time token delivery from Fast & Super API,
 * with deterministic fallback to verified local school knowledge when unconfigured or on error.
 */
export async function createFastSuperChatStream(params: {
  userQuery: string;
  conversationHistory?: PublicChatbotMessage[];
  signal?: AbortSignal;
}): Promise<ReadableStream<Uint8Array>> {
  const { userQuery, conversationHistory = [] } = params;
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      const emitMetadata = (meta: {
        citations: { title: string; url: string }[];
        provider: "fast_and_super" | "verified_local_rag";
        isFallback: boolean;
      }) => {
        controller.enqueue(
          encoder.encode(`event: metadata\ndata: ${JSON.stringify(meta)}\n\n`)
        );
      };

      const emitDelta = (text: string) => {
        controller.enqueue(
          encoder.encode(`event: delta\ndata: ${JSON.stringify({ text })}\n\n`)
        );
      };

      const emitDone = () => {
        controller.enqueue(encoder.encode("event: done\ndata: [DONE]\n\n"));
        controller.close();
      };

      const emitError = (errorMsg: string) => {
        controller.enqueue(
          encoder.encode(
            `event: error\ndata: ${JSON.stringify({ error: errorMsg })}\n\n`
          )
        );
        controller.close();
      };

      const streamLocalResponse = async (
        content: string,
        citations: { title: string; url: string }[],
        isFallback: boolean
      ) => {
        emitMetadata({
          citations,
          provider: "verified_local_rag",
          isFallback,
        });

        // Smooth text chunking delivery for local response
        const words = content.split(" ");
        for (let i = 0; i < words.length; i++) {
          const chunk = words[i] + (i < words.length - 1 ? " " : "");
          emitDelta(chunk);
          if (i % 4 === 0) {
            await new Promise((r) => setTimeout(r, 10));
          }
        }
        emitDone();
      };

      let hasEmittedTokens = false;

      try {
        // 1. Privacy firewall check
        const privacyNotice = checkPrivacyViolations(userQuery);
        if (privacyNotice) {
          await streamLocalResponse(
            privacyNotice,
            [
              { title: "Portal Sign In", url: "/login" },
              { title: "Portal Directory", url: "/portal" },
            ],
            false
          );
          return;
        }

        // 2. Retrieve verified school facts
        const { contextText, citations, hasRelevantFacts } =
          retrieveSchoolKnowledgeContext(userQuery);

        // 3. Check API configuration
        const config = getFastSuperConfig();
        if (!config.apiKey) {
          const localContent = generateLocalVerifiedResponse(
            userQuery,
            contextText,
            hasRelevantFacts
          );
          await streamLocalResponse(localContent, citations, true);
          return;
        }

        // 4. Construct messages payload
        const systemPrompt = buildSystemPrompt(contextText);
        const messagesPayload: ChatMessageParam[] = [
          { role: "system", content: systemPrompt },
        ];

        const recentHistory = conversationHistory.slice(-6);
        for (const hist of recentHistory) {
          if (hist.role === "user" || hist.role === "assistant") {
            messagesPayload.push({
              role: hist.role,
              content: hist.content,
            });
          }
        }
        messagesPayload.push({ role: "user", content: userQuery });

        // 5. Connect to live Fast & Super API with streaming
        const abortController = new AbortController();
        const timeoutId = setTimeout(
          () => abortController.abort(),
          config.timeoutMs
        );

        const endpoint = resolveChatCompletionsEndpoint(config.baseUrl);
        let response: Response;
        try {
          response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${config.apiKey}`,
            },
            body: JSON.stringify({
              model: config.model,
              messages: messagesPayload,
              temperature: 0.3,
              max_tokens: 800,
              stream: true,
            }),
            signal: params.signal || abortController.signal,
          });
        } catch {
          clearTimeout(timeoutId);
          console.warn(
            "[FastSuperAPI] Network connection failure to provider. Falling back to local school records."
          );
          const localContent = generateLocalVerifiedResponse(
            userQuery,
            contextText,
            hasRelevantFacts
          );
          await streamLocalResponse(localContent, citations, true);
          return;
        }

        clearTimeout(timeoutId);

        // Handle upstream non-200 responses
        if (!response.ok) {
          const errorText = await response.text().catch(() => "");
          if (response.status === 401 || response.status === 403) {
            console.warn(
              `[FastSuperAPI] Authentication error (${response.status}): Invalid API key credentials. Falling back to local school records.`
            );
          } else if (response.status === 404) {
            console.warn(
              `[FastSuperAPI] Model or endpoint not found (${response.status}): model="${config.model}". Falling back to local school records.`
            );
          } else if (response.status === 429) {
            console.warn(
              `[FastSuperAPI] Rate limit reached (429). Falling back to local school records.`
            );
            const rateLimitMsg =
              "The AI service is currently handling high request volumes. Please pause for a moment and try again. For immediate inquiries, contact the School Office directly at " +
              siteConfig.contact.mainPhone +
              ".";
            await streamLocalResponse(rateLimitMsg, citations, true);
            return;
          } else {
            console.warn(
              `[FastSuperAPI] Provider returned HTTP ${response.status}: ${errorText.slice(0, 150)}`
            );
          }

          const localContent = generateLocalVerifiedResponse(
            userQuery,
            contextText,
            hasRelevantFacts
          );
          await streamLocalResponse(localContent, citations, true);
          return;
        }

        // Handle live streaming response
        if (!response.body) {
          throw new Error("No response body received from upstream provider");
        }

        // Send metadata for live Fast & Super connection
        emitMetadata({
          citations,
          provider: "fast_and_super",
          isFallback: false,
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";
        hasEmittedTokens = false;

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line || !line.startsWith("data:")) continue;

            const dataStr = line.slice(5).trim();
            if (dataStr === "[DONE]") {
              emitDone();
              return;
            }

            try {
              const parsed = JSON.parse(dataStr);
              const deltaContent = parsed?.choices?.[0]?.delta?.content;
              if (typeof deltaContent === "string" && deltaContent.length > 0) {
                emitDelta(deltaContent);
                hasEmittedTokens = true;
              }
            } catch {
              // Ignore partial JSON parse errors
            }
          }
        }

        // Flush remaining buffer if any
        if (buffer.trim().startsWith("data:")) {
          const dataStr = buffer.trim().slice(5).trim();
          if (dataStr !== "[DONE]") {
            try {
              const parsed = JSON.parse(dataStr);
              const deltaContent = parsed?.choices?.[0]?.delta?.content;
              if (typeof deltaContent === "string" && deltaContent.length > 0) {
                emitDelta(deltaContent);
                hasEmittedTokens = true;
              }
            } catch {
              // ignore
            }
          }
        }

        if (!hasEmittedTokens) {
          // If the upstream stream completed without emitting tokens, fallback
          const localContent = generateLocalVerifiedResponse(
            userQuery,
            contextText,
            hasRelevantFacts
          );
          emitDelta(localContent);
        }

        emitDone();
      } catch (streamErr) {
        console.warn("[FastSuperAPI] Error during stream processing:", streamErr);
        if (!hasEmittedTokens) {
          const { contextText, citations, hasRelevantFacts } =
            retrieveSchoolKnowledgeContext(userQuery);
          const localContent = generateLocalVerifiedResponse(
            userQuery,
            contextText,
            hasRelevantFacts
          );
          await streamLocalResponse(localContent, citations, true);
        } else {
          emitError("Streaming interrupted. Please try again.");
        }
      }
    },
  });
}

/**
 * Generates an accurate, deterministic response from verified school records when offline or during API outage
 */
function generateLocalVerifiedResponse(
  query: string,
  contextText: string,
  hasRelevantFacts: boolean
): string {
  const q = query.toLowerCase().trim();

  // 1. Simple Greetings
  if (
    q === "hello" ||
    q === "hi" ||
    q === "hey" ||
    q.startsWith("hello") ||
    q.startsWith("hi ") ||
    q.startsWith("hey ") ||
    q.includes("good morning") ||
    q.includes("good afternoon") ||
    q.includes("good evening")
  ) {
    return `Hello! Welcome to ${siteConfig.name}. How can I assist you today? I can help with admissions deadlines, AP curriculum, office hours, campus visits, or general school inquiries.`;
  }

  // 2. General Knowledge & Scientific Explanations
  if (q.includes("photosynthesis") || q.includes("chlorophyll")) {
    return "Photosynthesis is the fundamental biological process by which green plants, algae, and certain cyanobacteria convert sunlight, water, and carbon dioxide into oxygen and glucose (energy-rich sugars) using chlorophyll pigments located inside plant chloroplasts.";
  }

  if (q.includes("newton") || (q.includes("force") && q.includes("mass"))) {
    return "Newton's laws of motion are three fundamental classical mechanics principles: (1) An object remains at rest or in uniform motion unless acted on by an external net force; (2) Force equals mass times acceleration (F = ma); and (3) For every action, there is an equal and opposite reaction.";
  }

  // 3. Known school context available
  if (hasRelevantFacts && contextText) {
    return `Based on our verified school records:\n\n${contextText}\n\nIf you need further details or personalized assistance, feel free to ask a follow-up question or contact the school office at ${siteConfig.contact.mainEmail}.`;
  }

  // 4. Unverified school question
  return `I do not have verified records on that specific topic in our public school handbook. For official assistance, please contact the School Admissions & Office desk directly at ${siteConfig.contact.mainPhone} or email ${siteConfig.contact.mainEmail} during regular office hours (${siteConfig.contact.officeHours}).`;
}

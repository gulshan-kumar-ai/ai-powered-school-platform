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
  {
    keywords: ["demo", "/demo", "competition demo", "walkthrough", "juror", "presentation mode"],
    title: "Competition Demo Console",
    url: "/demo",
    answer:
      "You can launch our interactive 8-step Competition Demo Console at /demo. It features live verifiable proofs for public outreach, faculty authoring, server-side grading, anti-cheat gamification, Socratic AI assistant, CyberSafe lab, diagnostic analytics, and custodial parent data isolation with built-in presentation timing cues.",
  },
  {
    keywords: ["principal", "lashari", "rahmatullah", "headmaster", "institutional head", "leadership"],
    title: "Principal's Desk & Leadership",
    url: "/about#principals-message",
    answer:
      "Sir Rahmatullah Lashari is the Principal and Institutional Head of Government Boys Qazi Sultan Higher Secondary School, Kunri (Sindh Education & Literacy Department). Under his executive leadership, the institution delivers academic rigor, BISE Mirpur Khas board examination standards, and community development partnerships alongside the School Management Committee (SMC). You can reach his office at principal@qazisultanboys.edu.pk or phone +92 238 558252.",
  },
  {
    keywords: ["teacher", "teachers", "faculty", "prof", "staff", "who teaches", "instructor", "lecturer", "specialist"],
    title: "Faculty & Academic Specialists",
    url: "/about#faculty",
    answer:
      "Govt. Boys Qazi Sultan Higher Secondary School, Kunri is staffed by highly qualified subject specialists: Sir Rahmatullah Lashari (Principal & Institutional Head), Prof. Muhammad Tariq Memon (Senior Subject Specialist - Physics, M.Sc.), Prof. Abdul Samad Soomro (Senior Subject Specialist - Chemistry, M.Sc.), Prof. Ghulam Mustafa Nohri (Senior Subject Specialist - Mathematics, M.Sc.), Prof. Sikandar Ali Khaskheli (Senior Lecturer in Biology, M.Sc.), Master Ghulam Rasool Kumbhar (Physical Education Director & Football Coach), and Haji Ubaidullah Gill (SMC Leadership & Community Patron).",
  },
  {
    keywords: ["photo", "photos", "gallery", "picture", "pictures", "image", "architecture", "monument", "gate", "building"],
    title: "Campus Photography & Visual Archive",
    url: "/gallery",
    answer:
      "Explore 12 authentic high-resolution photographs in our Campus Visual Archive at /gallery: the central academic block with Sindh glazed blue-tile arches, Allama Iqbal open-book monument, Bab-e-Ibraheem Momin gate, grand morning assembly parade grounds, annual merit position holders ceremony, solar system science studio mural, and shaded neem study verandas.",
  },
  {
    keywords: ["facility", "facilities", "lab", "laboratory", "laboratories", "library", "quadrangle", "ground", "campus"],
    title: "Campus Facilities & Laboratories",
    url: "/about#campus-facilities",
    answer:
      "Our campus on Station Road features specialized physics, chemistry, and biology laboratories, a dedicated computer science room, library and reference collection, the iconic central courtyard with Allama Iqbal monument, shaded verandas, and sports grounds for cricket and football.",
  },
  {
    keywords: ["board", "bise", "mirpur khas", "affiliation", "exam", "matric", "intermediate", "secondary"],
    title: "BISE Mirpur Khas Affiliation & Examinations",
    url: "/academics",
    answer:
      "The school is officially affiliated with the Board of Intermediate and Secondary Education (BISE) Mirpur Khas. We offer secondary education (SSC Matriculation, Classes IX & X) and higher secondary education (HSSC Intermediate, Classes XI & XII) with regular annual merit positions achieved by our students.",
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
    qLower.includes("principal") ||
    qLower.includes("lashari") ||
    qLower.includes("headmaster") ||
    qLower.includes("leadership")
  ) {
    contextSnippets.push(
      `[Campus Contact & Schedule]: School: ${siteConfig.name}; Address: ${siteConfig.contact.addressLine1}, ${siteConfig.contact.cityStateZip}; Phone: ${siteConfig.contact.mainPhone}; Email: ${siteConfig.contact.mainEmail}; Principal: ${siteConfig.contact.principal}; Office Hours: ${siteConfig.contact.officeHours}; Campus Tours: ${siteConfig.contact.campusTourHours}.`
    );
    if (qLower.includes("principal") || qLower.includes("lashari") || qLower.includes("headmaster") || qLower.includes("leadership")) {
      contextSnippets.push(
        `[Principal & Leadership Profile]: Sir Rahmatullah Lashari is the Principal and Institutional Head of Government Boys Qazi Sultan Higher Secondary School, Kunri (Sindh Education & Literacy Department). He leads academic standards, BISE Mirpur Khas board examinations, and community partnerships alongside the School Management Committee (SMC). Contact: principal@qazisultanboys.edu.pk.`
      );
      if (!citations.some((c) => c.url === "/about#principals-message")) {
        citations.push({ title: "Principal's Desk & Leadership", url: "/about#principals-message" });
      }
    }
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
    return `Hello! Welcome to ${siteConfig.name}. How can I assist you today? I can help you learn about Principal Sir Rahmatullah Lashari, our teachers and faculty specialists, admissions guidelines, BISE Mirpur Khas academic streams, office hours, campus gallery, or exploring our Competition Demo Console (/demo).`;
  }

  // 2. Interactive Demo Mode Queries
  if (
    q === "/demo" ||
    q === "demo" ||
    q.includes("demo mode") ||
    q.includes("competition demo") ||
    q.includes("presentation demo")
  ) {
    return `You can explore our interactive Competition Demo Console at /demo. It features an 8-step live architectural demonstration (Public Outreach, Faculty Studio, Server-Side Grading, Anti-Cheat Gamification, Socratic AI Tutor, CyberSafe Threat Inspection, Diagnostic Analytics, and Custodial Parent Data Isolation) with built-in presentation timing cues.`;
  }

  // 2b. Poster AI Learning Query: Photosynthesis
  if (
    q.includes("photosynthesis") ||
    q.includes("photo synthesis") ||
    q.includes("how plants make food")
  ) {
    return `Of course! **Photosynthesis** is the process by which green plants make their own food. 

Plants use **chlorophyll** in their leaves to absorb energy from **sunlight**, then combine **carbon dioxide (CO₂)** from the air and **water (H₂O)** from the soil. This produces **glucose** (sugar for food and energy) and releases clean **oxygen (O₂)** into the atmosphere!

**Word Equation:**
Carbon Dioxide + Water + Sunlight ➔ Glucose + Oxygen

Scholars can also practice this concept in our **Interactive Science Quiz** in the Student Portal!`;
  }

  // 3. Principal & Executive Leadership
  if (
    q.includes("principal") ||
    q.includes("lashari") ||
    q.includes("headmaster") ||
    q.includes("rahmatullah")
  ) {
    return `Sir Rahmatullah Lashari is the Principal and Institutional Head of Government Boys Qazi Sultan Higher Secondary School, Kunri (Sindh Education & Literacy Department). Under his executive leadership, the institution delivers academic governance, BISE Mirpur Khas board examination standards, and community development partnerships alongside the School Management Committee (SMC). You can contact his office at ${siteConfig.contact.mainPhone} or via email at principal@qazisultanboys.edu.pk.`;
  }

  // 4. Faculty & Teachers
  if (
    q.includes("teacher") ||
    q.includes("faculty") ||
    q.includes("prof") ||
    q.includes("staff") ||
    q.includes("who teaches") ||
    q.includes("instructor") ||
    q.includes("lecturer") ||
    q.includes("specialist")
  ) {
    return `Our academic faculty at Govt. Boys Qazi Sultan Higher Secondary School, Kunri is led by Principal Sir Rahmatullah Lashari. Senior subject specialists include:

• **Sir Rahmatullah Lashari** – Principal & Institutional Head (M.Sc., M.Ed.)
• **Prof. Muhammad Tariq Memon** – Senior Subject Specialist in Physics (M.Sc., B.Ed.)
• **Prof. Abdul Samad Soomro** – Senior Subject Specialist in Chemistry (M.Sc. Analytical Chemistry)
• **Prof. Ghulam Mustafa Nohri** – Senior Subject Specialist in Mathematics (M.Sc. Applied Mathematics)
• **Prof. Sikandar Ali Khaskheli** – Senior Lecturer in Biology (M.Sc. Zoology)
• **Master Ghulam Rasool Kumbhar** – Director of Physical Education (PET) & Football Coach
• **Haji Ubaidullah Gill** – School Management Committee (SMC) Leadership & Community Patron

For academic consultations or department inquiries, visit the Administration Office on campus or email ${siteConfig.contact.mainEmail}.`;
  }

  // 5. Admissions & Enrollment
  if (
    q.includes("admiss") ||
    q.includes("apply") ||
    q.includes("enroll") ||
    q.includes("registration") ||
    q.includes("deadline") ||
    q.includes("admission process")
  ) {
    return `Admissions for the upcoming academic year at Govt. Boys Qazi Sultan Higher Secondary School, Kunri follow our official 5-stage evaluation:

1. **Inquiry & Form Submission**: Submit the enrollment application form in person at the Admissions Desk or online.
2. **Academic Verification**: Submission of previous school leaving certificates, B-Form/birth certificate, and prior academic marksheets.
3. **Student Interview**: Diagnostic interview assessing foundational literacy, numeracy, and character.
4. **Records Review**: Verification of BISE Mirpur Khas board registration eligibility.
5. **Formal Admission Offer**: Issuance of official student roll number and academic timetable.

As a premier public institution under the Sindh Education & Literacy Department, education is accessible and merit-focused. For inquiries, visit the admissions office during morning hours (${siteConfig.contact.officeHours}) or email admissions@qazisultanboys.edu.pk.`;
  }

  // 6. Campus Photography & Visual Archive
  if (
    q.includes("photo") ||
    q.includes("gallery") ||
    q.includes("picture") ||
    q.includes("image") ||
    q.includes("architecture") ||
    q.includes("campus look") ||
    q.includes("monument") ||
    q.includes("gate")
  ) {
    return `You can explore our interactive Visual Archive at /gallery featuring 12 authentic high-resolution photographs of our Station Road campus:

• **Central Academic Complex**: Sindh glazed blue-tile mosaic arched portico and Allama Iqbal open-book monument ("Zindagi Shama Ki Soorat Ho Khudaya Meri").
• **Bab-e-Ibraheem Momin Gate**: Imposing fortified main entrance welcoming scholars on Station Road.
• **Grand Morning Assembly**: Hundreds of scholars in disciplined formation for the national anthem on parade grounds.
• **Solar System Science Studio**: Room 4 celestial wall mural and inquiry counters.
• **Annual Merit Laureates**: Trophy ceremonies honoring BISE Mirpur Khas board position holders.
• **Veranda Arcades & Sports Grounds**: Shaded walkways, neem trees, and cricket/football grounds.

Visit our Gallery page (/gallery) where you can open photos in high resolution and navigate left/right!`;
  }

  // 7. Academic Programs & Curriculum
  if (
    q.includes("academic") ||
    q.includes("curriculum") ||
    q.includes("subject") ||
    q.includes("stream") ||
    q.includes("course") ||
    q.includes("matric") ||
    q.includes("intermediate") ||
    q.includes("pre-medical") ||
    q.includes("pre-engineering")
  ) {
    return `Govt. Boys Qazi Sultan Higher Secondary School, Kunri offers comprehensive secondary and higher secondary education affiliated with BISE Mirpur Khas:

• **Secondary School Certificate (SSC Matriculation, Classes IX & X)**: Science Group (Physics, Chemistry, Biology/Computer Science, Mathematics, Sindhi/Urdu, English, Islamiat, Pakistan Studies).
• **Higher Secondary Certificate (HSSC Intermediate, Classes XI & XII)**:
  - **Pre-Medical**: Physics, Chemistry, Biology, English, Urdu/Sindhi, Pakistan Studies, Islamic Studies.
  - **Pre-Engineering**: Physics, Chemistry, Mathematics, English, Urdu/Sindhi, Pakistan Studies.
  - **Computer Science & General Science**: Mathematics, Physics, Computer Science.
  - **Humanities**: Social sciences, languages, civics, and Islamic history.

Our graduates consistently achieve competitive merit rankings in Mirpur Khas Division board examinations.`;
  }

  // 8. Office Hours, Contact & Location
  if (
    q.includes("hour") ||
    q.includes("timing") ||
    q.includes("time") ||
    q.includes("open") ||
    q.includes("close") ||
    q.includes("address") ||
    q.includes("location") ||
    q.includes("phone") ||
    q.includes("contact") ||
    q.includes("email") ||
    q.includes("where")
  ) {
    return `Official Contact & Schedule for Govt. Boys Qazi Sultan Higher Secondary School, Kunri:

• **Address**: Station Road Corridor, Bab-e-Ibraheem Momin Campus, Kunri, Sindh, Pakistan
• **Telephone**: ${siteConfig.contact.mainPhone}
• **Email**: ${siteConfig.contact.mainEmail} (Admissions: admissions@qazisultanboys.edu.pk | Principal: principal@qazisultanboys.edu.pk)
• **Administrative Office Hours**: ${siteConfig.contact.officeHours}
• **Campus Discovery Visits**: ${siteConfig.contact.campusTourHours} (Tuesdays & Thursdays by appointment)
• **Affiliation**: School Education & Literacy Department, Government of Sindh & BISE Mirpur Khas.`;
  }

  // 9. Facilities & Sports
  if (
    q.includes("facilit") ||
    q.includes("lab") ||
    q.includes("library") ||
    q.includes("computer") ||
    q.includes("ground") ||
    q.includes("sport") ||
    q.includes("football") ||
    q.includes("cricket")
  ) {
    return `Our campus facilities on Station Road include:

• **Science Laboratories**: Specialized physics apparatus, chemistry titration counters, and biology dissection museum.
• **Computer & Technology Studio**: Practical IT workstations for secondary computer science scholars.
• **Central Quadrangle & Iqbal Monument**: Open-air assembly grounds with the iconic Allama Iqbal open-book monument.
• **Sports Lawns & Athletic Field**: Dedicated cricket pitch and football field hosting our annual inter-school tournament coached by Master Ghulam Rasool Kumbhar.
• **Campus Library**: Reference books, past examination papers, syllabus textbooks, and quiet study alcoves.
• **Bab-e-Ibraheem Momin Gatehouse & Verandas**: Fortified historic entrance and shaded arcades providing natural cooling.`;
  }

  // 10. General Knowledge & Scientific Explanations
  if (q.includes("photosynthesis") || q.includes("chlorophyll")) {
    return "Photosynthesis is the fundamental biological process by which green plants, algae, and certain cyanobacteria convert sunlight, water, and carbon dioxide into oxygen and glucose (energy-rich sugars) using chlorophyll pigments located inside plant chloroplasts.";
  }

  if (q.includes("newton") || (q.includes("force") && q.includes("mass"))) {
    return "Newton's laws of motion are three fundamental classical mechanics principles: (1) An object remains at rest or in uniform motion unless acted on by an external net force; (2) Force equals mass times acceleration (F = ma); and (3) For every action, there is an equal and opposite reaction.";
  }

  // 11. Known school context available (clean up raw bracket markers)
  if (hasRelevantFacts && contextText) {
    const cleanedText = contextText
      .split("\n\n")
      .map((item) => item.replace(/^\[[^\]]+\]:\s*/, "").trim())
      .filter(Boolean)
      .join("\n\n");

    return `${cleanedText}\n\nIf you need further details or personalized assistance, feel free to ask a follow-up question or contact the school office at ${siteConfig.contact.mainEmail}.`;
  }

  // 12. Unverified school question
  return `I do not have verified records on that specific topic in our public school handbook. For official assistance, please contact the School Admissions & Office desk directly at ${siteConfig.contact.mainPhone} or email ${siteConfig.contact.mainEmail} during regular office hours (${siteConfig.contact.officeHours}).`;
}

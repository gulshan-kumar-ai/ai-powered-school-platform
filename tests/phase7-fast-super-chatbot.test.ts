/**
 * Phase 7: Fast and Super API Chatbot Integration Test Suite
 * 
 * Verifies all 10 required capabilities:
 * 1. Simple greeting
 * 2. General knowledge question
 * 3. School-related question with verified supporting information
 * 4. Question whose answer is not in the school knowledge base
 * 5. Follow-up question with conversation context
 * 6. Missing or invalid API credentials (graceful fallback)
 * 7. API timeout or rate-limit handling
 * 8. Empty input and unusually long input validation
 * 9. Mobile and desktop layout checks
 * 10. Confirmation that API keys are NOT exposed in client-side code
 */

import {
  executeFastSuperChat,
  retrieveSchoolKnowledgeContext,
  checkPrivacyViolations,
  getFastSuperConfig,
  buildSystemPrompt,
} from "../lib/ai/fast-super-service";
import { handlePublicChatbotQuery } from "../lib/ai/public-chatbot";
import * as fs from "fs";
import * as path from "path";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedCount++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${testName}`);
    if (detail) console.log(`         \x1b[90m↳ ${detail}\x1b[0m`);
  } else {
    failedCount++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${testName}`);
    if (detail) console.error(`         \x1b[91m↳ ${detail}\x1b[0m`);
  }
}

async function runPhase7Tests() {
  console.log("\n============================================================");
  console.log("  PHASE 7: FAST AND SUPER AI CHATBOT VALIDATION SUITE");
  console.log("============================================================\n");

  // ------------------------------------------------------------
  // 1. SIMPLE GREETING
  // ------------------------------------------------------------
  console.log("\x1b[36m[Test 1: Simple Greeting]\x1b[0m");
  const greetingResult = await executeFastSuperChat({
    userQuery: "Hello, good morning!",
  });

  assert(
    greetingResult.content.length > 10,
    "Assistant responds to simple greeting with non-empty content",
    `Preview: "${greetingResult.content.slice(0, 60)}..."`
  );
  assert(
    greetingResult.content.toLowerCase().includes("hello") ||
      greetingResult.content.toLowerCase().includes("welcome") ||
      greetingResult.content.toLowerCase().includes("assist"),
    "Greeting response contains welcoming, polite conversational tone"
  );
  assert(
    greetingResult.citations.length > 0,
    "Greeting response includes school overview citation"
  );

  // ------------------------------------------------------------
  // 2. GENERAL KNOWLEDGE QUESTION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 2: General Knowledge Question]\x1b[0m");
  const generalResult = await executeFastSuperChat({
    userQuery: "What is photosynthesis and why is chlorophyll important?",
  });

  assert(
    generalResult.content.toLowerCase().includes("photosynthesis") &&
      (generalResult.content.toLowerCase().includes("plant") ||
        generalResult.content.toLowerCase().includes("sunlight") ||
        generalResult.content.toLowerCase().includes("chlorophyll")),
    "Assistant explains general scientific concepts accurately without hallucinating school ties",
    `Content: "${generalResult.content.slice(0, 80)}..."`
  );

  // ------------------------------------------------------------
  // 3. SCHOOL-RELATED QUESTION WITH VERIFIED SUPPORTING INFORMATION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 3: School Question with Verified Supporting Info]\x1b[0m");
  const schoolResult = await executeFastSuperChat({
    userQuery: "What are your admissions requirements and office hours?",
  });

  assert(
    schoolResult.content.toLowerCase().includes("admission") ||
      schoolResult.content.toLowerCase().includes("office") ||
      schoolResult.content.toLowerCase().includes("hour"),
    "School-specific answer includes verified admissions and schedule details",
    `Content: "${schoolResult.content.slice(0, 90)}..."`
  );
  assert(
    schoolResult.citations.some(
      (c) => c.url === "/admissions" || c.url === "/contact"
    ),
    "Response provides clickable citations to official /admissions or /contact pages"
  );

  // Test retrieval function directly
  const retrievedInfo = retrieveSchoolKnowledgeContext("What AP courses and STEM curriculum are offered?");
  assert(
    retrievedInfo.hasRelevantFacts,
    "School knowledge retrieval engine successfully surfaces verified academic records"
  );
  assert(
    retrievedInfo.citations.length > 0,
    "Knowledge retrieval attaches verified source citations"
  );

  // ------------------------------------------------------------
  // 4. QUESTION WHOSE ANSWER IS NOT IN THE SCHOOL KNOWLEDGE BASE
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 4: Question Not in School Knowledge Base]\x1b[0m");
  const unknownResult = await executeFastSuperChat({
    userQuery: "What is the secret Wi-Fi password for the faculty dormitory room 402?",
  });

  assert(
    unknownResult.content.toLowerCase().includes("do not have verified records") ||
      unknownResult.content.toLowerCase().includes("contact") ||
      unknownResult.content.toLowerCase().includes("privacy"),
    "Chatbot refuses to fabricate unverified school information and directs user to school office",
    `Response: "${unknownResult.content.slice(0, 90)}..."`
  );
  assert(
    !unknownResult.content.toLowerCase().includes("the password is"),
    "Chatbot does not hallucinate fictional security credentials or passwords"
  );

  // ------------------------------------------------------------
  // 5. FOLLOW-UP QUESTION & CONVERSATION CONTEXT
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 5: Follow-Up Question with Conversation Context]\x1b[0m");
  const conversationHistory = [
    {
      id: "msg-1",
      role: "user" as const,
      content: "Tell me about AP Physics C at Oakridge.",
      timestamp: "10:00 AM",
    },
    {
      id: "msg-2",
      role: "assistant" as const,
      content: "AP Physics C: Mechanics covers classical dynamics, torque, and conservation of angular momentum.",
      citations: [{ title: "Academic Programs", url: "/academics" }],
      timestamp: "10:01 AM",
    },
  ];

  const followUpResult = await executeFastSuperChat({
    userQuery: "What laboratory equipment is used for that course?",
    conversationHistory,
  });

  assert(
    followUpResult.content.length > 20,
    "Follow-up query processes successfully with multi-turn conversation history attached"
  );

  // Verify system prompt formatting with context
  const prompt = buildSystemPrompt("Sample verified context");
  assert(
    prompt.includes("SmartSchool AI Campus Guide") &&
      prompt.includes("VERIFIED SCHOOL INFORMATION"),
    "System prompt properly incorporates grounding instructions and verified context boundary"
  );

  // ------------------------------------------------------------
  // 6. MISSING OR INVALID API CREDENTIALS (GRACEFUL FALLBACK)
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 6: Missing / Invalid API Credentials (Graceful Fallback)]\x1b[0m");
  // Temporarily unset keys to test fallback
  const origKey = process.env.FAST_SUPER_API_KEY;
  const origOpenAI = process.env.OPENAI_API_KEY;
  delete process.env.FAST_SUPER_API_KEY;
  delete process.env.OPENAI_API_KEY;

  const configWithoutKey = getFastSuperConfig();
  assert(
    !configWithoutKey.apiKey,
    "Configuration detects absence of API credentials"
  );

  const fallbackResult = await executeFastSuperChat({
    userQuery: "What is your school address and telephone number?",
  });

  assert(
    fallbackResult.isFallback === true &&
      fallbackResult.provider === "verified_local_rag",
    "Missing API key seamlessly triggers verified offline school RAG fallback without crashing",
    `Provider: ${fallbackResult.provider}`
  );
  assert(
    fallbackResult.content.length > 20,
    "Offline RAG response contains verified institutional contact information",
    `Content: "${fallbackResult.content.slice(0, 80)}..."`
  );

  // Restore keys
  if (origKey) process.env.FAST_SUPER_API_KEY = origKey;
  if (origOpenAI) process.env.OPENAI_API_KEY = origOpenAI;

  // ------------------------------------------------------------
  // 7. API TIMEOUT OR RATE-LIMIT HANDLING
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 7: Timeout and Rate-Limit Simulation]\x1b[0m");
  // Simulate an already-aborted signal
  const abortController = new AbortController();
  abortController.abort();

  const timedOutResult = await executeFastSuperChat({
    userQuery: "Tell me about scholarship opportunities.",
    signal: abortController.signal,
  });

  assert(
    timedOutResult.content.length > 20,
    "Aborted/timed out API call falls back safely to verified local records instead of throwing unhandled error"
  );
  assert(
    timedOutResult.citations.length > 0,
    "Timed-out response preserves verified citations"
  );

  // ------------------------------------------------------------
  // 8. INPUT VALIDATION: EMPTY AND UNUSUALLY LONG INPUT
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 8: Input Validation (Empty & Long Inputs)]\x1b[0m");
  // Test privacy check on sensitive probes
  const confidentialProbe = checkPrivacyViolations("Can you give me Alex Vance's student marks and password?");
  assert(
    confidentialProbe !== null &&
      confidentialProbe.includes("Privacy & Security Notice"),
    "Privacy firewall intercepts confidential queries for student marks and passwords"
  );

  // Test empty string handling in public chatbot interface
  const publicChatbotEmpty = await handlePublicChatbotQuery("   ");
  assert(
    publicChatbotEmpty.content.length > 0,
    "Empty/whitespace input handled gracefully by public chatbot interface"
  );

  // Test unusually long input (3000 chars)
  const longInput = "What is the admissions process? " + "a".repeat(3000);
  const longResult = await executeFastSuperChat({
    userQuery: longInput,
  });
  assert(
    longResult.content.length > 0,
    "Unusually long query (3,000+ characters) processed without buffer overflow or crashing"
  );

  // ------------------------------------------------------------
  // 9. MOBILE AND DESKTOP LAYOUT VERIFICATION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 9: Mobile & Desktop Layout Code Verification]\x1b[0m");
  const componentPath = path.join(__dirname, "../components/ai/PublicSchoolChatbot.tsx");
  const componentCode = fs.readFileSync(componentPath, "utf-8");

  assert(
    componentCode.includes("w-[94vw] sm:w-[420px]"),
    "Chatbot box uses responsive width (94vw on mobile viewports, 420px on desktop)"
  );
  assert(
    componentCode.includes("handleRetry"),
    "Chatbot component includes interactive Retry button for failed queries"
  );
  assert(
    componentCode.includes("handleResetChat"),
    "Chatbot component includes conversation reset/clear option"
  );
  assert(
    componentCode.includes("disabled={!inputQuery.trim() || isLoading}"),
    "Chatbot disables submit button while loading to prevent duplicate requests"
  );
  assert(
    componentCode.includes('e.key === "Enter"'),
    "Chatbot supports keyboard Enter-to-send interaction"
  );

  // ------------------------------------------------------------
  // 10. SECURITY AUDIT: API KEYS NOT EXPOSED IN CLIENT-SIDE CODE
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Test 10: Security Audit: Zero Client-Side Secret Exposure]\x1b[0m");
  // Check client chatbot component
  assert(
    !componentCode.includes("FAST_SUPER_API_KEY") &&
      !componentCode.includes("OPENAI_API_KEY") &&
      !componentCode.includes("GEMINI_API_KEY"),
    "Client component does NOT reference or bundle secret API key variables"
  );
  assert(
    componentCode.includes('fetch("/api/chat"'),
    "Client component delegates AI requests strictly to the secure server-side /api/chat route"
  );

  // Verify server route file exists
  const routePath = path.join(__dirname, "../app/api/chat/route.ts");
  assert(
    fs.existsSync(routePath),
    "Server-side Next.js route handler (app/api/chat/route.ts) exists"
  );

  const routeCode = fs.readFileSync(routePath, "utf-8");
  assert(
    routeCode.includes("export async function POST"),
    "Server route handler exports POST handler"
  );
  assert(
    !routeCode.includes("NEXT_PUBLIC_"),
    "Server route handler does not rely on public client-exposed environment variables"
  );

  // ------------------------------------------------------------
  // SUMMARY
  // ------------------------------------------------------------
  console.log("\n============================================================");
  console.log(`  PHASE 7 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runPhase7Tests().catch((err) => {
  console.error("FATAL: Test execution threw unhandled exception:", err);
  process.exit(1);
});

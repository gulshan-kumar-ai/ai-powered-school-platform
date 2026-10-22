# Fast and Super API Integration Guide — SmartSchool AI Chatbot

**Document Reference:** `docs/FAST_SUPER_API_INTEGRATION.md`  
**Classification:** Technical Integration Manual & Operations Guide  
**Release:** Phase 7 Fast and Super API Integration  
**Protocol:** OpenAI-Compatible REST API with Streaming SSE & School Knowledge Grounding  

---

## 1. Executive Overview

The **SmartSchool AI Campus Guide** has been upgraded to interface directly with high-performance, OpenAI-compatible **Fast and Super API** providers (such as Groq, Cerebras, OpenAI, SuperAI, or custom OpenAI-compatible enterprise inference endpoints).

### Core Architectural Features:
1. **Server-Side Security:** All credentials are read and processed exclusively within the server-side Next.js route handler (`/api/chat`). Zero API keys are bundled into client-side JavaScript or exposed to browser DevTools.
2. **School Knowledge Grounding:** Every inquiry is automatically cross-referenced with approved school facts (admissions timeline, tuition & scholarships, AP curriculum, office hours, campus tours, policies, and FAQs) before generating answers.
3. **Strict Privacy Firewall:** Enforces strict FERPA/GDPR compliance by blocking queries seeking confidential student marks, passwords, teacher compensation, or internal documents, firmly redirecting users to the authenticated portal.
4. **Streaming SSE Response Delivery:** Supports Server-Sent Events (SSE) streaming for real-time text delivery with sub-second time-to-first-token (TTFT).
5. **Zero-Downtime Deterministic Fallback:** In the absence of an external API key or during third-party provider outages, the chatbot gracefully falls back to local verified school knowledge without crashing or returning blank screens.
6. **Robust UX Controls:** Responsive mobile/desktop layout (`94vw` on mobile, `420px` on desktop), Enter-to-send support, interactive **Retry Query** button on failures, **Clear Conversation** reset, and duplicate submission prevention while loading.

---

## 2. Environment Variables & Configuration

Add the following configuration to your `.env.local` file (or set them securely in your production deployment dashboard like Vercel or Docker Secrets):

```bash
# ====================================================================
# FAST AND SUPER AI API CONFIGURATION (OPENAI-COMPATIBLE)
# ====================================================================

# 1. API Secret Key (Keep private on server)
FAST_SUPER_API_KEY=your_fast_and_super_api_key_here

# 2. Base Endpoint URL (Defaults to https://api.openai.com/v1)
# Examples:
# - Groq Cloud:       https://api.groq.com/openai/v1
# - Cerebras:         https://api.cerebras.ai/v1
# - OpenAI:           https://api.openai.com/v1
# - Custom Endpoint:  https://your-custom-gateway.internal/v1
FAST_SUPER_API_BASE_URL=https://api.openai.com/v1

# 3. Model Identifier
# Examples:
# - Groq:             llama-3.3-70b-versatile, mixtral-8x7b-32768
# - OpenAI:           gpt-4o-mini, gpt-4o
# - Cerebras:         llama3.1-70b
FAST_SUPER_MODEL=gpt-4o-mini

# 4. Request Timeout in Milliseconds (Defaults to 20000ms / 20 seconds)
FAST_SUPER_TIMEOUT_MS=20000

# Optional Fallbacks / Secondary Cloud AI Providers:
OPENAI_API_KEY=sk-proj-your_production_openai_api_key_here
GEMINI_API_KEY=AIzaSy_your_production_google_gemini_api_key_here
```

---

## 3. Architecture & Data Flow

```
[User Browser / Mobile Device]
       │
       ▼ (1) POST /api/chat { message: "What are your admissions deadlines?", stream: true }
[Next.js Server Route Handler: app/api/chat/route.ts]
       │
       ▼ (2) Privacy Firewall Check (lib/ai/fast-super-service.ts)
       │     └─► If confidential query -> Returns privacy notice + /portal/login link immediately
       │
       ▼ (3) Knowledge Retrieval Engine (data/admissions.ts, data/faqs.ts, lib/ai/rag-engine.ts)
       │     └─► Retrieves verified facts, dates, hours, and official source links
       │
       ▼ (4) System Prompt Construction (Grounds model strictly in school records)
       │
       ▼ (5) High-Speed External Call (FAST_SUPER_API_BASE_URL/chat/completions)
       │     ├─► If Fast & Super API available -> Streams/returns grounded response
       │     └─► If timeout / 429 / no key -> Falls back to verified local school knowledge
       │
       ▼ (6) Streamed SSE Chunks / Clean JSON Payload
[PublicSchoolChatbot UI Widget: components/ai/PublicSchoolChatbot.tsx]
```

---

## 4. Verification & Testing Runbook

To verify all system capabilities across Phase 7 and Phase 8:

```bash
# Run the complete test suite (249 total automated assertions passing across 7 suites)
npm test

# Run Phase 8 live connection & streaming verification
npx tsx tests/phase8-live-connection.test.ts

# Run Phase 7 standalone test suite
npx tsx tests/phase7-fast-super-chatbot.test.ts

# Verify TypeScript strict type-checking
npx tsc --noEmit

# Verify ESLint compliance
npm run lint

# Verify Next.js production build
npm run build
```

---

## 5. Phase 8 Upgrades & Operational Transparency

1. **True Upstream SSE Streaming:** Directly pipes token deltas from OpenAI-compatible providers (`choices[0].delta.content`) to the browser in real-time, eliminating response latency.
2. **Transparent Operational Mode Indicator:**
   - **Live Cloud AI:** When `FAST_SUPER_API_KEY` is present and connected, the UI displays `Fast & Super AI (Live Cloud)` in the header and badges individual responses with `Live Fast & Super AI`.
   - **Local Offline Fallback:** When keys are absent, expired, or the provider encounters 401/404/429/timeouts, the UI displays `School Knowledge AI (Local Offline)` and badges messages with `Verified School Records (Local Fallback)`. Fallback answers are never disguised as live AI.
3. **Diagnostic Status Endpoint (`GET /api/chat`):**
   - Enables instant verification of API readiness: returns `{ status: "ok", isConfigured: boolean, provider: string, model: string, endpoint: string }`.
   - Secret keys are strictly scrubbed and never returned.
4. **Endpoint Path Normalization:** Handles both base paths (`https://api.openai.com/v1`) and explicit completion endpoints (`https://api.openai.com/v1/chat/completions`) without generating duplicate subpaths.


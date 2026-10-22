# Known Limitations & Operating Boundaries

**Document Reference:** `docs/competition/KNOWN_LIMITATIONS.md`  
**Classification:** Competition Jury Technical Presentation Asset  
**Institution:** Oakridge Collegiate Academy  

---

## 1. Transparency Commitment

In accordance with competition rules, we explicitly document the operational boundaries and technical limits of the current release (v1.0.0). We distinguish fully verified, local capabilities from external third-party dependencies.

---

## 2. Technical Limitations & Dependency Boundaries

### 2.1 Cloud AI External Credentials
- **Status:** The Socratic AI Assistant and Quiz Studio include full multi-provider REST implementations for Google Gemini 1.5 Pro and OpenAI GPT-4o.
- **Limitation:** In environments where external cloud API keys (`GEMINI_API_KEY` or `OPENAI_API_KEY`) are unconfigured or egress firewalls restrict outbound HTTPS traffic to LLM endpoints, the system activates its verified offline RAG fallback mode.
- **Transparency Safeguard:** The student interface prominently displays the active engine mode badge (`cloud_live` vs. `offline_rag_verified`), ensuring users and evaluators are never misled about the response generation source.

### 2.2 Live Supabase PostgreSQL Connection
- **Status:** The complete relational database schema, tables, foreign keys, and Row-Level Security policies are codified in `supabase/migrations/` (4 migrations).
- **Limitation:** Running the project in standalone local mode without the Supabase CLI utilizes the in-memory `SchoolDataStore`. The in-memory store implements all RBAC, scoring, and points validation logic, but changes are reset when the local Node process restarts unless connected to persistent PostgreSQL.

### 2.3 Optical Character Recognition (OCR) for Scanned Courseware
- **Status:** The digital library ingests, categorizes, stores, and serves digital documents (PDF, DOCX, EPUB) and extracts plain-text curriculum chunks for vector RAG similarity matching.
- **Limitation:** Scanned physical textbooks containing rasterized images of text without embedded font layers cannot be indexed into the RAG vector store without an upstream optical character recognition (OCR) worker pipeline.

### 2.4 Real-Time Push Notifications vs. Reactive Invalidation
- **Status:** Portal views update reactively during user actions, form submissions, and page navigations.
- **Limitation:** Live multi-device push notifications (e.g. instant bell notification when another teacher marks attendance in a parallel classroom) rely on active session queries rather than active WebSocket subscriptions when running against the offline in-memory store.

### 2.5 Native Mobile Packaging
- **Status:** The entire web platform is 100% mobile-responsive, tested on viewport dimensions ranging from iPhone SE (375px) to iPad Pro (1024px) and 4K displays.
- **Limitation:** The platform is delivered as a modern responsive web application rather than compiled native binaries on Apple App Store or Google Play Store. PWA installability manifests and offline service workers are scheduled for the next minor release.

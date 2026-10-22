# Technology Stack Rationale & Architectural Decisions

**Document Reference:** `docs/competition/TECH_STACK.md`  
**Classification:** Competition Jury Technical Presentation Asset  
**Institution:** Oakridge Collegiate Academy  

---

## 1. Primary Technology Stack

| Layer | Technology | Version | Rationale & Architectural Advantage |
| :--- | :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | `16.4.2` | High-performance full-stack React framework providing React Server Components (RSC), Turbopack sub-second hot reload, static site generation for public pages, and standalone output for minimal container footprints. |
| **UI Runtime** | **React** | `19.3.0` | Latest concurrent rendering features, native form actions, optimized server-client hydration boundaries, and uncompromised accessibility. |
| **Language** | **TypeScript** | `5.x` | Strict type checking (`strict: true`), zero implicit `any`, full domain interface modeling across `types/portal.ts`, eliminating runtime type crashes. |
| **Styling** | **Tailwind CSS** | `v4` | High-efficiency modern CSS engine with zero runtime overhead, CSS custom properties, responsive breakpoints, dark/light theme tokens, and minimal production bundle size. |
| **Iconography** | **Lucide React** | `1.61.0` | Clean, accessible SVG iconography with tree-shakeable modular imports, standardizing UI symbols across all 5 user dashboards. |
| **Database** | **PostgreSQL (Supabase)** | `15+` | Enterprise relational database with Row-Level Security (RLS) policies, JSONB support for unstructured educational metadata, and full ACID compliance. |
| **Offline Persistence** | **SchoolDataStore** | In-Memory | Zero-dependency, reproducible in-memory state repository ensuring 100% functionality during offline evaluations, network outages, and local developer onboarding. |
| **AI Orchestration** | **Multi-Provider Engine** | Custom | Dual-cloud integration supporting Google Gemini 1.5 Pro and OpenAI GPT-4o REST endpoints with deterministic, offline vector-similarity RAG fallback. |
| **Schema Validation** | **Zod** | `v4.6.7` | Type-safe runtime parsing for API requests, question generation schemas, and environment variable validation. |
| **Execution User** | **Node.js (Alpine Base)** | `20-alpine` | Lightweight, hardened container runtime running under an unprivileged `nextjs` system user (UID 1001) for container escape mitigation. |

---

## 2. Key Architectural Decisions & Trade-Offs

### 2.1 Next.js 16 App Router vs. Traditional Single-Page Apps (SPA)
- **Problem:** Client-only SPAs suffer from slow initial page loads, poor search engine indexing for prospective student admissions, and flash-of-unstyled-content (FOUC).
- **Decision:** Next.js 16 App Router enables hybrid rendering. Public marketing and admissions pages are statically pre-rendered at build time with 0ms database latency, while authenticated portal dashboards leverage streaming server components with authenticated session headers.

### 2.2 Server-Side Scoring vs. Client-Side Evaluation
- **Problem:** Many educational platforms transmit complete quiz answer keys to the student's browser and evaluate submissions via JavaScript functions, allowing tech-savvy students to inspect network traffic and manipulate scores.
- **Decision:** Strict server-side evaluation. The quiz retrieval endpoint (`schoolStore.getQuizById(id, includeAnswers=false)`) systematically strips correct answers, accepted variants, and explanations from the student's payload. Scoring is calculated exclusively on the server, ensuring tamper-proof marks.

### 2.3 Hybrid Storage Strategy (Supabase RLS + Offline Store)
- **Problem:** Relying exclusively on cloud database endpoints introduces single-point-of-failure risks during campus Wi-Fi disruptions or competition evaluations where external network access may be restricted.
- **Decision:** A decoupled repository pattern. In managed cloud mode, Supabase enforces Row-Level Security directly at the PostgreSQL level. In offline or evaluation mode, `SchoolDataStore` activates a comprehensive in-memory seed dataset supporting all 5 user roles without requiring external credentials.

### 2.4 Curriculum-Anchored Socratic AI vs. Raw Chatbot APIs
- **Problem:** General-purpose consumer LLMs hallucinate non-standard facts and directly solve homework assignments without pedagogical value.
- **Decision:** Socratic system instruction combined with local Retrieval-Augmented Generation (RAG). Queries are first matched against approved Oakridge curriculum chunks using vector cosine similarity. The AI model is instructed to guide students through Socratic inquiry and provide verified textbook citations.

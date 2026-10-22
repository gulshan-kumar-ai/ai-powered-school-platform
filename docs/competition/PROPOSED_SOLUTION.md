# Proposed Solution — The Unified Smart School Ecosystem

**Document Reference:** `docs/competition/PROPOSED_SOLUTION.md`  
**Classification:** Competition Jury Presentation Asset  
**Institution:** Oakridge Collegiate Academy  

---

## 1. System Vision

The **Oakridge Collegiate Academy Smart School Platform** solves institutional fragmentation by consolidating the public presence, academic information system, digital courseware repository, interactive assessment engine, pedagogical AI, and custodial family communications into a single, cohesive, modern web application.

Built on the **Next.js 16 App Router** with **Turbopack**, **TypeScript 5 (Strict Mode)**, **Tailwind CSS v4**, and **Supabase PostgreSQL**, the platform guarantees sub-100ms response times, zero client-side hydration shifts, and uncompromising custodial privacy.

---

## 2. Core Pillars of the Solution

```
┌────────────────────────────────────────────────────────────────────────┐
│               Oakridge Collegiate Academy Architecture                 │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 1. Public Portal  │ 2. Faculty Hub    │ 3. Student & Parent Workspaces │
│  - Academic Paths │  - Class Scoping  │  - Server-Scored Quizzes       │
│  - Admissions     │  - Courseware Pub │  - Gamification Ledger         │
│  - Announcements  │  - AI Quiz Studio │  - Socratic AI Assistant (RAG) │
│  - Event Calendar │  - Diagnostic Viz │  - CyberSafe Threat Analyzer   │
│                   │                   │  - Custodial Parent Isolation  │
├───────────────────┴───────────────────┴────────────────────────────────┤
│                4. Secure Foundation & Autonomous Engine                │
│  - Next.js 16 App Router (Node.js 20 Standalone)                       │
│  - Supabase PostgreSQL with RLS + Reproducible In-Memory Fallback      │
│  - Multi-Provider AI (Google Gemini 1.5 Pro / OpenAI GPT-4o / RAG)     │
│  - PII Scrubbing, Audit Logging, Automated Account Status Cascade      │
└────────────────────────────────────────────────────────────────────────┘
```

### Pillar 1: Public Institutional Portal
- Provides prospective students, alumni, and families with an engaging digital front door.
- Live administrative announcements, downloadable academic prospectuses, responsive event calendars, and faculty directories.
- Accessible typography conforming to WCAG 2.1 AA standards.

### Pillar 2: High-Assurance Administration & Faculty Hub
- **Role-Based Access Control (RBAC):** Five strictly enforced user contexts (`visitor`, `administrator`, `teacher`, `student`, `parent`).
- **Scoped Teacher Workspaces:** Faculty can only view rosters and grade students assigned to their specific sections and subjects.
- **Audited Administration:** Every critical change (class creation, teacher assignment, mark publication, student suspension) is recorded in an immutable, timestamped audit log.
- **Account Status Cascade:** Deactivating or suspending a student automatically invalidates their active sessions, bars portal login, and updates their profile status.

### Pillar 3: Tamper-Resistant Digital Learning & Gamification
- **Digital Library:** Structured catalog for syllabi, presentations, and lab manuals with granular publishing states (`is_published: true/false`).
- **Server-Side Assessment Engine:** Answer keys, accepted short-answer variations, and pedagogical explanations are stripped from client payloads before quiz distribution. Quiz scoring and percentage calculations occur strictly server-side.
- **Anti-Fraud Gamification Economy:** Learning points (50 pts completion, 50 pts perfect score bonus) are recorded in an append-only ledger with cryptographic `reference_id` checks. Replaying or duplicating submission requests is safely blocked without corrupting point balances.
- **Honors & Badges:** Automatically unlocked achievements ("First Quiz", "Perfect Score", "Math Explorer", "CyberSafe Champion") with verifiable criteria.

### Pillar 4: Socratic AI & Curriculum RAG Grounding
- **Pedagogical Socratic Model:** Never simply outputs homework answers; guides students through step-by-step reasoning prompts and derivations.
- **Approved Curriculum Grounding (RAG):** Integrates approved Oakridge course literature chunked with vector embeddings. Every response includes verifiable source citations, document excerpts, and relevance percentages.
- **Engine Mode Transparency:** UI features an explicit indicator badge showing whether answers are generated via live cloud AI or verified offline RAG fallback.
- **Teacher AI Quiz Studio:** Enables teachers to generate standards-aligned multiple-choice, true/false, and short-answer questions from curriculum topics, reviewing and editing before publication.

### Pillar 5: Active Cybersecurity Education (CyberSafe Lab)
- Students inspect suspicious emails, SMS messages, and social media links in an isolated sandbox with zero risk of malware execution or external link resolution.
- Explains psychological persuasion indicators: urgency pressure, credential harvesting, financial demands, and spoofed domains.
- Provides actionable defensive hygiene guidance backed by clear institutional verification contacts.

### Pillar 6: Custodial Parent Isolation (FERPA / GDPR)
- Dedicated guardian portal presenting real-time attendance percentages, teacher feedback, and published examination marks.
- **Strict Data Isolation:** Parents can only access records of their legally verified wards. Direct API and URL route tests confirm that querying an unlinked student ID returns zero records and denies access.

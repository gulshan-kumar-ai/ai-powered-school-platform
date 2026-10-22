# Oakridge Collegiate Academy — Smart School Website & AI-Powered Educational Platform (Phase 4)

> **Phase 4 Deliverable**: Fully functional, secure, explainable, and practical **AI-Powered Smart School Platform**. Features an interactive **Socratic AI Study Assistant** with pedagogical hint workflows, simplified metaphor explanations, and digital library links; a **School Knowledge Assistant using Document RAG** with BM25 term retrieval, exact citation attribution, prompt injection defense, and role/class authorization; **Personalised Learning Recommendations** with diagnostic triggers, explainable rationale, and student dismissibility; an **AI-Assisted Quiz Generation Workspace** for teachers with draft validation, edit controls, and strict unpublished defaults; an **AI Cybersecurity Threat & Suspicious Message Analyzer** identifying phishing triggers, pressure tactics, and credential harvesting; **AI-Assisted Academic Insights for Teachers** with statistical vs. pedagogical separation; a **Public School Information Chatbot** with verified source citations and a strict privacy firewall; PostgreSQL schema migrations with Row-Level Security (`20261021_phase4_ai.sql`); zero-cost local deterministic fallback with optional external LLM API configuration; and **103 automated test assertions** passing with zero errors and zero lint warnings.

---

## 1. Project Overview & Architectural Evolution

This repository contains the unified web platform, school management system, and AI educational platform for **Oakridge Collegiate Academy**. Built using Next.js App Router (Turbopack, React 19), TypeScript (strict mode), Tailwind CSS v4, and a relational architecture supporting live Supabase PostgreSQL alongside a zero-config local development store fallback.

### Project Roadmap Progression
- **Phase 0 (Complete)**: Architectural foundation, design system, tokens, layout shell, and component scaffolding.
- **Phase 1 (Complete)**: Public-facing school website with dedicated pages for Homepage, About, Academics, Admissions, News, Events, and Contact.
- **Phase 2 (Complete)**:
  - Database schema migrations with 15+ relational tables, foreign key constraints, composite unique indexes (`UNIQUE(student_id, section_id, date)` and `UNIQUE(examination_id, student_id)`), and Row-Level Security (RLS) policies.
  - Role-based portals: **Administrator Operations Console**, **Teacher Workspace**, **Scholar Academic Portal**, and **Parent Oversight Portal**.
  - Secure session management, path access protection, password recovery request flow, and access-denied handling.
  - Teacher digital roll call attendance with instant duplicate check and save confirmation.
  - Examination marks entry with score boundary validation (`score <= max_marks`), draft saving, and authorized grade publication.
  - Student personal timetable, attendance ledger, published coursework assignments, and certified report cards.
  - Parent multi-child selector with custodial relationship isolation.
- **Phase 3 (Complete)**:
  - **Digital Library**: Subject/class/topic browsing, format filtering (PDF, document, video, link), title/keyword search, bookmarking, access counters, teacher resource uploads, and admin content moderation.
  - **Online Quiz Platform**: Teacher test authoring supporting Multiple-Choice, True/False, and Short-Answer questions with normalized comparisons, time limits, attempt limits, server-side grading, answer key sanitization (preventing client-side inspection before submission), and attempt limit enforcement.
  - **Educational Games**: 3 interactive games (Knowledge Challenge, Topic Mastery, CyberSafe Challenge) with responsive keyboard-accessible interfaces, real-time feedback, and backend session recording.
  - **Gamification System**: Auditable learning points ledger with duplicate prevention (`reference_id`), 7 server-evaluated scholastic badges, 5-tier level progression, and safe pseudonymized class leaderboard.
  - **Learning Progress & Analytics**: Student learning dashboard with practice analytics and explainable recommendations; Teacher class analytics scoped strictly to assigned cohorts with struggling concepts identification; Parent child learning summary with custodial data isolation.
- **Phase 4 (Complete — Current Deliverable)**:
  - **Socratic AI Study Assistant** (`/portal/student/ai-tutor`): Concept-first educational tutor supporting step-by-step problem-solving, guiding hints without spoiling worked solutions, simplified explanations with analogies, textbook citations, and digital library recommendations.
  - **School Knowledge RAG Engine**: Indexes approved documents (handbooks, AP physics lab manual, admissions prospectus) using BM25 retrieval, extracts sanitized text, applies prompt injection defense (`<document_excerpt>`), and enforces strict public vs. private document access gating.
  - **Personalised Learning Recommendations**: Diagnostic recommendations engine analyzing student quiz errors and mastery rates; recommends short lessons, practice drills, games, and advanced honors extensions; allows student dismissals and reset; never uses pejorative labeling.
  - **AI-Assisted Quiz Generation** (`/portal/teacher/quizzes/ai-generate`): Pedagogical question authoring across Multiple-Choice, True/False, and Short-Answer formats; teacher review workspace with real-time structural validation, question editing, and regeneration; **strictly saved as unpublished drafts** (`is_published: false`).
  - **AI Cybersecurity Threat Analyzer** (`/portal/student/cyber-analyzer`): Heuristic rule & scoring engine analyzing suspicious messages for urgency coercion, credential harvesting, unexpected payment demands, authority impersonation, and obfuscated URLs; outputs risk level, score (0-100), warning indicators, and safe next steps; includes synthetic demonstration presets; never resolves suspicious URLs.
  - **AI-Assisted Academic Insights for Teachers**: Evidence-based class diagnostics integrated into the Teacher Analytics Dashboard; computes topic error rates and frequently missed questions; cleanly separates measured statistics from AI instructional advice; alerts when data sample size is insufficient (< 2 attempts); avoids psychological profiling or automated grading/disciplinary actions.
  - **Public School Information Chatbot**: Floating campus guide widget on public pages; answers prospective parents and visitors on admissions, tuition, AP courses, office hours, and published policies; enforces a strict privacy firewall against queries seeking private student marks or staff credentials.
  - **Zero-Cost Local Deterministic Fallback**: All AI engines operate out of the box with zero external API dependencies or fees; optional external OpenAI (`OPENAI_API_KEY`) or Google Gemini (`GEMINI_API_KEY`) APIs can be configured seamlessly via server-side environment variables.
- **Phase 5 (Planned)**: Production deployment, CDN caching, containerization, and multi-campus federated identity.

---

## 2. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.4.2 (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x (Strict type checking, zero lint warnings)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) PostgreSQL + Row Level Security (RLS) & Local Store Fallback
- **AI & RAG Architecture**: In-memory BM25 Inverted Index, Local Socratic Engine, Heuristic Threat Scoring, and optional OpenAI/Gemini external provider hooks
- **Validation**: [Zod](https://zod.dev/) 4.x
- **Icons**: [Lucide React](https://lucide.dev/)
- **Test Runner**: [tsx](https://github.com/privatenumber/tsx) automated test execution (**103 passed assertions**)

---

## 3. Quick Start & Local Development

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Installation
```bash
# 1. Clone repository and navigate to root directory
cd Rajesh

# 2. Install all dependencies
npm install

# 3. Copy environment configuration
cp .env.example .env.local

# 4. (Optional) Configure External AI API Keys in .env.local:
# OPENAI_API_KEY=sk-...
# OPENAI_MODEL=gpt-4o-mini
# GEMINI_API_KEY=AIza...
# If omitted, the platform runs in full local zero-cost deterministic mode!

# 5. Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public school website, or [http://localhost:3000/portal](http://localhost:3000/portal) for the Management System Portal Gateway.

### Verification & Build Commands
```bash
# Run automated verification test suite (103 assertions across Phase 2, 3, and 4)
npm test

# Run ESLint validation (0 errors, 0 warnings)
npm run lint

# Run Next.js production build (compiles and prerenders all 68 routes)
npm run build
```

---

## 4. Test Credentials & Demo Accounts

For demonstration, evaluation, and development, four pre-configured accounts are active in the local store and can be accessed with one click from the Login page (`/portal/login`):

| Role | Name / Title | Institutional Email | Password | Access Clearance |
|---|---|---|---|---|
| **Administrator** | Dr. Evelyn Montgomery | `admin@oakridgeacademy.edu` | `Admin@2026!` | Full clearance: Student roster, CSV import, Faculty assignments, Academics, Digital Library moderation, Quiz governance, Leaderboard controls, Announcements, Audit logs. |
| **Teacher** | Dr. Marcus Chen | `m.chen@oakridgeacademy.edu` | `Teacher@2026!` | Instructional workspace: Assigned classes (AP Physics C), Daily roll call, Homework authoring, Exam gradebook, Digital Library upload/curation, Quiz Builder, **AI Quiz Generator**, **AI Academic Insights**. |
| **Student** | Alex Vance (Grade 10) | `student.alex@oakridgeacademy.edu` | `Student@2026!` | Scholar portal: Timetable, Attendance ledger, Published homework, Certified report cards, Digital Library, Interactive Quizzes, Educational Games, **AI Study Assistant**, **AI Cyber Threat Analyzer**, **Personalised Learning Recommendations**. |
| **Parent** | Eleanor Vance | `parent.vance@oakridgeacademy.edu` | `Parent@2026!` | Guardian oversight: Multi-child switcher, Linked ward attendance, Timetable, Published results, Assignment status, Learning & Progress overview. |

---

## 5. Portal Information Architecture & Phase 4 Routes

### Public Pages (Phases 1 & 4)
- `/`: Homepage (Hero, Announcements, Calendar, Facilities, Inquiry, **Floating Public School AI Chatbot**)
- `/about`: School history, mission, leadership, campus infrastructure
- `/academics`: Curricular framework, 4 academic divisions, AP course catalog
- `/admissions`: 5-step admissions pipeline, tuition schedule, inquiry form
- `/news` & `/news/[id]`: Campus newsroom and bulletin detail
- `/events` & `/events/[id]`: Master calendar and event agendas
- `/contact`: Campus headquarters, extension directory, interactive map

### Authenticated Portal Gateway
- `/portal`: Centralized portal gateway with active session detector and role cards
- `/portal/login`: Unified sign-in form with error handling and one-click demo credentials
- `/portal/forgot-password`: Password recovery dispatch request with security guidelines
- `/portal/unauthorized`: HTTP 403 access-denied page with role indicator and return links

### Student Portal (`/portal/student`)
- `/portal/student`: Welcome banner, GPA indicator, today's schedule, **AI Study Assistant & Cyber Threat Analyzer quick launch cards**
- `/portal/student/ai-tutor` *(New in Phase 4)*: **Socratic AI Study Assistant** with subject/class scoping, hint workflow ("💡 Request Hint"), simplified mode ("🌱 Explain More Simply"), step-by-step worked examples, approved curriculum document citations (RAG), and digital library resource link cards
- `/portal/student/cyber-analyzer` *(New in Phase 4)*: **AI Cybersecurity Threat & Phishing Analyzer** inspecting pasted messages for urgency pressure, credential harvesting, unexpected payment demands, impersonation claims, and suspicious URLs; displays threat score (0-100), highlighted warning signs, safe defense checklist, and classroom demonstration presets
- `/portal/student/library`: Browse educational resources by subject/class, keyword search, format filters (PDF, doc, video, link), bookmarking
- `/portal/student/quizzes`: Enrolled class quizzes catalog, attempt counters, difficulty badges, pass marks
- `/portal/student/games`: Game center catalog with Knowledge Challenge, Topic Mastery, and CyberSafe Challenge
- `/portal/student/progress`: Student Learning Dashboard with points total, level progression bar, 7 badges gallery, **AI Personalised Learning Recommendations with dismissibility**, safe class leaderboard, and recent activity timeline
- `/portal/student/timetable`: Weekly schedule by day, period numbers, room numbers, instructor names
- `/portal/student/attendance`: Attendance rate percentage, breakdown counts, verified date-by-date ledger
- `/portal/student/assignments`: Published homework tasks, deadlines, overdue badges
- `/portal/student/results`: Certified summative exam marks (distinguished from practice quizzes)
- `/portal/student/profile`: Student record parameters, locked academic fields

### Teacher Workspace (`/portal/teacher`)
- `/portal/teacher`: Course schedules, active homework count, pending examinations
- `/portal/teacher/quizzes`: Quizzes overview with attempt stats, difficulty tags, publish/draft toggles, and direct CTA to **Generate with AI**
- `/portal/teacher/quizzes/ai-generate` *(New in Phase 4)*: **AI-Assisted Quiz Generation Workspace** allowing teachers to specify subject, class section, topic, difficulty, format, and optional library source material; generates structured drafts; provides interactive question review, editing, and validation; **strictly saves to store as unpublished drafts** (`is_published: false`)
- `/portal/teacher/analytics`: Class-level learning analytics, quiz completion rates, average scores, **AI-Assisted Academic Insights panel** (identifying high-error topics, frequently missed questions, and revision suggestions with data-to-interpretation separation and insufficient data warnings), and library recommendations
- `/portal/teacher/attendance`: Class & date selector, roll call toggles, "Mark All Present" helper, composite duplicate check
- `/portal/teacher/assignments`: Assignment authoring (title, class, subject, deadline, max marks, draft/publish toggle)
- `/portal/teacher/examinations`: Exam scheduler, gradebook marks entry, score validation against `max_marks`, draft vs. publish separation
- `/portal/teacher/classes`: Assigned section cohorts, student rosters, room assignments

### Parent Portal (`/portal/parent`)
- `/portal/parent`: Multi-child switcher, ward academic summary, attendance rates, parent bulletins
- `/portal/parent/learning`: Child learning overview with practice quiz attempts, educational game scores, earned badges, and recommended focus areas (strictly isolated to linked children)
- `/portal/parent/attendance`: Selected child's attendance history and standing
- `/portal/parent/timetable`: Selected child's weekly schedule
- `/portal/parent/assignments`: Selected child's homework tasks and due dates
- `/portal/parent/results`: Selected child's certified exam marks and teacher comments

### Administrator Console (`/portal/admin`)
- `/portal/admin`: Executive overview (KPI cards, today's attendance summary, recent bulletins, exam schedule)
- `/portal/admin/library`: Moderation table for all school resources, content withdrawal, deletion, usage metrics
- `/portal/admin/learning`: School-wide quiz stats, educational games overview, gamification economy ledger, badge catalog, and public leaderboard active/disable controls
- `/portal/admin/students`: Student directory, ID allocation, section assignment, status switcher, CSV bulk import, dossier modal
- `/portal/admin/teachers`: Faculty directory, department appointments, class assignment modal
- `/portal/admin/academics`: Class cohorts, section capacities, course catalog, academic terms
- `/portal/admin/announcements`: School-wide communications broadcaster with priority and audience targeting
- `/portal/admin/audit-logs`: Security audit trail tracking grade publications, attendance records, and mutations

---

## 6. Database Design & Supabase Migrations

### Relational Schema Additions (Phase 4)
The Phase 4 schema is defined in [`supabase/migrations/20261021_phase4_ai.sql`](./supabase/migrations/20261021_phase4_ai.sql):

1. `ai_conversation_sessions`: Persistent session state tracking student conversations, subject scoping, and class context.
2. `ai_conversation_messages`: Multi-turn message history with role (`user`, `assistant`, `system`), citations JSON, and follow-up suggestions.
3. `document_chunks`: Inverted document index storing chunk text, document titles, section titles, token counts, and `is_public` authorization flags.
4. `ai_quiz_drafts`: Staging table for teacher quiz drafts containing question JSON, status (`draft`, `reviewed`, `approved`, `rejected`), and review timestamps.
5. `student_ai_recommendations`: Personalised recommendation tracking with recommendation type, target URL, educational rationale, and `is_dismissed` status.
6. `cyber_analysis_logs`: Auditable logs of inspected suspicious messages storing risk scores (0-100), risk tiers, detected indicators, and analysis timestamps.

### Row-Level Security (RLS) Policies (Phase 4)
- **Student Conversation Privacy**: Students can select, insert, and update only their own conversation sessions (`auth.uid() = student_id`).
- **Teacher Quiz Draft Security**: Teachers can access and review drafts they created or that belong to their assigned subjects.
- **Document Chunk Authorization**: Public chunks (`is_public = true`) are readable by all roles including anonymous visitors; private chunks require authenticated student or teacher status.
- **Recommendation Dismissal Isolation**: Students can view and dismiss only their own recommendations.

### Connecting Live Supabase Database
1. Open SQL Editor in your Supabase project dashboard.
2. Execute [`supabase/migrations/20261021_init_schema.sql`](./supabase/migrations/20261021_init_schema.sql).
3. Execute [`supabase/migrations/20261021_phase3_learning.sql`](./supabase/migrations/20261021_phase3_learning.sql).
4. Execute [`supabase/migrations/20261021_phase4_ai.sql`](./supabase/migrations/20261021_phase4_ai.sql).
5. Execute [`supabase/seed.sql`](./supabase/seed.sql) to populate demonstration records.
6. Set environment variables in `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

---

## 7. Security Controls, Ethical Guardrails & Data Privacy Design

1. **Answer Key Protection**: Student queries to `getQuizById(id, false)` sanitize questions on the server, completely stripping `correct_option_index`, `accepted_answers`, and `explanation` so answer keys cannot be inspected prior to grading.
2. **Server-Side Scoring & Attempt Limits**: Scores and pass determinations are evaluated exclusively on the server. Submissions exceeding `max_attempts` are blocked.
3. **Prompt Injection Defense**: All user queries and retrieved document excerpts are processed through `sanitizePromptInput()` before being included in prompt context. Untrusted document chunks are strictly encapsulated in `<document_excerpt>` delimiters and system override commands are sanitized.
4. **Strict Public vs. Private Firewall**: The public school chatbot operates strictly with `isPublicOnly: true`. Queries seeking student marks, grades, teacher credentials, or private internal documents are rejected by the privacy firewall and redirected to the authenticated Portal Sign In.
5. **No Automatic Quiz Publication**: AI-generated quiz questions are **never published automatically**. They are saved with `is_published: false` and require explicit instructor review, validation, and manual publication.
6. **Separation of Measured Statistics and AI Advice**: Teacher academic insights explicitly separate measured statistics (e.g., "7 of 15 attempts scored below 70%") from AI pedagogical suggestions. Insufficient data notices are displayed whenever sample sizes are too small (< 2 attempts) to prevent false correlations.
7. **Ethical Non-Judgmental Guidance**: Personalised learning recommendations and academic insights strictly avoid pejorative labels (e.g., unintelligent, lazy) and never make automated consequential academic decisions (grading, discipline, or tracking).
8. **Suspicious Message Safety**: The cybersecurity analyzer never resolves, visits, or executes external URLs found in inspected messages. Messages are analyzed strictly in an isolated sandbox.
9. **Zero-Cost Local Autonomy**: All AI functionality functions completely offline without requiring paid external APIs. If external LLM API keys (`OPENAI_API_KEY` or `GEMINI_API_KEY`) are configured, they remain strictly server-side and are never exposed to client-side code.

---

## 8. Automated Verification Suite (103 Passed Tests)

The repository includes a comprehensive automated verification suite with 103 assertions across all phases:

```
============================================================
  PHASE 2 AUTOMATED AUTHORISATION & DATA ISOLATION SUITE
  38 PASSED, 0 FAILED
============================================================
  ✔ Authentication & credential validation (admin, teacher, student, parent)
  ✔ Role-based route protection & redirect mapping
  ✔ Attendance duplicate prevention & in-place update
  ✔ Marks score boundary validation (score <= max_marks)
  ✔ Draft vs. published marks privacy isolation
  ✔ Parent custodial data isolation (single-child access)
  ✔ Assignment publication visibility filtering
  ✔ Administrative audit trail integrity

============================================================
  PHASE 3 AUTOMATED LEARNING & GAMIFICATION SUITE
  37 PASSED, 0 FAILED
============================================================
  ✔ Digital Library search, subject filtering, format filtering, bookmarking
  ✔ Answer key sanitization (preventing client-side inspection)
  ✔ Server-side quiz scoring for MC, TF, and Short Answer
  ✔ Attempt limit enforcement on server
  ✔ Educational games session logging and accuracy calculation
  ✔ Points economy duplicate claim prevention (idempotency via reference_id)
  ✔ 7 scholastic badges criteria evaluation
  ✔ Teacher class analytics scoping to assigned cohorts
  ✔ Parent child learning summary custodial isolation

============================================================
  PHASE 4 AUTOMATED AI PLATFORM VERIFICATION SUITE
  28 PASSED, 0 FAILED
============================================================
  ✔ RAG Engine document retrieval and exact citation attribution
  ✔ Prompt injection defense and input sanitization
  ✔ Public vs. private knowledge firewall
  ✔ Socratic AI Study Assistant response generation & follow-ups
  ✔ Study Assistant hint mode (conceptual guidance without answer reveal)
  ✔ Study Assistant simplified mode (intuitive analogies & metaphors)
  ✔ AI Quiz Generator draft generation & structural validation
  ✔ AI Quiz Generator unpublished draft guardrail (is_published: false)
  ✔ AI Cybersecurity Threat Analyzer (urgency, credential harvesting detection)
  ✔ Cybersecurity low-concern rating for legitimate announcements
  ✔ Personalised learning recommendations generation & transparent rationale
  ✔ Student recommendation dismissal and restoration
  ✔ AI-Assisted Academic Insights for teachers (data vs. advice separation)
  ✔ Data sufficiency evaluation for cohort diagnostics
  ✔ Public chatbot admissions answering with verified citations
  ✔ Privacy firewall rejection of confidential student record queries
============================================================
  TOTAL TEST SUITE: 103 PASSED, 0 FAILED
============================================================
```

---

&copy; 2026 Oakridge Collegiate Academy. All rights reserved.

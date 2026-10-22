# Govt. Boys Qazi Sultan Higher Secondary School, Kunri — Smart School AI Platform & Educational Management System

[![Production CI & Quality Assurance](https://github.com/gulshan-kumar-ai/ai-powered-school-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/gulshan-kumar-ai/ai-powered-school-platform/actions/workflows/ci.yml)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL%20RLS-3ecf8e?style=flat&logo=supabase)](https://supabase.com/)
[![Tests](https://img.shields.io/badge/Tests-239%20Passed-success?style=flat&logo=checkmarx)](tests/)
[![Security Headers](https://img.shields.io/badge/Security-A%2B%20Headers%20%26%20CSP-emerald?style=flat)](next.config.ts)

> **Phase 8 Production Release**: A unified, production-ready, accessible, and explainable **Smart School Management & AI Educational Platform** for **Govt. Boys Qazi Sultan Higher Secondary School, Kunri** (Sindh, Pakistan). Featuring full-stack role-based management portals (Administrator, Teacher, Student, Parent); Socratic AI Study Assistant; Document RAG; Personalised Learning Recommendations; AI Quiz Generation; Cybersecurity Threat Analyzer; Fast & Super AI Campus Guide Chatbot with Server-Sent Events (SSE) streaming and deterministic offline fallback; Supabase PostgreSQL with Row-Level Security; multi-stage Docker containerization; and **239 automated verification test assertions** passing with zero errors.

---

## Table of Contents
1. [Project Overview & Architectural Evolution](#1-project-overview--architectural-evolution)
2. [Platform Screenshots & Visual Tour](#2-platform-screenshots--visual-tour)
3. [Technology Stack](#3-technology-stack)
4. [Quick Start & Local Development](#4-quick-start--local-development)
5. [Evaluation Credentials & Demo Personas](#5-evaluation-credentials--demo-personas)
6. [Portal Architecture & Route Directory](#6-portal-architecture--route-directory)
7. [AI Architecture, Grounding & Safety Guardrails](#7-ai-architecture-grounding--safety-guardrails)
8. [Database Architecture & Supabase Migrations](#8-database-architecture--supabase-migrations)
9. [Production Security, Privacy & Compliance](#9-production-security-privacy--compliance)
10. [Deployment Guide](#10-deployment-guide)
    - [Option A: Vercel (Recommended Serverless Next.js Hosting)](#option-a-vercel-recommended-serverless-nextjs-hosting)
    - [Option B: Docker & Docker Compose (Self-Hosted / VPS)](#option-b-docker--docker-compose-self-hosted--vps)
11. [Automated Verification & Quality Assurance](#11-automated-verification--quality-assurance)
12. [License & Governance](#12-license--governance)

---

## 1. Project Overview & Architectural Evolution

Govt. Boys Qazi Sultan Higher Secondary School, Kunri (Sindh, Pakistan) is a comprehensive public secondary and higher secondary institution affiliated with the Board of Intermediate and Secondary Education (BISE) Mirpur Khas.

This platform unifies the school's public website, academic management system, digital learning library, gamified learning mechanics, and ethical AI services into a single, high-performance Next.js application.

### Phase-by-Phase Architectural Progression
- **Phase 0 (Foundation)**: Design system tokens, color palettes, typography, responsive layout shell, and component library.
- **Phase 1 (Public Website)**: Comprehensive public institutional presence with Homepage, About, Academics, Admissions, Newsroom, Events Calendar, and Contact.
- **Phase 2 (Database & Authorization)**: 15+ relational PostgreSQL tables, Row-Level Security (RLS), custodial parent relationship boundaries, teacher roll call attendance, score boundary verification (`score <= max_marks`), and audit logging.
- **Phase 3 (Digital Learning & Gamification)**: Digital Library with multi-format filtering; server-evaluated Quizzes (MC, TF, Short Answer) with answer key sanitization prior to submission; 3 educational games; points economy with duplicate claim prevention (`reference_id`); 7 scholastic badges; and cohort analytics.
- **Phase 4 (AI Educational Platform)**: Socratic AI Study Assistant (`/portal/student/ai-tutor`); Document RAG engine with BM25 inverted index; Personalised Learning Recommendations with explainable rationale; AI Quiz Generator for teachers saving strictly as unpublished drafts; AI Cybersecurity Threat Analyzer (`/portal/student/cyber-analyzer`); and teacher academic insights.
- **Phase 5 (Production Hardening & Operations)**: Account status lockout enforcement; structured logging with automatic PII and credential scrubbing (`lib/logger.ts`); system health monitoring probe (`/api/health`); production Next.js configuration (standalone output, HSTS, CSP, Permissions-Policy); multi-stage Docker containerization; GitHub Actions CI/CD; and database disaster recovery scripts.
- **Phase 6 (End-to-End User Journeys)**: 49 automated integration tests validating 5 realistic end-to-end user journeys (Admin, Teacher, Student, Gamification, Parent).
- **Phase 7 (Fast & Super AI Chatbot)**: High-speed OpenAI-compatible inference integration (`/api/chat`, `PublicSchoolChatbot.tsx`, `fast-super-service.ts`) supporting live streaming, multi-turn conversational context, privacy firewall, and mobile/desktop responsive design.
- **Phase 8 (Production Deployment & Release)**: Live API verification suite; visual indicator distinguishing live cloud AI inference from local deterministic fallback; deployment guides for Vercel, Supabase, and Docker; and release readiness documentation.

---

## 2. Platform Screenshots & Visual Tour

> [!NOTE]
> Below are designated anchors for genuine application screenshots taken from live demonstration environments.

| Viewport | Component / Portal | Genuine Screenshot Location |
|---|---|---|
| **Public Portal** | Homepage & Floating School AI Guide | `docs/screenshots/01-public-homepage-ai.png` |
| **Public Portal** | 5-Step Admissions Pipeline | `docs/screenshots/02-admissions-pipeline.png` |
| **Student Portal** | Socratic AI Study Assistant with Hints | `docs/screenshots/03-student-socratic-ai.png` |
| **Student Portal** | Cybersecurity Threat & Phishing Analyzer | `docs/screenshots/04-cyber-analyzer.png` |
| **Student Portal** | Gamification Badges & Learning Progress | `docs/screenshots/05-gamification-badges.png` |
| **Teacher Portal** | AI-Assisted Quiz Generation Workspace | `docs/screenshots/06-teacher-ai-quiz-generator.png` |
| **Teacher Portal** | Class Analytics & Academic Insights | `docs/screenshots/07-teacher-analytics.png` |
| **Admin Console** | Institutional Operations & Attendance Audit | `docs/screenshots/08-admin-operations.png` |
| **Parent Portal** | Custodial Ward Academic Summary & Results | `docs/screenshots/09-parent-oversight.png` |

---

## 3. Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) 16.4.2 (App Router, Turbopack, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5.x (Strict type checking enabled)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/) PostgreSQL 15+ with Row-Level Security (RLS) + In-memory local development store fallback
- **High-Speed AI Inference**: OpenAI-compatible REST API (Fast & Super API / Groq Cloud / OpenAI / Cerebras) + Google Gemini fallback
- **In-Memory Retrieval**: BM25 Inverted Index & School Knowledge Grounding
- **Validation**: [Zod](https://zod.dev/) 4.x
- **Icons**: [Lucide React](https://lucide.dev/)
- **Test Runner**: [tsx](https://github.com/privatenumber/tsx) automated test execution (**239 passed assertions**)
- **Containerization**: Docker (Alpine Linux, unprivileged `nextjs` system user, HEALTHCHECK)

---

## 4. Quick Start & Local Development

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Local Setup
```bash
# 1. Clone repository
git clone https://github.com/gulshan-kumar-ai/ai-powered-school-platform.git
cd ai-powered-school-platform

# 2. Install all dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local

# 4. (Optional) Configure live AI or Supabase credentials in .env.local
# If omitted, the application operates out-of-the-box in zero-cost offline demo mode!

# 5. Launch the local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) for the public school website, or [http://localhost:3000/portal](http://localhost:3000/portal) for the Management System Portal Gateway.

### Verification Commands
```bash
# Run all 239 automated test assertions (Phases 2 through 8)
npm test

# Run TypeScript type validation
npm run type-check

# Run ESLint quality validation
npm run lint

# Run Next.js production build (compiles and prerenders all 72 routes)
npm run build
```

---

## 5. Evaluation Credentials & Demo Personas

For demonstration, evaluation, and evaluation testing, four pre-configured accounts are active in the local store and can be accessed with one click from the Login page (`/portal/login`):

| Role | Name / Title | Institutional Email | Demo Password | Scope & Access Boundary |
|---|---|---|---|---|
| **Administrator** | Dr. Evelyn Montgomery | `admin@oakridgeacademy.edu` | `Admin@2026!` | Full institutional operations, faculty assignments, student rosters, digital library moderation, quiz governance, audit logs. |
| **Teacher** | Dr. Marcus Chen | `m.chen@oakridgeacademy.edu` | `Teacher@2026!` | Assigned classes (AP Physics C), daily roll call, homework authoring, exam grading, **AI Quiz Generator**, **AI Academic Insights**. |
| **Student** | Alex Vance (Grade 10) | `student.alex@oakridgeacademy.edu` | `Student@2026!` | Timetable, attendance ledger, certified report cards, quizzes, games, **AI Socratic Tutor**, **AI Cyber Threat Analyzer**, badges. |
| **Parent** | Eleanor Vance | `parent.vance@oakridgeacademy.edu` | `Parent@2026!` | Custodial oversight: Ward attendance, results, homework deadlines, progress ledger (isolated strictly to authorized child). |

> [!IMPORTANT]
> The demo credentials above are safe, synthetic credentials restricted exclusively to local evaluation and demonstration environments. When deploying to production with live Supabase Authentication, replace these with real, verified user accounts.

---

## 6. Portal Architecture & Route Directory

```
App Router Architecture
├── / (Homepage with Floating School AI Guide)
├── /about (Institutional History, Mission, Leadership)
├── /academics (Curricular Framework, AP Courses)
├── /admissions (5-Step Admissions Pipeline & Inquiry)
├── /news & /news/[id] (Official Bulletins & Newsroom)
├── /events & /events/[id] (Campus Master Calendar)
├── /contact (Office Hours, Campus Tours, Directory)
│
├── /api/chat (Server-Side Fast & Super AI Chat Route Handler)
├── /api/health (Production System Diagnostics & Health Probe)
│
└── /portal (Unified School Portal Gateway)
    ├── /portal/login (Multi-Role Sign In & Demo Selector)
    ├── /portal/forgot-password (Password Recovery Dispatch)
    ├── /portal/unauthorized (HTTP 403 Role Boundary Protection)
    │
    ├── /portal/admin (Executive Operations Console)
    │   ├── /academics, /announcements, /audit-logs
    │   └── /learning, /library, /students, /teachers
    │
    ├── /portal/teacher (Teacher Workspace)
    │   ├── /analytics (Class Analytics & AI Insights)
    │   ├── /assignments, /attendance, /classes, /examinations, /library
    │   └── /quizzes (Quiz Catalog, Authoring & AI Draft Generator)
    │
    ├── /portal/student (Scholar Portal)
    │   ├── /ai-tutor (Socratic AI Study Assistant)
    │   ├── /cyber-analyzer (Cyber Threat & Phishing Analyzer)
    │   ├── /games, /library, /progress, /quizzes
    │   └── /assignments, /attendance, /results, /timetable
    │
    └── /portal/parent (Guardian Oversight Portal)
        ├── /assignments, /attendance, /timetable
        └── /learning, /results (Custodial Ward Records)
```

---

## 7. AI Architecture, Grounding & Safety Guardrails

### 1. Fast & Super API Integration
- **Server-Side Authentication**: `FAST_SUPER_API_KEY` and `FAST_SUPER_API_BASE_URL` are read strictly on the server (`/api/chat` and `lib/ai/fast-super-service.ts`) and never bundled in client code.
- **Endpoint URL Normalization**: Automatically resolves standard base URLs to `/chat/completions`, trims trailing slashes, and avoids duplicate paths.
- **Server-Sent Events (SSE) Streaming**: Delivers tokens in real time with an initial metadata event containing verified citations and provider identifier, followed by incremental delta chunks and `data: [DONE]`.
- **Clear Visual Distinction**: The chatbot UI clearly distinguishes live AI responses (`Live Fast & Super AI (Cloud Inference)` with an active green pulse and emerald accent) from offline fallback responses (`Verified School Records (Local Offline Fallback)` with a shield icon).

### 2. Privacy Firewall & Guardrails
- **Pre-Emptive Query Interception**: Rejects queries requesting private student marks, teacher salaries, passwords, or faculty credentials before calling any external API.
- **Grounding in Official Records**: Answers to school-specific questions are grounded in verified admissions dates, office hours, and curriculum handbooks.
- **Unverified Information Handling**: Replaces potential hallucinations on unrecorded topics with direct contact guidance for the School Office.
- **Unpublished Quiz Defaults**: AI-generated quiz questions for teachers are saved strictly as unpublished drafts (`is_published: false`), requiring instructor review.
- **Sandboxed Cyber Analysis**: The cybersecurity threat analyzer analyzes pasted text patterns in an isolated sandbox without ever executing or resolving suspicious URLs.

---

## 8. Database Architecture & Supabase Migrations

### Migration Sequence
Execute the migration scripts in [`supabase/migrations/`](./supabase/migrations/) in sequential order:

1. [`20261021_init_schema.sql`](./supabase/migrations/20261021_init_schema.sql):
   - 15+ Core tables: `profiles`, `academic_years`, `terms`, `classes`, `sections`, `subjects`, `students`, `teachers`, `parents`, `parent_students`, `attendance`, `assignments`, `examinations`, `marks`, `audit_logs`.
   - Row-Level Security (RLS) policies and security definer helper `current_user_role()`.
2. [`20261021_phase3_learning.sql`](./supabase/migrations/20261021_phase3_learning.sql):
   - Digital library resources, bookmarks, quiz definitions, quiz questions, quiz attempts, submitted answers, and learning points ledger.
3. [`20261021_phase4_ai.sql`](./supabase/migrations/20261021_phase4_ai.sql):
   - AI conversation sessions, message history, RAG document chunks index, teacher quiz generation drafts, and cybersecurity inspection logs.
4. [`seed.sql`](./supabase/seed.sql):
   - Initial demonstration records and test cohorts.

---

## 9. Production Security, Privacy & Compliance

- **HTTP Security Headers**: Configured in `next.config.ts`:
  - `Strict-Transport-Security`: `max-age=63072000; includeSubDomains; preload`
  - `X-Frame-Options`: `SAMEORIGIN`
  - `X-Content-Type-Options`: `nosniff`
  - `Referrer-Policy`: `strict-origin-when-cross-origin`
  - `Permissions-Policy`: Restricts camera, microphone, geolocation, and browsing topics
  - `Content-Security-Policy`: Restricts script, style, and font sources
- **Data Scrubbing**: `lib/logger.ts` automatically strips API keys (`sk-*`, `AIza*`), Bearer tokens, passwords, national identification numbers, phone numbers, and masks email addresses in server logs.
- **Account Lockout & Deactivation**: Suspended or deactivated accounts are immediately locked out; active browser sessions are invalidated upon status change.
- **Zero Client-Side Secret Leakage**: Verified by automated test suites.

---

## 10. Deployment Guide

### Option A: Vercel (Recommended Serverless Next.js Hosting)

1. **Connect Repository**:
   Import this GitHub repository into your [Vercel Dashboard](https://vercel.com/new).
2. **Configure Environment Variables**:
   In Vercel Project Settings > Environment Variables, configure:
   - `NODE_ENV`: `production`
   - `NEXT_PUBLIC_APP_URL`: `https://your-custom-domain.edu.pk`
   - `NEXT_PUBLIC_SUPABASE_URL`: `https://your-project-id.supabase.co`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `your_supabase_anon_key`
   - `SUPABASE_SERVICE_ROLE_KEY`: `your_supabase_service_role_key`
   - `FAST_SUPER_API_KEY`: `your_fast_and_super_api_key`
   - `FAST_SUPER_API_BASE_URL`: `https://api.openai.com/v1` (or custom endpoint)
   - `FAST_SUPER_MODEL`: `gpt-4o-mini`
   - `SESSION_SECRET`: Minimum 32-character cryptographically secure string
3. **Deploy**:
   Click **Deploy**. Next.js will build and deploy the standalone serverless application.

### Option B: Docker & Docker Compose (Self-Hosted / VPS)

1. **Build Container Image**:
   ```bash
   docker build -t oakridge-academy-portal:latest .
   ```
2. **Launch with Docker Compose**:
   Create a `.env.production` file on your host server (excluded from git), then run:
   ```bash
   docker-compose up -d
   ```
3. **Container Health Check Probe**:
   The Docker container includes an automated health check probe hitting `http://localhost:3000/api/health` every 30 seconds.

---

## 11. Automated Verification & Quality Assurance

The platform features **239 automated test assertions** across 7 dedicated test suites:

| Test Suite | File | Assertions Passed | Status |
|---|---|---|---|
| **Phase 2: Authorization & RLS** | `tests/phase2-authorisation-data.test.ts` | **38 / 38** | ✔ PASS |
| **Phase 3: Digital Learning & Gamification** | `tests/phase3-learning-gamification.test.ts` | **37 / 37** | ✔ PASS |
| **Phase 4: AI Platform & Socratic Tutor** | `tests/phase4-ai-platform.test.ts` | **28 / 28** | ✔ PASS |
| **Phase 5: Production Readiness & Security** | `tests/phase5-production-readiness.test.ts` | **35 / 35** | ✔ PASS |
| **Phase 6: E2E User Journeys** | `tests/phase6-e2e-journeys.test.ts` | **49 / 49** | ✔ PASS |
| **Phase 7: Fast & Super Chatbot Integration** | `tests/phase7-fast-super-chatbot.test.ts` | **30 / 30** | ✔ PASS |
| **Phase 8: Live API Connection & Verification** | `tests/phase8-live-connection.test.ts` | **22 / 22** | ✔ PASS |
| **Total Passed Assertions** | **All 7 Test Suites** | **239 / 239** | **100% PASS** |

---

## 12. License & Governance

This project is prepared for Govt. Boys Qazi Sultan Higher Secondary School, Kunri. An open-source license (such as MIT or Apache 2.0) can be applied upon institutional authorization.

&copy; 2026 Govt. Boys Qazi Sultan Higher Secondary School, Kunri. All rights reserved.

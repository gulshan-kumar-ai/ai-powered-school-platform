# Architecture Diagram & System Topography

**Document Reference:** `docs/competition/ARCHITECTURE_DIAGRAM.md`  
**Classification:** Competition Jury Technical Presentation Asset  
**Institution:** Oakridge Collegiate Academy  

---

## 1. High-Level Enterprise Topography

```mermaid
graph TD
    subgraph ClientTier["Client Tier (Browsers & Mobile Web)"]
        VisitorDevice["Public Visitor"]
        AdminDevice["Administrator Workstation"]
        TeacherDevice["Faculty Laptop / Tablet"]
        StudentDevice["Student Chromebook / Mobile"]
        ParentDevice["Custodial Parent Smartphone"]
    end

    subgraph EdgeTier["Edge Network & Security Perimeter"]
        CDN["Vercel Edge / Cloudflare CDN"]
        SecHeaders["HTTP Security Headers (CSP, HSTS, X-Frame-Options)"]
        WAF["Rate Limiter & Bot Protection"]
    end

    subgraph AppTier["Next.js 16 App Router (Node.js 20 Standalone)"]
        AuthMiddleware["RBAC Route Guard & Session Verifier"]
        PublicApp["Public Website Pages (SSR / Static Pre-rendered)"]
        AdminPortal["Admin Dashboard (/portal/admin)"]
        TeacherPortal["Teacher Workspace (/portal/teacher)"]
        StudentPortal["Student Learning Hub (/portal/student)"]
        ParentPortal["Parent Custodial Portal (/portal/parent)"]
        HealthEndpoint["/api/health Diagnostic Probe"]
    end

    subgraph ServiceTier["Core Business & Intelligence Services"]
        AuthService["Auth & Session Manager (lib/auth/session.ts)"]
        SchoolDataStore["SchoolStore Repository (lib/data/school-store.ts)"]
        PIILogger["Sanitizing Structured Logger (lib/logger.ts)"]
        RAGEngine["RAG Vector Matcher (lib/ai/rag-engine.ts)"]
        StudyTutor["Socratic AI Assistant (lib/ai/study-assistant.ts)"]
        QuizStudio["AI Quiz Generator (lib/ai/quiz-generator.ts)"]
        CyberAnalyzer["CyberSafe Threat Analyzer (lib/ai/cyber-analyzer.ts)"]
    end

    subgraph PersistenceTier["Hybrid Storage & Data Integrity"]
        SupabaseDB["Supabase PostgreSQL 15 (RLS Enforced)"]
        AuditLogs["Immutable Audit Log Ledger"]
        PointsLedger["Append-Only Gamification Ledger"]
        InMemoryStore["In-Memory Reproducible Fallback Store"]
    end

    subgraph ExternalServices["External Cloud Intelligence (Optional)"]
        GeminiAPI["Google Gemini 1.5 Pro REST API"]
        OpenAIAPI["OpenAI GPT-4o REST API"]
    end

    %% Connections
    VisitorDevice --> CDN
    AdminDevice --> CDN
    TeacherDevice --> CDN
    StudentDevice --> CDN
    ParentDevice --> CDN

    CDN --> SecHeaders --> WAF --> AuthMiddleware

    AuthMiddleware --> PublicApp
    AuthMiddleware --> AdminPortal
    AuthMiddleware --> TeacherPortal
    AuthMiddleware --> StudentPortal
    AuthMiddleware --> ParentPortal
    AuthMiddleware --> HealthEndpoint

    AdminPortal --> AuthService
    AdminPortal --> SchoolDataStore
    TeacherPortal --> SchoolDataStore
    TeacherPortal --> QuizStudio
    StudentPortal --> SchoolDataStore
    StudentPortal --> StudyTutor
    StudentPortal --> CyberAnalyzer
    ParentPortal --> SchoolDataStore

    AuthService --> PIILogger
    SchoolDataStore --> PIILogger
    SchoolDataStore --> PointsLedger
    SchoolDataStore --> AuditLogs
    SchoolDataStore --> SupabaseDB
    SchoolDataStore -.->|Offline Mode| InMemoryStore

    StudyTutor --> RAGEngine
    StudyTutor -.->|Cloud Active| GeminiAPI
    StudyTutor -.->|Cloud Active| OpenAIAPI
    StudyTutor --> InMemoryStore
    QuizStudio -.->|Cloud Active| GeminiAPI
```

---

## 2. End-to-End Component Flow Diagrams

### Journey A: Administrator Academic Setup & Account Deactivation
```mermaid
sequenceDiagram
    autonumber
    actor Admin as Administrator
    participant Portal as /portal/admin
    participant Store as SchoolDataStore
    participant Logger as PIILogger
    participant DB as PostgreSQL / Audit

    Admin->>Portal: Create Class Cohort (Grade 11 Honors)
    Portal->>Store: createClass(name, grade_level)
    Store->>DB: INSERT INTO school_classes
    Store->>Logger: logAudit(CREATE_CLASS, { grade_level: 11 })
    Logger->>DB: INSERT INTO audit_logs (sanitized)

    Admin->>Portal: Assign Teacher Dr. Chen to Section 11-A
    Portal->>Store: assignTeacherToSection(teacherId, sectionId, subjectId)
    Store->>DB: INSERT INTO teacher_assignments

    Admin->>Portal: Suspend Compromised Account
    Portal->>Store: updateAccountStatus(studentId, "suspended")
    Store->>DB: UPDATE profiles SET status = 'suspended'
    Note over Store,DB: Instant cascade: active session tokens invalidated!
```

### Journey B & C: Assessment Security & Anti-Fraud Points
```mermaid
sequenceDiagram
    autonumber
    actor Student as Student (Alex Vance)
    participant UI as /portal/student/quizzes
    participant Store as SchoolDataStore
    participant Ledger as PointsLedger

    Student->>UI: Request Quiz Questions
    UI->>Store: getQuizById(quizId, includeAnswers=false)
    Note over Store,UI: CRITICAL: Answers & explanations stripped from payload!
    Store-->>UI: Sanitized Questions (text, options, points)

    Student->>UI: Submit Answers [{qId, selectedOption}]
    UI->>Store: submitQuizAttempt(answers)
    Store->>Store: Compare with internal answer key (Server-Side)
    Store->>Store: Compute Score: 30/30 (100% Passed)
    Store->>Ledger: awardLearningPoints(referenceId = attempt.id, points = 50)
    Store->>Ledger: awardLearningPoints(referenceId = "perfect_" + attempt.id, points = 50)
    Store->>Store: unlockBadge(studentId, "perfect_score")

    Note over Student,Store: Anti-Fraud Attempt: Replay submission
    Student->>Store: awardLearningPoints(referenceId = attempt.id)
    Store->>Store: Check existing referenceId in ledger
    Store-->>Student: Return existing entry (Duplicate Blocked, Balance Unchanged!)
```

### Journey D: Socratic RAG AI Tutoring
```mermaid
sequenceDiagram
    autonumber
    actor Student as Student
    participant Tutor as Socratic Assistant
    participant RAG as RAG Vector Engine
    participant LLM as Google Gemini / OpenAI (Optional)

    Student->>Tutor: "Why does an ice skater spin faster when arms pull in?"
    Tutor->>RAG: searchSchoolKnowledge("ice skater angular momentum", subject="Physics")
    RAG-->>Tutor: Top curriculum chunks + citations (Rotational Mechanics Ch. 8)
    
    alt Cloud AI Configured
        Tutor->>LLM: Prompt with Socratic system prompt + RAG context
        LLM-->>Tutor: Pedagogical step-by-step guidance
        Tutor-->>Student: Socratic response + [Engine: CLOUD_LIVE] + Citations
    else Offline / No API Key
        Tutor->>Tutor: Synthesize verified Socratic response from RAG excerpts
        Tutor-->>Student: Socratic response + [Engine: OFFLINE_RAG_VERIFIED] + Citations
    end
```

### Journey E: Custodial Parent Privacy Isolation
```mermaid
sequenceDiagram
    autonumber
    actor Parent as Parent (Eleanor Vance)
    participant Portal as /portal/parent
    participant Store as SchoolDataStore

    Parent->>Portal: Log in as Eleanor Vance (ID: 3000...001)
    Portal->>Store: getParentLinkedChildren(parentId)
    Store-->>Portal: Authorized Ward: [Alex Vance (STU-2026-001)]
    Portal-->>Parent: Render Alex's attendance & marks

    Note over Parent,Store: Unsanctioned probe: Access unrelated student ID (9999...999)
    Parent->>Store: getParentLinkedChildren(strangerParentId)
    Store-->>Parent: Empty Array [] (Access Denied — FERPA Protected!)
```

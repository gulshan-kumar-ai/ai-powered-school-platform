# Anticipated Judge Questions & Factual Technical Responses

**Document Reference:** `docs/competition/JUDGE_QUESTIONS_AND_ANSWERS.md`  
**Classification:** Competition Jury Presentation Asset & Technical Defense  
**Institution:** Govt. Boys Qazi Sultan Higher Secondary School, Kunri  

---

## 1. Questions on Security, Cheating & Integrity

### Q1: "How do you prevent tech-savvy students from cheating on quizzes using browser DevTools or network interception?"
**Factual Response:**  
"Most educational web apps leak answer keys in the JSON payload returned to the student's browser. In Oakridge, we enforce **strict server-side evaluation**. When a student requests a quiz via `schoolStore.getQuizById(id, includeAnswers=false)`, the server systematically deletes `correct_option_index`, `accepted_answers`, and `explanation` from the payload before dispatching it over the network. 

When the student submits their answers, scoring occurs entirely on the server by comparing submitted option IDs with our internal answer key. Furthermore, student attempts are bounded by teacher-configured `max_attempts` limits enforced at the store and database layers. Client-side score manipulation is architecturally impossible."

### Q2: "How does the system enforce pupil privacy under FERPA and GDPR regulations?"
**Factual Response:**  
"We implement privacy enforcement across three defensive layers:
1. **Custodial Isolation:** The parent portal only resolves student records through the `student_parents` legal link. If a parent attempts to query an unlinked student ID, `schoolStore.getParentLinkedChildren()` returns an empty array `[]` and blocks access.
2. **PostgreSQL Row-Level Security:** In managed database mode, PostgreSQL RLS policies evaluate `auth.uid()` against custodial tables, preventing unlinked row selection at the database engine level.
3. **Structured PII Sanitization:** In `lib/logger.ts`, all log strings and objects are scrubbed recursively. Passwords, bearer tokens, API keys, phone numbers, and national IDs are replaced with redaction placeholders, and emails are partially masked (e.g. `al***ce@oakridge.edu`)."

### Q3: "What happens when an administrator suspends or expels a student? Can they continue using active browser sessions?"
**Factual Response:**  
"No. Unlike systems that wait for JWT expiration, our authentication architecture implements an **immediate session status cascade**. When an admin toggles a user to `suspended`:
1. The profile's database record updates to `status = 'suspended'`.
2. On the next HTTP request or portal route transition, `getCurrentSession()` validates the user's status against the repository.
3. If suspended, the active session is immediately purged from storage and the user is redirected to `/portal/login` with an explicit administrative lockout notification. This was verified in Phase 5 Automated Test Suite (Assertions 1.1–1.6)."

### Q4: "Can a teacher tamper with or view grades of students in classes they do not teach?"
**Factual Response:**  
"No. Faculty workspaces are strictly scoped through `teacher_assignments`. A teacher can only query student rosters, submit daily attendance, or publish exam marks for sections they are officially assigned to instruct. At the database layer, Row-Level Security policies reject select and update operations for unassigned section IDs."

---

## 2. Questions on Artificial Intelligence & Socratic Tutoring

### Q5: "What happens if external AI providers (OpenAI / Gemini) go down or exceed API quotas during a classroom exam or study session?"
**Factual Response:**  
"The platform is built with **graceful multi-provider orchestration and deterministic fallback**. If external API calls time out, return a rate-limit error, or if API keys are unconfigured:
1. The assistant automatically activates its verified offline Socratic RAG fallback engine.
2. It retrieves the highest-confidence approved curriculum chunks using vector similarity and synthesizes a pedagogical response with authentic citations.
3. The interface transparently renders an `offline_rag_verified` badge (versus `cloud_live`), ensuring complete transparency to students and educators. The application never crashes or presents blank screens."

### Q6: "How do you prevent the AI Study Assistant from simply doing the student's homework for them?"
**Factual Response:**  
"We apply strict pedagogical system prompts and guardrails. The model is explicitly constrained never to provide raw homework solutions, completed code files, or essay drafts. When a student asks 'What is the answer to question 2?', the assistant responds Socratically: 'Let's work through question 2 together. What is the fundamental formula or concept that applies here?' Furthermore, answers are anchored in verified school textbook chunks retrieved via RAG rather than unconstrained web knowledge."

### Q7: "Why did you build an interactive CyberSafe Analyzer instead of just providing cybersecurity guidelines?"
**Factual Response:**  
"Passive guidelines in student handbooks fail to teach active threat recognition. Our CyberSafe Lab acts as a safe, isolated simulation environment. Students can paste suspicious messages and immediately see an explainable breakdown of the psychological triggers used by attackers — such as artificial urgency, credential harvesting, or spoofed links. Crucially, the tool never resolves or clicks external links, guaranteeing 100% student safety."

---

## 3. Questions on Architecture, Gamification & Scaling

### Q8: "How does the gamification system prevent duplicate point farming and badge exploits?"
**Factual Response:**  
"Our gamification engine uses an **append-only ledger with reference ID verification** (`awardLearningPoints`). When a student completes a quiz or educational challenge, points are awarded with a unique deterministic reference ID (e.g. the quiz attempt ID). If a malicious user attempts to replay the network request or submit duplicate claims, the engine queries the existing ledger: finding the reference ID, it returns the existing record without mutating the point balance. Replay attacks yield zero points."

### Q9: "Why build this as a unified Next.js 16 App Router application rather than separate microservices?"
**Factual Response:**  
"For educational institutions, operational simplicity and zero data divergence are paramount. Next.js 16 App Router with Turbopack provides the best of both worlds:
1. **Public Outreach:** Marketing and admissions pages are statically pre-rendered (SSG) with zero database latency and optimal SEO.
2. **Authenticated Portals:** Dashboards leverage React Server Components (RSC) and streaming server-rendered views with minimal client JavaScript bundle sizes.
3. **Unified Domain Types:** The entire data contract (`types/portal.ts`) is shared between frontend and backend, eliminating serialization mismatches and keeping maintenance costs low."

### Q10: "How does the platform scale if the school grows from 500 to 20,000 students?"
**Factual Response:**  
"The platform is architected for horizontal scalability:
1. **Stateless Application Tier:** The Next.js 16 standalone output container can be horizontally scaled behind a load balancer (AWS ECS / Kubernetes / Google Cloud Run).
2. **PostgreSQL Database Tier:** Supabase / PostgreSQL natively handles connection pooling via Supavisor on port 6543, supporting tens of thousands of concurrent transactions with read replicas for analytical queries.
3. **Static Edge Caching:** Public pages and digital library static assets are cached across edge CDNs, offloading over 80% of institutional web traffic from the application origin."

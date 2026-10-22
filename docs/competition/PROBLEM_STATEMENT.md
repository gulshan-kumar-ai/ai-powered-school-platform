# Problem Statement — The Fragmented School Ecosystem

**Document Reference:** `docs/competition/PROBLEM_STATEMENT.md`  
**Classification:** Competition Jury Presentation Asset  
**Institution:** Oakridge Collegiate Academy  

---

## 1. The Core Challenge

Modern educational institutions suffer from severe technological fragmentation. A typical secondary or collegiate institution operates across 4 to 7 disconnected commercial software products:
- A legacy static website for public outreach and announcements (often poorly updated or unresponsive on mobile devices).
- A monolithic School Information System (SIS) for administrative record-keeping and course scheduling.
- A commercial Learning Management System (LMS) for course materials and homework submissions.
- An ad-hoc quiz or polling platform with minimal academic security.
- Third-party generative AI chatbots (e.g. general-purpose consumer LLMs) accessed outside institutional oversight, risking plagiarism, hallucinations, and personal data exposure.
- Separate communications tools (SMS blasts, third-party chat apps) for parent notification, creating custodial privacy risks.

This fragmentation produces five critical systemic failures:

### 1.1 Data Silos & Workflow Friction
Faculty and administrators spend up to 35% of their daily working hours repeatedly keying student rosters, marks, and attendance between disconnected platforms. When a student changes sections or is suspended by administration, downstream systems frequently fail to synchronize, resulting in security vulnerabilities and inaccurate grade reporting.

### 1.2 Custodial Privacy & Compliance Violations (FERPA & GDPR)
Consumer tools and ill-configured cloud databases frequently fail to enforce strict custodial boundaries. Parents are either completely locked out of timely academic visibility or inadvertently granted access to class-wide rosters and unredacted peer performance, directly violating student privacy statutes (e.g. FERPA in the US and GDPR Article 8/9 in the EU).

### 1.3 Assessment Vulnerability & Gamification Tampering
In most browser-based school software, quizzes evaluate answers on the client side via JavaScript. Students can readily inspect browser devtools network tabs or DOM variables to view correct answer keys before submitting. Similarly, digital reward systems rarely enforce idempotent transactions, allowing students to repeatedly replay completion requests to farm points and badges.

### 1.4 Unanchored AI & Academic Dishonesty
When students query consumer AI platforms for study assistance, the models frequently provide complete solutions to assignments rather than teaching fundamental concepts. Crucially, consumer models operate without awareness of the school's approved curriculum, providing contradictory definitions and fabricating citations ("hallucinations").

### 1.5 Rising Social Engineering Attacks on Students
High school and collegiate students are prime targets for coercive credential-harvesting phishing campaigns. Schools traditionally address this through static annual policy handbooks or passive lectures, providing no hands-on, safe environment where students can dissect real-world threat mechanisms.

---

## 2. Institutional Objectives for the Unified Solution

Oakridge Collegiate Academy sought to build a unified, cloud-native, and self-reliant academic ecosystem that:
1. **Unifies All 5 Stakeholder Audiences:** Visitors, Administrators, Faculty, Students, and Parents on a single performant codebase with zero data duplication.
2. **Guarantees Defense-in-Depth:** Hardware and route-level RBAC, server-side assessment calculation, and complete custodial isolation.
3. **Embeds Socratic, Grounded AI:** Retrieval-Augmented Generation (RAG) strictly anchored in approved academy syllabi with zero academic dishonesty assistance.
4. **Educates Students in Cybersecurity:** Safe, interactive threat analysis tools that turn defense into active learning.
5. **Maintains Complete Offline Independence:** Deterministic in-memory database and vector retrieval fallback ensuring uninterrupted classroom operations during cloud outages.

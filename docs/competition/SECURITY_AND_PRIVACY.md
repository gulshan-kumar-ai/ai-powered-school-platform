# Security Architecture, Data Privacy & Regulatory Compliance

**Document Reference:** `docs/competition/SECURITY_AND_PRIVACY.md`  
**Classification:** Competition Jury Technical Presentation Asset  
**Institution:** Oakridge Collegiate Academy  
**Regulatory Frameworks:** FERPA (US), GDPR (EU), COPPA (Children's Online Privacy)  

---

## 1. Security Architecture Principles

Oakridge Collegiate Academy's security architecture is built on the principle of **Defense-in-Depth**. Security is not delegated to a single perimeter firewall or frontend check; it is enforced across every application layer:

```
[Browser / Mobile Client]
       │
       ▼ (1) Enterprise HTTP Security Headers (CSP, HSTS, SAMEORIGIN, nosniff)
[Edge Reverse Proxy]
       │
       ▼ (2) RBAC Middleware & Session Invalidation Engine
[Next.js Application Layer]
       │
       ▼ (3) Server-Side Evaluation (Answer keys stripped, server marks computation)
[Service Layer & Logger] ───► (4) Structured PII / Credential Sanitization
       │
       ▼ (5) Row-Level Security (PostgreSQL Policies)
[Database Storage Tier]
```

---

## 2. Authentication, Session Lifecycle & Immediate Account Lockout

### 2.1 Multi-Tier Credential Validation
- Passwords verified using secure hash verification.
- Upon successful authentication, a cryptographically signed user session token is issued containing the user's role and expiry timestamp.

### 2.2 Immediate Account Suspension Enforcement
In enterprise academic systems, an account locked by administration must lose access immediately, not after session expiration:
- When an administrator toggles an account from `active` to `suspended` in `/portal/admin/users`:
  1. The profile's database record is updated to `status = 'suspended'`.
  2. The next query or page navigation triggers `getCurrentSession()`, which checks profile status against the store.
  3. The active session is instantly purged from storage and the user is redirected to the login interface with an explicit suspension notification.
- *Verified in Phase 5 Automated Test Suite (Assertions 1.1–1.6).*

---

## 3. Server-Side Scoping & Custodial Privacy Isolation

### 3.1 Parent-Child Data Isolation (FERPA / GDPR Compliance)
- Under FERPA and GDPR pupil regulations, parental access must be strictly limited to the parent's verified legal wards.
- Implementation in `schoolStore.getParentLinkedChildren(parentId)`:
  - Queries are filtered strictly through the `student_parents` join relation.
  - If a logged-in parent attempts to manipulate URLs or API requests to view an unlinked student ID, the method returns an empty array `[]` and denies access.
- *Verified in Phase 6 Automated Test Suite (Assertions E1–E4).*

### 3.2 Teacher Class Roster Scoping
- Faculty members can only view student lists, take attendance, and record marks for classes and sections to which they have official, administrator-approved assignments.
- Attempts to query or modify grades for other cohorts are rejected by both the application store and database Row-Level Security policies.

### 3.3 Protection of Unpublished Examination Marks & Quiz Keys
- **Quiz Answer Keys:** `schoolStore.getQuizById(id, includeAnswers=false)` systematically strips `correct_option_index`, `accepted_answers`, and `explanation` before transmitting questions to students.
- **Draft Examination Marks:** Marks marked with `is_published = false` are visible solely to the recording teacher and administrators. They remain invisible to student and parent queries until officially published.

---

## 4. Structured Logging & Automated PII Sanitization

All system logging passes through the centralized logger (`lib/logger.ts`). To comply with privacy laws, sensitive personal information and credentials are automatically scrubbed via regular expression filters before writing to disk or terminal:

| Sensitive Field | Detection Regex / Target | Sanitized Replacement |
| :--- | :--- | :--- |
| **User Passwords** | `password=(.*?)` or JSON key `password` | `[REDACTED_PASSWORD]` |
| **JWT Bearer Tokens** | `Bearer\s+[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+` | `[REDACTED_BEARER_TOKEN]` |
| **AI Provider Keys** | `(sk-[A-Za-z0-9-_]{20,}\|AIza[0-9A-Za-z-_]{35})` | `[REDACTED_API_KEY]` |
| **Phone Numbers** | Guardian telephone strings | `[REDACTED_PHONE]` |
| **National Identifiers** | SSN / National Identity numbers | `[REDACTED_ID]` |
| **Student Emails** | `([a-zA-Z0-9_.+-]{2})[a-zA-Z0-9_.+-]+(@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)` | Masked username, preserved domain (e.g., `al***ce@oakridge.edu`) |

*Verified in Phase 5 Automated Test Suite: 20 passed assertions confirming recursive scrubbing on strings, objects, and nested payloads.*

---

## 5. Enterprise HTTP Security Headers

Configured natively in `next.config.ts` for all incoming routes:
- **`Content-Security-Policy`:** Restricts script, style, font, and frame origins.
- **`Strict-Transport-Security (HSTS)`:** `max-age=63072000; includeSubDomains; preload`.
- **`X-Frame-Options`:** `SAMEORIGIN` (mitigates clickjacking attacks).
- **`X-Content-Type-Options`:** `nosniff` (prevents MIME type confusion attacks).
- **`Permissions-Policy`:** Explicitly disables unused browser hardware access (`camera=(), microphone=(), geolocation=(), browsing-topics=()`).

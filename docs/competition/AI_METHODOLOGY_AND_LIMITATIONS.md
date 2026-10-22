# AI Methodology, Safety Architecture & Limitations

**Document Reference:** `docs/competition/AI_METHODOLOGY_AND_LIMITATIONS.md`  
**Classification:** Competition Jury Technical Presentation Asset  
**Institution:** Govt. Boys Qazi Sultan Higher Secondary School, Kunri  

---

## 1. Pedagogical AI Principles

Govt. Boys Qazi Sultan Higher Secondary School, Kunri rejects the "black box autocomplete" approach of consumer LLMs. Our AI learning architecture is governed by five foundational pedagogical rules:
1. **Socratic Guidance over Direct Answers:** The model is strictly instructed never to solve homework or complete exam problems for the student. It breaks complex problems into guiding questions, hints, and conceptual derivations.
2. **Approved Curriculum Grounding (RAG):** Answers are grounded in the school's approved textbooks and syllabi via Retrieval-Augmented Generation.
3. **Transparent Operational Engine Modes:** The student interface features an explicit engine badge indicating whether responses are generated via live cloud AI (`cloud_live`) or verified offline RAG fallback (`offline_rag_verified`).
4. **Faculty Authority & Review:** AI-generated quizzes are stored as drafts and must be reviewed, edited, and approved by a teacher before publication.
5. **Zero Data Leakage:** Student queries are never used to train external public models.

---

## 2. Retrieval-Augmented Generation (RAG) Architecture

```
[Student Inquiry]
       │
       ▼
[Query Analysis & Tokenization]
       │
       ▼
[Curriculum Knowledge Store] ───► [Vector Embeddings / Cosine Similarity]
                                              │
                                              ▼
                                 [Top-K Approved Chunks]
                                 - Textbook Title
                                 - Excerpt & Page Reference
                                 - Relevance Score (> 0.65)
                                              │
       ┌──────────────────────────────────────┴──────────────────────────────────────┐
       ▼                                                                             ▼
[Cloud Provider Available]                                              [Offline / Quota Exhausted]
- Google Gemini 1.5 Pro / OpenAI GPT-4o                                  - Deterministic Socratic Engine
- System Prompt + RAG Context + Dialogue History                         - Curriculum Chunk Synthesis
       │                                                                             │
       └──────────────────────────────────────┬──────────────────────────────────────┘
                                              ▼
                           [Verified Pedagogical Response]
                           - Socratic Step-by-Step Guidance
                           - Approved Curriculum Citations
                           - Dynamic Follow-Up Inquiry Prompts
                           - Active Engine Mode Indicator Badge
```

### 2.1 Curriculum Knowledge Ingestion & Chunking
Course textbooks and syllabi are decomposed into semantic chunks of 300–600 tokens with 50-token overlapping boundaries to preserve conceptual continuity across chapter sections. Each chunk stores:
- `document_id` & `document_title` (e.g., *"Principles of Mechanics & Rotational Dynamics, Ch. 8"*)
- `subject_id` & `grade_level`
- `chunk_text` & `vector_embedding`

### 2.2 Vector Similarity Scoring
When a student asks a question, the query vector is compared against all subject chunks using cosine similarity:
$$\text{Sim}(Q, C) = \frac{Q \cdot C}{\|Q\| \|C\|}$$
Only chunks scoring above the 0.65 confidence threshold are included in the RAG context window.

---

## 3. Socratic Prompt Engineering & Dishonesty Guardrails

The study assistant operates under strict system constraints:
```markdown
You are the Govt. Boys Qazi Sultan Higher Secondary School, Kunri Socratic AI Study Assistant.
Your mission is to guide scholars toward deep conceptual understanding.

Core Guardrails:
1. NEVER output direct answers, complete code solutions, or essay drafts for homework prompts.
2. When asked "What is the answer to question 3?", respond: "Let's work through question 3 together. What is the fundamental formula or concept that applies here?"
3. Ground your explanations in the provided Oakridge curriculum excerpts.
4. If the student asks about non-academic topics, politely redirect them back to their coursework.
5. Always propose 2–3 thought-provoking follow-up questions to stimulate curiosity.
```

---

## 4. CyberSafe Threat Analyzer Methodology

The **CyberSafe Analyzer** (`lib/ai/cyber-analyzer.ts`) acts as an interactive cybersecurity laboratory for students. Rather than relying on opaque cloud classifiers, it utilizes an explainable pattern-recognition engine that identifies specific social engineering psychological hooks:

| Threat Category | Pattern Triggers | Psychological Mechanism |
| :--- | :--- | :--- |
| **Urgency / Coercion** | *"immediate response"*, *"within 1 hour"*, *"account will be suspended"* | Induces panic to bypass critical deliberation. |
| **Credential Harvesting** | *"confirm your login"*, *"enter your password"*, *"verify 2FA code"* | Solicits private secrets under false pretenses. |
| **Financial Extortion** | *"wire transfer"*, *"gift card"*, *"bitcoin"*, *"overdue invoice"* | Demands non-traceable payment methods. |
| **Executive Impersonation**| *"office of the principal"*, *"IT department alert"*, *"dean notice"* | Exploits student deference to institutional authority. |
| **Obfuscated Hyperlinks** | Shortened URLs (`bit.ly`, `tinyurl`), raw IP addresses, suspicious TLDs | Disguises true destination hostnames. |

### Ethical Safety & Sandbox Isolation
- **No Network Resolution:** The tool performs static linguistic and structural analysis. It never attempts to resolve, ping, or navigate to external URLs found in student inputs.
- **Mandatory Ethical Disclaimer:** Every report includes a prominent notification that automated analysis cannot guarantee 100% safety and provides official institutional contact details (`cyber-safety@oakridge.edu`).

---

## 5. Technical Limitations & Mitigation Strategies

| Limitation | Impact | Mitigation Strategy |
| :--- | :--- | :--- |
| **Third-Party API Outages** | Cloud LLM unreachable during network cuts or provider downtime. | System automatically activates verified offline Socratic RAG fallback with zero crashes. |
| **Model Hallucination** | LLM generating plausible but incorrect mathematical or historical facts. | Explicit RAG citation requirement; UI displays citations with direct excerpts. |
| **Context Window Ceilings**| Long multi-turn conversations exceeding token limits. | Window pruning retaining system prompt, active RAG context, and the last 6 turns. |
| **Adversarial Prompt Injections** | Students attempting "jailbreak" prompts to force direct homework answers. | Pre-inference guardrail filtering and Socratic refusal enforcement. |
| **Offline Knowledge Horizon**| Offline mode can only synthesize answers from pre-seeded curriculum chunks. | Transparent UI badge (`offline_rag_verified`) alerts the user to the current operating mode. |

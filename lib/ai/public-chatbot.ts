/**
 * Phase 4 Public School Information Chatbot
 * Answers prospective parents and community visitors about public admissions,
 * academic curricula, office schedules, tuition, and school policies.
 *
 * Strict Privacy & Security Firewall:
 * - isPublicOnly: true RAG retrieval only.
 * - Firm rejection of requests for private student marks, teacher passwords, or internal dashboards.
 * - Non-hallucinatory: refuses to fabricate policies or fees not in verified public records.
 * - Provides verified website links (/admissions, /academics, /contact).
 */

import { PublicChatbotMessage } from "@/types/portal";

export {
  PUBLIC_SCHOOL_KNOWLEDGE,
  type PublicFact,
} from "./fast-super-service";
import { executeFastSuperChat } from "./fast-super-service";

/**
 * Handles incoming queries for the public school chatbot widget,
 * powered by the Fast and Super AI engine with school knowledge grounding.
 */
export async function handlePublicChatbotQuery(
  userQuery: string,
  conversationHistory?: PublicChatbotMessage[]
): Promise<PublicChatbotMessage> {
  const result = await executeFastSuperChat({
    userQuery,
    conversationHistory,
  });

  return {
    id: `chat-res-${Date.now()}`,
    role: "assistant",
    content: result.content,
    citations: result.citations,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
}

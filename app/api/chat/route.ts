import { NextRequest, NextResponse } from "next/server";
import {
  executeFastSuperChat,
  getFastSuperConfig,
  createFastSuperChatStream,
} from "@/lib/ai/fast-super-service";
import { logger } from "@/lib/logger";
import { PublicChatbotMessage } from "@/types/portal";

interface ChatRequestBody {
  message?: string;
  history?: PublicChatbotMessage[];
  stream?: boolean;
}

/**
 * Diagnostic status endpoint: reports whether live Fast & Super API is configured
 * and the active model/provider WITHOUT ever exposing API secret keys.
 */
export async function GET() {
  const config = getFastSuperConfig();
  const isConfigured = Boolean(config.apiKey && config.apiKey.trim().length > 0);

  return NextResponse.json({
    status: "ok",
    isConfigured,
    provider: isConfigured ? "fast_and_super" : "verified_local_rag",
    model: config.model,
    endpoint: config.baseUrl,
    timeoutMs: config.timeoutMs,
  });
}

export async function POST(req: NextRequest) {
  try {
    let body: ChatRequestBody;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON request body format." },
        { status: 400 }
      );
    }

    const rawMessage = body.message;
    if (!rawMessage || typeof rawMessage !== "string" || !rawMessage.trim()) {
      return NextResponse.json(
        { error: "Query message cannot be empty." },
        { status: 400 }
      );
    }

    // Input length protection: enforce 2,000 char maximum to prevent buffer/token exhaustion
    const trimmedMessage = rawMessage.trim();
    const sanitizedMessage = trimmedMessage.length > 2000
      ? trimmedMessage.slice(0, 2000)
      : trimmedMessage;

    const history = Array.isArray(body.history) ? body.history : [];

    logger.info("Chatbot", "Chatbot query received", {
      queryLength: sanitizedMessage.length,
      historyLength: history.length,
      hasStreamRequested: !!body.stream,
    });

    // Check if streaming is requested
    if (body.stream === true) {
      const stream = await createFastSuperChatStream({
        userQuery: sanitizedMessage,
        conversationHistory: history,
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          Connection: "keep-alive",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    // Standard JSON Response
    const result = await executeFastSuperChat({
      userQuery: sanitizedMessage,
      conversationHistory: history,
    });

    logger.info("Chatbot", "Chatbot query resolved", {
      provider: result.provider,
      isFallback: result.isFallback,
    });

    return NextResponse.json(
      {
        content: result.content,
        citations: result.citations,
        provider: result.provider,
        isFallback: result.isFallback,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
      {
        status: 200,
        headers: {
          "X-Content-Type-Options": "nosniff",
        },
      }
    );
  } catch (err: unknown) {
    const errorObj = err instanceof Error ? err : new Error(String(err));
    logger.error("Chatbot", "Chatbot server error", errorObj);

    return NextResponse.json(
      {
        error: "Our AI campus guide experienced an unexpected error. Please try again shortly or contact admissions.",
        citations: [{ title: "School Office Contact", url: "/contact" }],
      },
      { status: 500 }
    );
  }
}

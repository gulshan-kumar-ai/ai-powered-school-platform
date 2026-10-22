"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PublicChatbotMessage } from "@/types/portal";
import {
  X,
  Send,
  Sparkles,
  Bot,
  ExternalLink,
  ShieldCheck,
  RotateCcw,
  RefreshCw,
  Zap,
} from "lucide-react";

let chatbotMsgCounter = 0;
function createChatbotMessageId(prefix: string): string {
  chatbotMsgCounter += 1;
  return `${prefix}-${Date.now()}-${chatbotMsgCounter}`;
}

function getChatbotTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_PUBLIC_WELCOME: PublicChatbotMessage = {
  id: "pub-welcome",
  role: "assistant",
  content:
    "Hello and welcome to Govt. Boys Qazi Sultan Higher Secondary School, Kunri! I am your AI campus guide. Ask me anything about our admissions timeline, academic curriculum, tuition & scholarships, office hours, or campus events.",
  citations: [
    { title: "Admissions & Tuition", url: "/admissions" },
    { title: "Academic Programs", url: "/academics" },
    { title: "Contact School Office", url: "/contact" },
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  provider: "verified_local_rag",
  isFallback: true,
};

const SUGGESTED_QUICK_QUESTIONS = [
  "What are your office hours?",
  "How do I apply for admission?",
  "What AP courses are offered?",
  "What is the student attendance policy?",
];

async function readChatStream(
  response: Response,
  callbacks: {
    onMetadata?: (meta: {
      citations?: { title: string; url: string }[];
      provider?: string;
      isFallback?: boolean;
    }) => void;
    onDelta?: (deltaText: string, fullText: string) => void;
  }
): Promise<{
  text: string;
  citations: { title: string; url: string }[];
  provider?: string;
  isFallback?: boolean;
}> {
  const reader = response.body?.getReader();
  if (!reader) return { text: "", citations: [] };
  const decoder = new TextDecoder();
  let accumulatedText = "";
  let finalCitations: { title: string; url: string }[] = [];
  let finalProvider: string | undefined;
  let finalIsFallback: boolean | undefined;
  let done = false;
  let buffer = "";

  while (!done) {
    const { value, done: readerDone } = await reader.read();
    if (readerDone) {
      done = true;
    }
    if (value) {
      buffer += decoder.decode(value, { stream: !done });
    }

    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = done ? "" : (blocks.pop() ?? "");

    for (const block of blocks) {
      const trimmedBlock = block.trim();
      if (!trimmedBlock) continue;

      let eventType = "";
      const dataLines: string[] = [];

      for (const line of trimmedBlock.split(/\r?\n/)) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith("event:")) {
          eventType = trimmedLine.slice(6).trim();
        } else if (trimmedLine.startsWith("data:")) {
          dataLines.push(trimmedLine.slice(5).trim());
        }
      }

      const dataStr = dataLines.join("\n");

      if (eventType === "metadata" || (!eventType && dataStr.startsWith("{") && dataStr.includes('"citations"'))) {
        try {
          const meta = JSON.parse(dataStr);
          if (meta.citations) finalCitations = meta.citations;
          if (meta.provider) finalProvider = meta.provider;
          if (typeof meta.isFallback === "boolean") finalIsFallback = meta.isFallback;
          callbacks.onMetadata?.(meta);
        } catch {
          // Ignore JSON parse errors in metadata
        }
      } else if (eventType === "delta") {
        try {
          const delta = JSON.parse(dataStr);
          if (typeof delta.text === "string") {
            accumulatedText += delta.text;
            callbacks.onDelta?.(delta.text, accumulatedText);
          }
        } catch {
          // Ignore parse errors on delta
        }
      } else if (eventType === "done" || dataStr === "[DONE]") {
        done = true;
      }
    }
  }

  return {
    text: accumulatedText,
    citations: finalCitations,
    provider: finalProvider,
    isFallback: finalIsFallback,
  };
}

export function PublicSchoolChatbot() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<PublicChatbotMessage[]>([
    INITIAL_PUBLIC_WELCOME,
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [providerMode, setProviderMode] = useState<string>("School Knowledge AI");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Probe server configuration status on mount
  useEffect(() => {
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data.isConfigured && data.provider === "fast_and_super") {
          setProviderMode("Fast & Super AI (Ready)");
        } else {
          setProviderMode("School Knowledge AI (Offline Mode)");
        }
      })
      .catch(() => {
        setProviderMode("School Knowledge AI (Offline Mode)");
      });
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // If inside administrative/student portal, hide to prevent UI overlap
  if (pathname?.startsWith("/portal")) {
    return null;
  }

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend !== undefined ? textToSend : inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg: PublicChatbotMessage = {
      id: createChatbotMessageId("usr"),
      role: "user",
      content: query,
      timestamp: getChatbotTimestamp(),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputQuery("");
    setIsLoading(true);

    // Prepare assistant placeholder message for streaming or response
    const assistantMsgId = createChatbotMessageId("ast");
    const assistantPlaceholder: PublicChatbotMessage = {
      id: assistantMsgId,
      role: "assistant",
      content: "",
      citations: [],
      timestamp: getChatbotTimestamp(),
      isStreaming: true,
    };

    setMessages([...newHistory, assistantPlaceholder]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: query,
          history: messages,
          stream: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      // Check content-type for SSE streaming vs JSON response
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("text/event-stream") && response.body) {
        const streamResult = await readChatStream(response, {
          onMetadata: (meta) => {
            if (meta.provider === "fast_and_super" && !meta.isFallback) {
              setProviderMode("Fast & Super AI (Live Cloud)");
            } else {
              setProviderMode("School Knowledge AI (Local Offline)");
            }
          },
          onDelta: (_delta, fullText) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsgId
                  ? {
                      ...m,
                      content: fullText,
                      isStreaming: true,
                    }
                  : m
              )
            );
          },
        });

        // Finalize message state
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: streamResult.text || "Thank you for contacting Govt. Boys Qazi Sultan Higher Secondary School, Kunri.",
                  citations: streamResult.citations,
                  provider: streamResult.provider === "fast_and_super" ? "fast_and_super" : "verified_local_rag",
                  isFallback: streamResult.isFallback ?? true,
                  isStreaming: false,
                }
              : m
          )
        );
      } else {
        // Fallback to standard JSON response
        const data = await response.json();
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  content: data.content,
                  citations: data.citations || [],
                  provider: data.provider || "verified_local_rag",
                  isFallback: data.isFallback ?? true,
                  isStreaming: false,
                }
              : m
          )
        );
        if (data.provider === "fast_and_super" && !data.isFallback) {
          setProviderMode("Fast & Super AI (Live Cloud)");
        } else {
          setProviderMode("School Knowledge AI (Local Offline)");
        }
      }
    } catch {
      // Error recovery state with Retry trigger
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsgId
            ? {
                ...m,
                content:
                  "I experienced an unexpected delay connecting to the AI provider. Please verify your connection or click Retry to send again.",
                citations: [{ title: "Contact Admissions Office", url: "/contact" }],
                isError: true,
                failedQuery: query,
                isStreaming: false,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = (failedQuery?: string) => {
    if (!failedQuery) return;
    // Remove the failed assistant message and re-send
    setMessages((prev) => prev.filter((m) => !m.isError));
    handleSendMessage(failedQuery);
  };

  const handleResetChat = () => {
    setMessages([INITIAL_PUBLIC_WELCOME]);
    setInputQuery("");
    fetch("/api/chat")
      .then((res) => res.json())
      .then((data) => {
        if (data.isConfigured && data.provider === "fast_and_super") {
          setProviderMode("Fast & Super AI (Ready)");
        } else {
          setProviderMode("School Knowledge AI (Offline Mode)");
        }
      })
      .catch(() => {
        setProviderMode("School Knowledge AI (Offline Mode)");
      });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 bg-[#0f2744] hover:bg-[#1a365d] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-sky-400/30 group"
          aria-label="Open School AI Information Chat"
        >
          <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-left pr-1 hidden sm:block">
            <div className="text-xs font-extrabold leading-none text-white flex items-center gap-1">
              <span>Ask School AI</span>
              <Zap className="w-3 h-3 text-amber-300 fill-amber-300" />
            </div>
            <div className="text-[10px] text-sky-200 mt-0.5">
              Fast & Super AI Campus Guide
            </div>
          </div>
        </button>
      )}

      {/* Expanded Chat Box (Responsive: Full bottom-sheet on small devices, card on desktop) */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0f2744] to-[#1e3a5f] text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold flex items-center gap-1.5">
                  <span>School Smart Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <div className="text-[10px] text-sky-200 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-0.5 font-medium px-1.5 py-0.2 rounded bg-sky-900/60 border border-sky-400/30 text-sky-200">
                    <Zap className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                    {providerMode}
                  </span>
                  <span>• Grounded in School Records</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Close chatbot"
                aria-label="Close chatbot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy Firewall Notice Banner */}
          <div className="px-3 py-1.5 bg-slate-100 text-[10px] text-slate-600 flex items-center justify-between border-b border-slate-200">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span>Grounded in verified public records & admissions handbooks.</span>
            </span>
            <span className="text-slate-400 font-mono text-[9px] hidden sm:inline">FERPA Protected</span>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 leading-relaxed ${
                      isUser
                        ? "bg-[#0f2744] text-white rounded-br-xs"
                        : msg.isError
                        ? "bg-rose-50 text-rose-950 rounded-bl-xs border border-rose-200"
                        : "bg-slate-100 text-slate-900 rounded-bl-xs border border-slate-200/80"
                    }`}
                  >
                    <div className="whitespace-pre-line">
                      {msg.content || (msg.isStreaming ? "Thinking..." : "")}
                    </div>

                    {/* Operational Mode Tag on Assistant Messages */}
                    {!isUser && !msg.isError && msg.content && !msg.isStreaming && (
                      <div className="pt-1">
                        {msg.provider === "fast_and_super" && !msg.isFallback ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-100 text-[9px] font-semibold text-emerald-800 border border-emerald-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Live Fast & Super AI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-200/80 text-[9px] font-medium text-slate-700 border border-slate-300">
                            <ShieldCheck className="w-2.5 h-2.5 text-slate-500" />
                            Verified School Records (Local Fallback)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Citations / Links */}
                    {msg.citations && msg.citations.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/70 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">
                          Verified Citations & Links:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((cite, i) => (
                            <Link
                              key={i}
                              href={cite.url}
                              onClick={() => setIsOpen(false)}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-300 text-[10px] font-semibold text-sky-700 hover:bg-sky-50 transition-colors"
                            >
                              <span>{cite.title}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Retry Button on Error */}
                    {msg.isError && msg.failedQuery && (
                      <div className="pt-2">
                        <button
                          onClick={() => handleRetry(msg.failedQuery)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-semibold transition"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Retry Query</span>
                        </button>
                      </div>
                    )}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              );
            })}

            {isLoading && !messages[messages.length - 1]?.isStreaming && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-sky-500" />
                <span>Generating fast answer via SmartSchool AI...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-slate-50 border-t border-slate-200/60 overflow-x-auto">
              <div className="flex items-center gap-1.5">
                {SUGGESTED_QUICK_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(q)}
                    disabled={isLoading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-full bg-white border border-slate-300 text-[11px] font-medium text-slate-700 hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700 transition-colors disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask a general or school question..."
              disabled={isLoading}
              className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-sky-500 focus:outline-hidden disabled:bg-slate-50"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="p-2 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

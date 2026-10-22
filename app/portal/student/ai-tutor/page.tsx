"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  generateStudyAssistantResponse,
  StudyQueryResponse,
} from "@/lib/ai/study-assistant";
import { AIStudyMessage, LearningResource } from "@/types/portal";
import {
  Bot,
  Send,
  Lightbulb,
  Sparkles,
  BookOpen,
  RefreshCw,
  AlertTriangle,
  FileText,
  HelpCircle,
  ArrowRight,
  User,
  ShieldCheck,
  Compass,
} from "lucide-react";

const INITIAL_WELCOME_MESSAGE: AIStudyMessage = {
  id: "msg-welcome",
  role: "assistant",
  content:
    "Hello! I am your Govt. Boys Qazi Sultan Higher Secondary School Socratic Study Assistant. My goal is to guide your understanding step-by-step rather than simply handing over final answers. Select your subject, ask any question about a concept or problem, and let's explore it together!",
  suggested_follow_ups: [
    "How does Newton's Second Law explain acceleration?",
    "Can you explain fractions and equivalent denominators?",
    "What is the difference between mitosis and meiosis?",
    "How does the academic attendance policy work?",
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
};

let studentMsgCounter = 0;
function createStudentMessageId(prefix: string): string {
  studentMsgCounter += 1;
  return `${prefix}-${studentMsgCounter}`;
}

function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function StudentAITutorPage() {
  const subjects = schoolStore.getSubjects();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjects[0]?.id || "40000000-0000-0000-0000-000000000002"
  );
  const [selectedClassLevel, setSelectedClassLevel] = useState<string>("Grade 10");
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<AIStudyMessage[]>([INITIAL_WELCOME_MESSAGE]);
  const [recommendedResources, setRecommendedResources] = useState<LearningResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (
    textToSend?: string,
    options?: { requestHint?: boolean; requestSimplified?: boolean }
  ) => {
    const query = textToSend !== undefined ? textToSend : inputQuery;
    if (!query.trim() || isLoading) return;

    const userMessage: AIStudyMessage = {
      id: createStudentMessageId("usr"),
      role: "user",
      content: query.trim(),
      timestamp: getFormattedTime(),
    };

    const nextHistory = [...messages, userMessage];
    setMessages(nextHistory);
    setInputQuery("");
    setIsLoading(true);

    try {
      const response: StudyQueryResponse = await generateStudyAssistantResponse({
        message: query.trim(),
        subjectId: selectedSubjectId,
        subjectName: selectedSubject?.name || "General Science",
        className: selectedClassLevel,
        history: nextHistory,
        requestHint: options?.requestHint,
        requestSimplified: options?.requestSimplified,
        studentId: "20000000-0000-0000-0000-000000000001",
      });

      setMessages((prev) => [...prev, response.message]);
      if (response.recommendedResources && response.recommendedResources.length > 0) {
        setRecommendedResources(response.recommendedResources);
      }
    } catch {
      const errorMessage: AIStudyMessage = {
        id: createStudentMessageId("err"),
        role: "assistant",
        content:
          "I encountered an unexpected issue while retrieving that information. Please try rephrasing your question or consult your class teacher directly.",
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSession = () => {
    setMessages([INITIAL_WELCOME_MESSAGE]);
    setRecommendedResources([]);
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "AI Study Assistant", href: "/portal/student/ai-tutor" },
      ]}
      title="Socratic AI Study Assistant"
      description="Interactive, concept-first educational tutor supporting step-by-step mastery, hint workflows, and verified curriculum citations."
    >
      <div className="space-y-6">
        {/* Safety Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Educational Content Notice
            </span>
            <p className="leading-relaxed">
              This assistant uses Socratic learning techniques to guide your problem-solving. AI-generated explanations can occasionally contain errors. Always verify key mathematical formulas, historical dates, and examination policies with your class teacher or approved textbooks.
            </p>
          </div>
        </div>

        {/* Configuration Toolbar */}
        <Card>
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Target Subject
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => setSelectedSubjectId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                >
                  {subjects.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.name} ({sub.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Academic Level
                </label>
                <select
                  value={selectedClassLevel}
                  onChange={(e) => setSelectedClassLevel(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                >
                  <option value="Grade 8">Grade 8 (Middle School)</option>
                  <option value="Grade 9">Grade 9 (Freshman)</option>
                  <option value="Grade 10">Grade 10 (Sophomore)</option>
                  <option value="Grade 11">Grade 11 (AP Track)</option>
                  <option value="Grade 12">Grade 12 (Honors / Senior)</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleResetSession}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Start New Conversation</span>
            </button>
          </CardContent>
        </Card>

        {/* Main Chat Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Conversation Column */}
          <div className="lg:col-span-3 space-y-4">
            <Card className="min-h-[500px] flex flex-col justify-between">
              {/* Message Feed */}
              <div className="p-5 space-y-6 max-h-[600px] overflow-y-auto">
                {messages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-3.5 ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      {!isUser && (
                        <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Bot className="w-4 h-4" />
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed space-y-3 ${
                          isUser
                            ? "bg-[#0f2744] text-white rounded-br-xs"
                            : "bg-slate-100 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 rounded-bl-xs border border-slate-200 dark:border-slate-700/60"
                        }`}
                      >
                        {!isUser && msg.ai_engine_mode && (
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                            {msg.ai_engine_mode === "cloud_live" ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                                <Sparkles className="w-3 h-3 text-emerald-600" />
                                <span>Connected Cloud AI Model</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300">
                                <ShieldCheck className="w-3 h-3 text-sky-600" />
                                <span>Verified Curriculum RAG Engine (Zero-Cost Deterministic)</span>
                              </span>
                            )}
                          </div>
                        )}
                        <div className="whitespace-pre-line">{msg.content}</div>

                        {/* RAG Document Citations */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="pt-2 mt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs space-y-1.5">
                            <div className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Approved School Document Citations</span>
                            </div>
                            <div className="space-y-1">
                              {msg.citations.map((cite, i) => (
                                <div
                                  key={i}
                                  className="p-2 rounded-lg bg-white/60 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-700/50"
                                >
                                  <div className="font-bold text-slate-800 dark:text-slate-200">
                                    {cite.document_title}
                                  </div>
                                  <div className="text-[11px] text-slate-500">
                                    {cite.section_or_page || cite.topic} • Relevance: {Math.round(cite.relevance_score)}%
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Suggested Follow-Ups */}
                        {msg.suggested_follow_ups && msg.suggested_follow_ups.length > 0 && (
                          <div className="pt-2 mt-2 border-t border-slate-200/80 dark:border-slate-700/80 text-xs space-y-2">
                            <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Compass className="w-3.5 h-3.5 text-sky-500" />
                              <span>Explore Next:</span>
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.suggested_follow_ups.map((prompt, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSendMessage(prompt)}
                                  className="text-left text-xs px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 transition-colors"
                                >
                                  {prompt}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="text-[10px] text-slate-400 text-right">
                          {msg.timestamp}
                        </div>
                      </div>

                      {isUser && (
                        <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0 animate-pulse">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl rounded-bl-xs text-xs text-slate-500 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin" />
                      <span>Formulating Socratic explanation & verifying school documents...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input & Socratic Actions */}
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-3">
                {/* Socratic Assistance Prompts */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
                  <button
                    onClick={() =>
                      handleSendMessage(
                        inputQuery || "Can you give me a hint to get started?",
                        { requestHint: true }
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold whitespace-nowrap transition-colors"
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                    <span>💡 Request Hint (Don&apos;t spoil solution)</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSendMessage(
                        inputQuery || "Could you explain this more simply with an analogy?",
                        { requestSimplified: true }
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold whitespace-nowrap transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>🌱 Explain More Simply</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSendMessage(
                        "Can you explain photosynthesis in simple words?"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-semibold whitespace-nowrap transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    <span>🔬 Photosynthesis Query (Poster)</span>
                  </button>

                  <button
                    onClick={() =>
                      handleSendMessage(
                        inputQuery
                          ? `Show me a step-by-step worked example for: ${inputQuery}`
                          : "Can you walk through a step-by-step worked example?"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-semibold whitespace-nowrap transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>📝 Step-by-Step Example</span>
                  </button>
                </div>

                {/* Main Query Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputQuery}
                    onChange={(e) => setInputQuery(e.target.value)}
                    placeholder={`Ask a question in ${selectedSubject?.name || "your subject"} (e.g., 'How do I solve equations with fractions?')...`}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    disabled={!inputQuery.trim() || isLoading}
                    className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors shadow-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask</span>
                  </button>
                </form>
              </div>
            </Card>
          </div>

          {/* Right Rail: Digital Library & Curriculum Links */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-500" />
                  <span>Related Library Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recommendedResources.length > 0 ? (
                  recommendedResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" size="sm">
                          {res.resource_type.toUpperCase()}
                        </Badge>
                        <span className="text-[10px] text-slate-400">
                          {res.topic}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {res.title}
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {res.description}
                      </p>
                      <Link
                        href={`/portal/student/library?search=${encodeURIComponent(res.topic)}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400 pt-1"
                      >
                        <span>Open in Digital Library</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-slate-400 space-y-2">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p>Ask a question to see related textbook passages and digital library items.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Practice Drills Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-500" />
                  <span>Need Practice?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs">
                <p className="text-slate-500">
                  Ready to test what you just reviewed? Jump directly into diagnostic quizzes.
                </p>
                <Link
                  href="/portal/student/quizzes"
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors"
                >
                  <span>Browse Student Quizzes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

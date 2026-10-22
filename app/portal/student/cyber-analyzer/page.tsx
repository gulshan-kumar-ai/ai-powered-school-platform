"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  analyzeSuspiciousMessage,
  SYNTHETIC_CYBER_EXAMPLES,
} from "@/lib/ai/cyber-analyzer";
import { CyberAnalysisResult } from "@/types/portal";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Search,
  CheckCircle2,
  Lock,
  ExternalLink,
  Info,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  Trophy,
  Check,
  X,
  ArrowRight,
} from "lucide-react";

interface CyberQuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const CYBER_QUIZ_QUESTIONS: CyberQuizQuestion[] = [
  {
    id: 1,
    question: "You receive an SMS: 'You have won a free laptop! Click http://freelaptop.tk'. What should you do?",
    scenario: "Unsolicited text message offering high-value electronics with an unfamiliar domain extension.",
    options: [
      "Click the link immediately to reserve the laptop before supplies run out",
      "Do not click the link and delete the message; it is a common prize phishing scam",
      "Reply with your home address so they can ship the laptop directly",
      "Forward the link to school friends so they can claim laptops too",
    ],
    correctIndex: 1,
    explanation:
      "Unsolicited prize notifications with suspicious top-level domains (.tk, .xyz) are designed to steal personal data or install malware. Never click unknown links.",
  },
  {
    id: 2,
    question: "An email claiming to be from the 'School IT Helpdesk' asks for your student portal password. What is true?",
    scenario: "Urgent email warning that your account will be deleted in 1 hour unless you provide login credentials.",
    options: [
      "School administrators regularly ask for student passwords via email",
      "You should send your password if the email has the school crest",
      "Legitimate school IT staff will never ask for your private password via message or email",
      "You should provide a hint instead of the full password",
    ],
    correctIndex: 2,
    explanation:
      "Legitimate IT administrators already have backend access and will NEVER solicit plain-text passwords or 2FA codes through messages.",
  },
  {
    id: 3,
    question: "Which of the following website URLs is the SAFEST to enter student credentials on?",
    scenario: "Evaluating browser URL address bar before logging in.",
    options: [
      "http://gbhssqazisultan.tk/student-login",
      "http://192.168.1.45/portal-auth",
      "https://gbhssqazisultan.edu.pk/portal/login",
      "https://gbhss-qazisultan-login-verify.click/session",
    ],
    correctIndex: 2,
    explanation:
      "https://gbhssqazisultan.edu.pk uses SSL/TLS encryption (https) and the official institutional .edu.pk domain rather than an untrusted TLD.",
  },
  {
    id: 4,
    question: "What is Multi-Factor Authentication (MFA) and why is it important?",
    scenario: "Account security settings.",
    options: [
      "It requires a secondary verification step (like an SMS code or authenticator app) even if someone knows your password",
      "It is a tool that automatically posts your grades online",
      "It forces you to change your password every 10 minutes",
      "It deletes old emails from your inbox automatically",
    ],
    correctIndex: 0,
    explanation:
      "Multi-Factor Authentication stops over 99% of automated account compromise attempts by requiring something you know (password) plus something you have (phone/token).",
  },
  {
    id: 5,
    question: "You are connected to free public Wi-Fi at a train station. What activity should you AVOID?",
    scenario: "Public network security precautions.",
    options: [
      "Reading public news articles",
      "Accessing financial banking accounts or submitting sensitive school credentials without a VPN",
      "Checking the weather forecast",
      "Listening to an offline podcast",
    ],
    correctIndex: 1,
    explanation:
      "Public unencrypted Wi-Fi hotspots can be monitored by attackers using packet-sniffing or rogue access points. Avoid transmitting sensitive passwords or financial details.",
  },
];

export default function CyberThreatAnalyzerPage() {
  const [activeTab, setActiveTab] = useState<"check" | "quiz" | "tips">("check");

  // Tab 1: Check a message state
  const [messageInput, setMessageInput] = useState(
    "You have won a free laptop! Click this link to claim your prize: http://freelaptop.tk"
  );
  const [analysisResult, setAnalysisResult] = useState<CyberAnalysisResult | null>(() =>
    analyzeSuspiciousMessage(
      "You have won a free laptop! Click this link to claim your prize: http://freelaptop.tk"
    )
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Tab 2: Quiz state
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnalyze = (textToAnalyze?: string) => {
    const text = textToAnalyze !== undefined ? textToAnalyze : messageInput;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeSuspiciousMessage(text);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleLoadSample = (sample: (typeof SYNTHETIC_CYBER_EXAMPLES)[0]) => {
    setMessageInput(sample.content);
    handleAnalyze(sample.content);
  };

  const handleReset = () => {
    setMessageInput("");
    setAnalysisResult(null);
  };

  const handleSelectQuizOption = (index: number) => {
    if (quizAnswered) return;
    setSelectedQuizOption(index);
    setQuizAnswered(true);

    if (index === CYBER_QUIZ_QUESTIONS[currentQuizIndex].correctIndex) {
      setQuizScore((prev) => prev + 10);
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIndex < CYBER_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setQuizAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedQuizOption(null);
    setQuizScore(0);
    setQuizAnswered(false);
    setQuizFinished(false);
  };

  const isFreeLaptopPosterSample =
    messageInput.toLowerCase().includes("freelaptop.tk") ||
    messageInput.toLowerCase().includes("free laptop");

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "CyberSafe School", href: "/portal/student/cyber-analyzer" },
      ]}
      title="CyberSafe School • Cybersecurity Awareness"
      description="Inspect suspicious messages, test your security reflexes with interactive quizzes, and learn essential digital self-defense tips."
    >
      <div className="space-y-6">
        {/* Poster Navigation Tabs: [Check a Message] [Take a Quiz] [Learn Tips] */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("check")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "check"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check a Message</span>
            </button>
            <button
              onClick={() => setActiveTab("quiz")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "quiz"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Take a Quiz</span>
            </button>
            <button
              onClick={() => setActiveTab("tips")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "tips"
                  ? "bg-sky-600 text-white shadow-xs"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learn Tips</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <ShieldCheck className="w-4 h-4" />
            <span>Pillar 8: CyberSafe Lab Active</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: CHECK A MESSAGE (POSTER PILLAR 8 CORE VIEW)        */}
        {/* ========================================================= */}
        {activeTab === "check" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Input & Demonstration Presets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="pb-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-sky-500" />
                      <span>Inspect Suspicious Message or URL</span>
                    </CardTitle>
                    {messageInput && (
                      <button
                        onClick={handleReset}
                        className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 inline-flex items-center gap-1"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <textarea
                        rows={4}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        placeholder="Paste the suspicious email, text message, or chat snippet here for security evaluation..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Length: {messageInput.length} chars
                      </span>
                      <button
                        onClick={() => handleAnalyze()}
                        disabled={!messageInput.trim() || isAnalyzing}
                        className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors shadow-xs"
                      >
                        <Search className="w-4 h-4" />
                        <span>{isAnalyzing ? "Analyzing Security Patterns..." : "Analyze Message"}</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* EXACT POSTER ALERT BOX HIGHLIGHT */}
                {analysisResult && (analysisResult.risk_score >= 25 || isFreeLaptopPosterSample) && (
                  <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100 shadow-md space-y-3">
                    <div className="flex items-center gap-2.5 text-rose-700 dark:text-rose-300">
                      <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
                      <h4 className="text-base font-extrabold tracking-tight">
                        Warning: This looks suspicious!
                      </h4>
                    </div>

                    <ul className="space-y-2 text-xs font-medium pl-8 list-disc marker:text-rose-500">
                      <li>
                        <strong>Unknown link:</strong> Points to an untrusted domain (<span className="font-mono text-rose-800 dark:text-rose-200">http://freelaptop.tk</span>).
                      </li>
                      <li>
                        <strong>Common scam message:</strong> Unsolicited prize claims (&ldquo;free laptop&rdquo;) designed to lure victims.
                      </li>
                      <li className="text-rose-700 dark:text-rose-300 font-bold">
                        Be careful and do not click the link!
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Demonstration Presets */}
              <div className="space-y-4">
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      <span>Preset Classroom Scenarios</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2.5">
                    <p className="text-xs text-slate-500">
                      Tap a scenario to load and inspect risk indicators:
                    </p>
                    {SYNTHETIC_CYBER_EXAMPLES.map((sample) => (
                      <button
                        key={sample.id}
                        onClick={() => handleLoadSample(sample)}
                        className={`w-full text-left p-3 rounded-xl border transition-all space-y-1 ${
                          messageInput === sample.content
                            ? "border-sky-500 bg-sky-50/60 dark:bg-sky-950/40"
                            : "border-slate-200 dark:border-slate-800 hover:border-sky-400 bg-slate-50/50 dark:bg-slate-900/50"
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                          <span>{sample.title}</span>
                          {sample.id === "sample-free-laptop-poster" && (
                            <Badge variant="urgent" size="sm">
                              Poster Sample
                            </Badge>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {sample.sender}
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Detailed Heuristic Breakdown */}
            {analysisResult && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <span>Identified Threat Indicators ({analysisResult.indicators.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisResult.indicators.length > 0 ? (
                      analysisResult.indicators.map((ind, i) => (
                        <div
                          key={i}
                          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {ind.label}
                            </span>
                            <Badge
                              variant={
                                ind.severity === "high"
                                  ? "urgent"
                                  : ind.severity === "medium"
                                  ? "accent"
                                  : "outline"
                              }
                              size="sm"
                            >
                              {ind.severity.toUpperCase()}
                            </Badge>
                          </div>
                          <div className="p-2 rounded-lg bg-amber-100/60 dark:bg-amber-950/40 text-[11px] font-mono text-amber-900 dark:text-amber-200">
                            &ldquo;{ind.detected_text}&rdquo;
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                            {ind.explanation}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                        <ShieldCheck className="w-8 h-8 mx-auto text-emerald-500" />
                        <p>No high-risk keywords detected in the message.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lock className="w-4 h-4 text-emerald-500" />
                      <span>Safe Defense Guidelines</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      {analysisResult.safe_recommendations.map((rec, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 text-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-slate-700 dark:text-slate-200 leading-relaxed">
                            {rec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TAKE A QUIZ (INTERACTIVE CYBER CHALLENGE)           */}
        {/* ========================================================= */}
        {activeTab === "quiz" && (
          <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
            {!quizFinished ? (
              <Card className="border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden">
                <div className="p-4 bg-gradient-to-r from-sky-600 to-indigo-700 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-200" />
                    <span className="font-bold text-sm">
                      CyberSafe Quiz • Challenge {currentQuizIndex + 1} of {CYBER_QUIZ_QUESTIONS.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    <Trophy className="w-3.5 h-3.5 text-amber-300" />
                    <span>+{quizScore} Points</span>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Scenario Pill */}
                  <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200">
                    <span className="font-bold uppercase tracking-wider text-[10px] block mb-1 text-sky-600 dark:text-sky-400">
                      Simulated Security Scenario
                    </span>
                    {CYBER_QUIZ_QUESTIONS[currentQuizIndex].scenario}
                  </div>

                  {/* Question */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {CYBER_QUIZ_QUESTIONS[currentQuizIndex].question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {CYBER_QUIZ_QUESTIONS[currentQuizIndex].options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      const isCorrect = idx === CYBER_QUIZ_QUESTIONS[currentQuizIndex].correctIndex;

                      let btnStyle =
                        "border-slate-200 dark:border-slate-800 hover:border-sky-500 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200";

                      if (quizAnswered) {
                        if (isCorrect) {
                          btnStyle =
                            "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold";
                        } else if (isSelected) {
                          btnStyle =
                            "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100";
                        } else {
                          btnStyle =
                            "border-slate-200 dark:border-slate-800 opacity-60 text-slate-500";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={quizAnswered}
                          onClick={() => handleSelectQuizOption(idx)}
                          className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {quizAnswered && isCorrect && (
                            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {quizAnswered && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {quizAnswered && (
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-in fade-in">
                      <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <Info className="w-4 h-4 text-sky-500" />
                        <span>Security Concept Explanation:</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {CYBER_QUIZ_QUESTIONS[currentQuizIndex].explanation}
                      </p>
                    </div>
                  )}

                  {/* Next Button */}
                  {quizAnswered && (
                    <div className="flex justify-end pt-2">
                      <button
                        onClick={handleNextQuizQuestion}
                        className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
                      >
                        <span>
                          {currentQuizIndex < CYBER_QUIZ_QUESTIONS.length - 1
                            ? "Next Question"
                            : "Complete Challenge"}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Quiz Results Summary */
              <Card className="border-slate-200 dark:border-slate-800 shadow-xl text-center p-8 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 mx-auto flex items-center justify-center">
                  <Trophy className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    CyberSafe Challenge Complete!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    You scored <strong>{quizScore} points</strong> across {CYBER_QUIZ_QUESTIONS.length} threat scenarios.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Unlocked Badge: CyberSafe Defender</span>
                </div>
                <div>
                  <button
                    onClick={handleRestartQuiz}
                    className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Challenge Again</span>
                  </button>
                </div>
              </Card>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: LEARN TIPS (POSTER PILLAR 8 TIPS VIEW)             */}
        {/* ========================================================= */}
        {activeTab === "tips" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center font-bold">
                  🔗
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  1. Spot Spoofed &amp; Unknown Links
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Never click shortened links (bit.ly, t.co) or suspicious domains (.tk, .xyz, raw IP numbers). Hover over links to inspect the real URL before clicking.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
                  ⏰
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  2. Beware of Artificial Urgency
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Attackers create panic with messages like &ldquo;Account suspended in 1 hour!&rdquo; Pause and deliberate. Legitimate schools never delete student records without prior notice.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                  🔑
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  3. Guard Credentials &amp; 2FA Codes
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Never share your password, PIN, or SMS one-time password (OTP) with anyone. School IT administrators will never request your password via chat or email.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center font-bold">
                  🎁
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  4. Free Gifts &amp; Laptop Scams
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  &ldquo;You have won a free laptop!&rdquo; is a textbook lure. If you did not enter a verified competition, unexpected prizes are guaranteed tricks to steal information.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center font-bold">
                  📡
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  5. Public Wi-Fi Precautions
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Avoid logging into sensitive academic accounts or banking portals while on open public networks. Use encrypted HTTPS connections and a trusted VPN.
                </p>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800 p-5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950/60 text-teal-600 flex items-center justify-center font-bold">
                  🛡️
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  6. Official Verification
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  When in doubt, report any suspicious emails or messages to the School Administration Office on Station Road or email <span className="font-mono">support@gbhssqazisultan.edu.pk</span>.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

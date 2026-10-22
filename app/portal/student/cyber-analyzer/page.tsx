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
} from "lucide-react";

export default function CyberThreatAnalyzerPage() {
  const [messageInput, setMessageInput] = useState("");
  const [analysisResult, setAnalysisResult] = useState<CyberAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (textToAnalyze?: string) => {
    const text = textToAnalyze !== undefined ? textToAnalyze : messageInput;
    if (!text.trim()) return;

    setIsAnalyzing(true);
    // Simulate brief algorithmic inspection for realistic UX
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

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Cyber Threat Analyzer", href: "/portal/student/cyber-analyzer" },
      ]}
      title="AI Cybersecurity Threat & Phishing Analyzer"
      description="Inspect suspicious emails, SMS messages, and unexpected requests using transparent heuristic detection and social engineering analysis."
    >
      <div className="space-y-6">
        {/* Important Ethical & Safety Disclaimer */}
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Cybersecurity Analysis Principles
            </span>
            <p className="leading-relaxed">
              1. <strong>Suspicious does not automatically mean fraudulent</strong> — context matters.
              2. <strong>A clean report does NOT guarantee absolute safety</strong> — novel zero-day lures may not trigger known rules.
              3. <strong>Never click unverified links</strong> — this tool strictly avoids resolving or executing external URLs.
            </p>
          </div>
        </div>

        {/* Input & Demonstration Presets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-sky-500" />
                  <span>Inspect Message Content</span>
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
                    rows={6}
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Paste the suspicious email, text message, or chat snippet here for security evaluation..."
                    className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono leading-relaxed focus:ring-2 focus:ring-sky-500 focus:outline-hidden"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Characters: {messageInput.length}
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
          </div>

          {/* Demonstration Presets */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Classroom Demonstration Scenarios</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <p className="text-xs text-slate-500">
                  Select a synthetic scenario to demonstrate different risk indicators:
                </p>
                {SYNTHETIC_CYBER_EXAMPLES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleLoadSample(sample)}
                    className="w-full text-left p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 dark:hover:border-sky-500 bg-slate-50/50 dark:bg-slate-900/50 transition-colors space-y-1"
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {sample.title}
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

        {/* Results Workspace */}
        {analysisResult && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Risk Overview Banner */}
            <div
              className={`p-6 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs ${
                analysisResult.risk_level === "high_risk_alert"
                  ? "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100"
                  : analysisResult.risk_level === "medium_concern"
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-100"
                  : "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100"
              }`}
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      analysisResult.risk_level === "high_risk_alert"
                        ? "urgent"
                        : analysisResult.risk_level === "medium_concern"
                        ? "accent"
                        : "secondary"
                    }
                    size="sm"
                  >
                    {analysisResult.risk_level.toUpperCase().replace(/_/g, " ")}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    Calculated at {new Date(analysisResult.analyzed_at).toLocaleTimeString()}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold">{analysisResult.summary}</h3>
                <p className="text-xs opacity-90 leading-relaxed">
                  {analysisResult.official_verification_tip}
                </p>
              </div>

              {/* Threat Gauge */}
              <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/60 shrink-0 min-w-[140px]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Risk Score
                </span>
                <span
                  className={`text-3xl font-black ${
                    analysisResult.risk_score >= 60
                      ? "text-rose-600 dark:text-rose-400"
                      : analysisResult.risk_score >= 25
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {analysisResult.risk_score}
                  <span className="text-xs font-normal text-slate-400">/100</span>
                </span>
                <span className="text-[11px] text-slate-500 font-semibold mt-1">
                  {analysisResult.indicators.length} Indicator(s)
                </span>
              </div>
            </div>

            {/* Warning Signs Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Highlighted Warning Indicators</span>
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

                        <div className="text-[11px] font-semibold text-sky-700 dark:text-sky-300 flex items-start gap-1.5 pt-1">
                          <ShieldCheck className="w-3.5 h-3.5 shrink-0 mt-0.5 text-emerald-500" />
                          <span>Action: {ind.safe_action}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400 space-y-2">
                      <ShieldCheck className="w-8 h-8 mx-auto text-emerald-500" />
                      <p>No critical social engineering phrases detected in the text.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recommended Next Steps */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    <span>Safe Defense Checklist</span>
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

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                      Need Further Practice?
                    </span>
                    <Link
                      href="/portal/student/games"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-sky-600 hover:text-sky-700 dark:text-sky-400"
                    >
                      <span>Play the CyberSafe Phishing Interactive Challenge</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

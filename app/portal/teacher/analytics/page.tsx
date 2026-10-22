"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import { TeacherAnalyticsSummary, LearningResource } from "@/types/portal";
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Users,
  Gamepad2,
  Library,
  ArrowRight,
  Info,
  Layers,
  FileQuestion,
  Sparkles,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { generateTeacherClassInsights } from "@/lib/ai/academic-insights";

export default function TeacherAnalyticsPage() {
  // Teacher identification (Dr. Robert Chen in seed data)
  const currentTeacherId = "10000000-0000-0000-0000-000000000001";

  const [analytics] = useState<TeacherAnalyticsSummary[]>(() =>
    schoolStore.getTeacherClassLearningAnalytics(currentTeacherId)
  );
  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    const list = schoolStore.getTeacherClassLearningAnalytics(currentTeacherId);
    return list.length > 0 ? list[0].class_id : "";
  });
  const [resources] = useState<LearningResource[]>(() =>
    schoolStore.getLearningResources({ isPublishedOnly: true })
  );
  const [recommendSuccess, setRecommendSuccess] = useState<string | null>(null);

  const activeSummary = analytics.find((a) => a.class_id === selectedClassId) || analytics[0];
  const aiInsights = generateTeacherClassInsights(selectedClassId, currentTeacherId);

  const handleRecommendResource = (resource: LearningResource) => {
    setRecommendSuccess(`Recommended "${resource.title}" to ${activeSummary?.class_name || "class"}. Notification dispatched to enrolled scholars.`);
    setTimeout(() => setRecommendSuccess(null), 4000);
  };

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Learning Analytics & AI", href: "/portal/teacher/analytics" },
      ]}
      title="Cohort Learning Analytics & AI Diagnostic Insights"
      description="Assess cohort completion rates, diagnose struggling topics ethically, and dispatch targeted curriculum resources."
    >
      <div className="space-y-8">
      {/* Toast */}
      {recommendSuccess && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{recommendSuccess}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Formative Academic Diagnostics</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Class Learning Analytics & Diagnostic Insights
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Aggregated performance metrics across your assigned cohorts. Analytics are scoped exclusively to your authorized curriculum assignments.
          </p>
        </div>

        {/* Class Selector Dropdown */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
          <Layers className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Cohort:</span>
          <select
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            {analytics.map((item) => (
              <option key={item.class_id} value={item.class_id}>
                {item.class_name} ({item.total_students} Scholars)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ethical Clarity Banner */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-900 leading-relaxed">
          <span className="font-bold">Formative Guidance Principle:</span> These metrics reflect practice quiz participation and formative learning exercises. They are presented neutrally to support instructional pacing and provide targeted reviews. They are strictly distinguished from official examination mark records.
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Cohort Enrollment
            </span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {activeSummary.total_students}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Active students in {activeSummary.class_name}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Quiz Completion Rate
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {activeSummary.average_completion_rate}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {activeSummary.total_quizzes} active quizzes assigned
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Average Quiz Score
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {activeSummary.average_score_percentage}%
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Formative practice average
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Educational Game Drills
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {activeSummary.games_engagement_count}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Challenge sessions completed
          </div>
        </div>
      </div>

      {/* Main Grid: Struggling Topics & Score Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Concepts Requiring Reinforcement */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-rose-600" />
                Frequently Missed Concepts
              </h2>
              <p className="text-xs text-slate-500">
                Identified based on aggregated incorrect responses in practice quizzes
              </p>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Targeted Review
            </span>
          </div>

          <div className="space-y-3 pt-2">
            {activeSummary.struggling_topics.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">{item.topic}</span>
                  <span className="font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                    {item.missed_rate}% error rate
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-rose-500 h-full rounded-full"
                    style={{ width: `${item.missed_rate}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Curriculum Domain: {item.subject}. Suggested action: Conduct an in-class problem walk-through or assign supplementary laboratory packets.
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/portal/teacher/quizzes/new"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              <span>Create targeted remediation quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* AI-Assisted Academic Insights Panel */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-bold mb-1">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                <span>AI-Assisted Instructional Insights</span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900">
                Cohort Error Analysis & Pedagogical Guidance ({activeSummary.class_name})
              </h2>
              <p className="text-xs text-slate-500">
                Synthesized from verified assessment attempts. Measured statistics are strictly separated from AI suggestions.
              </p>
            </div>
            <div className="text-[11px] text-slate-400">
              Generated: {new Date(aiInsights.generated_at).toLocaleTimeString()}
            </div>
          </div>

          {/* Overall AI Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-sky-50/70 to-indigo-50/70 border border-sky-100 text-xs text-slate-800 space-y-1.5 leading-relaxed">
            <span className="font-bold text-sky-900 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-sky-600" />
              <span>Instructional Overview</span>
            </span>
            <p>{aiInsights.overall_class_summary}</p>
          </div>

          {/* Insufficient Data Notice if applicable */}
          {!aiInsights.has_sufficient_data ? (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Insufficient data for cohort diagnostics. Minimum 2 quiz submissions required to detect pattern correlations.
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* High-Error Topics */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Topics Requiring Additional Practice
                </h3>
                <div className="space-y-3">
                  {aiInsights.high_error_topics.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {item.topic} ({item.subject})
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-700">
                          {item.missed_rate}% Non-Mastery
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-600 font-medium">
                        <strong>Measured Data:</strong> {item.supporting_stats}
                      </div>
                      <div className="text-[11px] text-sky-800 bg-sky-50/80 p-2 rounded-lg border border-sky-100">
                        <strong>Recommended Action:</strong> {item.recommended_revision}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Frequently Missed Questions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Frequently Missed Questions
                </h3>
                <div className="space-y-3">
                  {aiInsights.frequently_missed_questions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2"
                    >
                      <div className="text-xs font-semibold text-slate-900 line-clamp-2">
                        &ldquo;{q.question_text}&rdquo;
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Quiz: {q.quiz_title} • Missed by {q.missed_count} of {q.total_attempts} attempts
                      </div>
                      <div className="text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                        <strong>Misconception Diagnostic:</strong> {q.common_misconception}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Ethical Guardrail Disclaimer */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
            <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span>
              Ethical Guardrail: AI insights do not discipline students or assign term grades automatically. They serve purely as voluntary instructional feedback for faculty lesson planning.
            </span>
          </div>
        </div>

        {/* Recommend Library Resources to this Class */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Library className="w-4 h-4 text-sky-600" />
                Curate & Recommend Library Materials
              </h2>
              <p className="text-xs text-slate-500">
                Recommend foundational resources for {activeSummary.class_name}
              </p>
            </div>
            <Link
              href="/portal/teacher/library"
              className="text-xs font-bold text-sky-600 hover:text-sky-700"
            >
              Manage Vault
            </Link>
          </div>

          <div className="space-y-3 pt-2">
            {resources.slice(0, 4).map((res) => (
              <div
                key={res.id}
                className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded">
                      {res.resource_type}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 truncate">
                      {res.title}
                    </h3>
                  </div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">
                    Topic: {res.topic} • {res.downloads_count} views
                  </div>
                </div>

                <button
                  onClick={() => handleRecommendResource(res)}
                  className="px-3 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 rounded-lg text-xs font-bold shrink-0 transition-colors"
                >
                  Recommend
                </button>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Enrolled scholars receive an in-portal notification</span>
            <Link
              href="/portal/teacher/library"
              className="font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              <span>View all materials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
      </div>
    </PortalLayout>
  );
}

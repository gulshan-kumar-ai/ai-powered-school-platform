"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import {
  Quiz,
  BadgeDefinition,
  GameDefinition,
} from "@/types/portal";
import {
  HelpCircle,
  Trophy,
  Gamepad2,
  Award,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Eye,
  X,
  Sparkles,
} from "lucide-react";

export default function AdminLearningPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => schoolStore.getQuizzes());
  const [badges] = useState<BadgeDefinition[]>(() => schoolStore.getBadges());
  const [games] = useState<GameDefinition[]>(() => schoolStore.getGameDefinitions());
  const [leaderboardEnabled, setLeaderboardEnabled] = useState(true);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleToggleQuizPublish = (quiz: Quiz) => {
    const updated = schoolStore.updateQuiz(quiz.id, {
      is_published: !quiz.is_published,
    });
    if (updated) {
      setNotification({
        type: "success",
        message: `Quiz "${quiz.title}" status updated to ${
          updated.is_published ? "Published (Visible to students)" : "Withdrawn (Hidden from students)"
        }.`,
      });
      setQuizzes(schoolStore.getQuizzes());
    }
  };

  const handleToggleLeaderboard = () => {
    setLeaderboardEnabled(!leaderboardEnabled);
    setNotification({
      type: "success",
      message: `Schoolwide practice leaderboard has been ${!leaderboardEnabled ? "Enabled" : "Disabled"}.`,
    });
  };

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Learning & Quizzes", href: "/portal/admin/learning" },
      ]}
      title="Curriculum Learning, Quizzes & Gamification Governance"
      description="Audit student assessment standards, toggle practice leaderboards, and monitor honors badges catalog."
    >
      <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
            notification.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Learning Governance</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Learning Platform, Quizzes & Gamification Controls
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            System administration for formative test assessments, gamification economy, badge definitions, and educational game modules.
          </p>
        </div>

        {/* Global Policy Toggle */}
        <button
          onClick={handleToggleLeaderboard}
          className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
            leaderboardEnabled
              ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
              : "bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200"
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Leaderboard: {leaderboardEnabled ? "Active (Safe Mode)" : "Disabled"}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Quizzes
            </span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {quizzes.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {quizzes.filter((q) => q.is_published).length} published active
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Game Challenge Suites
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {games.length} Active
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Knowledge, Mastery, CyberSafe
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Scholastic Badges
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {badges.length} Defined
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Automated server unlock rules
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Ledger Economy
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            Protected
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Replay & duplicate attack safe
          </div>
        </div>
      </div>

      {/* Quizzes Moderation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Assessment Quizzes Governance
            </h2>
            <p className="text-xs text-slate-500">
              Control publication status and verify test configurations across all school departments
            </p>
          </div>
          <Link
            href="/portal/teacher/quizzes/new"
            className="text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            Open Quiz Builder
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Quiz & Topic</th>
                <th className="px-4 py-3">Subject & Target</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Parameters</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quizzes.map((quiz) => (
                <tr key={quiz.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-bold text-slate-900">{quiz.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Topic: {quiz.topic}</div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{quiz.subject_name}</div>
                    <div className="text-[11px] text-slate-500">{quiz.section_name || "All Enrolled"}</div>
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-slate-700">
                    {quiz.creator_name}
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                    {quiz.time_limit_minutes}m • {quiz.pass_percentage}% pass • {quiz.max_attempts} att
                  </td>

                  <td className="px-4 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleQuizPublish(quiz)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                        quiz.is_published
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                          : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${quiz.is_published ? "bg-emerald-500" : "bg-slate-400"}`} />
                      {quiz.is_published ? "Published" : "Withdrawn"}
                    </button>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                    <Link
                      href={`/portal/student/quizzes/${quiz.id}`}
                      target="_blank"
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors inline-block"
                      title="Inspect Student Quiz View"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gamification Badge Definitions Catalog */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              Scholastic Achievement Catalog
            </h2>
            <p className="text-xs text-slate-500">
              Server-evaluated criteria and reward point weighting
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {badges.length} Standard Badges
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {badges.map((b) => (
            <div key={b.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{b.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                  {b.rarity}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-snug">{b.description}</p>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                Rule: <span className="font-semibold text-slate-700">{b.criteria_description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </PortalLayout>
  );
}

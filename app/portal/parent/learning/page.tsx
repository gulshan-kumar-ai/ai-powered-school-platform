"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import {
  StudentRecord,
  QuizAttempt,
  GameSession,
  StudentBadge,
  LearningProgressSummary,
} from "@/types/portal";
import {
  Sparkles,
  Award,
  CheckCircle2,
  Gamepad2,
  HelpCircle,
  TrendingUp,
  Info,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function ParentLearningPage() {
  // Authenticated Parent (Eleanor Vance in verified seed data)
  const currentParentId = "30000000-0000-0000-0000-000000000001";

  const [children] = useState<StudentRecord[]>(() =>
    schoolStore.getParentLinkedChildren(currentParentId)
  );

  const [selectedChildId, setSelectedChildId] = useState<string>(() => {
    const linked = schoolStore.getParentLinkedChildren(currentParentId);
    return linked.length > 0 ? linked[0].id : "";
  });

  const [summary, setSummary] = useState<{
    student: StudentRecord;
    progress: LearningProgressSummary;
    recentAttempts: QuizAttempt[];
    recentGameSessions: GameSession[];
    badges: StudentBadge[];
  } | null>(() => {
    const linked = schoolStore.getParentLinkedChildren(currentParentId);
    return linked.length > 0 ? schoolStore.getParentChildLearningSummary(linked[0].id) : null;
  });

  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId);
    const childSum = schoolStore.getParentChildLearningSummary(childId);
    setSummary(childSum);
  };

  if (children.length === 0 || !summary) {
    return (
      <PortalLayout
        requiredRole="parent"
        breadcrumbs={[
          { label: "Parent Oversight Portal", href: "/portal/parent" },
          { label: "Child Learning & Progress", href: "/portal/parent/learning" },
        ]}
        title="Child Digital Learning & Progress Overview"
        description="Review your child's digital practice quiz participation, educational games mastery, and scholastic honors."
      >
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-xl mx-auto my-12">
          <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h2 className="text-base font-bold text-slate-800">No Linked Scholars Found</h2>
          <p className="text-xs text-slate-500 mt-1">
            Your guardian profile has not been assigned a linked enrolled scholar. Contact school admissions.
          </p>
        </div>
      </PortalLayout>
    );
  }

  const { student, progress, recentAttempts, recentGameSessions, badges } = summary;

  return (
    <PortalLayout
      requiredRole="parent"
      breadcrumbs={[
        { label: "Parent Oversight Portal", href: "/portal/parent" },
        { label: "Child Learning & Progress", href: "/portal/parent/learning" },
      ]}
      title="Child Digital Learning & Progress Overview"
      description="Review your child's digital practice quiz participation, educational games mastery, and scholastic honors."
    >
      <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Guardian Academic Companion</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Child Digital Learning & Progress Overview
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Review your child&apos;s digital practice quiz participation, educational games mastery, and scholarly honors.
          </p>
        </div>

        {/* Child Selector */}
        {children.length > 1 && (
          <div className="flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-600">Select Child:</span>
            <select
              value={selectedChildId}
              onChange={(e) => handleSelectChild(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
            >
              {children.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.profile?.full_name} ({c.student_number})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Selected Child Header Card */}
      <div className="bg-gradient-to-r from-slate-900 to-sky-950 text-white rounded-2xl p-6 border border-sky-800/40 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs uppercase font-bold text-sky-300 tracking-wider">
            Linked Ward Profile
          </span>
          <h2 className="text-2xl font-extrabold">{student.profile?.full_name}</h2>
          <div className="text-xs text-slate-300 flex items-center gap-3">
            <span>Scholar ID: <strong>{student.student_number}</strong></span>
            <span>•</span>
            <span>Current Tier: <strong>{progress.level_title} (Level {progress.level})</strong></span>
          </div>
        </div>

        <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl px-5 py-3 flex items-center gap-4 shrink-0 shadow-md">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Learning Points</div>
            <div className="text-xl font-extrabold text-amber-400">{progress.total_points.toLocaleString()} pts</div>
          </div>
          <div className="h-8 w-px bg-slate-700" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Achievements</div>
            <div className="text-xl font-extrabold text-sky-400">{badges.length} Badges</div>
          </div>
        </div>
      </div>

      {/* Distinction & Clarity Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="text-xs text-sky-900 leading-relaxed">
          <span className="font-bold">Guardian Notice:</span> Practice quizzes and educational games are formative learning tools intended to reinforce classroom instruction. They are strictly separate from official end-of-term examination mark sheets and report cards (which can be accessed under the &quot;Published Results&quot; tab).
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Quizzes Practiced
            </span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.quizzes_completed}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            <span className="font-semibold text-sky-600">{progress.average_quiz_score}%</span> avg score
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Educational Games
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.games_played}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Interactive sessions completed
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Badges & Honors
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {badges.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Verified server achievements
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Learning Consistency
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.streak_days} Days
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Active daily study streak
          </div>
        </div>
      </div>

      {/* Main Grid: Left side Attempts & Games, Right side Badges & Recommended Resources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Practice Quiz Attempts */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                Recent Practice Quizzes
              </h3>
              <p className="text-xs text-slate-500">
                Formative test submissions and self-assessments
              </p>
            </div>
            <Link
              href="/portal/parent/results"
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
            >
              <span>Official Exams</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAttempts.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No quiz attempts recorded for this student yet.
              </div>
            ) : (
              recentAttempts.map((att) => (
                <div
                  key={att.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">
                      {att.quiz_title || "Practice Quiz Assessment"}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>Attempt #{att.attempt_number}</span>
                      <span>•</span>
                      <span>{new Date(att.submitted_at).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-bold ${
                        att.passed
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {att.percentage}%
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {att.score} / {att.total_possible} pts
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Educational Game Sessions */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-indigo-600" />
                Educational Game Challenges
              </h3>
              <p className="text-xs text-slate-500">
                Interactive drills in Knowledge, Mastery & Cyber Safety
              </p>
            </div>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
              Verified Play Sessions
            </span>
          </div>

          <div className="space-y-3">
            {recentGameSessions.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                No educational game sessions logged yet.
              </div>
            ) : (
              recentGameSessions.map((session) => (
                <div
                  key={session.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-slate-900 truncate">
                      {session.game_title}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Topic: {session.topic} • {session.correct_answers}/{session.questions_answered} Correct
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {session.accuracy_percentage}% Accuracy
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Score: {session.score} pts
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Earned Badges Showcase */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                Scholastic Badges Earned
              </h3>
              <p className="text-xs text-slate-500">
                Honors unlocked through demonstrated mastery
              </p>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              {badges.length} Unlocked
            </span>
          </div>

          <div className="space-y-2.5">
            {badges.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/40 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {b.badge?.name}
                    </h4>
                    <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                      {b.badge?.rarity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {b.badge?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Review Topics */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-sky-600" />
                Recommended Focus Areas
              </h3>
              <p className="text-xs text-slate-500">
                Helpful topics to encourage your child to practice
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {progress.recommended_topics.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-sky-100 bg-sky-50/40 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                    {item.subject}
                  </span>
                  <span className="text-[11px] font-bold text-slate-800">{item.topic}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.reason}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2 text-center text-xs text-slate-400">
            Encourage 15 minutes of daily practice drills for consistent retention.
          </div>
        </div>
      </div>
      </div>
    </PortalLayout>
  );
}

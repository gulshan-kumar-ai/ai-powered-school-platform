"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import {
  LearningProgressSummary,
  BadgeDefinition,
  StudentBadge,
} from "@/types/portal";
import {
  Sparkles,
  Trophy,
  Award,
  Flame,
  CheckCircle2,
  Lock,
  BookOpen,
  Gamepad2,
  TrendingUp,
  HelpCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Info,
  X,
  ExternalLink,
} from "lucide-react";
import {
  getPersonalizedRecommendations,
  dismissRecommendation,
  resetDismissedRecommendations,
} from "@/lib/ai/recommendations-engine";
import { PersonalizedRecommendation } from "@/types/portal";

export default function StudentProgressPage() {
  // Active student ID (Alex Vance in seed data)
  const currentStudentId = "20000000-0000-0000-0000-000000000001";

  const [progress] = useState<LearningProgressSummary>(() =>
    schoolStore.getStudentLearningProgress(currentStudentId)
  );
  const [allBadges] = useState<BadgeDefinition[]>(() => schoolStore.getBadges());
  const [earnedBadges] = useState<StudentBadge[]>(() =>
    schoolStore.getStudentBadges(currentStudentId)
  );
  const [leaderboard] = useState<
    {
      rank: number;
      studentId: string;
      displayName: string;
      points: number;
      badgesCount: number;
      levelTitle: string;
    }[]
  >(() => schoolStore.getLeaderboard());

  const [recommendations, setRecommendations] = useState<PersonalizedRecommendation[]>(() =>
    getPersonalizedRecommendations(currentStudentId)
  );

  const handleDismiss = (id: string) => {
    dismissRecommendation(id);
    setRecommendations(getPersonalizedRecommendations(currentStudentId));
  };

  const handleResetRecommendations = () => {
    resetDismissedRecommendations();
    setRecommendations(getPersonalizedRecommendations(currentStudentId));
  };

  // Calculate level progress percentage
  const nextTarget = progress.current_level_points + progress.points_to_next_level;
  const levelPercent =
    nextTarget > 0
      ? Math.min(100, Math.round((progress.current_level_points / nextTarget) * 100))
      : 100;

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Learning Progress & AI", href: "/portal/student/progress" },
      ]}
      title="Scholar Learning Mastery, Gamification & AI Recommendations"
      description="Track your academic levels, earned badges, points history, and AI-recommended learning paths."
    >
      <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-sky-800/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-sky-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Adaptive Learning Portfolio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Learning Progress & Achievements
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
              Track your quiz practice mastery, educational game challenges, and earned scholarly badges. All awards are verified on the school server.
            </p>
          </div>

          {/* Quick Level Badge Card */}
          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
              <Trophy className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300 font-bold">
                Tier Level {progress.level}
              </div>
              <div className="text-lg font-bold text-white leading-tight">
                {progress.level_title}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {progress.total_points.toLocaleString()} Total Learning Points
              </div>
            </div>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-medium text-slate-300 mb-2">
            <span>Progress to Next Rank</span>
            <span>
              {progress.points_to_next_level > 0
                ? `${progress.points_to_next_level} pts required for next tier`
                : "Highest Rank Achieved!"}
            </span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-sky-500 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-sm"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Quizzes Passed
            </span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.quizzes_completed}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-sky-600">{progress.average_quiz_score}%</span> avg score
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Games Played
            </span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Gamepad2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.games_played}
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-indigo-600">3 game types</span> active
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Badges Earned
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {earnedBadges.length} <span className="text-xs font-normal text-slate-400">/ {allBadges.length}</span>
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {(allBadges.length - earnedBadges.length)} achievements locked
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Learning Streak
            </span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {progress.streak_days} <span className="text-xs font-normal text-slate-400">Days</span>
          </div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="font-semibold text-rose-600">+10 pt</span> daily consistency
          </div>
        </div>
      </div>

      {/* Main Grid: Left side Badges & Recommendations, Right side Leaderboard & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 cols wide) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Diagnostic Note / Clarity */}
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-xs text-sky-900 leading-relaxed">
              <span className="font-bold">Fair & Transparent Evaluation:</span> Practice quiz performance and game sessions are formative learning tools designed to promote mastery. They are distinctly separate from official summative examination grades. Recommendations are explainable suggestions based on recorded performance.
            </div>
          </div>

          {/* AI Personalized Learning Recommendations Section */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-[11px] font-bold mb-1">
                  <Sparkles className="w-3 h-3 text-sky-600" />
                  <span>AI Personalised Recommendations</span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900">
                  Targeted Learning Suggestions
                </h2>
                <p className="text-xs text-slate-500">
                  Tailored based on your recent quiz attempts and library engagement. Recommendations are dismissible learning aids.
                </p>
              </div>

              {recommendations.length < 3 && (
                <button
                  onClick={handleResetRecommendations}
                  className="text-xs text-slate-400 hover:text-slate-600 inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Restore Dismissed</span>
                </button>
              )}
            </div>

            {recommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {recommendations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between space-y-3 relative group"
                  >
                    <button
                      onClick={() => handleDismiss(rec.id)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                      title="Dismiss this recommendation"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div className="space-y-1.5 pr-6">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-sky-100 text-sky-800">
                          {rec.type.replace(/_/g, " ")}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {rec.subject_name}
                        </span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug">
                        {rec.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {rec.rationale}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Level: {rec.difficulty}
                      </span>
                      <Link
                        href={rec.action_url}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition-colors shadow-2xs"
                      >
                        <span>Start Activity</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-slate-400 space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500" />
                <p>All current recommendations completed or dismissed.</p>
                <button
                  onClick={handleResetRecommendations}
                  className="text-xs text-sky-600 hover:underline font-semibold cursor-pointer"
                >
                  Refresh suggestions
                </button>
              </div>
            )}
          </div>

          {/* Badges Gallery */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Scholastic Achievements & Badges
                </h2>
                <p className="text-xs text-slate-500">
                  Complete learning challenges, practice drills, and cybersecurity scenarios to unlock honors.
                </p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                {earnedBadges.length} of {allBadges.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {allBadges.map((badge) => {
                const earned = earnedBadges.find((b) => b.badge_id === badge.id);
                const isEarned = Boolean(earned);

                let rarityColor = "bg-slate-100 text-slate-700 border-slate-200";
                if (badge.rarity === "legendary") rarityColor = "bg-amber-100 text-amber-800 border-amber-300";
                else if (badge.rarity === "epic") rarityColor = "bg-purple-100 text-purple-800 border-purple-300";
                else if (badge.rarity === "rare") rarityColor = "bg-sky-100 text-sky-800 border-sky-300";

                return (
                  <div
                    key={badge.id}
                    className={`rounded-xl p-4 border transition-all ${
                      isEarned
                        ? "bg-slate-50/70 border-slate-200/90 hover:bg-slate-50"
                        : "bg-slate-50/30 border-dashed border-slate-300 opacity-75"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                          isEarned
                            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/20"
                            : "bg-slate-200 text-slate-400"
                        }`}
                      >
                        {isEarned ? (
                          <Award className="w-5 h-5" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`text-sm font-bold truncate ${
                              isEarned ? "text-slate-900" : "text-slate-600"
                            }`}
                          >
                            {badge.name}
                          </h3>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border shrink-0 ${rarityColor}`}
                          >
                            {badge.rarity}
                          </span>
                        </div>

                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {badge.description}
                        </p>

                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 truncate">
                            {isEarned ? (
                              <span className="text-emerald-600 font-semibold inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" /> Unlocked
                              </span>
                            ) : (
                              <span className="text-slate-400 italic">
                                {badge.criteria_description}
                              </span>
                            )}
                          </span>
                          {isEarned && earned?.awarded_at && (
                            <span className="text-[10px] text-slate-400 shrink-0">
                              {new Date(earned.awarded_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Topics for Practice */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-sky-600" />
                  Recommended Practice Topics
                </h2>
                <p className="text-xs text-slate-500">
                  Adaptive suggestions generated transparently from your recent practice quiz assessments.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {progress.recommended_topics.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-sky-100 bg-sky-50/40 hover:bg-sky-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded">
                        {item.subject}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">{item.topic}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      href="/portal/student/library"
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                      <span>Library</span>
                    </Link>
                    <Link
                      href="/portal/student/games"
                      className="px-3 py-1.5 text-xs font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <Gamepad2 className="w-3.5 h-3.5 text-sky-200" />
                      <span>Practice</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard & Activity Timeline */}
        <div className="space-y-8">
          {/* Practice Leaderboard */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Class Practice Board
                </h3>
                <p className="text-[11px] text-slate-500">
                  Weekly formative practice engagement
                </p>
              </div>
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Section 10-A
              </span>
            </div>

            <div className="space-y-2">
              {leaderboard.map((user) => {
                const isCurrent = user.studentId === currentStudentId;
                let rankBadge = "bg-slate-100 text-slate-700";
                if (user.rank === 1) rankBadge = "bg-amber-100 text-amber-800 font-bold";
                else if (user.rank === 2) rankBadge = "bg-slate-200 text-slate-800 font-bold";
                else if (user.rank === 3) rankBadge = "bg-amber-50 text-amber-700 font-bold";

                return (
                  <div
                    key={user.studentId}
                    className={`flex items-center justify-between p-2.5 rounded-lg border text-xs transition-colors ${
                      isCurrent
                        ? "bg-sky-50/80 border-sky-300 font-medium"
                        : "bg-white border-slate-100 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${rankBadge}`}
                      >
                        #{user.rank}
                      </span>
                      <div className="truncate">
                        <div className="font-semibold text-slate-900 truncate">
                          {user.displayName} {isCurrent && <span className="text-[10px] text-sky-600 font-bold">(You)</span>}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {user.levelTitle}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-bold text-slate-900">
                        {user.points.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">pts</span>
                      </div>
                      <div className="text-[10px] text-amber-600 font-medium flex items-center justify-end gap-1">
                        <Award className="w-3 h-3" />
                        <span>{user.badgesCount} badges</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                Privacy Protected
              </span>
              <span>Pseudonymized roster</span>
            </div>
          </div>

          {/* Recent Learning Activity Feed */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              Recent Practice History
            </h3>

            {progress.recent_activities.length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs">
                No recent activity recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {progress.recent_activities.map((act) => (
                  <div key={act.id} className="relative pl-5 pb-4 border-l-2 border-slate-100 last:border-l-0 last:pb-0">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-white" />
                    <div className="text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-slate-900 truncate">
                          {act.title}
                        </span>
                        {act.points_earned && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded shrink-0">
                            +{act.points_earned} pts
                          </span>
                        )}
                      </div>
                      <p className="text-slate-500 text-[11px] mt-0.5 leading-snug">
                        {act.details}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {new Date(act.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-center">
              <Link
                href="/portal/student/quizzes"
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1"
              >
                <span>Browse more quizzes & challenges</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </PortalLayout>
  );
}

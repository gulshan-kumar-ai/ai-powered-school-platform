"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { GameSession } from "@/types/portal";
import {
  Gamepad2,
  Zap,
  Target,
  ShieldAlert,
  Play,
  Trophy,
} from "lucide-react";

export default function StudentGamesPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const gameDefs = schoolStore.getGameDefinitions();
  const [sessions] = useState<GameSession[]>(() =>
    schoolStore.getStudentGameSessions(studentId)
  );

  const getGameIcon = (id: string) => {
    switch (id) {
      case "knowledge_challenge":
        return <Zap className="w-6 h-6 text-amber-500" />;
      case "topic_mastery":
        return <Target className="w-6 h-6 text-sky-600" />;
      case "cybersafe_challenge":
        return <ShieldAlert className="w-6 h-6 text-purple-600" />;
      default:
        return <Gamepad2 className="w-6 h-6 text-indigo-600" />;
    }
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Educational Games", href: "/portal/student/games" },
      ]}
      title="Educational Game Center & Skills Lab"
      description="Engaging gamified challenges designed to reinforce curricular mastery, fast recall, and proactive online cybersecurity awareness."
    >
      <div className="space-y-6">
        {/* Top Info Banner */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-[#0f2744] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 text-sky-300">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">
                  Earn Experience Points & Unlock Rare Badges
                </h3>
                <Badge variant="accent" size="sm">
                  +30 to +50 XP / Game
                </Badge>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Practice through challenges to level up your scholar rank. Game scores reflect practice drills and are distinct from official examinations.
              </p>
            </div>
          </div>
          <Button href="/portal/student/progress" variant="secondary" size="sm" className="shrink-0 text-xs">
            View My Learning Badges
          </Button>
        </div>

        {/* 3 Games Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameDefs.map((game) => {
            const gameSessions = sessions.filter((s) => s.game_id === game.id);
            const bestSession = gameSessions.reduce(
              (best, s) => (s.score > (best?.score || 0) ? s : best),
              gameSessions[0]
            );

            return (
              <Card
                key={game.id}
                className="bg-white border-slate-200 flex flex-col justify-between hover:shadow-lg transition-all group overflow-hidden"
              >
                <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 to-indigo-600" />
                <CardHeader className="p-5 pb-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {getGameIcon(game.id)}
                    </div>
                    <Badge variant="navy" size="sm">
                      {game.estimated_duration}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">
                      {game.subject_category}
                    </span>
                    <CardTitle className="text-base text-[#0f2744] group-hover:text-sky-600 transition-colors mt-0.5">
                      {game.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-5 pt-0 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {game.description}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Difficulty Curve:</span>
                      <span className="font-bold text-slate-700">{game.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-500">
                      <span>Personal Best:</span>
                      <span className="font-extrabold text-teal-700 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-500" />
                        {bestSession ? `${bestSession.score} pts (${bestSession.accuracy_percentage}%)` : "No Sessions Yet"}
                      </span>
                    </div>
                  </div>
                </CardContent>

                <div className="p-5 pt-0">
                  <Button
                    href={`/portal/student/games/${game.id}`}
                    variant="primary"
                    size="md"
                    className="w-full justify-center font-bold text-xs"
                    rightIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                  >
                    Play Challenge Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Game Sessions Log */}
        {sessions.length > 0 && (
          <Card className="bg-white border-slate-200">
            <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>My Recent Game Sessions & Accuracy Ledger</span>
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Game Challenge</th>
                    <th className="py-3 px-4">Topic / Mode</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Accuracy</th>
                    <th className="py-3 px-4">Time Spent</th>
                    <th className="py-3 px-4">Played Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessions.map((sess) => (
                    <tr key={sess.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-[#0f2744]">
                        {sess.game_title}
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {sess.topic || "General"}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-sky-700">
                        {sess.score} pts
                      </td>
                      <td className="py-3 px-4 font-bold text-emerald-700">
                        {sess.accuracy_percentage}% ({sess.correct_answers}/{sess.questions_answered})
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {sess.time_spent_seconds}s
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {new Date(sess.completed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </PortalLayout>
  );
}

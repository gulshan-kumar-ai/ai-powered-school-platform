"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { Quiz } from "@/types/portal";
import {
  HelpCircle,
  CheckCircle2,
  Play,
  BarChart,
  ShieldCheck,
} from "lucide-react";

export default function StudentQuizzesPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const sectionId = "e0000000-0000-0000-0000-000000000001"; // Section 10-A

  const [quizzes] = useState<Quiz[]>(() =>
    schoolStore.getQuizzes({ sectionId, isPublishedOnly: true })
  );
  const [attempts] = useState(() => schoolStore.getStudentQuizAttempts(studentId));

  const getDifficultyBadge = (difficulty: Quiz["difficulty_level"]) => {
    switch (difficulty) {
      case "beginner":
        return <Badge variant="secondary" size="sm">Foundational</Badge>;
      case "intermediate":
        return <Badge variant="accent" size="sm">Intermediate</Badge>;
      case "advanced":
        return <Badge variant="navy" size="sm">Advanced Honors</Badge>;
    }
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Interactive Quizzes", href: "/portal/student/quizzes" },
      ]}
      title="Interactive Coursework Quizzes & Diagnostic Practice"
      description="Timed knowledge checks, multi-format assessments, and revision diagnostics for your enrolled subjects."
    >
      <div className="space-y-6">
        {/* Top Info Banner */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#0f2744]">
                Automated Formative Assessment Protocol
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Practice quizzes award learning points and badges. Results are strictly separated from official semester examination marks.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Server-Verified Attempt Limits & Scoring</span>
          </div>
        </div>

        {/* Quizzes List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => {
            const studentAttempts = attempts.filter((a) => a.quiz_id === quiz.id);
            const remainingAttempts = Math.max(0, quiz.max_attempts - studentAttempts.length);
            const bestAttempt = studentAttempts.reduce(
              (best, current) => (current.percentage > (best?.percentage || 0) ? current : best),
              studentAttempts[0]
            );

            return (
              <Card
                key={quiz.id}
                className="bg-white border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <CardHeader className="pb-3 border-b border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    {getDifficultyBadge(quiz.difficulty_level)}
                    <span className="text-xs font-bold text-slate-400">
                      {quiz.time_limit_minutes} Mins
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider block">
                      {quiz.subject_name}
                    </span>
                    <CardTitle className="text-base text-[#0f2744] group-hover:text-sky-600 transition-colors leading-snug">
                      {quiz.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5 text-[11px] text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Curriculum Topic:</span>
                      <span className="font-bold text-slate-700">{quiz.topic}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Questions:</span>
                      <span className="font-bold text-slate-700">{quiz.questions_count || 4} Questions</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Total Points:</span>
                      <span className="font-bold text-slate-700">{quiz.total_points || 40} XP</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Pass Threshold:</span>
                      <span className="font-bold text-teal-700">{quiz.pass_percentage}%</span>
                    </div>
                  </div>

                  {/* Attempts Status */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Attempts Used
                      </span>
                      <span className="font-bold text-slate-800">
                        {studentAttempts.length} of {quiz.max_attempts}
                      </span>
                    </div>

                    {bestAttempt ? (
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Best Score
                        </span>
                        <span className={`font-extrabold ${bestAttempt.passed ? "text-emerald-600" : "text-amber-600"}`}>
                          {bestAttempt.percentage}% ({bestAttempt.passed ? "PASSED" : "REVISE"})
                        </span>
                      </div>
                    ) : (
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">
                          Status
                        </span>
                        <span className="font-bold text-slate-400">Not Attempted</span>
                      </div>
                    )}
                  </div>
                </CardContent>

                <div className="p-4 pt-0">
                  {remainingAttempts > 0 ? (
                    <Button
                      href={`/portal/student/quizzes/${quiz.id}`}
                      variant="primary"
                      size="sm"
                      className="w-full text-xs font-bold"
                      leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                    >
                      {studentAttempts.length > 0 ? "Retake Quiz" : "Start Assessment"}
                    </Button>
                  ) : (
                    <Button
                      href={`/portal/student/quizzes/${quiz.id}`}
                      variant="outline"
                      size="sm"
                      className="w-full text-xs"
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      Review Completed Attempt
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Past Attempts Table */}
        {attempts.length > 0 && (
          <Card className="bg-white border-slate-200">
            <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
              <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                <BarChart className="w-4 h-4 text-sky-600" />
                <span>My Past Quiz Attempts History</span>
              </CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-4">Quiz Title</th>
                    <th className="py-3 px-4">Attempt #</th>
                    <th className="py-3 px-4">Score</th>
                    <th className="py-3 px-4">Percentage</th>
                    <th className="py-3 px-4">Result</th>
                    <th className="py-3 px-4">Submission Date</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {attempts.map((att) => (
                    <tr key={att.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {att.quiz_title}
                      </td>
                      <td className="py-3 px-4 text-slate-600 font-medium">
                        Attempt #{att.attempt_number}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">
                        {att.score} / {att.total_possible}
                      </td>
                      <td className="py-3 px-4 font-extrabold text-[#0f2744]">
                        {att.percentage}%
                      </td>
                      <td className="py-3 px-4">
                        {att.passed ? (
                          <Badge variant="accent" size="sm">Passed</Badge>
                        ) : (
                          <Badge variant="outline" size="sm">Review Required</Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(att.submitted_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/portal/student/quizzes/${att.quiz_id}`}
                          className="font-bold text-sky-600 hover:text-sky-800"
                        >
                          Review →
                        </Link>
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

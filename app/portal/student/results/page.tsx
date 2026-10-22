"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import { Award, TrendingUp, BarChart3 } from "lucide-react";

export default function StudentResultsPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const publishedMarks = schoolStore.getStudentPublishedMarks(studentId);
  const [selectedTerm, setSelectedTerm] = useState("Term 1");

  // Poster Pillar 9: Results - Term 1 explicit data matching poster
  const posterTerm1Results = [
    { subject: "Mathematics", marks: 85, max: 100, grade: "A", color: "bg-blue-500" },
    { subject: "Science", marks: 78, max: 100, grade: "B+", color: "bg-teal-500" },
    { subject: "English", marks: 92, max: 100, grade: "A", color: "bg-emerald-500" },
    { subject: "Computer", marks: 88, max: 100, grade: "A", color: "bg-purple-500" },
    { subject: "Social Studies", marks: 76, max: 100, grade: "B+", color: "bg-amber-500" },
  ];

  const overallAverage = Math.round(
    posterTerm1Results.reduce((sum, r) => sum + r.marks, 0) / posterTerm1Results.length
  ); // 84%

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Published Results", href: "/portal/student/results" },
      ]}
      title="Examination Results & Academic Performance"
      description="Official semester examination results, subject-wise performance analysis, and certified progress reports."
    >
      <div className="space-y-6">
        {/* Poster Pillar 9: Results & Progress Tracking Master Card */}
        <Card className="border-slate-200 dark:border-slate-800 shadow-md overflow-hidden bg-white dark:bg-slate-900">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-200 text-xs font-bold">
                  Pillar 9: Results &amp; Progress Tracking
                </span>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Grade 10 Senior Secondary
                </span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                Results • {selectedTerm}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer shadow-xs"
              >
                <option value="Term 1">Term 1</option>
                <option value="Mid Term">Mid Term</option>
                <option value="Annual Board Exam">Annual Board Exam</option>
              </select>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Subject Table */}
              <div className="lg:col-span-7">
                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4 text-center">Marks</th>
                        <th className="py-3 px-4 text-center">Max</th>
                        <th className="py-3 px-4 text-right">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {posterTerm1Results.map((item, idx) => (
                        <tr
                          key={idx}
                          className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                            <span>{item.subject}</span>
                          </td>
                          <td className="py-3 px-4 text-center font-bold text-slate-800 dark:text-slate-200 text-sm">
                            {item.marks}
                          </td>
                          <td className="py-3 px-4 text-center text-slate-400 font-semibold">
                            {item.max}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-black ${
                                item.grade.startsWith("A")
                                  ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200"
                                  : "bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200"
                              }`}
                            >
                              {item.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Progress & Overall Performance Gauge */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-6">
                <div className="w-full flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <BarChart3 className="w-4 h-4 text-sky-500" />
                    <span>Progress Breakdown</span>
                  </span>
                  <span className="text-xs text-slate-400">Class Average: 77%</span>
                </div>

                {/* Progress Mini Bar Chart */}
                <div className="w-full space-y-2">
                  {posterTerm1Results.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                        <span>{item.subject}</span>
                        <span>{item.marks}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${item.color}`}
                          style={{ width: `${item.marks}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Circular Performance Gauge (84%) */}
                <div className="flex items-center gap-6 pt-2 border-t border-slate-200 dark:border-slate-700/80 w-full justify-center">
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 dark:text-slate-700"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-emerald-500"
                        strokeDasharray={`${overallAverage}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-2xl font-black text-slate-900 dark:text-white leading-none">
                        {overallAverage}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-left">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Overall Performance
                    </span>
                    <div className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>Distinction Grade</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Top 5% across Umerkot District Secondary Cohorts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Position Holders Award Spotlight */}
        <div className="rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/80 via-white to-sky-50/60 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full sm:w-48 h-28 rounded-xl overflow-hidden border border-amber-200 shrink-0 bg-slate-900">
            <Image
              src="/images/school/position-holders-2026.jpg"
              alt="Qazi Sultan Boys HSS Session 2025-2026 Top Position Holders"
              fill
              sizes="(max-width: 640px) 100vw, 192px"
              className="object-cover"
            />
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-bold">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Session 2025–2026 Academic Position Holders</span>
            </div>
            <h3 className="text-base font-bold text-[#0f2744]">
              Annual Merit Laureates &amp; Trophy Honors
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              Congratulations to our top position holders for their exceptional academic diligence. Results below reflect verified coursework and board preparatory evaluations.
            </p>
          </div>
        </div>

        {/* Verification Banner */}
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 shrink-0 drop-shadow-xs">
              <Image
                src="/images/school/logo.png"
                alt="Official School Crest"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-emerald-900 text-sm">
                Certified Academic Transcript • {siteConfig.shortName}
              </div>
              <div className="text-emerald-800 text-[11px]">
                Showing authorized and instructor-published examination scores. Verified under BISE Mirpur Khas standards.
              </div>
            </div>
          </div>
          <Badge variant="navy" size="sm" className="hidden sm:inline-flex shrink-0">
            BISE Mirpur Khas Verified
          </Badge>
        </div>

        {/* Detailed Assessment Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
            Certified Instructor Evaluations
          </h3>
          {publishedMarks.map((m) => {
            const max = m.max_marks || 100;
            const pct = Math.round((m.score / max) * 100);

            return (
              <Card key={m.id} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs">
                <CardHeader className="py-4 px-6 border-b border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="navy" size="sm">
                        {m.subject_name}
                      </Badge>
                      <Badge variant="accent" size="sm">
                        Published
                      </Badge>
                    </div>
                    <CardTitle className="text-base text-[#0f2744] dark:text-white">
                      {m.exam_name}
                    </CardTitle>
                  </div>

                  <div className="text-right">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-[#0f2744] dark:text-white">
                        {m.score}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        / {max}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                      {pct}% • Grade {m.grade}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-3">
                  {m.remarks && (
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs space-y-1">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 block">
                        Instructor Evaluative Feedback:
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        &ldquo;{m.remarks}&rdquo;
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Certified Board Evaluation</span>
                    <span>{siteConfig.shortName} Academic Standards</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </PortalLayout>
  );
}

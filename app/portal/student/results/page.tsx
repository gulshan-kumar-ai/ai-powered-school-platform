"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import { Award } from "lucide-react";

export default function StudentResultsPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const publishedMarks = schoolStore.getStudentPublishedMarks(studentId);

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Published Results", href: "/portal/student/results" },
      ]}
      title="Examination Results & Academic Performance"
      description="Official semester examination results, grade distributions, and instructor evaluations."
    >
      <div className="space-y-6">
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
                Showing authorized and instructor-published examination scores. Verified under BISE Mirpurkhas standards.
              </div>
            </div>
          </div>
          <Badge variant="navy" size="sm" className="hidden sm:inline-flex shrink-0">
            BISE Mirpurkhas Verified
          </Badge>
        </div>

        {/* Results Cards */}
        <div className="space-y-4">
          {publishedMarks.length === 0 ? (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs">
              No examination results have been published for this academic term yet.
            </div>
          ) : (
            publishedMarks.map((m) => {
              const max = m.max_marks || 100;
              const pct = Math.round((m.score / max) * 100);

              return (
                <Card key={m.id} className="bg-white border-slate-200 shadow-xs">
                  <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="navy" size="sm">
                          {m.subject_name}
                        </Badge>
                        <Badge variant="accent" size="sm">
                          Published
                        </Badge>
                      </div>
                      <CardTitle className="text-base text-[#0f2744]">
                        {m.exam_name}
                      </CardTitle>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-[#0f2744]">
                          {m.score}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          / {max}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-emerald-700">
                        {pct}% • Grade {m.grade}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-3">
                    {m.remarks && (
                      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1">
                        <span className="font-semibold text-slate-700 block">
                          Instructor Evaluative Feedback:
                        </span>
                        <p className="text-slate-600 italic leading-relaxed">
                          &ldquo;{m.remarks}&rdquo;
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>Certified Board Evaluation</span>
                      <span>{siteConfig.shortName} Academic Standards</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

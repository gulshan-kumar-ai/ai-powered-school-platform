"use client";

import React from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  Clock,
  Award,
  Info,
} from "lucide-react";

export default function StudentAssignmentsPage() {
  const sectionId = "e0000000-0000-0000-0000-000000000001"; // Section 10-A
  const assignments = schoolStore.getAssignments({ sectionId, isPublishedOnly: true });

  const today = new Date().toISOString().split("T")[0];

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Assignments", href: "/portal/student/assignments" },
      ]}
      title="Coursework & Homework Assignments"
      description="Active curriculum assignments, submission guidelines, deadlines, and maximum rubric scores."
    >
      <div className="space-y-6">
        {/* Phase 3 Notice Banner (as strictly required) */}
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-200/90 text-xs text-amber-950 flex items-start gap-3 shadow-xs">
          <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-amber-900">
              Phase 2 Notice: Digital File Upload Architecture
            </div>
            <p className="leading-relaxed text-amber-900/90">
              In accordance with Phase 2 specifications, interactive cloud file dropboxes and PDF submissions are planned for integration in <strong>Phase 3 (Digital Learning & Submissions)</strong>. For this phase, coursework is submitted directly to your instructor during classroom sessions. Non-functional upload buttons have been intentionally omitted.
            </p>
          </div>
        </div>

        {/* Assignments Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.length === 0 ? (
            <div className="col-span-2 p-12 text-center text-slate-500 bg-white rounded-2xl border border-slate-200 text-xs">
              No active assignments currently assigned for your class.
            </div>
          ) : (
            assignments.map((item) => {
              const isOverdue = item.due_date < today;

              return (
                <Card key={item.id} className="bg-white border-slate-200 flex flex-col justify-between">
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="navy" size="sm">
                          {item.subject_name}
                        </Badge>
                        <Badge variant="outline" size="sm">
                          {item.section_name}
                        </Badge>
                      </div>
                      <CardTitle className="text-base text-[#0f2744]">
                        {item.title}
                      </CardTitle>
                    </div>

                    {isOverdue ? (
                      <Badge variant="primary" size="sm" className="bg-rose-600 text-white">
                        Past Deadline
                      </Badge>
                    ) : (
                      <Badge variant="accent" size="sm">
                        Pending
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="p-5 flex-1 space-y-4">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Clock className={`w-3.5 h-3.5 ${isOverdue ? "text-rose-600" : "text-slate-400"}`} />
                        <span>Deadline: <strong className={isOverdue ? "text-rose-700" : "text-slate-900"}>{item.due_date}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Award className="w-3.5 h-3.5 text-amber-600" />
                        <span>Max Score: <strong>{item.max_marks} pts</strong></span>
                      </div>
                    </div>
                  </CardContent>

                  <div className="p-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Instructor: {item.teacher_name}</span>
                    <span className="font-semibold text-slate-700">In-Person Classroom Submission</span>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

"use client";

import React from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  CheckCircle2,
  Award,
  ShieldCheck,
} from "lucide-react";

export default function TeacherClassesPage() {
  const teacherId = "10000000-0000-0000-0000-000000000001"; // Dr. Marcus Chen
  const assignedClasses = schoolStore.getTeacherAssignments(teacherId);

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Assigned Classes", href: "/portal/teacher/classes" },
      ]}
      title="Assigned Instructional Classes & Cohorts"
      description="Isolated course rosters and classroom schedules assigned under your instructional faculty profile."
    >
      <div className="space-y-6">
        {/* Isolation Banner */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">
                Strict Instructional Data Partitioning
              </div>
              <div className="text-slate-400 text-[11px]">
                Under institutional FERPA privacy controls, instructors are strictly restricted to accessing records for their assigned section cohorts.
              </div>
            </div>
          </div>
          <Badge variant="navy" size="sm" className="hidden sm:inline-flex shrink-0">
            RLS Protected
          </Badge>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignedClasses.map((ac) => {
            const roster = schoolStore.getSectionStudents(ac.section_id);

            return (
              <Card key={ac.id} className="bg-white border-slate-200">
                <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                  <div>
                    <Badge variant="navy" size="sm" className="mb-1">
                      {ac.subject_code}
                    </Badge>
                    <CardTitle className="text-lg text-[#0f2744]">
                      {ac.subject_name}
                    </CardTitle>
                    <div className="text-xs text-slate-500">
                      {ac.section_name} • Room 204
                    </div>
                  </div>
                  <Badge variant="accent" size="sm">
                    {roster.length} Scholars
                  </Badge>
                </CardHeader>

                <CardContent className="p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                      <span>Enrolled Cohort Roster:</span>
                      <span className="text-[11px] text-slate-400">Current Academic Term</span>
                    </div>

                    <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto rounded-lg border border-slate-100 p-2">
                      {roster.map((student) => (
                        <div
                          key={student.id}
                          className="py-2 px-2 flex items-center justify-between text-xs hover:bg-slate-50"
                        >
                          <div>
                            <div className="font-bold text-[#0f2744]">
                              {student.profile?.full_name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">
                              {student.student_number}
                            </div>
                          </div>
                          <Badge variant="outline" size="sm">
                            {student.status.toUpperCase()}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                    <Button
                      href="/portal/teacher/attendance"
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    >
                      Roll Call
                    </Button>
                    <Button
                      href="/portal/teacher/examinations"
                      variant="primary"
                      size="sm"
                      className="text-xs"
                      leftIcon={<Award className="w-3.5 h-3.5" />}
                    >
                      Enter Marks
                    </Button>
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

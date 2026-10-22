"use client";

import React from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  CheckCircle2,
  FileText,
  Award,
  BookOpen,
  ArrowRight,
  Plus,
  Sparkles,
} from "lucide-react";

export default function TeacherDashboardPage() {
  const teacherId = "10000000-0000-0000-0000-000000000001"; // Dr. Marcus Chen
  const assignedClasses = schoolStore.getTeacherAssignments(teacherId);
  const assignments = schoolStore.getAssignments();
  const exams = schoolStore.getExaminations();

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[{ label: "Teacher Workspace", href: "/portal/teacher" }]}
      title="Teacher Instructional Workspace"
      description="Daily classroom roll call, curriculum assignments, examination gradebook, and course schedules."
      actions={
        <div className="flex items-center gap-2">
          <Button
            href="/portal/teacher/attendance"
            variant="outline"
            size="sm"
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
          >
            Take Roll Call
          </Button>
          <Button
            href="/portal/teacher/assignments"
            variant="primary"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Assignment
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    My Teaching Courses
                  </span>
                  <div className="text-2xl font-extrabold text-[#0f2744] mt-1">
                    {assignedClasses.length} Cohorts
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600">
                AP Physics C & Honors Secondary Science
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Active Assignments
                  </span>
                  <div className="text-2xl font-extrabold text-teal-700 mt-1">
                    {assignments.length} Published
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-teal-800 font-medium">
                Upcoming due date this Friday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Examinations Conducted
                  </span>
                  <div className="text-2xl font-extrabold text-amber-700 mt-1">
                    {exams.length} Exams
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-amber-800 font-medium">
                Fall Mid-Term Physics Results Published
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule & Quick Roll Call */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Assigned Classes */}
          <Card className="lg:col-span-2 bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0284c7]" />
                <CardTitle className="text-base text-[#0f2744]">
                  Assigned Instructional Cohorts
                </CardTitle>
              </div>
              <Link
                href="/portal/teacher/classes"
                className="text-xs text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View Full Rosters</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {assignedClasses.map((ac) => {
                const rosterCount = schoolStore.getSectionStudents(ac.section_id).length;
                return (
                  <div
                    key={ac.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="navy" size="sm">
                          {ac.subject_code}
                        </Badge>
                        <span className="font-bold text-[#0f2744] text-sm">
                          {ac.subject_name}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {ac.section_name} • Room 204 • {rosterCount} Enrolled Scholars
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
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
                        Gradebook
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base text-[#0f2744]">
                  Teaching Workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2 text-xs">
                <Link
                  href="/portal/teacher/attendance"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Daily Roll Call Attendance</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/portal/teacher/assignments"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <span>Homework & Assignments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/portal/teacher/examinations"
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Examination Marks & Publishing</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-950">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Authorized Gradebook Guardrail</span>
              </div>
              <p className="leading-relaxed">
                Marks saved as Draft remain strictly invisible to students and parents until you explicitly select <strong>Publish Results</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

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

        {/* Poster Pillar 3: My Classes Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-[#0f2744] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#0284c7]" />
              <span>My Classes (Poster Pillar 3)</span>
            </h3>
            <span className="text-xs text-slate-400">Total: 90 Enrolled Scholars</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/50 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Class Cohort</span>
                <h4 className="text-base font-black text-slate-900">Grade 8</h4>
                <p className="text-xs text-slate-500">General Science &amp; Pre-Algebra</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-sky-700">32</span>
                <span className="text-[11px] text-slate-500 block">Students</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/50 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Class Cohort</span>
                <h4 className="text-base font-black text-slate-900">Grade 9</h4>
                <p className="text-xs text-slate-500">Sindh Board Physics &amp; Math</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-teal-700">28</span>
                <span className="text-[11px] text-slate-500 block">Students</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Class Cohort</span>
                <h4 className="text-base font-black text-slate-900">Grade 10</h4>
                <p className="text-xs text-slate-500">Senior Preparatory &amp; Lab Sciences</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-indigo-700">30</span>
                <span className="text-[11px] text-slate-500 block">Students</span>
              </div>
            </div>
          </div>
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

            {/* Poster Pillar 3: Recent Activities */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
                <CardTitle className="text-sm text-[#0f2744]">
                  Recent Activities
                </CardTitle>
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md">Live Stream</span>
              </CardHeader>
              <CardContent className="p-4 space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">Math Quiz - Grade 9</div>
                    <div className="text-[11px] text-slate-500">28 submissions recorded</div>
                  </div>
                  <Badge variant="accent" size="sm">Today</Badge>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">Assignment Submitted - Grade 8</div>
                    <div className="text-[11px] text-slate-500">Pre-Algebra problem set</div>
                  </div>
                  <Badge variant="navy" size="sm">Today</Badge>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-800">Attendance Updated - Grade 10</div>
                    <div className="text-[11px] text-slate-500">96.8% presence rate logged</div>
                  </div>
                  <Badge variant="secondary" size="sm">Yesterday</Badge>
                </div>
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

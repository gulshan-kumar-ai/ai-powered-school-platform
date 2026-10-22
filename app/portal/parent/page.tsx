"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  Users,
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Bell,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ParentDashboardPage() {
  const parentId = "30000000-0000-0000-0000-000000000001"; // Eleanor Vance
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);

  const [selectedChildId, setSelectedChildId] = useState(
    linkedChildren[0]?.id || "20000000-0000-0000-0000-000000000001"
  );

  const activeChild = linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0];
  const sectionId = activeChild?.current_section_id || "e0000000-0000-0000-0000-000000000001";

  const attendance = schoolStore.getStudentAttendance(activeChild?.id || "");
  const timetable = schoolStore.getStudentTimetable(sectionId);
  const assignments = schoolStore.getAssignments({ sectionId, isPublishedOnly: true });
  const publishedMarks = schoolStore.getStudentPublishedMarks(activeChild?.id || "");
  const announcements = schoolStore.getAnnouncements("parents");

  return (
    <PortalLayout
      requiredRole="parent"
      breadcrumbs={[{ label: "Parent Oversight Portal", href: "/portal/parent" }]}
      title="Parent & Guardian Academic Oversight"
      description="Monitor verified classroom attendance, course schedules, homework deadlines, and published marks for your linked children."
    >
      <div className="space-y-6">
        {/* Child Selector & Relationship Verification Bar */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Authorized Child Record:
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <select
                  value={selectedChildId}
                  onChange={(e) => setSelectedChildId(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 text-sm font-bold text-[#0f2744] bg-white cursor-pointer"
                >
                  {linkedChildren.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.profile?.full_name} ({child.student_number}) — {child.current_class_name}
                    </option>
                  ))}
                </select>
                <Badge variant="accent" size="sm">
                  Verified Custodial Link
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Isolated to Authorized Wards Only</span>
          </div>
        </div>

        {/* 3 Metric Cards for Active Child */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Attendance Rate
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                    {attendance.summary.rate}%
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-600 flex items-center justify-between">
                <span>Present: {attendance.summary.present}</span>
                <span>Late: {attendance.summary.late}</span>
                <span>Absent: {attendance.summary.absent}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Active Homework
                  </span>
                  <div className="text-2xl font-extrabold text-sky-700 mt-1">
                    {assignments.length} Tasks
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-sky-800 font-medium">
                Physics Problem Set 4 due this Friday
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Published Results
                  </span>
                  <div className="text-2xl font-extrabold text-amber-700 mt-1">
                    {publishedMarks.length} Exam Recorded
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-3 text-xs text-amber-800 font-medium">
                Physics: 94.5 / 100 (Grade A)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Timetable and Deadlines Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0284c7]" />
                <CardTitle className="text-base text-[#0f2744]">
                  Today&apos;s Class Schedule ({activeChild?.profile?.full_name})
                </CardTitle>
              </div>
              <Link
                href="/portal/parent/timetable"
                className="text-xs text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Full Timetable</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {timetable.slice(0, 3).map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-[#0f2744]">
                      {slot.subject_name}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Period {slot.period_number} • Room {slot.room_number} • {slot.teacher_name}
                    </div>
                  </div>
                  <div className="font-mono text-[11px] font-bold text-slate-700">
                    {slot.start_time} - {slot.end_time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-600" />
                  <span>Parent Notices</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {announcements.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200">
              <CardContent className="p-4 space-y-2 text-xs">
                <Link
                  href="/portal/parent/attendance"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>View Attendance History</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/portal/parent/results"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>View Examination Grades</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  Clock,
  FileText,
  Award,
  Bell,
  ArrowRight,
  Bot,
  ShieldAlert,
} from "lucide-react";

export default function StudentDashboardPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const sectionId = "e0000000-0000-0000-0000-000000000001"; // Section 10-A

  const student = schoolStore.getStudentById(studentId);
  const timetable = schoolStore.getStudentTimetable(sectionId);
  const attendance = schoolStore.getStudentAttendance(studentId);
  const assignments = schoolStore.getAssignments({ sectionId, isPublishedOnly: true });
  const publishedMarks = schoolStore.getStudentPublishedMarks(studentId);
  const announcements = schoolStore.getAnnouncements("students");

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[{ label: "Scholar Portal", href: "/portal/student" }]}
      title="Scholar Academic Portal"
      description={`Welcome back, ${student?.profile?.full_name || "Alex"}. Here is your academic schedule, assignments, and verified report card.`}
    >
      <div className="space-y-6">
        {/* Welcome & Student Overview Bar (Poster Pillar 2: Welcome, Ali - Grade 10) */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0f2744] to-[#1e3a5f] text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-xl text-sky-300">
              AL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-white">
                  Welcome, Ali (Alex Vance)
                </h2>
                <Badge variant="accent" size="sm">
                  Grade 10 Scholar
                </Badge>
              </div>
              <div className="text-xs text-slate-300 mt-0.5 flex items-center gap-2 flex-wrap">
                <span>ID: STU-2026-1089</span>
                <span>•</span>
                <span>Cohort: Grade 10 Senior Secondary</span>
                <span>•</span>
                <span>Fall Term 2026</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 min-w-24">
              <span className="text-[10px] text-sky-200 uppercase font-bold block">
                Attendance
              </span>
              <span className="text-xl font-extrabold text-white">
                96%
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 min-w-24">
              <span className="text-[10px] text-sky-200 uppercase font-bold block">
                Grade
              </span>
              <span className="text-xl font-extrabold text-emerald-400">
                A
              </span>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10 min-w-24">
              <span className="text-[10px] text-sky-200 uppercase font-bold block">
                Assignments
              </span>
              <span className="text-xl font-extrabold text-amber-300">
                5
              </span>
            </div>
          </div>
        </div>

        {/* Upcoming Assignments Spotlight (Poster Pillar 2) */}
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardHeader className="py-3 px-5 border-b border-slate-100 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-[#0f2744] flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              <span>Upcoming Assignments</span>
            </CardTitle>
            <Link
              href="/portal/student/assignments"
              className="text-xs text-[#0284c7] font-semibold hover:underline"
            >
              View All (5)
            </Link>
          </CardHeader>
          <CardContent className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  📐
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Math Homework</div>
                  <div className="text-[11px] text-slate-500">Algebra Quadratic Solutions</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                Due: 10 Oct
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-xs">
                  🔬
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-xs">Science Project</div>
                  <div className="text-[11px] text-slate-500">Renewable Energy Prototype</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                Due: 15 Oct
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Phase 4 AI Educational & Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/portal/student/ai-tutor"
            className="p-5 rounded-2xl bg-gradient-to-br from-sky-900 to-[#0f2744] text-white flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all group border border-sky-700/50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  <Bot className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Socratic AI Tutor
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-sky-200 transition-colors">
                AI Study Assistant
              </h3>
              <p className="text-xs text-slate-300 max-w-sm">
                Ask questions, request conceptual hints before worked solutions, and explore textbook citations.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>

          <Link
            href="/portal/student/cyber-analyzer"
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white flex items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all group border border-indigo-700/50"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  <ShieldAlert className="w-4 h-4" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  Cyber Defense Tool
                </span>
              </div>
              <h3 className="text-base font-extrabold text-white group-hover:text-indigo-200 transition-colors">
                Suspicious Message Analyzer
              </h3>
              <p className="text-xs text-slate-300 max-w-sm">
                Paste suspicious emails or text messages to detect phishing triggers and social engineering traps.
              </p>
            </div>
            <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0" />
          </Link>
        </div>

        {/* Schedule & Homework Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <Card className="lg:col-span-2 bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0284c7]" />
                <CardTitle className="text-base text-[#0f2744]">
                  Class Timetable Schedule
                </CardTitle>
              </div>
              <Link
                href="/portal/student/timetable"
                className="text-xs text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Full Weekly Schedule</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-3">
              {timetable.slice(0, 3).map((slot) => (
                <div
                  key={slot.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-100 text-[#0284c7] font-bold flex items-center justify-center text-xs">
                      P{slot.period_number}
                    </span>
                    <div>
                      <div className="font-bold text-[#0f2744]">
                        {slot.subject_name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {slot.day_of_week} • Room {slot.room_number} • {slot.teacher_name}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[11px] font-semibold text-slate-700">
                    {slot.start_time} - {slot.end_time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Published Announcements */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                  <Bell className="w-4 h-4 text-sky-600" />
                  <span>School Announcements</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {announcements.slice(0, 2).map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-slate-600 text-[11px] leading-relaxed">
                      {item.content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white border-slate-200">
              <CardContent className="p-4 space-y-2 text-xs">
                <Link
                  href="/portal/student/assignments"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-sky-600" />
                    <span>View Assignments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  href="/portal/student/results"
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>View Exam Results</span>
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

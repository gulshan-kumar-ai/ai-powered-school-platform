"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  Users,
  UserCheck,
  BookOpen,
  Calendar,
  CheckCircle2,
  Bell,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Plus,
  Layers,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats] = useState(() => schoolStore.getAdminStats());


  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[{ label: "Administration", href: "/portal/admin" }]}
      title="Administrator Operations Console"
      description="Live academic management, institutional rosters, attendance performance, and security monitoring."
      actions={
        <div className="flex items-center gap-2">
          <Button
            href="/portal/admin/students"
            variant="outline"
            size="sm"
            leftIcon={<Plus className="w-3.5 h-3.5 text-sky-600" />}
          >
            Enroll Student
          </Button>
          <Button
            href="/portal/admin/announcements"
            variant="primary"
            size="sm"
            leftIcon={<Bell className="w-3.5 h-3.5" />}
          >
            Broadcast Announcement
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Top 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Total Enrolled
                  </span>
                  <div className="text-2xl font-extrabold text-[#0f2744]">
                    {stats.totalStudents}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>100% Active Academic Standing</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Faculty & Instructors
                  </span>
                  <div className="text-2xl font-extrabold text-[#0f2744]">
                    {stats.totalTeachers}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-100">
                  <UserCheck className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <span>All Subject Departments Assigned</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Active Classes
                  </span>
                  <div className="text-2xl font-extrabold text-[#0f2744]">
                    {stats.totalClasses} <span className="text-xs font-normal text-slate-500">({stats.totalSections} sections)</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-100">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-700 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{stats.activeTerm}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Today&apos;s Attendance
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-700">
                    {stats.attendanceRate}%
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <span>Verified in Section 10-A registry</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Operational Modules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Announcements */}
          <Card className="lg:col-span-2 bg-white border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[#0284c7]" />
                <CardTitle className="text-base text-[#0f2744]">
                  School-Wide Announcements
                </CardTitle>
              </div>
              <Link
                href="/portal/admin/announcements"
                className="text-xs text-[#0284c7] font-semibold hover:underline flex items-center gap-1"
              >
                <span>Manage All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
              {stats.recentAnnouncements.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-slate-50/80 border border-slate-100 space-y-2 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-[#0f2744]">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.priority === "important" ? "primary" : "outline"}
                        size="sm"
                      >
                        {item.priority}
                      </Badge>
                      <Badge variant="accent" size="sm">
                        {item.audience.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.content}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Published by {item.publisher_name}</span>
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions & Security */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>Administrative Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <Link
                  href="/portal/admin/students"
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-sky-600" />
                    <span>Manage Student Enrolments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/portal/admin/teachers"
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-teal-600" />
                    <span>Faculty & Teaching Assignments</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/portal/admin/academics"
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>Class & Subject Architecture</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>

                <Link
                  href="/portal/admin/audit-logs"
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 transition-all text-xs font-semibold text-slate-700"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Security & Audit Trails</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </CardContent>
            </Card>

            {/* Upcoming Examinations */}
            <Card className="bg-white border-slate-200">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-base text-[#0f2744] flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Scheduled Examinations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {stats.upcomingExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-3 rounded-lg bg-amber-50/50 border border-amber-200/80 text-xs space-y-1"
                  >
                    <div className="font-bold text-amber-950">{exam.name}</div>
                    <div className="text-slate-600 text-[11px] flex items-center justify-between">
                      <span>{exam.subject_name}</span>
                      <span className="font-semibold text-amber-800">Max: {exam.max_marks} pts</span>
                    </div>
                    <div className="text-[10px] text-slate-500 pt-0.5">
                      Date: {exam.exam_date} • {exam.section_name}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

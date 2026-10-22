"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getCurrentSession, getDefaultDashboardForRole } from "@/lib/auth/session";
import { UserSession } from "@/types/portal";
import {
  GraduationCap,
  Users,
  Briefcase,
  ShieldAlert,
  ArrowLeft,
  CheckCircle2,
  LogIn,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

const roleIcons = {
  student: GraduationCap,
  parent: Users,
  teacher: Briefcase,
  admin: ShieldAlert,
};

const portals = [
  {
    role: "admin" as const,
    title: "Administrator Portal",
    badge: "Full Clearance",
    description: "Executive control center for student rosters, faculty assignments, academic structure, CSV bulk enrollment, school-wide announcements, and security audit logs.",
    path: "/portal/admin",
    features: [
      "Student & Teacher profile lifecycle management",
      "Academic years, terms, classes, sections, and subjects",
      "Direct CSV roster import with format validation",
      "Security audit logs tracking sensitive actions",
    ],
  },
  {
    role: "teacher" as const,
    title: "Teacher Workspace",
    badge: "Instructional",
    description: "Dedicated daily classroom toolkit with assigned class rosters, duplicate-proof roll call attendance, assignment authoring, and examination marks entry.",
    path: "/portal/teacher",
    features: [
      "Assigned class rosters & schedule overview",
      "Daily roll call with instant duplicate check",
      "Homework creation with publication controls",
      "Examination marks entry with draft & publish states",
    ],
  },
  {
    role: "student" as const,
    title: "Student Portal",
    badge: "Academic",
    description: "Interactive learner portal for daily timetables, real-time attendance rate logs, published homework assignments, and official semester examination results.",
    path: "/portal/student",
    features: [
      "Weekly timetable with classroom & instructor info",
      "Comprehensive attendance rate & status log",
      "Published assignments & upcoming deadlines",
      "Published examination marks, grades, and comments",
    ],
  },
  {
    role: "parent" as const,
    title: "Parent Portal",
    badge: "Authorized Guardian",
    description: "Multi-child guardian oversight center displaying verified child attendance records, academic timetable, assignment deadlines, and published exam grades.",
    path: "/portal/parent",
    features: [
      "Multi-child selector with verified relationship isolation",
      "Real-time attendance summaries & absence alerts",
      "Class timetables and homework deadline monitoring",
      "Official published examination scorecards",
    ],
  },
];

export default function PortalPage() {
  const [session] = useState<UserSession | null>(() => getCurrentSession());


  return (
    <div className="py-12 sm:py-20 bg-slate-50/70 border-b border-slate-200/80 min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#0f2744] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Portal Directory</span>
        </nav>

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-10 max-w-4xl">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 drop-shadow-md">
            <Image
              src="/images/school/logo.png"
              alt={`${siteConfig.name} Official Logo Crest`}
              width={96}
              height={96}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="navy" size="md">
                Phase 2 Active
              </Badge>
              <Badge variant="accent" size="md">
                PostgreSQL &amp; RLS Ready
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight">
              {siteConfig.shortName} Management System
            </h1>
            <p className="mt-2 text-base text-slate-600 leading-relaxed">
              Welcome to the centralized School Management System for {siteConfig.name}. Access is strictly partitioned by role with database Row Level Security and server-side verification.
            </p>
          </div>
        </div>

        {/* Authenticated user banner if logged in */}
        {session && (
          <div className="mb-10 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-bold">
                {session.user.full_name[0]}
              </div>
              <div>
                <div className="text-xs text-sky-700 font-semibold uppercase tracking-wider">
                  Currently Signed In
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0f2744]">
                  {session.user.full_name} ({session.user.role.toUpperCase()})
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                href={getDefaultDashboardForRole(session.user.role)}
                variant="primary"
                size="md"
                leftIcon={<KeyRound className="w-4 h-4" />}
              >
                Go to My Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* 4 Portal Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {portals.map((portal) => {
            const Icon = roleIcons[portal.role];
            return (
              <Card key={portal.role} className="flex flex-col h-full bg-white border-slate-200/90 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                      <Icon className="w-6 h-6" />
                    </div>
                    <Badge variant="outline" size="sm" className="font-semibold text-slate-700">
                      {portal.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-[#0f2744]">
                    {portal.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1">
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {portal.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-800">
                      Core Operations:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {portal.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>

                <CardFooter className="pt-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Role Verified</span>
                  </div>
                  <Button
                    href={`/portal/login?role=${portal.role}`}
                    variant="primary"
                    size="sm"
                    rightIcon={<LogIn className="w-3.5 h-3.5" />}
                  >
                    Enter Portal
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom return link */}
        <div className="text-center">
          <Button href="/" variant="outline" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Public Website
          </Button>
        </div>
      </Container>
    </div>
  );
}

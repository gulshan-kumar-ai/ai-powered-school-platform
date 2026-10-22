"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/Container";
import {
  Megaphone,
  GraduationCap,
  Calendar,
  BookOpen,
  Bot,
  UserCheck,
  Layers,
  Smile,
  Sparkles,
  TrendingUp,
  User,
  Shield,
  Users,
  Compass,
} from "lucide-react";

const quickShortcuts = [
  {
    id: "announcements",
    title: "Announcements",
    subtitle: "Gazette Circulars & Alerts",
    href: "/news",
    icon: Megaphone,
    color: "from-sky-500 to-blue-600",
    bgHover: "hover:border-sky-400",
  },
  {
    id: "admissions",
    title: "Admissions",
    subtitle: "Session 2026–2027",
    href: "/admissions",
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-600",
    bgHover: "hover:border-emerald-400",
  },
  {
    id: "calendar",
    title: "Academic Calendar",
    subtitle: "Events & Term Schedules",
    href: "/events",
    icon: Calendar,
    color: "from-amber-500 to-orange-600",
    bgHover: "hover:border-amber-400",
  },
  {
    id: "library",
    title: "Digital Library",
    subtitle: "Notes, Books & Videos",
    href: "/portal/student/library",
    icon: BookOpen,
    color: "from-indigo-500 to-purple-600",
    bgHover: "hover:border-indigo-400",
  },
  {
    id: "ai-learning",
    title: "AI Learning",
    subtitle: "Socratic Study Tutor",
    href: "/portal/student/ai-tutor",
    icon: Bot,
    color: "from-pink-500 to-rose-600",
    bgHover: "hover:border-pink-400",
  },
  {
    id: "student-login",
    title: "Student Login",
    subtitle: "Scholar Portal Access",
    href: "/portal/login",
    icon: UserCheck,
    color: "from-cyan-500 to-teal-600",
    bgHover: "hover:border-cyan-400",
  },
];

const userPortals = [
  {
    id: "student",
    role: "Student",
    description: "Access learning tools, assignments, results and more",
    href: "/portal/student",
    icon: User,
    color: "text-sky-400",
    badge: "Active Scholar",
  },
  {
    id: "teacher",
    role: "Teacher",
    description: "Manage classes, attendance, assignments and resources",
    href: "/portal/teacher",
    icon: Compass,
    color: "text-emerald-400",
    badge: "Instructional Studio",
  },
  {
    id: "parent",
    role: "Parent",
    description: "Track child's progress and stay updated",
    href: "/portal/parent",
    icon: Users,
    color: "text-amber-400",
    badge: "Custodial Vault",
  },
  {
    id: "admin",
    role: "Administrator",
    description: "Manage the entire school system",
    href: "/portal/admin",
    icon: Shield,
    color: "text-purple-400",
    badge: "Executive Control",
  },
];

const valuePillars = [
  { label: "All in One Platform", icon: Layers, color: "text-blue-400" },
  { label: "Easy to Use", icon: Smile, color: "text-emerald-400" },
  { label: "Powered by AI", icon: Sparkles, color: "text-amber-400" },
  { label: "Better Learning", icon: TrendingUp, color: "text-purple-400" },
];

export function HeroQuickAccess() {
  return (
    <section className="relative -mt-10 sm:-mt-12 z-20 pb-12">
      <Container>
        {/* Poster Top Badges Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-6">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 backdrop-blur-md border border-slate-700/80 shadow-lg text-xs font-bold text-slate-200 hover:border-slate-500 transition-all"
              >
                <Icon className={`w-4 h-4 ${pillar.color}`} />
                <span>{pillar.label}</span>
              </div>
            );
          })}
        </div>

        {/* Poster Center Laptop Quick-Access 6 Cards Strip */}
        <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 flex-wrap gap-2">
            <div>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                Direct Navigation Hub
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Quick Access Campus Shortcuts
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Official Sindh Board &amp; BISE Mirpur Khas Portal
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {quickShortcuts.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 ${item.bgHover} hover:shadow-md transition-all flex flex-col items-center text-center justify-center gap-2.5`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-slate-900 dark:text-white leading-tight group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Multiple User Access Strip (Poster Right Panel) */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Role-Based System Security
                </span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Multiple User Access Portals
                </h3>
              </div>
              <Link
                href="/demo"
                className="text-xs font-bold text-sky-600 hover:text-sky-700 dark:text-sky-400 flex items-center gap-1"
              >
                <span>Launch Competition Interactive Demo</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {userPortals.map((portal) => {
                const Icon = portal.icon;
                return (
                  <Link
                    key={portal.id}
                    href={portal.href}
                    className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-700/60 hover:border-sky-400 hover:bg-sky-50/30 dark:hover:bg-slate-800/80 transition-all flex items-start gap-3.5 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:border-sky-400 transition-colors">
                      <Icon className={`w-5 h-5 ${portal.color}`} />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                          {portal.role}
                        </h4>
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {portal.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                        {portal.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

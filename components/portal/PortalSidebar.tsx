"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserRole } from "@/types/portal";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  FileText,
  Award,
  Bell,
  ShieldCheck,
  UserCheck,
  Clock,
  Layers,
  Sparkles,
  Library,
  HelpCircle,
  Gamepad2,
  TrendingUp,
  BarChart3,
  Bot,
  ShieldAlert,
} from "lucide-react";

interface PortalSidebarProps {
  role: UserRole;
  onLinkClick?: () => void;
}

interface NavLinkItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export function PortalSidebar({ role, onLinkClick }: PortalSidebarProps) {
  const pathname = usePathname();

  const getLinksForRole = (r: UserRole): NavLinkItem[] => {
    switch (r) {
      case "administrator":
        return [
          { title: "Dashboard Overview", href: "/portal/admin", icon: LayoutDashboard },
          { title: "Student Roster", href: "/portal/admin/students", icon: Users },
          { title: "Faculty & Staff", href: "/portal/admin/teachers", icon: UserCheck },
          { title: "Academic Structure", href: "/portal/admin/academics", icon: Layers },
          { title: "Digital Library", href: "/portal/admin/library", icon: Library },
          { title: "Learning & Quizzes", href: "/portal/admin/learning", icon: HelpCircle },
          { title: "Announcements", href: "/portal/admin/announcements", icon: Bell },
          { title: "Security Audit Logs", href: "/portal/admin/audit-logs", icon: ShieldCheck },
        ];
      case "teacher":
        return [
          { title: "Teacher Workspace", href: "/portal/teacher", icon: LayoutDashboard },
          { title: "Attendance Registry", href: "/portal/teacher/attendance", icon: CheckCircle2 },
          { title: "Assignments", href: "/portal/teacher/assignments", icon: FileText },
          { title: "Examinations & Marks", href: "/portal/teacher/examinations", icon: Award },
          { title: "Digital Library", href: "/portal/teacher/library", icon: Library },
          { title: "Quiz Builder & Tests", href: "/portal/teacher/quizzes", icon: HelpCircle },
          { title: "AI Quiz Generator", href: "/portal/teacher/quizzes/ai-generate", icon: Sparkles },
          { title: "Learning Analytics & AI", href: "/portal/teacher/analytics", icon: BarChart3 },
          { title: "My Assigned Classes", href: "/portal/teacher/classes", icon: BookOpen },
        ];
      case "student":
        return [
          { title: "Student Overview", href: "/portal/student", icon: LayoutDashboard },
          { title: "AI Study Assistant", href: "/portal/student/ai-tutor", icon: Bot },
          { title: "Cyber Threat Analyzer", href: "/portal/student/cyber-analyzer", icon: ShieldAlert },
          { title: "Digital Library", href: "/portal/student/library", icon: Library },
          { title: "Interactive Quizzes", href: "/portal/student/quizzes", icon: HelpCircle },
          { title: "Educational Games", href: "/portal/student/games", icon: Gamepad2 },
          { title: "Learning Progress & AI", href: "/portal/student/progress", icon: TrendingUp },
          { title: "My Timetable", href: "/portal/student/timetable", icon: Clock },
          { title: "My Attendance", href: "/portal/student/attendance", icon: CheckCircle2 },
          { title: "My Assignments", href: "/portal/student/assignments", icon: FileText },
          { title: "Published Results", href: "/portal/student/results", icon: Award },
          { title: "My Scholar Profile", href: "/portal/student/profile", icon: GraduationCap },
        ];
      case "parent":
        return [
          { title: "Family Overview", href: "/portal/parent", icon: LayoutDashboard },
          { title: "Learning & Progress", href: "/portal/parent/learning", icon: Sparkles },
          { title: "Child Attendance", href: "/portal/parent/attendance", icon: CheckCircle2 },
          { title: "Class Timetable", href: "/portal/parent/timetable", icon: Clock },
          { title: "Published Results", href: "/portal/parent/results", icon: Award },
          { title: "Assignments Status", href: "/portal/parent/assignments", icon: FileText },
        ];
    }
  };

  const navLinks = getLinksForRole(role);

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between h-full border-r border-slate-800">
      <div className="p-4 space-y-6">
        {/* Navigation Category Label */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
            {role.toUpperCase()} PORTAL
          </div>
          <nav className="space-y-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onLinkClick}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-[#0284c7] text-white shadow-sm font-bold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/80"
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0", isActive ? "text-white" : "text-sky-400")} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Session Box */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 text-xs text-slate-400">
        <div className="flex items-center gap-2 mb-1 text-slate-300 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Database Backed</span>
        </div>
        <p className="text-[11px] text-slate-500 leading-tight">
          Authenticated role session active. Row-level policies enforced.
        </p>
      </div>
    </aside>
  );
}

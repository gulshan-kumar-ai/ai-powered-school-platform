"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UserProfile, UserRole } from "@/types/portal";
import { terminateSession, quickLoginAsRole } from "@/lib/auth/session";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import {
  LogOut,
  ChevronDown,
  ExternalLink,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface PortalNavbarProps {
  currentUser: UserProfile;
  onMobileMenuToggle?: () => void;
  mobileMenuOpen?: boolean;
}

export function PortalNavbar({
  currentUser,
  onMobileMenuToggle,
  mobileMenuOpen,
}: PortalNavbarProps) {
  const router = useRouter();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await terminateSession();
    router.push("/portal/login");
  };

  const handleQuickSwitch = (role: UserRole) => {
    quickLoginAsRole(role);
    setProfileDropdownOpen(false);
    if (role === "administrator") router.push("/portal/admin");
    else if (role === "teacher") router.push("/portal/teacher");
    else if (role === "student") router.push("/portal/student");
    else if (role === "parent") router.push("/portal/parent");
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "administrator":
        return { label: "Administrator", variant: "default" as const };
      case "teacher":
        return { label: "Faculty / Teacher", variant: "accent" as const };
      case "student":
        return { label: "Student Scholar", variant: "secondary" as const };
      case "parent":
        return { label: "Parent / Guardian", variant: "roadmap" as const };
    }
  };

  const badgeInfo = getRoleBadgeVariant(currentUser.role);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            aria-label="Toggle navigation drawer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 drop-shadow-xs group-hover:scale-105 transition-transform">
              <Image
                src="/images/school/logo.png"
                alt={`${siteConfig.shortName} Official Logo Crest`}
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-extrabold text-sm text-[#0f2744] tracking-tight leading-none">
                {siteConfig.shortName}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
                School Management Portal
              </span>
            </div>
          </Link>
        </div>

        {/* Right: Quick Role Switcher + Current User + Logout */}
        <div className="flex items-center gap-3">
          {/* Back to Public Website */}
          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0f2744] px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <span>Public Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {/* Current Role Badge */}
          <div className="hidden sm:block">
            <Badge variant={badgeInfo.variant} size="md">
              {badgeInfo.label}
            </Badge>
          </div>

          {/* Profile Dropdown with Quick Role Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            >
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-[#0f2744] flex items-center justify-center font-bold text-xs">
                {currentUser.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.full_name}
                </span>
                <span className="text-[10px] text-slate-500 capitalize">
                  {currentUser.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <div className="font-bold text-slate-900">{currentUser.full_name}</div>
                  <div className="text-slate-500 text-[11px] truncate">{currentUser.email}</div>
                  <div className="mt-1">
                    <Badge variant={badgeInfo.variant} size="sm">
                      {badgeInfo.label}
                    </Badge>
                  </div>
                </div>

                {/* Quick Role Switcher for Developer / Reviewer Testing */}
                <div className="px-3 py-2 border-b border-slate-100 bg-slate-50/70">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    <Sparkles className="w-3 h-3 text-sky-600" />
                    <span>Quick Switch Role (Demo)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleQuickSwitch("administrator")}
                      className={`px-2 py-1.5 rounded text-left font-medium text-[11px] transition-colors cursor-pointer ${
                        currentUser.role === "administrator"
                          ? "bg-[#0f2744] text-white"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSwitch("teacher")}
                      className={`px-2 py-1.5 rounded text-left font-medium text-[11px] transition-colors cursor-pointer ${
                        currentUser.role === "teacher"
                          ? "bg-[#0284c7] text-white"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Teacher
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSwitch("student")}
                      className={`px-2 py-1.5 rounded text-left font-medium text-[11px] transition-colors cursor-pointer ${
                        currentUser.role === "student"
                          ? "bg-teal-700 text-white"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickSwitch("parent")}
                      className={`px-2 py-1.5 rounded text-left font-medium text-[11px] transition-colors cursor-pointer ${
                        currentUser.role === "parent"
                          ? "bg-indigo-700 text-white"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      Parent
                    </button>
                  </div>
                </div>

                <div className="p-1">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out of Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

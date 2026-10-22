"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { authenticateUser, quickLoginAsRole, getDefaultDashboardForRole, SEED_CREDENTIALS } from "@/lib/auth/session";
import { siteConfig } from "@/config/site";
import { UserRole } from "@/types/portal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  LogIn,
  AlertCircle,
  Lock,
  Mail,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRoleParam = searchParams?.get("role") as UserRole | null;

  const [email, setEmail] = useState(() => {
    if (defaultRoleParam && SEED_CREDENTIALS[defaultRoleParam === "administrator" ? "admin" : defaultRoleParam]) {
      return SEED_CREDENTIALS[defaultRoleParam === "administrator" ? "admin" : defaultRoleParam].email;
    }
    return "";
  });
  const [password, setPassword] = useState(() => {
    if (defaultRoleParam && SEED_CREDENTIALS[defaultRoleParam === "administrator" ? "admin" : defaultRoleParam]) {
      return SEED_CREDENTIALS[defaultRoleParam === "administrator" ? "admin" : defaultRoleParam].password;
    }
    return "";
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please provide both email address and account password.");
      return;
    }

    setLoading(true);
    const result = await authenticateUser(email, password);
    setLoading(false);

    if (!result.success || !result.session) {
      setError(result.error || "Authentication failed. Please verify your credentials.");
      return;
    }

    const redirectPath = getDefaultDashboardForRole(result.session.user.role);
    router.push(redirectPath);
  };

  const handleQuickDemoLogin = (roleKey: "admin" | "teacher" | "student" | "parent") => {
    const cred = SEED_CREDENTIALS[roleKey];
    setEmail(cred.email);
    setPassword(cred.password);
    const session = quickLoginAsRole(cred.role);
    router.push(getDefaultDashboardForRole(session.user.role));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        {/* Top return link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f2744] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public School Website</span>
          </Link>
        </div>

        {/* Brand Crest */}
        <div className="text-center space-y-3">
          <div className="relative w-20 h-20 mx-auto drop-shadow-md hover:scale-105 transition-transform">
            <Image
              src="/images/school/logo.png"
              alt={`${siteConfig.name} Official Logo Crest`}
              width={80}
              height={80}
              priority
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight">
              School Portal Gateway
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Sign in to access your authorized {siteConfig.shortName} workspace.
            </p>
          </div>
        </div>

        {/* Main Login Card */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5 animate-in fade-in-50">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-slate-700 mb-1"
              >
                School Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@oakridgeacademy.edu"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  Password
                </label>
                <Link
                  href="/portal/forgot-password"
                  className="text-[11px] font-semibold text-[#0284c7] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={loading}
              className="w-full justify-center"
              rightIcon={<LogIn className="w-4 h-4" />}
            >
              {loading ? "Authenticating..." : "Sign In to Portal"}
            </Button>
          </form>

          {/* Quick Demo Login Switcher */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#0284c7]" />
                <span>One-Click Demo Credentials</span>
              </span>
              <Badge variant="demo" size="sm">
                Dev Review
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin("admin")}
                className="p-2 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#0f2744]">Administrator</div>
                <div className="text-[10px] text-slate-500">Dr. Montgomery</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("teacher")}
                className="p-2 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="font-bold text-[#0284c7]">Teacher</div>
                <div className="text-[10px] text-slate-500">Dr. Marcus Chen</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("student")}
                className="p-2 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="font-bold text-teal-700">Student</div>
                <div className="text-[10px] text-slate-500">Alex Vance (Gr 10)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin("parent")}
                className="p-2 rounded-lg border border-slate-200 text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="font-bold text-indigo-700">Parent</div>
                <div className="text-[10px] text-slate-500">Eleanor Vance</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Role-Based Access Control • TLS Encrypted</span>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-8">
        &copy; 2026 {siteConfig.name}. All rights reserved.
      </div>
    </div>
  );
}

export default function PortalLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-sm font-medium text-slate-500 animate-pulse">
            Loading Portal Gateway...
          </div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentSession, clearSession, getDefaultDashboardForRole } from "@/lib/auth/session";
import { UserSession } from "@/types/portal";
import { Button } from "@/components/ui/Button";
import { ShieldAlert, LogOut, Home, KeyRound } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [session] = useState<UserSession | null>(() => getCurrentSession());

  const handleSignOut = () => {
    clearSession();
    router.push("/portal/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100 shadow-xs">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800">
            HTTP 403 • Access Prohibited
          </span>
          <h1 className="text-2xl font-extrabold text-[#0f2744]">
            Restricted Authorization Level
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Your current account credentials do not grant security clearance for the requested administrative or academic route.
          </p>
        </div>

        {session ? (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-left text-xs space-y-1.5">
            <div className="text-slate-500 font-medium">Currently Authenticated As:</div>
            <div className="font-bold text-[#0f2744] text-sm">{session.user.full_name}</div>
            <div className="text-slate-600">Email: {session.user.email}</div>
            <div className="flex items-center gap-2 pt-1">
              <span className="font-semibold text-slate-700">Role Clearance:</span>
              <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold uppercase text-[10px]">
                {session.user.role}
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-600">
            No active authentication session detected. Please sign in to verify your identity.
          </div>
        )}

        <div className="space-y-2 pt-2">
          {session ? (
            <Button
              href={getDefaultDashboardForRole(session.user.role)}
              variant="primary"
              size="md"
              className="w-full justify-center"
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              Return to Authorized Dashboard
            </Button>
          ) : (
            <Button
              href="/portal/login"
              variant="primary"
              size="md"
              className="w-full justify-center"
              leftIcon={<KeyRound className="w-4 h-4" />}
            >
              Sign In to Portal
            </Button>
          )}

          <div className="flex items-center gap-2">
            {session && (
              <Button
                variant="outline"
                size="md"
                onClick={handleSignOut}
                className="flex-1 justify-center text-xs"
                leftIcon={<LogOut className="w-3.5 h-3.5 text-rose-600" />}
              >
                Sign Out / Switch
              </Button>
            )}
            <Button
              href="/"
              variant="outline"
              size="md"
              className="flex-1 justify-center text-xs"
              leftIcon={<Home className="w-3.5 h-3.5 text-slate-600" />}
            >
              Public Website
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
          Security policy enforced by {siteConfig.name} Row-Level Access Controls
        </div>
      </div>
    </div>
  );
}

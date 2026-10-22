"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, LayoutDashboard, LogIn } from "lucide-react";

export default function PortalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // In production, send to structured telemetry / logger
    if (process.env.NODE_ENV === "development") {
      console.error("[Portal Error Boundary Caught Error]:", error);
    }
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-lg w-full bg-white rounded-2xl border border-slate-200/80 shadow-xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center mx-auto mb-5 shadow-sm">
          <AlertCircle className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 mb-3">
          Portal Session Notice
        </span>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Dashboard View Encountered an Issue
        </h1>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          The requested portal section could not be loaded cleanly. Your user session and saved data
          remain secure. Please retry or return to your role dashboard.
        </p>

        {error.digest && (
          <div className="mb-6 p-2.5 bg-slate-50 rounded-lg text-xs font-mono text-slate-500 border border-slate-200 text-left">
            <span className="font-semibold text-slate-700">Diagnostic ID:</span> {error.digest}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f2744] hover:bg-[#1a3a60] text-white text-sm font-semibold transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Retry View
          </button>

          <Link
            href="/portal"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            My Dashboard
          </Link>

          <Link
            href="/portal/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-sm font-medium transition-colors"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

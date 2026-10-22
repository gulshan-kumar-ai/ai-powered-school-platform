"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  Mail,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid registered school email address.");
      return;
    }

    setLoading(true);
    // Simulate secure token generation & email dispatch
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-6">
        <div>
          <Link
            href="/portal/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0f2744] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Login</span>
          </Link>
        </div>

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
              Reset Portal Password
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Submit your verified school email to receive an authorized recovery link.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-5">
          {submitted ? (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-slate-900">
                  Recovery Dispatch Initiated
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  If an active account exists for <span className="font-semibold text-slate-900">{email}</span>,
                  a cryptographic reset link has been dispatched with a 30-minute validity window.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs text-slate-600 space-y-1">
                <div className="font-semibold text-slate-800">Next Steps:</div>
                <ul className="list-disc list-inside space-y-1 text-[11px]">
                  <li>Check your institutional inbox and junk folders.</li>
                  <li>Click the one-time authentication link to set a new password.</li>
                  <li>If locked out, contact the IT Registrar at <span className="font-medium">{siteConfig.contact.admissionsEmail}</span>.</li>
                </ul>
              </div>

              <div className="pt-2">
                <Button
                  href="/portal/login"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  Return to Portal Login
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label
                  htmlFor="reset-email"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  School Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@oakridgeacademy.edu"
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
                rightIcon={<Send className="w-4 h-4" />}
              >
                {loading ? "Verifying..." : "Send Reset Instructions"}
              </Button>

              <div className="text-center pt-2">
                <Link
                  href="/portal/login"
                  className="text-xs font-medium text-slate-500 hover:text-[#0f2744]"
                >
                  Remembered your password? Back to login
                </Link>
              </div>
            </form>
          )}
        </div>

        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Institutional Account Protection • Zero Credential Exposure</span>
        </div>
      </div>

      <div className="text-center text-xs text-slate-400 mt-8">
        &copy; 2026 {siteConfig.name}. All rights reserved.
      </div>
    </div>
  );
}

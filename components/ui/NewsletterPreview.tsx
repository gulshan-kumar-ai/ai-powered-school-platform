"use client";

import React, { useState } from "react";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Mail, CheckCircle2, AlertCircle, Send } from "lucide-react";

export function NewsletterPreview() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-[#0f2744] to-[#08162b] text-white p-6 sm:p-8 relative overflow-hidden border border-slate-800 shadow-md">
      <div className="flex items-center justify-between gap-2 mb-3">
        <Badge variant="demo" size="sm">
          Interactive Subscription Preview
        </Badge>
        <span className="text-[11px] text-slate-400 font-mono">
          Phase 1 Demo
        </span>
      </div>

      <div className="max-w-xl">
        <h4 className="text-xl font-bold tracking-tight text-white mb-2">
          Subscribe to the Oakridge Monthly Gazette
        </h4>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Receive curated updates on student achievements, guest lecture schedules, campus events, and academic term summaries delivered directly to your inbox.
        </p>

        {submitted ? (
          <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-200">
              <strong className="font-semibold text-white">Subscription Registered (Demo):</strong>{" "}
              {email} has been logged in prototype state. In Phase 2, automated newsletter syndication will deliver confirmed opt-in subscriptions.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter parent or guardian email..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                size="md"
                rightIcon={<Send className="w-3.5 h-3.5" />}
                className="shrink-0"
              >
                Subscribe
              </Button>
            </div>
            {error && (
              <p className="text-[11px] text-rose-300 flex items-center gap-1 pt-1">
                <AlertCircle className="w-3 h-3" />
                <span>{error}</span>
              </p>
            )}
            <p className="text-[11px] text-slate-400">
              Demo component. Zero marketing spam. Instant client confirmation.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Compass, ArrowLeft, Calendar, FileText, CheckCircle2 } from "lucide-react";

interface EmptyStateProps {
  pageTitle: string;
  badgeText: string;
  phaseTarget: "Phase 1 Roadmap" | "Phase 2 Roadmap" | "Phase 3 Roadmap" | "Phase 4 Roadmap";
  description: string;
  plannedFeatures: string[];
  primaryActionLabel?: string;
  primaryActionHref?: string;
}

export function EmptyState({
  pageTitle,
  badgeText,
  phaseTarget,
  description,
  plannedFeatures,
  primaryActionLabel = "Return to Homepage",
  primaryActionHref = "/",
}: EmptyStateProps) {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-[#0f2744] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-slate-800 font-medium">{pageTitle}</span>
      </nav>

      <div className="rounded-2xl border border-slate-200/90 bg-white p-8 sm:p-12 shadow-sm text-center">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-6 border border-sky-100 shadow-sm">
          <Compass className="w-8 h-8" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          <Badge variant="accent" size="md">
            {badgeText}
          </Badge>
          <Badge variant="roadmap" size="md">
            {phaseTarget}
          </Badge>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight mb-4">
          {pageTitle}
        </h1>

        <p className="text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8">
          {description}
        </p>

        {/* Planned Features Box */}
        <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/80 text-left max-w-lg mx-auto mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0f2744] uppercase tracking-wider mb-3">
            <FileText className="w-4 h-4 text-[#0284c7]" />
            <span>Planned Capabilities for Next Phase</span>
          </div>
          <ul className="space-y-2.5">
            {plannedFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notice on Phase 0 Scope */}
        <div className="text-xs text-slate-500 flex items-center justify-center gap-2 mb-8">
          <Calendar className="w-4 h-4 text-slate-400" />
          <span>
            Phase 0 Foundation Active • Business logic and live services will be connected incrementally.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button href={primaryActionHref} variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            {primaryActionLabel}
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Admissions
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Container } from "../layout/Container";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title?: string;
  description?: string;
  badge?: string;
  primaryActionLabel?: string;
  primaryActionHref?: string;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  className?: string;
}

export function CTASection({
  title = "Begin Your Educational Journey with Qazi Sultan Boys HSS",
  description = "Experience our dedicated faculty, moral character building, and comprehensive academic pathways in Kunri. Inquire today for the 2026–2027 academic year.",
  badge = "Admissions 2026–2027",
  primaryActionLabel = "Apply for Admission",
  primaryActionHref = "/admissions",
  secondaryActionLabel = "Schedule Campus Tour",
  secondaryActionHref = "/contact",
  className,
}: CTASectionProps) {
  return (
    <section className={cn("py-18 sm:py-24 bg-gradient-to-b from-[#0a192f] via-[#050d1a] to-[#0a192f] text-white relative overflow-hidden border-t border-slate-800/90", className)}>
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-400/30 text-xs font-bold text-sky-300 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{badge}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href={primaryActionHref}
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white font-bold shadow-xl shadow-sky-600/25 border-0"
            >
              {primaryActionLabel}
            </Button>

            <Button
              href={secondaryActionHref}
              variant="outline"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4 text-sky-400" />}
              className="w-full sm:w-auto text-white border-slate-700 bg-slate-900/60 hover:bg-slate-800 hover:text-white backdrop-blur-md font-semibold"
            >
              {secondaryActionLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

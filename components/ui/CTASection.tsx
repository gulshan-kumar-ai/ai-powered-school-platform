import React from "react";
import { Container } from "../layout/Container";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { ArrowRight, Calendar } from "lucide-react";

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
    <section className={cn("py-16 sm:py-20 bg-[#0f2744] text-white relative overflow-hidden", className)}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <Container className="relative">
        <div className="max-w-3xl mx-auto text-center space-y-5">
          {badge && (
            <div className="inline-block">
              <Badge variant="accent" size="md">
                {badge}
              </Badge>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            {description}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              href={primaryActionHref}
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto shadow-md hover:shadow-lg"
            >
              {primaryActionLabel}
            </Button>

            <Button
              href={secondaryActionHref}
              variant="outline"
              size="lg"
              leftIcon={<Calendar className="w-4 h-4 text-sky-400" />}
              className="w-full sm:w-auto text-white border-white/20 bg-white/10 hover:bg-white/20 hover:text-white"
            >
              {secondaryActionLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

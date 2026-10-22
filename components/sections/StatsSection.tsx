import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { StatsCard } from "../ui/StatsCard";
import { ShieldCheck, Award } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-t border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Institutional Benchmarks"
          badgeVariant="accent"
          title="Campus Vitality & Academic Milestones"
          description="Key performance indicators reflecting enrollment expansion, faculty credentials, and dedicated scientific infrastructure at Government Qazi Sultan Higher Secondary School, Kunri."
        />

        {/* Quality Standard Bar */}
        <div className="max-w-3xl mx-auto mb-12 -mt-4 bg-white/90 border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              <strong>Verified Standards:</strong> Affiliated with Board of Intermediate &amp; Secondary Education (BISE) Mirpur Khas.
            </span>
          </div>
          <div className="flex items-center gap-2 text-sky-700 font-semibold shrink-0">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Session 2026–2027 Active</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.sampleStats.map((stat) => (
            <StatsCard key={stat.id} stat={stat} />
          ))}
        </div>
      </Container>
    </section>
  );
}

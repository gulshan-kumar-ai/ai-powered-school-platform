import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { StatsCard } from "../ui/StatsCard";
import { AlertCircle } from "lucide-react";

export function StatsSection() {
  return (
    <section className="py-20 sm:py-28 bg-white">
      <Container>
        <SectionHeading
          badge="Sample Metrics"
          badgeVariant="demo"
          title="Campus Life & Academic Benchmarks"
          description="Illustrative figures demonstrating dashboard metrics and school performance indicators. All values shown are configurable sample placeholders."
        />

        {/* Notice on Sample Data */}
        <div className="max-w-2xl mx-auto mb-10 -mt-6 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5 flex items-center justify-center gap-2 text-xs text-amber-900 text-center">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Developer Notice:</strong> Statistics below are sample data templates. Real school figures will be loaded from the administration database in Phase 2.
          </span>
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

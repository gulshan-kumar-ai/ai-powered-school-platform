import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import { Badge } from "../ui/Badge";
import {
  Bot,
  Library,
  Gamepad2,
  ShieldCheck,
  Check,
  Clock,
  Layers,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Library,
  Gamepad2,
  ShieldCheck,
};

export function DigitalPreviewSection() {
  return (
    <section id="digital-learning" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-slate-100/60 border-y border-slate-200/80">
      <Container>
        <SectionHeading
          badge="Future Technology Integration"
          badgeVariant="roadmap"
          title="Digital Learning Ecosystem: Architecture Preview"
          description="In later development phases, Govt. Boys Qazi Sultan Higher Secondary School, Kunri will integrate intelligent learning tools, digital resource vaults, and proactive cybersecurity awareness."
        />

        {/* Roadmap Architecture Note */}
        <div className="max-w-3xl mx-auto mb-12 bg-white/90 border border-slate-200/90 rounded-xl p-4 sm:p-5 shadow-xs flex items-center gap-3.5 text-xs sm:text-sm text-slate-700">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-[#0f2744] font-semibold">
              Planned Incremental Rollout:
            </strong>{" "}
            The interactive modules shown below are currently in architectural planning for{" "}
            <span className="font-semibold text-indigo-700">Phase 3</span> (Digital Library & Gamification) and{" "}
            <span className="font-semibold text-indigo-700">Phase 4</span> (AI Learning Assistant & Cybersecurity).
            Phase 0 establishes the core component shells and typed integration contracts.
          </div>
        </div>

        {/* Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {siteConfig.digitalPreviews.map((item) => {
            const Icon = iconMap[item.icon] || Bot;
            return (
              <Card
                key={item.id}
                className="flex flex-col h-full bg-white border-slate-200/90 shadow-sm relative overflow-hidden"
              >
                {/* Subtle top indicator bar */}
                <div className="h-1 w-full bg-indigo-500/70" />

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100/80">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="roadmap" size="sm">
                      {item.statusBadge}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-bold text-[#0f2744] leading-snug">
                    {item.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    <div className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">
                      Planned Capabilities:
                    </div>
                    {item.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-3 bg-slate-50/60 text-xs text-slate-500 flex items-center justify-between">
                  <span className="flex items-center gap-1 font-medium text-indigo-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.phase}</span>
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    In Design
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/Card";
import {
  Bot,
  Library,
  Gamepad2,
  ShieldCheck,
  Check,
  Sparkles,
  Zap,
  Cpu,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Library,
  Gamepad2,
  ShieldCheck,
};

export function DigitalPreviewSection() {
  return (
    <section id="digital-learning" className="py-20 sm:py-28 bg-[#061121] text-white relative overflow-hidden border-y border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-400/30 text-xs font-bold text-sky-300 shadow-md mb-4">
            <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Smart School Innovation Suite</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Next-Gen Digital Learning Ecosystem
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Equipping Government Qazi Sultan Higher Secondary School Kunri with intelligent academic tools, curated digital vaults, and proactive student cybersecurity.
          </p>
        </div>

        {/* Feature Overview Strip */}
        <div className="max-w-4xl mx-auto mb-14 bg-slate-900/80 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-400/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white font-bold">Intelligent Campus Suite:</strong>{" "}
              Integrated with role-based access for students, teachers, parents, and school leadership.
            </div>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-full shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Platform Active</span>
          </div>
        </div>

        {/* Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.digitalPreviews.map((item) => {
            const Icon = iconMap[item.icon] || Bot;
            return (
              <Card
                key={item.id}
                className="flex flex-col h-full bg-slate-900/90 border border-slate-700/80 hover:border-sky-400/60 shadow-xl relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Glowing top accent stripe */}
                <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-teal-400 group-hover:from-sky-300 group-hover:to-teal-300 transition-all" />

                <CardHeader className="pb-3 text-white">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center border border-sky-400/20 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                      Smart Module
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-800">
                    <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                      Core Capabilities:
                    </div>
                    {item.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-3 bg-slate-950/70 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-semibold text-sky-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Enhanced</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    Integrated
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

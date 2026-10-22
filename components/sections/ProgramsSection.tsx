import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProgramCard } from "../ui/ProgramCard";
import { Button } from "../ui/Button";
import { ArrowRight, BookCheck, ShieldCheck } from "lucide-react";

export function ProgramsSection() {
  return (
    <section id="academics" className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/80 relative">
      <Container>
        <SectionHeading
          badge="Academic Curriculum"
          badgeVariant="accent"
          title="Progressive Learning & Board Examination Pathways"
          description="Designed to challenge curiosity and foster lifelong scholarship, our structured curriculum spans primary foundation through Higher Secondary Pre-Engineering and Pre-Medical certification."
        />

        {/* Academic Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {siteConfig.academicPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Curriculum Banner Callout with Cinematic Luxury Depth */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#08162b] via-[#0f2744] to-[#16365c] text-white p-8 sm:p-10 shadow-xl border border-sky-400/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-start gap-4 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/40 shadow-inner">
              <BookCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs text-sky-300 font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>BISE Mirpur Khas Syllabus Certified</span>
              </div>
              <h4 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Curriculum Handbooks, Syllabi &amp; Laboratory Schedules
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl leading-relaxed">
                Explore BISE grading criteria, practical laboratory rotations for Physics, Chemistry &amp; Biology, and collegiate admission counseling pathways.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto relative z-10">
            <Button
              href="/academics"
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full md:w-auto bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-lg shadow-sky-950/40 border-0"
            >
              Academic Directory
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

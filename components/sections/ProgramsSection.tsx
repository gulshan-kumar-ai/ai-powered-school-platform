import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { ProgramCard } from "../ui/ProgramCard";
import { Button } from "../ui/Button";
import { ArrowRight, BookCheck } from "lucide-react";

export function ProgramsSection() {
  return (
    <section id="academics" className="py-20 sm:py-28 bg-slate-50/70 border-y border-slate-200/80">
      <Container>
        <SectionHeading
          badge="Academic Curriculum"
          badgeVariant="accent"
          title="Progressive Learning Pathways"
          description="Designed to challenge curiosity and foster lifelong mastery, our comprehensive curriculum spans early childhood discovery through pre-university Advanced Placement credentials."
        />

        {/* Academic Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {siteConfig.academicPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        {/* Curriculum Banner Callout */}
        <div className="rounded-2xl bg-[#0f2744] text-white p-8 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
              <BookCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white tracking-tight">
                Curriculum Syllabi & Academic Handbook
              </h4>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Explore comprehensive grading standards, AP course prerequisites, laboratory
                requirements, and collegiate advisement roadmaps.
              </p>
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <Button
              href="/academics"
              variant="accent"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full md:w-auto"
            >
              View Full Academics Directory
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

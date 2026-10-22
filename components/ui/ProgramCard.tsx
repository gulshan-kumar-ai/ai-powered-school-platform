import React from "react";
import Link from "next/link";
import { AcademicProgram } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";
import { Badge } from "./Badge";
import { Sparkles, Compass, Award, Cpu, Check, ArrowRight } from "lucide-react";

interface ProgramCardProps {
  program: AcademicProgram;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Compass,
  Award,
  Cpu,
};

export function ProgramCard({ program }: ProgramCardProps) {
  const IconComponent = iconMap[program.icon] || Sparkles;

  return (
    <Card hoverable className="flex flex-col h-full border border-slate-200/90 bg-white relative overflow-hidden group shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300">
      {/* Top indicator stripe */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-[#0f2744] opacity-80 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100/80 shadow-xs group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
            <IconComponent className="w-6 h-6" />
          </div>
          {program.featuredBadge && (
            <Badge variant="accent" size="sm" className="font-semibold shadow-2xs">
              {program.featuredBadge}
            </Badge>
          )}
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
          {program.level} • {program.ageRange}
        </div>
        <h3 className="text-xl font-extrabold text-[#0f2744] mt-1 tracking-tight group-hover:text-[#0284c7] transition-colors">
          {program.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
          {program.description}
        </p>

        <div className="space-y-2.5 pt-3 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-900 tracking-wide uppercase">
            Curriculum Highlights:
          </div>
          <ul className="space-y-1.5">
            {program.curriculumHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-50">
        <Link
          href={`/academics#${program.id}`}
          className="inline-flex items-center text-xs font-bold text-[#0284c7] hover:text-[#0369a1] group/link"
        >
          <span>Explore curriculum details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

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
    <Card hoverable className="flex flex-col h-full border-slate-200/80 bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100 shadow-sm">
            <IconComponent className="w-6 h-6" />
          </div>
          {program.featuredBadge && (
            <Badge variant="accent" size="sm">
              {program.featuredBadge}
            </Badge>
          )}
        </div>
        <div className="text-xs font-semibold uppercase tracking-wider text-sky-800">
          {program.level} • {program.ageRange}
        </div>
        <h3 className="text-xl font-bold text-[#0f2744] mt-1">
          {program.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          {program.description}
        </p>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="text-xs font-semibold text-slate-900 tracking-wide">
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

      <CardFooter className="pt-4">
        <Link
          href={`/academics#${program.id}`}
          className="inline-flex items-center text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] group"
        >
          <span>Explore curriculum details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}

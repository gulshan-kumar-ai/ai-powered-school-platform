import React from "react";
import { StatItem } from "@/types";
import { Card } from "./Card";
import { Users, GraduationCap, FlaskConical, Trophy } from "lucide-react";

interface StatsCardProps {
  stat: StatItem;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  GraduationCap,
  FlaskConical,
  Trophy,
};

export function StatsCard({ stat }: StatsCardProps) {
  const Icon = iconMap[stat.icon] || Trophy;

  return (
    <Card className="p-6 relative overflow-hidden bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group">
      {/* Subtle top indicator bar */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-teal-400 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100/80 shadow-xs group-hover:bg-[#0284c7] group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50/80 px-2 py-0.5 rounded-full border border-sky-200/60">
          Verified Metric
        </span>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-black text-[#0f2744] tracking-tight group-hover:text-[#0284c7] transition-colors">
          {stat.value}
        </div>
        <div className="text-sm font-bold text-slate-800 mt-1">
          {stat.label}
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {stat.subtext}
        </p>
      </div>
    </Card>
  );
}

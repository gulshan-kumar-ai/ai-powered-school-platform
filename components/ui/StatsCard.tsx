import React from "react";
import { StatItem } from "@/types";
import { Card } from "./Card";
import { Badge } from "./Badge";
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
    <Card className="p-6 relative overflow-hidden bg-white border-slate-200/90 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
          <Icon className="w-6 h-6" />
        </div>
        <Badge variant="demo" size="sm">
          Sample Placeholder
        </Badge>
      </div>

      <div>
        <div className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight">
          {stat.value}
        </div>
        <div className="text-sm font-semibold text-slate-800 mt-1">
          {stat.label}
        </div>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {stat.subtext}
        </p>
      </div>
    </Card>
  );
}

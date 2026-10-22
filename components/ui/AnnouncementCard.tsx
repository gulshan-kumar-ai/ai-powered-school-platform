import React from "react";
import Link from "next/link";
import { Announcement } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";
import { Badge } from "./Badge";
import { formatDate } from "@/lib/utils";
import { Calendar, BellRing, Sparkles, ArrowRight, Trophy } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const getCategoryBadge = (category: Announcement["category"]) => {
    switch (category) {
      case "notice":
        return {
          label: "School Notice",
          variant: "default" as const,
          icon: BellRing,
        };
      case "event":
        return {
          label: "Upcoming Event",
          variant: "accent" as const,
          icon: Sparkles,
        };
      case "academic":
        return {
          label: "Academic Calendar",
          variant: "secondary" as const,
          icon: Calendar,
        };
      case "achievement":
        return {
          label: "Merit Laureate",
          variant: "accent" as const,
          icon: Trophy,
        };
      default:
        return {
          label: "Update",
          variant: "secondary" as const,
          icon: BellRing,
        };
    }
  };

  const cat = getCategoryBadge(announcement.category);
  const Icon = cat.icon;

  return (
    <Card hoverable className="flex flex-col h-full border border-slate-200/90 bg-white relative overflow-hidden group shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300">
      {/* Top subtle border highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-400 to-[#0f2744] opacity-70 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <Badge variant={cat.variant} size="sm" className="gap-1 font-semibold">
            <Icon className="w-3 h-3" />
            <span>{cat.label}</span>
          </Badge>

          {announcement.priority === "urgent" && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Priority
            </span>
          )}
          {announcement.priority === "important" && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              Featured
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <time dateTime={announcement.date} className="font-medium text-slate-600">
            {formatDate(announcement.date)}
          </time>
          <span className="text-slate-300">•</span>
          <span className="truncate">{announcement.department}</span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#0f2744] leading-snug group-hover:text-[#0284c7] transition-colors">
          <Link href={`/news/${announcement.id}`} className="hover:underline">
            {announcement.title}
          </Link>
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {announcement.summary}
        </p>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-50">
        <Link
          href={`/news/${announcement.id}`}
          className="inline-flex items-center text-xs font-bold text-[#0284c7] hover:text-[#0369a1] group/link"
        >
          <span>Read bulletin article</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}

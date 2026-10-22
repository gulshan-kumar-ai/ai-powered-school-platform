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
          label: "Student Honor",
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
    <Card hoverable className="flex flex-col h-full border-slate-200/90 bg-white">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <Badge variant={cat.variant} size="sm" className="gap-1">
            <Icon className="w-3 h-3" />
            <span>{cat.label}</span>
          </Badge>

          {announcement.isDemo && (
            <Badge variant="demo" size="sm">
              Demonstration Data
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <time dateTime={announcement.date}>{formatDate(announcement.date)}</time>
          <span className="text-slate-300">•</span>
          <span>{announcement.department}</span>
        </div>

        <h3 className="text-lg font-bold text-[#0f2744] leading-snug group-hover:text-[#0284c7] transition-colors">
          <Link href={`/news/${announcement.id}`} className="hover:underline">
            {announcement.title}
          </Link>
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4">
        <p className="text-sm text-slate-600 leading-relaxed">
          {announcement.summary}
        </p>
      </CardContent>

      <CardFooter className="pt-3">
        <Link
          href={`/news/${announcement.id}`}
          className="inline-flex items-center text-xs font-semibold text-[#0284c7] hover:text-[#0369a1] group"
        >
          <span>Read bulletin article</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </CardFooter>
    </Card>
  );
}


"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EventItem } from "@/types";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";
import { Badge } from "./Badge";
import {
  Clock,
  MapPin,
  ArrowRight,
  BookmarkCheck,
  Check,
} from "lucide-react";

interface EventCardProps {
  event: EventItem;
  variant?: "compact" | "default";
}

export function EventCard({ event }: EventCardProps) {
  const [saved, setSaved] = useState(false);

  // Parse date into Day & Month
  const dateObj = new Date(event.date);
  const monthName = !isNaN(dateObj.getTime())
    ? dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase()
    : "DATE";
  const dayNumber = !isNaN(dateObj.getTime())
    ? dateObj.getDate()
    : "—";

  const getCategoryBadge = (category: EventItem["category"]) => {
    switch (category) {
      case "academic":
        return { label: "Academic", variant: "default" as const };
      case "admissions":
        return { label: "Admissions", variant: "accent" as const };
      case "arts":
        return { label: "Performing Arts", variant: "secondary" as const };
      case "athletics":
        return { label: "Athletics", variant: "outline" as const };
      case "community":
        return { label: "Civic Event", variant: "roadmap" as const };
      default:
        return { label: "Event", variant: "default" as const };
    }
  };

  const cat = getCategoryBadge(event.category);

  return (
    <Card hoverable className="flex flex-col h-full border border-slate-200/90 bg-white group shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 relative overflow-hidden">
      {/* Top subtle highlight */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-[#0f2744] opacity-75 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          {/* Calendar Date Block */}
          <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 text-[#0f2744] shrink-0 group-hover:bg-[#0f2744] group-hover:text-white transition-colors duration-300 shadow-2xs">
            <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">
              {monthName}
            </span>
            <span className="text-xl font-black leading-none mt-0.5">
              {dayNumber}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-1.5 flex-1">
            <Badge variant={cat.variant} size="sm" className="font-semibold">
              {cat.label}
            </Badge>
            {event.isPast && (
              <Badge variant="secondary" size="sm">
                Concluded
              </Badge>
            )}
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-[#0f2744] leading-snug group-hover:text-[#0284c7] transition-colors">
          <Link href={`/events/${event.id}`} className="hover:underline">
            {event.title}
          </Link>
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-4 space-y-3">
        <div className="space-y-1.5 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {event.summary}
        </p>
      </CardContent>

      <CardFooter className="pt-3 border-t border-slate-50 flex items-center justify-between gap-2">
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center text-xs font-bold text-[#0284c7] hover:text-[#0369a1] group/link"
        >
          <span>Event details</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover/link:translate-x-1" />
        </Link>

        {!event.isPast && (
          <button
            type="button"
            onClick={() => setSaved(!saved)}
            className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1 transition-all cursor-pointer ${
              saved
                ? "bg-teal-50 text-teal-700 border-teal-300"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
            title={saved ? "Event Bookmarked" : "Save event to my calendar"}
          >
            {saved ? (
              <>
                <Check className="w-3 h-3 text-teal-600" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <BookmarkCheck className="w-3 h-3 text-slate-400" />
                <span>Save</span>
              </>
            )}
          </button>
        )}
      </CardFooter>
    </Card>
  );
}

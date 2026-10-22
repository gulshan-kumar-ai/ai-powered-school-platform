"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { AnnouncementCategory } from "@/types";
import { Container } from "../layout/Container";
import { AnnouncementCard } from "../ui/AnnouncementCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Bell, Sparkles, Calendar, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnnouncementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | AnnouncementCategory>("all");

  const filteredAnnouncements = selectedCategory === "all"
    ? siteConfig.announcements
    : siteConfig.announcements.filter((item) => item.category === selectedCategory);

  return (
    <section id="announcements" className="py-20 sm:py-28 bg-white relative">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="md" className="gap-1.5 font-bold">
                <Bell className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Official School Gazette</span>
              </Badge>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                Session 2026–2027
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2744]">
              Notices, Key Dates &amp; Academic Gazettes
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Stay informed with official school circulars, BISE Mirpur Khas examination dates, merit awards, and sports fixtures published by the administration.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/news"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="border-slate-300 hover:border-sky-500"
            >
              All Bulletins
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-200">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
              selectedCategory === "all"
                ? "bg-[#0f2744] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            All Bulletins ({siteConfig.announcements.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("notice")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "notice"
                ? "bg-[#0f2744] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Bell className="w-3.5 h-3.5 text-sky-500" />
            <span>Official Notices</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("event")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "event"
                ? "bg-[#0f2744] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Campus Events</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("academic")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "academic"
                ? "bg-[#0f2744] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>Academic Calendar</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("achievement")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "achievement"
                ? "bg-[#0f2744] text-white shadow-sm"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Honor Laureates</span>
          </button>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.slice(0, 6).map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </Container>
    </section>
  );
}

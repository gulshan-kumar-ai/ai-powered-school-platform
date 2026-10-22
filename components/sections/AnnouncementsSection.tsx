"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { AnnouncementCategory } from "@/types";
import { Container } from "../layout/Container";
import { AnnouncementCard } from "../ui/AnnouncementCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Bell, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AnnouncementsSection() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | AnnouncementCategory>("all");

  const filteredAnnouncements = selectedCategory === "all"
    ? siteConfig.announcements
    : siteConfig.announcements.filter((item) => item.category === selectedCategory);

  return (
    <section id="announcements" className="py-20 sm:py-28 bg-white">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="demo" size="md">
                Demonstration Bulletin
              </Badge>
              <Badge variant="accent" size="md">
                Campus Updates
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2744]">
              Notices, Key Dates & Campus Events
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Stay updated with academic bulletins, term schedules, and upcoming community
              gatherings. All items currently shown are illustrative demonstration entries.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/news"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              All Bulletins
            </Button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 border-b border-slate-100">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
              selectedCategory === "all"
                ? "bg-[#0f2744] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            All Updates ({siteConfig.announcements.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("notice")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "notice"
                ? "bg-[#0f2744] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Bell className="w-3.5 h-3.5" />
            <span>School Notices</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("event")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5",
              selectedCategory === "event"
                ? "bg-[#0f2744] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Upcoming Events</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory("academic")}
            className={cn(
              "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer",
              selectedCategory === "academic"
                ? "bg-[#0f2744] text-white shadow-xs"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            )}
          >
            Academic Calendar
          </button>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>
      </Container>
    </section>
  );
}

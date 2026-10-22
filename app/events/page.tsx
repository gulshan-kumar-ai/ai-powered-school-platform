"use client";

import React, { useState, useMemo } from "react";
import { siteConfig } from "@/config/site";
import { EventCategory } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { EventCard } from "@/components/ui/EventCard";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Search,
} from "lucide-react";


export default function EventsPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [category, setCategory] = useState<"all" | EventCategory>("all");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return siteConfig.events.filter((item) => {
      const matchesTab = tab === "upcoming" ? !item.isPast : item.isPast;
      const matchesCategory = category === "all" || item.category === category;
      const matchesSearch =
        search.trim() === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.summary.toLowerCase().includes(search.toLowerCase()) ||
        item.venue.toLowerCase().includes(search.toLowerCase());
      return matchesTab && matchesCategory && matchesSearch;
    });
  }, [tab, category, search]);

  const upcomingCount = siteConfig.events.filter((e) => !e.isPast).length;
  const pastCount = siteConfig.events.filter((e) => e.isPast).length;

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="Master Calendar & Gatherings"
        badgeVariant="accent"
        title="Campus Events, Recitals & Gatherings"
        description="Explore upcoming academic symposiums, competitive athletic fixtures, performing arts recitals, and prospective family discovery days."
        breadcrumbs={[{ label: "Events & Calendar" }]}
      />

      {/* 2. Main Events Listing Section */}
      <section className="py-12 bg-white">
        <Container>
          {/* Main Tab Toggle: Upcoming vs Past */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-200 mb-8">
            <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  tab === "upcoming"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Upcoming Events ({upcomingCount})
              </button>
              <button
                type="button"
                onClick={() => setTab("past")}
                className={cn(
                  "px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  tab === "past"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Concluded & Archives ({pastCount})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search events by title or venue..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <button
              type="button"
              onClick={() => setCategory("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "all"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              All Categories
            </button>
            <button
              type="button"
              onClick={() => setCategory("academic")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "academic"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              Academic
            </button>
            <button
              type="button"
              onClick={() => setCategory("admissions")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "admissions"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              Admissions
            </button>
            <button
              type="button"
              onClick={() => setCategory("arts")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "arts"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              Performing Arts
            </button>
            <button
              type="button"
              onClick={() => setCategory("athletics")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "athletics"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              Athletics
            </button>
            <button
              type="button"
              onClick={() => setCategory("community")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                category === "community"
                  ? "bg-[#0284c7] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              )}
            >
              Community
            </button>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/80 mb-16 space-y-3">
              <Calendar className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">
                No events match your selected criteria
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try switching between Upcoming and Concluded events or clear your search terms.
              </p>
              <Button
                onClick={() => {
                  setCategory("all");
                  setSearch("");
                }}
                variant="outline"
                size="sm"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </section>

      {/* 3. CTA Section */}
      <CTASection
        title="Experience Our Campus in Person"
        description="Arrange a guided campus visit with our staff to tour the academic complex, memorial courtyard, and classrooms."
        primaryActionLabel="Book a Discovery Tour"
        primaryActionHref="/admissions"
        secondaryActionLabel="Contact Admissions Office"
        secondaryActionHref="/contact"
      />
    </div>
  );
}

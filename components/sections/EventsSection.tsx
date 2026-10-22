import React from "react";
import { siteConfig } from "@/config/site";

import { Container } from "../layout/Container";
import { EventCard } from "../ui/EventCard";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";

export function EventsSection() {
  const upcomingEvents = siteConfig.events
    .filter((event) => !event.isPast)
    .slice(0, 3);

  return (
    <section id="events" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="md" className="gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Campus Calendar</span>
              </Badge>
              <Badge variant="demo" size="md">
                Demonstration Schedule
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0f2744]">
              Upcoming School Events & Gatherings
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Experience the vibrant Oakridge community through academic symposiums, arts recitals,
              athletic fixtures, and prospective family discovery sessions.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/events"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Master Calendar
            </Button>
          </div>
        </div>

        {/* 3 Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Bottom Calendar Sync Callout */}
        <div className="mt-12 rounded-xl bg-white border border-slate-200/90 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-700 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#0f2744]">
                Want to attend a campus discovery session?
              </span>{" "}
              Prospective families can schedule personal guided morning tours throughout the term.
            </div>
          </div>
          <Button href="/admissions" variant="primary" size="sm" className="shrink-0">
            Schedule Discovery Tour
          </Button>
        </div>
      </Container>
    </section>
  );
}

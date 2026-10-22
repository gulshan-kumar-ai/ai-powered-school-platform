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
    <section id="events" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="md" className="gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Campus Calendar</span>
              </Badge>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                Official Gatherings
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2744]">
              Upcoming School Events &amp; Ceremonies
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Experience the vibrant community of Government Qazi Sultan Higher Secondary School through patriotic symposiums, annual prize honors, athletic fixtures, and prospective family discovery sessions.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/events"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="border-slate-300 hover:border-sky-500"
            >
              Master Calendar
            </Button>
          </div>
        </div>

        {/* 3 Upcoming Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Bottom Discovery Tour Callout */}
        <div className="mt-12 rounded-2xl bg-white border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-700 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 border border-sky-100">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-[#0f2744]">
                Plan a Guided Campus Orientation:
              </span>{" "}
              Prospective families and guardians can schedule personal guided morning tours throughout the school week.
            </div>
          </div>
          <Button href="/admissions" variant="primary" size="sm" className="shrink-0 font-semibold">
            Schedule Campus Visit
          </Button>
        </div>
      </Container>
    </section>
  );
}

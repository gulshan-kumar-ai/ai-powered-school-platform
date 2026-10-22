import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/ui/EventCard";
import { formatDate } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  BookmarkCheck,
} from "lucide-react";


interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateStaticParams() {
  return siteConfig.events.map((event) => ({
    id: event.id,
  }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = siteConfig.events.find((e) => e.id === id);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: `${event.title} | ${siteConfig.name} Events`,
    description: event.summary,
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = siteConfig.events.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  const relatedEvents = siteConfig.events
    .filter((e) => e.id !== event.id)
    .slice(0, 3);

  return (
    <div className="bg-white py-10 sm:py-16">
      <Container>
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Events & Calendar", href: "/events" },
            { label: event.title },
          ]}
          className="mb-8"
        />

        <article className="max-w-4xl mx-auto">
          {/* Main Event Header Card */}
          <div className="bg-gradient-to-br from-[#0f2744] to-[#08162b] text-white rounded-2xl p-6 sm:p-10 shadow-md border border-slate-800 mb-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <Badge variant="accent" size="sm">
                {event.category.toUpperCase()}
              </Badge>
              {event.isPast && (
                <Badge variant="secondary" size="sm">
                  Past Event
                </Badge>
              )}
              {event.isDemo && (
                <Badge variant="demo" size="sm">
                  Demonstration Schedule
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-6">
              {event.title}
            </h1>

            {/* Event Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Date</div>
                  <div className="text-slate-300">{formatDate(event.date)}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Time & Duration</div>
                  <div className="text-slate-300">{event.time}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Location / Venue</div>
                  <div className="text-slate-300">{event.venue}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Content & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
            {/* Left Column: Full Description and Agenda */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0f2744] mb-3">
                  About This Event
                </h2>
                <p className="text-base text-slate-700 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Event Agenda Breakdown */}
              {event.agenda && event.agenda.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg font-bold text-[#0f2744] flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0284c7]" />
                    <span>Event Schedule & Agenda</span>
                  </h3>

                  <div className="space-y-4 border-l-2 border-[#0284c7]/40 ml-2 pl-4">
                    {event.agenda.map((slot, idx) => (
                      <div key={idx} className="relative">
                        <div className="text-xs font-bold font-mono text-[#0284c7]">
                          {slot.time}
                        </div>
                        <div className="text-sm font-semibold text-slate-800 mt-0.5">
                          {slot.title}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Attendance & Host Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                <h4 className="font-bold text-sm text-[#0f2744] uppercase tracking-wider border-b border-slate-100 pb-2">
                  Event Details
                </h4>

                {event.speaker && (
                  <div className="text-xs space-y-1">
                    <span className="text-slate-500 font-semibold block">Keynote / Host</span>
                    <span className="text-slate-800 font-medium">{event.speaker}</span>
                  </div>
                )}

                <div className="text-xs space-y-1">
                  <span className="text-slate-500 font-semibold block">Intended Audience</span>
                  <span className="text-slate-800 font-medium">{event.audience}</span>
                </div>

                <div className="text-xs space-y-1">
                  <span className="text-slate-500 font-semibold block">Admission Fee</span>
                  <span className="text-emerald-700 font-semibold">Complimentary (Registration Encouraged)</span>
                </div>

                <div className="pt-2">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    leftIcon={<BookmarkCheck className="w-4 h-4 text-sky-300" />}
                  >
                    Contact Event Desk
                  </Button>
                </div>
              </div>

              {/* Campus Visitors Policy */}
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 space-y-1">
                <div className="font-bold">Campus Visitor Notice</div>
                <p className="leading-relaxed text-slate-600">
                  Guest parking is available in the North visitor lot. Registered guests check in at the Main Administration Welcome Desk.
                </p>
              </div>
            </div>
          </div>

          {/* Back Navigation Button */}
          <div className="pt-6 border-t border-slate-200 mb-14">
            <Button
              href="/events"
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back to Master Calendar
            </Button>
          </div>
        </article>

        {/* Related Events Section */}
        {relatedEvents.length > 0 && (
          <div className="max-w-5xl mx-auto pt-8 border-t border-slate-200">
            <h3 className="text-xl font-bold text-[#0f2744] mb-6">
              Other Upcoming Events on Campus
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEvents.map((rel) => (
                <EventCard key={rel.id} event={rel} />
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

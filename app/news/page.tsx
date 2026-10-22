"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { AnnouncementCategory } from "@/types";
import { PageHeader } from "@/components/ui/PageHeader";

import { Container } from "@/components/layout/Container";
import { AnnouncementCard } from "@/components/ui/AnnouncementCard";
import { NewsletterPreview } from "@/components/ui/NewsletterPreview";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, cn } from "@/lib/utils";
import {
  Search,
  Calendar,
  Sparkles,
  Bell,
  Trophy,
  BookOpen,
  ArrowRight,
  Filter,
} from "lucide-react";

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | AnnouncementCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = useMemo(() => {
    return siteConfig.announcements.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.department.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const featured = siteConfig.announcements[0];

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="School Media & Bulletins"
        badgeVariant="accent"
        title="Campus Bulletins, Academic Notices & News"
        description="Stay connected with official school announcements, academic milestone schedules, student honors, and community developments."
        breadcrumbs={[{ label: "News & Bulletins" }]}
      />

      {/* 2. Featured Lead Story */}
      {featured && (
        <section className="py-10 bg-slate-50/70 border-b border-slate-200/80">
          <Container>
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="urgent" size="sm">
                    Featured Bulletin
                  </Badge>
                  <Badge variant="demo" size="sm">
                    Demonstration Entry
                  </Badge>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] hover:text-[#0284c7] transition-colors">
                  <Link href={`/news/${featured.id}`}>
                    {featured.title}
                  </Link>
                </h2>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  </span>
                  <span>•</span>
                  <span>{featured.department}</span>
                  {featured.readTime && (
                    <>
                      <span>•</span>
                      <span>{featured.readTime}</span>
                    </>
                  )}
                </div>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {featured.summary}
                </p>

                <div className="pt-2">
                  <Button
                    href={`/news/${featured.id}`}
                    variant="primary"
                    size="md"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Read Full Official Bulletin
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-4 bg-gradient-to-br from-[#0f2744] to-[#19385c] text-white p-6 rounded-xl flex flex-col justify-between h-full">
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold text-sky-300 uppercase tracking-wider">
                    Official Announcement
                  </span>
                  <div className="font-bold text-lg text-white">
                    Admissions Cycle 2026–2027
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Priority deadlines are now active. Review required candidate credentials and book personal campus tours.
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/10">
                  <Link
                    href="/admissions"
                    className="text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1"
                  >
                    <span>View Admissions Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 3. Search & Category Filters */}
      <section className="py-12 bg-white">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer",
                  selectedCategory === "all"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                All Bulletins ({siteConfig.announcements.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("notice")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "notice"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notices</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("academic")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "academic"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Academic</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("event")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "event"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Events</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("achievement")}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5",
                  selectedCategory === "achievement"
                    ? "bg-[#0f2744] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Honors</span>
              </button>
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles or topics..."
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0284c7]"
              />
            </div>
          </div>

          {/* Announcements Grid */}
          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {filteredNews.map((announcement) => (
                <AnnouncementCard key={announcement.id} announcement={announcement} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/80 mb-16 space-y-3">
              <Filter className="w-8 h-8 text-slate-400 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">
                No bulletins match your filter
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for different terms or reset your category filter to view all campus updates.
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                variant="outline"
                size="sm"
              >
                Reset Filters
              </Button>
            </div>
          )}

          {/* Newsletter Subscription Preview */}
          <div className="max-w-3xl mx-auto">
            <NewsletterPreview />
          </div>
        </Container>
      </section>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { LearningResource, LearningResourceType } from "@/types/portal";
import {
  Library,
  Search,
  BookOpen,
  FileText,
  Video,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Download,
  Eye,
  Sparkles,
  CheckCircle2,
  Clock,
  Layers,
} from "lucide-react";

export default function StudentLibraryPage() {
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const [resources, setResources] = useState<LearningResource[]>(() =>
    schoolStore.getLearningResources({ isPublishedOnly: true })
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<"catalog" | "bookmarked" | "recent">("catalog");
  const [selectedResource, setSelectedResource] = useState<LearningResource | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const subjects = schoolStore.getSubjects();

  // Bookmarking handler
  const handleToggleBookmark = (resourceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowBookmarked = schoolStore.toggleBookmark(studentId, resourceId);
    setFeedback(isNowBookmarked ? "Resource bookmarked to your personal vault." : "Removed bookmark.");
    setTimeout(() => setFeedback(""), 3500);
    setResources([...schoolStore.getLearningResources({ isPublishedOnly: true })]);
  };

  // Open / access resource handler
  const handleAccessResource = (res: LearningResource) => {
    schoolStore.recordResourceAccess(studentId, res.id);
    setSelectedResource(res);
  };

  const filteredResources = useMemo(() => {
    let list = resources;

    if (activeTab === "bookmarked") {
      const bookmarkedIds = schoolStore.getUserBookmarks(studentId).map((b) => b.id);
      list = list.filter((r) => bookmarkedIds.includes(r.id));
    } else if (activeTab === "recent") {
      const recentIds = schoolStore.getRecentResourceAccesses(studentId).map((r) => r.id);
      list = list.filter((r) => recentIds.includes(r.id));
    }

    if (selectedSubject !== "all") {
      list = list.filter((r) => r.subject_id === selectedSubject);
    }

    if (selectedType !== "all") {
      list = list.filter((r) => r.resource_type === selectedType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.subject_name?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [resources, activeTab, selectedSubject, selectedType, searchQuery, studentId]);

  const getTypeBadge = (type: LearningResourceType) => {
    switch (type) {
      case "pdf":
        return <Badge variant="navy" size="sm" className="flex items-center gap-1"><FileText className="w-3 h-3 text-red-500" /> PDF Document</Badge>;
      case "document":
        return <Badge variant="accent" size="sm" className="flex items-center gap-1"><BookOpen className="w-3 h-3 text-sky-600" /> Study Guide</Badge>;
      case "video":
        return <Badge variant="secondary" size="sm" className="flex items-center gap-1"><Video className="w-3 h-3 text-purple-600" /> Lecture Video</Badge>;
      case "link":
        return <Badge variant="roadmap" size="sm" className="flex items-center gap-1"><ExternalLink className="w-3 h-3 text-amber-600" /> Web Resource</Badge>;
    }
  };

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Digital Library", href: "/portal/student/library" },
      ]}
      title="Scholar Digital Learning Library"
      description="Curated digital textbooks, AP examination revision guides, laboratory protocols, and interactive multimedia learning modules."
    >
      <div className="space-y-6">
        {/* Top Notification Toast */}
        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b border-slate-200 gap-2">
          <button
            onClick={() => setActiveTab("catalog")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "catalog"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Library className="w-4 h-4" />
            <span>Complete Academic Catalog ({resources.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("bookmarked")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "bookmarked"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Bookmarks</span>
          </button>
          <button
            onClick={() => setActiveTab("recent")}
            className={`pb-3 px-4 text-xs font-bold transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "recent"
                ? "border-[#0284c7] text-[#0284c7]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Recently Accessed</span>
          </button>
        </div>

        {/* Poster Pillar 5: 4 Quick Category Filter Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => {
              setSelectedType("all");
              setSearchQuery("Textbook");
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              searchQuery === "Textbook"
                ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 shadow-xs"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Textbooks</div>
              <div className="text-[10px] text-slate-400">Sindh Board Curricula</div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedType("pdf");
              setSearchQuery("Notes");
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              searchQuery === "Notes"
                ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 shadow-xs"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Notes</div>
              <div className="text-[10px] text-slate-400">Class Revision Proofs</div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedType("video");
              setSearchQuery("");
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              selectedType === "video"
                ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 shadow-xs"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Videos</div>
              <div className="text-[10px] text-slate-400">Visual Demonstrations</div>
            </div>
          </button>

          <button
            onClick={() => {
              setSelectedType("all");
              setSearchQuery("Past Papers");
            }}
            className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
              searchQuery === "Past Papers"
                ? "bg-sky-50 dark:bg-sky-950/60 border-sky-500 text-sky-900 dark:text-sky-200 shadow-xs"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400"
            }`}
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100">Past Papers</div>
              <div className="text-[10px] text-slate-400">BISE Mirpur Khas Exams</div>
            </div>
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, notes, videos..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {(searchQuery || selectedType !== "all" || selectedSubject !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedType("all");
                  setSelectedSubject("all");
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                Reset Filters
              </button>
            )}

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 cursor-pointer"
            >
              <option value="all">All Subjects</option>
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-950 cursor-pointer"
            >
              <option value="all">All File Types</option>
              <option value="pdf">PDF Documents</option>
              <option value="document">Study Guides & Textbooks</option>
              <option value="video">Video Lectures</option>
              <option value="link">Web Portals</option>
            </select>
          </div>
        </div>

        {/* Recommended Subject Banner */}
        {activeTab === "catalog" && (
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 text-sky-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">
                  Recommended for Enrolled Cohort: Grade 10 AP Physics C
                </h3>
                <p className="text-xs text-sky-200 mt-0.5">
                  Dr. Marcus Chen recently published the official Mechanics Derivation proofs. Review prior to Quiz 1.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setSelectedSubject("c0000000-0000-0000-0000-000000000001")}
              variant="secondary"
              size="sm"
              className="shrink-0"
            >
              View Physics Materials
            </Button>
          </div>
        )}

        {/* Resources Cards Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <Library className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="font-bold text-slate-800 text-sm">No learning materials found</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms, changing the subject filter, or switching tabs.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResources.map((res) => {
              const bookmarked = schoolStore.isBookmarked(studentId, res.id);
              return (
                <Card
                  key={res.id}
                  className="bg-white border-slate-200 flex flex-col justify-between hover:shadow-md transition-shadow group relative"
                >
                  <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-start justify-between gap-2">
                    <div className="space-y-1">
                      {getTypeBadge(res.resource_type)}
                      <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider pt-1">
                        {res.subject_name}
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleToggleBookmark(res.id, e)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        bookmarked
                          ? "text-amber-500 bg-amber-50"
                          : "text-slate-400 hover:text-amber-500 hover:bg-slate-50"
                      }`}
                      title={bookmarked ? "Bookmarked" : "Bookmark this resource"}
                      aria-label="Toggle Bookmark"
                    >
                      {bookmarked ? (
                        <BookmarkCheck className="w-4 h-4 fill-amber-500" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-sm text-[#0f2744] group-hover:text-sky-600 transition-colors leading-snug">
                        {res.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-medium text-slate-700 flex items-center gap-1">
                        <Layers className="w-3 h-3 text-slate-400" />
                        {res.topic}
                      </span>
                      <span>{res.file_size}</span>
                    </div>
                  </CardContent>

                  <div className="p-4 pt-0 flex items-center gap-2">
                    <Button
                      onClick={() => handleAccessResource(res)}
                      variant="primary"
                      size="sm"
                      className="flex-1 text-xs"
                      leftIcon={<Eye className="w-3.5 h-3.5" />}
                    >
                      Open Document
                    </Button>
                    <Button
                      href={`/portal/student/library/${res.id}`}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      Details
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Resource Viewer Modal */}
        {selectedResource && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in-50 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getTypeBadge(selectedResource.resource_type)}
                    <span className="text-xs font-bold text-slate-500">
                      {selectedResource.subject_name}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f2744]">
                    {selectedResource.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedResource(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="font-bold text-slate-900 block mb-1">
                    Curricular Description & Topic Overview:
                  </span>
                  <p className="leading-relaxed text-slate-600">
                    {selectedResource.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Author / Faculty
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedResource.author_name}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Curriculum Topic
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedResource.topic}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      File Format / Size
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedResource.file_size}
                    </span>
                  </div>
                </div>

                {/* Simulated Viewer / Safe Embed */}
                {selectedResource.resource_type === "video" ? (
                  <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center text-white">
                    <div className="text-center p-6 space-y-2">
                      <Video className="w-12 h-12 text-sky-400 mx-auto" />
                      <div className="font-bold text-sm">Educational Lecture Player</div>
                      <p className="text-[11px] text-slate-400 max-w-sm">
                        Stream verified instructional video on {selectedResource.topic}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl border border-sky-100 bg-sky-50/50 text-center space-y-2">
                    <FileText className="w-10 h-10 text-sky-600 mx-auto" />
                    <div className="font-bold text-[#0f2744] text-sm">
                      Official Academy Learning Document
                    </div>
                    <p className="text-xs text-slate-600 max-w-md mx-auto">
                      Access verified PDF course reader and laboratory protocol hosted in the school&apos;s digital repository.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-500">
                  {selectedResource.downloads_count} verified scholar accesses
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      alert(`Downloading: ${selectedResource.title} (${selectedResource.file_size})`);
                      setSelectedResource(null);
                    }}
                    variant="primary"
                    size="sm"
                    leftIcon={<Download className="w-3.5 h-3.5" />}
                  >
                    Download Resource
                  </Button>
                  <Button
                    onClick={() => setSelectedResource(null)}
                    variant="outline"
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

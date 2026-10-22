"use client";

import React, { use } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import {
  FileText,
  Video,
  ArrowLeft,
  Download,
  Bookmark,
  BookmarkCheck,
  Sparkles,
} from "lucide-react";

interface ResourceDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function StudentResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { id } = use(params);
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const resource = schoolStore.getLearningResourceById(id);

  if (!resource) {
    return (
      <PortalLayout
        requiredRole="student"
        breadcrumbs={[
          { label: "Scholar Portal", href: "/portal/student" },
          { label: "Digital Library", href: "/portal/student/library" },
        ]}
      >
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Learning Resource Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            The requested educational material could not be located in the academy repository.
          </p>
          <Button href="/portal/student/library" variant="primary" size="sm">
            Return to Digital Library Catalog
          </Button>
        </div>
      </PortalLayout>
    );
  }

  const bookmarked = schoolStore.isBookmarked(studentId, resource.id);
  const relatedResources = schoolStore
    .getLearningResources({ subjectId: resource.subject_id, isPublishedOnly: true })
    .filter((r) => r.id !== resource.id)
    .slice(0, 3);

  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Digital Library", href: "/portal/student/library" },
        { label: resource.title, href: `/portal/student/library/${resource.id}` },
      ]}
      title={resource.title}
      description={`Curricular learning material for ${resource.subject_name} • Author: ${resource.author_name}`}
      actions={
        <Button href="/portal/student/library" variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
          Back to Catalog
        </Button>
      }
    >
      <div className="space-y-6 max-w-5xl">
        {/* Main Document Details Card */}
        <Card className="bg-white border-slate-200 overflow-hidden">
          <div className="h-2 w-full bg-gradient-to-r from-sky-500 to-indigo-600" />
          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Badge variant="navy" size="sm">
                    {resource.resource_type.toUpperCase()}
                  </Badge>
                  <Badge variant="accent" size="sm">
                    {resource.subject_name}
                  </Badge>
                  <Badge variant="secondary" size="sm">
                    {resource.topic}
                  </Badge>
                </div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f2744]">
                  {resource.title}
                </h1>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  onClick={() => {
                    schoolStore.toggleBookmark(studentId, resource.id);
                    window.location.reload();
                  }}
                  variant="outline"
                  size="sm"
                  leftIcon={
                    bookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-500" />
                    )
                  }
                >
                  {bookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
                <Button
                  onClick={() => {
                    schoolStore.recordResourceAccess(studentId, resource.id);
                    alert(`Downloading educational document: ${resource.title}`);
                  }}
                  variant="primary"
                  size="sm"
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Download File
                </Button>
              </div>
            </div>

            {/* Synopsis */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Course Synopsis & Study Objectives
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {resource.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Author / Faculty
                </span>
                <span className="font-extrabold text-sm text-[#0f2744]">
                  {resource.author_name}
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Target Cohort
                </span>
                <span className="font-extrabold text-sm text-[#0f2744]">
                  {resource.class_name || "Grade 10 Senior Prep"}
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Format / Size
                </span>
                <span className="font-extrabold text-sm text-[#0f2744]">
                  {resource.file_size || "Digital Reader"}
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Verified Reads
                </span>
                <span className="font-extrabold text-sm text-teal-700">
                  {resource.downloads_count} Accesses
                </span>
              </div>
            </div>

            {/* Resource Preview Container */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-900 text-white p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-white/10 mx-auto flex items-center justify-center border border-white/20 text-sky-400">
                {resource.resource_type === "video" ? (
                  <Video className="w-8 h-8" />
                ) : (
                  <FileText className="w-8 h-8" />
                )}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">
                  {resource.title}
                </h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                  Hosted on the secure Govt. Boys Qazi Sultan Higher Secondary School institutional vault. Access granted under student academic enrollment.
                </p>
              </div>
              <div className="pt-2">
                <Button
                  onClick={() => {
                    schoolStore.recordResourceAccess(studentId, resource.id);
                    alert(`Opening full reader for ${resource.title}`);
                  }}
                  variant="primary"
                  size="md"
                >
                  Open Document Viewer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Course Materials */}
        {relatedResources.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-base font-extrabold text-[#0f2744] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Related Resources in this Subject</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedResources.map((rel) => (
                <Card key={rel.id} className="bg-white border-slate-200 p-4 space-y-2">
                  <div className="text-[10px] font-bold text-sky-600 uppercase">
                    {rel.topic}
                  </div>
                  <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {rel.description}
                  </p>
                  <div className="pt-2 flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100">
                    <span>{rel.file_size}</span>
                    <Link
                      href={`/portal/student/library/${rel.id}`}
                      className="font-bold text-sky-600 hover:text-sky-800"
                    >
                      View Resource →
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

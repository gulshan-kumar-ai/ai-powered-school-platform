"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import { LearningResource, Subject } from "@/types/portal";
import {
  Search,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  FileText,
  Video,
  Globe,
  FileCode,
  Eye,
  Filter,
} from "lucide-react";

export default function AdminLibraryPage() {
  const [resources, setResources] = useState<LearningResource[]>(() => schoolStore.getLearningResources());
  const [subjects] = useState<Subject[]>(() => schoolStore.getSubjects());
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleTogglePublish = (resource: LearningResource) => {
    const updated = schoolStore.updateLearningResource(resource.id, {
      is_published: !resource.is_published,
    });
    if (updated) {
      setNotification({
        type: "success",
        message: `Resource "${resource.title}" status changed to ${
          updated.is_published ? "Published" : "Withdrawn / Unpublished"
        }.`,
      });
      setResources(schoolStore.getLearningResources());
    }
  };

  const handleDeleteResource = (resource: LearningResource) => {
    if (confirm(`ADMIN ACTION: Permanently remove "${resource.title}" from the digital library?`)) {
      schoolStore.deleteLearningResource(resource.id);
      setNotification({
        type: "success",
        message: `Resource "${resource.title}" has been expunged by administrator.`,
      });
      setResources(schoolStore.getLearningResources());
    }
  };

  const filteredResources = resources.filter((res) => {
    if (selectedSubject !== "all" && res.subject_id !== selectedSubject) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        res.title.toLowerCase().includes(q) ||
        res.topic.toLowerCase().includes(q) ||
        (res.subject_name && res.subject_name.toLowerCase().includes(q)) ||
        (res.author_name && res.author_name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  const totalDownloads = resources.reduce((sum, r) => sum + r.downloads_count, 0);

  return (
    <PortalLayout
      requiredRole="administrator"
      breadcrumbs={[
        { label: "Administration", href: "/portal/admin" },
        { label: "Digital Library", href: "/portal/admin/library" },
      ]}
      title="Digital Library Moderation & Content Governance"
      description="Audit faculty uploads, enforce educational standards, withdraw inappropriate materials, and monitor curriculum repository utilization."
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {notification && (
          <div
            className={`p-4 rounded-xl border flex items-center justify-between text-xs font-semibold ${
              notification.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            <div className="flex items-center gap-2">
              {notification.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Total Vault Items
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            {resources.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Across all departments</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Live Published
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-2">
            {resources.filter((r) => r.is_published).length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Visible to enrolled students</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Draft / Unapproved
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-2">
            {resources.filter((r) => !r.is_published).length}
          </div>
          <div className="text-xs text-slate-500 mt-1">Hidden from student access</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Cumulative Reads & Downloads
          </span>
          <div className="text-2xl font-bold text-sky-600 mt-2">
            {totalDownloads}
          </div>
          <div className="text-xs text-slate-500 mt-1">Student vault accesses</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources, topics, or faculty author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-500">Subject Domain:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
          >
            <option value="all">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Moderation Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Resource & Syllabus Topic</th>
                <th className="px-4 py-3">Faculty Contributor</th>
                <th className="px-4 py-3">Subject & Class</th>
                <th className="px-4 py-3">Usage</th>
                <th className="px-4 py-3">Publish Status</th>
                <th className="px-5 py-3 text-right">Admin Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResources.map((res) => {
                let Icon = FileText;
                if (res.resource_type === "video") Icon = Video;
                else if (res.resource_type === "link") Icon = Globe;
                else if (res.resource_type === "document") Icon = FileCode;

                return (
                  <tr key={res.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-700 shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 leading-snug">
                            {res.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Topic: {res.topic}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {res.file_size} • ID: {res.id.slice(0, 16)}...
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800">{res.author_name}</div>
                      <div className="text-[10px] text-slate-400">
                        {new Date(res.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{res.subject_name}</div>
                      <div className="text-[11px] text-slate-500">{res.class_name || "All Enrolled"}</div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap text-slate-700 font-semibold">
                      {res.downloads_count} accesses
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleTogglePublish(res)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                          res.is_published
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${res.is_published ? "bg-emerald-500" : "bg-slate-400"}`} />
                        {res.is_published ? "Published" : "Withdrawn"}
                      </button>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                      <Link
                        href={`/portal/student/library/${res.id}`}
                        target="_blank"
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors inline-block"
                        title="Student View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDeleteResource(res)}
                        className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete from System"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </PortalLayout>
  );
}

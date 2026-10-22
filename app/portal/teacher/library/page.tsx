"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import {
  LearningResource,
  LearningResourceType,
  Subject,
  ClassItem,
} from "@/types/portal";
import {
  Library,
  Plus,
  Search,
  FileText,
  Video,
  Globe,
  FileCode,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

export default function TeacherLibraryPage() {
  const [resources, setResources] = useState<LearningResource[]>(() => schoolStore.getLearningResources());
  const [subjects] = useState<Subject[]>(() => schoolStore.getSubjects());
  const [classes] = useState<ClassItem[]>(() => schoolStore.getClasses());
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewResource, setPreviewResource] = useState<LearningResource | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subjectId, setSubjectId] = useState(() => {
    const s = schoolStore.getSubjects();
    return s.length > 0 ? s[0].id : "";
  });
  const [classId, setClassId] = useState(() => {
    const c = schoolStore.getClasses();
    return c.length > 0 ? c[0].id : "";
  });
  const [topic, setTopic] = useState("");
  const [resourceType, setResourceType] = useState<LearningResourceType>("pdf");
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [externalUrl, setExternalUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Teacher identification (Dr. Robert Chen in seed data)
  const currentTeacherId = "10000000-0000-0000-0000-000000000001";

  const handleCreateResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim() || !subjectId) {
      setNotification({ type: "error", message: "Please fill in all required fields." });
      return;
    }

    setSubmitting(true);
    try {
      let finalUrl = externalUrl;
      let calculatedSize = "Digital Learning File";

      if (resourceType === "pdf" || resourceType === "document") {
        if (resourceFile) {
          calculatedSize = `${(resourceFile.size / (1024 * 1024)).toFixed(2)} MB`;
          finalUrl = `/storage/vault/${resourceFile.name}`;
        } else {
          finalUrl = externalUrl || "/storage/vault/curriculum-spec.pdf";
          calculatedSize = "2.4 MB";
        }
      } else {
        if (!externalUrl) {
          finalUrl = "https://www.youtube.com/watch?v=sample-lecture";
        }
      }

      schoolStore.createLearningResource({
        title,
        description,
        subjectId,
        classId: classId || undefined,
        topic,
        resourceType,
        url: finalUrl,
        fileSize: calculatedSize,
        createdByTeacherId: currentTeacherId,
        authorName: "Dr. Robert Chen",
        isPublished,
      });

      setNotification({
        type: "success",
        message: `Resource "${title}" successfully uploaded and saved to the digital repository.`,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setTopic("");
      setResourceFile(null);
      setExternalUrl("");
      setIsModalOpen(false);
      setResources(schoolStore.getLearningResources());
    } catch {
      setNotification({ type: "error", message: "Failed to create resource. Please verify parameters." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = (resource: LearningResource) => {
    const updated = schoolStore.updateLearningResource(resource.id, {
      is_published: !resource.is_published,
    });
    if (updated) {
      setNotification({
        type: "success",
        message: `Publication status for "${resource.title}" updated to ${
          updated.is_published ? "Published (Visible to students)" : "Draft (Hidden from students)"
        }.`,
      });
      setResources(schoolStore.getLearningResources());
    }
  };

  const handleDeleteResource = (resource: LearningResource) => {
    if (confirm(`Are you sure you want to archive and remove "${resource.title}"?`)) {
      schoolStore.deleteLearningResource(resource.id);
      setNotification({
        type: "success",
        message: `Resource "${resource.title}" removed from repository.`,
      });
      setResources(schoolStore.getLearningResources());
    }
  };

  const filteredResources = resources.filter((res) => {
    if (selectedSubject !== "all" && res.subject_id !== selectedSubject) return false;
    if (selectedType !== "all" && res.resource_type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        res.title.toLowerCase().includes(q) ||
        res.topic.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        (res.subject_name && res.subject_name.toLowerCase().includes(q));
      if (!match) return false;
    }
    return true;
  });

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Digital Library", href: "/portal/teacher/library" },
      ]}
      title="Digital Learning Library & Curriculum Repository"
      description="Publish PDFs, lecture videos, and curriculum courseware for enrolled students."
    >
      <div className="space-y-6">
      {/* Notifications */}
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <Library className="w-3.5 h-3.5" />
            <span>Curriculum Vault</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Digital Library & Resource Management
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Publish educational materials, upload laboratory packets, curate video seminars, and configure access for your classes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Learning Resource</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources, topics, keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700"
            >
              <option value="all">All Subjects</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Format:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-700"
            >
              <option value="all">All Formats</option>
              <option value="pdf">PDF Documents</option>
              <option value="document">Course Docs</option>
              <option value="video">Video Lectures</option>
              <option value="link">Web Portals</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resource Table / List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3">Resource & Topic</th>
                <th className="px-4 py-3">Subject & Class</th>
                <th className="px-4 py-3">Format</th>
                <th className="px-4 py-3">Downloads / Access</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResources.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                    <Library className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-slate-600">No resources found</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Adjust your search or click &quot;Add Learning Resource&quot; to upload materials.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredResources.map((res) => {
                  let formatBadge = "bg-slate-100 text-slate-700";
                  let Icon = FileText;
                  if (res.resource_type === "pdf") {
                    formatBadge = "bg-rose-50 text-rose-700 border-rose-200";
                    Icon = FileText;
                  } else if (res.resource_type === "video") {
                    formatBadge = "bg-indigo-50 text-indigo-700 border-indigo-200";
                    Icon = Video;
                  } else if (res.resource_type === "link") {
                    formatBadge = "bg-emerald-50 text-emerald-700 border-emerald-200";
                    Icon = Globe;
                  } else {
                    formatBadge = "bg-blue-50 text-blue-700 border-blue-200";
                    Icon = FileCode;
                  }

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
                              Topic: <span className="font-semibold text-slate-700">{res.topic}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {res.file_size} • Created by {res.author_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="font-medium text-slate-800">{res.subject_name}</div>
                        <div className="text-[11px] text-slate-500">{res.class_name || "All Enrolled Classes"}</div>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${formatBadge}`}>
                          {res.resource_type}
                        </span>
                      </td>

                      <td className="px-4 py-4 whitespace-nowrap text-slate-600">
                        <span className="font-semibold text-slate-900">{res.downloads_count}</span> times
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
                          {res.is_published ? "Published" : "Draft (Hidden)"}
                        </button>
                      </td>

                      <td className="px-5 py-4 whitespace-nowrap text-right space-x-2">
                        <button
                          onClick={() => setPreviewResource(res)}
                          className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                          title="Preview Resource"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteResource(res)}
                          className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Resource"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">Add New Learning Material</h3>
                <p className="text-xs text-slate-500">Publish verified academic content to student dashboards</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateResource} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AP Physics Mechanics: Rotational Kinematics Compendium"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Class / Cohort
                  </label>
                  <select
                    value={classId}
                    onChange={(e) => setClassId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                  >
                    <option value="">All Enrolled Classes</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic & Syllabus Unit <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unit 3: Newton's Laws and Rotational Dynamics"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resource Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["pdf", "document", "video", "link"] as LearningResourceType[]).map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setResourceType(type)}
                      className={`py-2 px-3 rounded-lg border text-xs font-bold capitalize transition-all ${
                        resourceType === type
                          ? "bg-sky-50 border-sky-500 text-sky-700 ring-2 ring-sky-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {resourceType === "pdf" || resourceType === "document" ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Document File (.pdf, .docx, .epub)
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.epub"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResourceFile(e.target.files[0]);
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Max size 25MB. Files are protected through authorized session vaults.
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    External Resource / Video URL <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://youtu.be/... or educational link"
                    value={externalUrl}
                    onChange={(e) => setExternalUrl(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Educational Description & Learning Objectives
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide study instructions, prerequisites, or reading guidance..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="publishToggle"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
                />
                <label htmlFor="publishToggle" className="text-xs text-slate-700 font-medium">
                  Publish immediately (Students will see this in their digital library)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
                >
                  {submitting ? "Uploading..." : "Save & Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                  {previewResource.resource_type} Resource Preview
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {previewResource.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewResource(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                <span className="font-bold block text-slate-900 mb-1">Description:</span>
                {previewResource.description}
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="text-slate-400 block text-[10px] uppercase">Subject</span>
                  <span className="font-bold text-slate-800">{previewResource.subject_name}</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-white">
                  <span className="text-slate-400 block text-[10px] uppercase">Topic Unit</span>
                  <span className="font-bold text-slate-800">{previewResource.topic}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-sky-300 bg-sky-50/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-sky-600 text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{previewResource.file_size}</div>
                    <div className="text-[10px] text-slate-500">Authorized document vault entry</div>
                  </div>
                </div>
                <Link
                  href={`/portal/student/library/${previewResource.id}`}
                  className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Student View</span>
                </Link>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewResource(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </PortalLayout>
  );
}

"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { Assignment } from "@/types/portal";
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Award,
  X,
  Eye,
  EyeOff,
} from "lucide-react";

export default function TeacherAssignmentsPage() {
  const teacherId = "10000000-0000-0000-0000-000000000001";
  const [assignments, setAssignments] = useState<Assignment[]>(() =>
    schoolStore.getAssignments()
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sectionId, setSectionId] = useState("e0000000-0000-0000-0000-000000000001");
  const [subjectId, setSubjectId] = useState("c0000000-0000-0000-0000-000000000001");
  const [dueDate, setDueDate] = useState("2026-10-24");
  const [maxMarks, setMaxMarks] = useState(50);
  const [isPublished, setIsPublished] = useState(true);

  const sections = schoolStore.getSections();
  const subjects = schoolStore.getSubjects();

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Please provide an assignment title and detailed description.");
      return;
    }

    const created = schoolStore.createAssignment({
      sectionId,
      subjectId,
      teacherId,
      title,
      description,
      dueDate,
      maxMarks: Number(maxMarks),
      isPublished,
    });

    setAssignments(schoolStore.getAssignments());
    setIsCreateModalOpen(false);
    setTitle("");
    setDescription("");
    setSuccessMessage(`Assignment "${created.title}" successfully created (${isPublished ? "Published to Students" : "Saved as Draft"}).`);
    setTimeout(() => setSuccessMessage(""), 5000);
  };

  const handleTogglePublished = (assignmentId: string) => {
    const target = assignments.find((a) => a.id === assignmentId);
    if (!target) return;

    // Toggle in store
    target.is_published = !target.is_published;
    setAssignments([...schoolStore.getAssignments()]);
    setSuccessMessage(`Updated visibility: "${target.title}" is now ${target.is_published ? "Published to Students" : "Unpublished Draft"}.`);
    setTimeout(() => setSuccessMessage(""), 4000);
  };

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Assignments", href: "/portal/teacher/assignments" },
      ]}
      title="Academic Assignments & Coursework"
      description="Author curriculum tasks, assign deadlines, set maximum rubrics, and control student visibility."
      actions={
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          New Assignment
        </Button>
      }
    >
      <div className="space-y-6">
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
            <button onClick={() => setSuccessMessage("")} className="text-emerald-700 hover:text-emerald-900">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="bg-white border-slate-200 flex flex-col justify-between">
              <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="navy" size="sm">
                      {assignment.subject_name || "Physics"}
                    </Badge>
                    <Badge variant="outline" size="sm">
                      {assignment.section_name || "Section 10-A"}
                    </Badge>
                  </div>
                  <CardTitle className="text-base text-[#0f2744]">
                    {assignment.title}
                  </CardTitle>
                </div>

                <Badge
                  variant={assignment.is_published ? "primary" : "accent"}
                  size="sm"
                >
                  {assignment.is_published ? "Published" : "Draft Only"}
                </Badge>
              </CardHeader>

              <CardContent className="p-5 flex-1 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  {assignment.description}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Due: <strong>{assignment.due_date}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>Max: <strong>{assignment.max_marks} pts</strong></span>
                  </div>
                </div>
              </CardContent>

              <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Created {new Date(assignment.created_at).toLocaleDateString()}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePublished(assignment.id)}
                  leftIcon={assignment.is_published ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-sky-600" />}
                  className="text-xs"
                >
                  {assignment.is_published ? "Unpublish" : "Publish to Class"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Create Assignment */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0284c7]" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Create Course Assignment
                  </h3>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assignment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Problem Set 5: Rotational Dynamics"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Target Cohort Section *
                    </label>
                    <select
                      value={sectionId}
                      onChange={(e) => setSectionId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      {sections.map((sec) => (
                        <option key={sec.id} value={sec.id}>
                          {sec.name} ({sec.class_name})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Subject / Course *
                    </label>
                    <select
                      value={subjectId}
                      onChange={(e) => setSubjectId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                    >
                      {subjects.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.code} — {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Maximum Score (Points) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={500}
                      value={maxMarks}
                      onChange={(e) => setMaxMarks(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assignment Description & Criteria *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide detailed instructions, textbook problems, and rubric criteria..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="publishCheck"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded border-slate-300 text-[#0284c7] focus:ring-[#0284c7]"
                  />
                  <label htmlFor="publishCheck" className="font-semibold text-slate-800">
                    Publish immediately to students and parents
                  </label>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Create Assignment
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

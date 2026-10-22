"use client";

import React, { useState } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { Examination } from "@/types/portal";
import {
  Award,
  Plus,
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Users,
} from "lucide-react";

export default function TeacherExaminationsPage() {
  const teacherId = "10000000-0000-0000-0000-000000000001";
  const [exams, setExams] = useState<Examination[]>(() => schoolStore.getExaminations());
  const [selectedExamId, setSelectedExamId] = useState<string>(
    exams[0]?.id || "70000000-0000-0000-0000-000000000001"
  );

  const currentExam = exams.find((e) => e.id === selectedExamId);
  const students = currentExam ? schoolStore.getSectionStudents(currentExam.section_id) : [];

  const [marksMap, setMarksMap] = useState<Record<string, { score: number; remarks: string }>>(() => {
    const initialExam = exams[0];
    if (!initialExam) return {};
    const roster = schoolStore.getSectionStudents(initialExam.section_id);
    const existingMarks = schoolStore.getMarksForExam(initialExam.id);
    const map: Record<string, { score: number; remarks: string }> = {};
    roster.forEach((s) => {
      const match = existingMarks.find((m) => m.student_id === s.id);
      map[s.id] = {
        score: match ? match.score : 0,
        remarks: match?.remarks || "",
      };
    });
    return map;
  });

  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Exam Form State
  const [newExamName, setNewExamName] = useState("");
  const [newSectionId, setNewSectionId] = useState("e0000000-0000-0000-0000-000000000001");
  const [newSubjectId, setNewSubjectId] = useState("c0000000-0000-0000-0000-000000000001");
  const [newExamDate, setNewExamDate] = useState("2026-11-10");
  const [newMaxMarks, setNewMaxMarks] = useState(100);
  const [newWeight, setNewWeight] = useState(25);

  const sections = schoolStore.getSections();
  const subjects = schoolStore.getSubjects();
  const terms = schoolStore.getTerms();

  const handleExamSelect = (examId: string) => {
    setSelectedExamId(examId);
    const targetExam = exams.find((e) => e.id === examId);
    if (!targetExam) return;
    const roster = schoolStore.getSectionStudents(targetExam.section_id);
    const existingMarks = schoolStore.getMarksForExam(targetExam.id);
    const map: Record<string, { score: number; remarks: string }> = {};
    roster.forEach((s) => {
      const match = existingMarks.find((m) => m.student_id === s.id);
      map[s.id] = {
        score: match ? match.score : 0,
        remarks: match?.remarks || "",
      };
    });
    setMarksMap(map);
  };

  const existingMarksForCurrent = currentExam ? schoolStore.getMarksForExam(currentExam.id) : [];
  const isCurrentlyPublished = existingMarksForCurrent.length > 0 && existingMarksForCurrent[0].is_published;

  const handleScoreChange = (studentId: string, val: string) => {
    const num = parseFloat(val) || 0;
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        score: num,
      },
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks,
      },
    }));
  };

  const handleSaveMarks = (publish: boolean) => {
    if (!currentExam) return;
    setFeedback(null);

    // Validate maximum marks constraint
    for (const s of students) {
      const score = marksMap[s.id]?.score || 0;
      if (score < 0 || score > currentExam.max_marks) {
        setFeedback({
          type: "error",
          message: `Validation Error: Score for ${s.profile?.full_name} (${score}) exceeds maximum allowed score (${currentExam.max_marks} pts).`,
        });
        return;
      }
    }

    try {
      const recordsToSave = students.map((s) => ({
        examinationId: currentExam.id,
        studentId: s.id,
        score: marksMap[s.id]?.score || 0,
        remarks: marksMap[s.id]?.remarks || undefined,
        isPublished: publish,
        teacherId,
      }));

      const res = schoolStore.saveExamMarks(recordsToSave);
      setFeedback({
        type: "success",
        message: res.message,
      });
      setTimeout(() => setFeedback(null), 6000);
    } catch (err: unknown) {
      setFeedback({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to record examination scores.",
      });
    }
  };

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExamName.trim()) {
      alert("Please provide an assessment name.");
      return;
    }

    const created = schoolStore.createExamination({
      termId: terms[0]?.id || "b0000000-0000-0000-0000-000000000001",
      sectionId: newSectionId,
      subjectId: newSubjectId,
      name: newExamName,
      examDate: newExamDate,
      maxMarks: Number(newMaxMarks),
      weightPercentage: Number(newWeight),
    });

    setExams(schoolStore.getExaminations());
    setSelectedExamId(created.id);
    setIsCreateModalOpen(false);
    setNewExamName("");
    setFeedback({
      type: "success",
      message: `Created assessment: "${created.name}". Ready for score entry.`,
    });
    setTimeout(() => setFeedback(null), 5000);
  };

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Examinations & Marks", href: "/portal/teacher/examinations" },
      ]}
      title="Examination Registry & Digital Gradebook"
      description="Record student scores with maximum points validation, draft saving, and authorized grade publication."
      actions={
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Exam
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSaveMarks(false)}
            leftIcon={<Save className="w-3.5 h-3.5 text-slate-600" />}
          >
            Save Draft
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleSaveMarks(true)}
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
          >
            Publish Results
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
              feedback.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-rose-50 text-rose-800 border-rose-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Exam Selector Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="exam-selector" className="text-xs font-bold text-slate-700 whitespace-nowrap">
              Select Examination:
            </label>
            <select
              id="exam-selector"
              value={selectedExamId}
              onChange={(e) => handleExamSelect(e.target.value)}
              className="w-full md:w-96 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold bg-white text-slate-900"
            >
              {exams.map((exam) => (
                <option key={exam.id} value={exam.id}>
                  {exam.name} — {exam.subject_name} ({exam.section_name})
                </option>
              ))}
            </select>
          </div>

          {currentExam && (
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <span>Max Points: <strong className="text-slate-900">{currentExam.max_marks}</strong></span>
                <span>•</span>
                <span>Weight: <strong className="text-slate-900">{currentExam.weight_percentage}%</strong></span>
              </div>
              <Badge
                variant={isCurrentlyPublished ? "primary" : "accent"}
                size="sm"
              >
                {isCurrentlyPublished ? "Published" : "Draft Status"}
              </Badge>
            </div>
          )}
        </div>

        {/* Security / Visibility Banner */}
        <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 flex items-start gap-3">
          <Award className="w-5 h-5 text-[#0284c7] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold">
              Gradebook Authorization Rule
            </div>
            <p className="text-sky-900 leading-relaxed">
              When saving as <strong>Draft</strong>, scores remain strictly private to instructors. Students and parents will only see marks once you click <strong>Publish Results</strong>. Score values are validated against the maximum points configured for this examination.
            </p>
          </div>
        </div>

        {/* Grade Entry Table */}
        <Card className="bg-white border-slate-200">
          <CardHeader className="py-4 px-6 border-b border-slate-100 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#0284c7]" />
              <CardTitle className="text-base text-[#0f2744]">
                Class Roster Scoring ({students.length} Students)
              </CardTitle>
            </div>
            <div className="text-xs text-slate-500">
              Auto Grade Computation
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Student ID & Name</th>
                  <th className="py-3 px-4">Score (Max: {currentExam?.max_marks || 100})</th>
                  <th className="py-3 px-4">Calculated % & Grade</th>
                  <th className="py-3 px-4">Instructor Feedback / Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((student) => {
                  const score = marksMap[student.id]?.score ?? 0;
                  const remarks = marksMap[student.id]?.remarks ?? "";
                  const max = currentExam?.max_marks || 100;
                  const pct = Math.round((score / max) * 100);

                  let grade = "F";
                  if (pct >= 93) grade = "A";
                  else if (pct >= 90) grade = "A-";
                  else if (pct >= 87) grade = "B+";
                  else if (pct >= 83) grade = "B";
                  else if (pct >= 80) grade = "B-";
                  else if (pct >= 70) grade = "C";
                  else if (pct >= 60) grade = "D";

                  const isOverMax = score > max;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/70">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0f2744]">
                          {student.profile?.full_name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          {student.student_number}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.5"
                            min="0"
                            max={max}
                            value={score}
                            onChange={(e) => handleScoreChange(student.id, e.target.value)}
                            className={`w-24 px-3 py-1.5 rounded-lg border text-xs font-bold text-slate-900 ${
                              isOverMax
                                ? "border-rose-500 bg-rose-50 text-rose-700"
                                : "border-slate-300"
                            }`}
                          />
                          <span className="text-slate-400 font-medium">/ {max}</span>
                        </div>
                        {isOverMax && (
                          <div className="text-[10px] text-rose-600 font-bold mt-1">
                            Cannot exceed {max} pts
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-800">
                            {pct}%
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              pct >= 85
                                ? "bg-emerald-100 text-emerald-800"
                                : pct >= 70
                                ? "bg-sky-100 text-sky-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {grade}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={remarks}
                          onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                          placeholder="Individual academic feedback..."
                          className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Modal: Create Examination */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-base text-[#0f2744]">
                    Schedule New Examination
                  </h3>
                </div>
                <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateExam} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Examination Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newExamName}
                    onChange={(e) => setNewExamName(e.target.value)}
                    placeholder="e.g. Unit 3 Kinematics & Energy Exam"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Assigned Section *
                    </label>
                    <select
                      value={newSectionId}
                      onChange={(e) => setNewSectionId(e.target.value)}
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
                      Subject *
                    </label>
                    <select
                      value={newSubjectId}
                      onChange={(e) => setNewSubjectId(e.target.value)}
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

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Exam Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={newExamDate}
                      onChange={(e) => setNewExamDate(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Max Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={500}
                      value={newMaxMarks}
                      onChange={(e) => setNewMaxMarks(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Weight %
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={100}
                      value={newWeight}
                      onChange={(e) => setNewWeight(Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900"
                    />
                  </div>
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
                    Schedule Exam
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

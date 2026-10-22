"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import { Quiz, Subject } from "@/types/portal";
import {
  HelpCircle,
  Plus,
  Edit3,
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  X,
  FileQuestion,
  Sparkles,
} from "lucide-react";

export default function TeacherQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(() => schoolStore.getQuizzes());
  const [subjects] = useState<Subject[]>(() => schoolStore.getSubjects());
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewQuiz, setPreviewQuiz] = useState<(Quiz & { questions?: unknown[] }) | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const handleTogglePublish = (quiz: Quiz) => {
    const updated = schoolStore.updateQuiz(quiz.id, {
      is_published: !quiz.is_published,
    });
    if (updated) {
      setNotification({
        type: "success",
        message: `Quiz "${quiz.title}" is now ${
          updated.is_published ? "Published (Live for students)" : "Draft (Hidden from students)"
        }.`,
      });
      setQuizzes(schoolStore.getQuizzes());
    }
  };

  const handlePreview = (quizId: string) => {
    const fullQuiz = schoolStore.getQuizById(quizId, true);
    if (fullQuiz) {
      setPreviewQuiz(fullQuiz);
    }
  };

  const filteredQuizzes = quizzes.filter((q) => {
    if (selectedSubject !== "all" && q.subject_id !== selectedSubject) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const match =
        q.title.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        (q.subject_name && q.subject_name.toLowerCase().includes(query));
      if (!match) return false;
    }
    return true;
  });

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Quiz Builder & Tests", href: "/portal/teacher/quizzes" },
      ]}
      title="Interactive Quiz Builder & Assessment Management"
      description="Design formative quizzes, manage question banks, review AI-drafted tests, and control student publication status."
    >
      <div className="space-y-6">
      {/* Notification Toast */}
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
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Formative Assessments</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Quiz Builder & Test Assessments
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-1">
            Author interactive practice quizzes, multiple-choice drills, and short-answer evaluations with automated server-side scoring.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/portal/teacher/quizzes/ai-generate"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate with AI</span>
          </Link>
          <Link
            href="/portal/teacher/quizzes/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Quiz</span>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search quizzes by title or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="font-semibold text-slate-500">Subject:</span>
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

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredQuizzes.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <FileQuestion className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No quizzes found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Get started by clicking &quot;Create New Quiz&quot; to formulate questions with automated scoring.
            </p>
          </div>
        ) : (
          filteredQuizzes.map((quiz) => {
            let diffColor = "bg-slate-100 text-slate-700";
            if (quiz.difficulty_level === "beginner") diffColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
            else if (quiz.difficulty_level === "intermediate") diffColor = "bg-amber-50 text-amber-700 border-amber-200";
            else if (quiz.difficulty_level === "advanced") diffColor = "bg-rose-50 text-rose-700 border-rose-200";

            return (
              <div
                key={quiz.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between p-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {quiz.subject_name}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${diffColor}`}>
                      {quiz.difficulty_level}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-1">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                    {quiz.description}
                  </p>

                  <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-[11px] text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.time_limit_minutes} mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      <span>{quiz.max_attempts} max att</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{quiz.pass_percentage}% pass</span>
                    </div>
                  </div>

                  <div className="mt-2.5 text-[11px] text-slate-400">
                    Assigned Cohort: <span className="font-semibold text-slate-700">{quiz.section_name || "All Enrolled"}</span>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleTogglePublish(quiz)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                      quiz.is_published
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                        : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${quiz.is_published ? "bg-emerald-500" : "bg-slate-400"}`} />
                    {quiz.is_published ? "Published" : "Draft"}
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePreview(quiz.id)}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Preview Questions"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/portal/teacher/quizzes/${quiz.id}/edit`}
                      className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                      title="Edit Quiz & Questions"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Preview Modal */}
      {previewQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded">
                  Teacher Answer Key & Preview
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">
                  {previewQuiz.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {previewQuiz.questions?.length || 0} questions • {previewQuiz.time_limit_minutes} min duration
                </p>
              </div>
              <button
                onClick={() => setPreviewQuiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {previewQuiz.questions?.map((q: any, idx: number) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span>Question #{idx + 1} ({q.question_type.replace("_", " ").toUpperCase()})</span>
                    <span className="text-sky-700 bg-sky-100 px-2 py-0.5 rounded">+{q.points} pts</span>
                  </div>
                  <p className="text-xs text-slate-900 font-medium">{q.question_text}</p>

                  {q.question_type === "multiple_choice" && q.options && (
                    <div className="space-y-1.5 pt-1">
                      {q.options.map((opt: string, oIdx: number) => (
                        <div
                          key={oIdx}
                          className={`text-xs px-3 py-1.5 rounded-lg border flex items-center justify-between ${
                            oIdx === q.correct_option_index
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                              : "bg-white border-slate-200 text-slate-600"
                          }`}
                        >
                          <span>{opt}</span>
                          {oIdx === q.correct_option_index && (
                            <span className="text-[10px] text-emerald-700 uppercase font-bold">Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {q.question_type === "true_false" && (
                    <div className="text-xs text-slate-700 font-semibold bg-emerald-50 p-2 rounded border border-emerald-200">
                      Correct Choice: {q.correct_option_index === 0 ? "True" : "False"}
                    </div>
                  )}

                  {q.question_type === "short_answer" && (
                    <div className="text-xs text-slate-700 bg-emerald-50 p-2 rounded border border-emerald-200">
                      Accepted Answers: <span className="font-bold">{q.accepted_answers?.join(", ")}</span>
                    </div>
                  )}

                  {q.explanation && (
                    <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/50">
                      Rationale: {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPreviewQuiz(null)}
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

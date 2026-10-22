"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { schoolStore } from "@/lib/data/school-store";
import { Subject, Section, QuizQuestionType, QuizDifficulty } from "@/types/portal";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  AlertCircle,
  Eye,
  ArrowLeft,
  X,
  FileQuestion,
} from "lucide-react";

interface QuestionDraft {
  id?: string;
  questionText: string;
  questionType: QuizQuestionType;
  options: string[];
  correctOptionIndex: number;
  acceptedAnswers: string;
  explanation: string;
  points: number;
}

interface EditQuizPageProps {
  params: Promise<{ id: string }>;
}

export default function EditQuizPage({ params }: EditQuizPageProps) {
  const { id } = use(params);
  const router = useRouter();

  const [subjects] = useState<Subject[]>(() => schoolStore.getSubjects());
  const [sections] = useState<Section[]>(() => schoolStore.getSections());

  const initialQuiz = schoolStore.getQuizById(id, true);

  // Metadata
  const [title, setTitle] = useState(() => initialQuiz?.title || "");
  const [description, setDescription] = useState(() => initialQuiz?.description || "");
  const [subjectId, setSubjectId] = useState(() => initialQuiz?.subject_id || "");
  const [sectionId, setSectionId] = useState(() => initialQuiz?.section_id || "");
  const [topic, setTopic] = useState(() => initialQuiz?.topic || "");
  const [difficultyLevel, setDifficultyLevel] = useState<QuizDifficulty>(
    () => initialQuiz?.difficulty_level || "intermediate"
  );
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(
    () => initialQuiz?.time_limit_minutes || 15
  );
  const [maxAttempts, setMaxAttempts] = useState(() => initialQuiz?.max_attempts || 2);
  const [passPercentage, setPassPercentage] = useState(() => initialQuiz?.pass_percentage || 70);

  // Questions
  const [questions, setQuestions] = useState<QuestionDraft[]>(() => {
    return (initialQuiz?.questions || []).map((q) => ({
      id: q.id,
      questionText: q.question_text,
      questionType: q.question_type,
      options: q.options && q.options.length > 0 ? [...q.options] : ["", "", "", ""],
      correctOptionIndex: q.correct_option_index ?? 0,
      acceptedAnswers: (q.accepted_answers || []).join(", "),
      explanation: q.explanation || "",
      points: q.points || 10,
    }));
  });

  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(
    () => (!initialQuiz ? { type: "error", message: "Quiz not found." } : null)
  );
  const [submitting, setSubmitting] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleAddQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `draft_${Date.now()}`,
        questionText: "",
        questionType: "multiple_choice",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
        acceptedAnswers: "",
        explanation: "",
        points: 10,
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length <= 1) {
      setNotification({ type: "error", message: "A quiz must have at least one question." });
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= questions.length) return;

    setQuestions((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const handleUpdateQuestion = (index: number, patch: Partial<QuestionDraft>) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  };

  const handleAddOption = (qIndex: number) => {
    setQuestions((prev) => {
      const copy = [...prev];
      copy[qIndex].options = [...copy[qIndex].options, ""];
      return copy;
    });
  };

  const handleRemoveOption = (qIndex: number, optIndex: number) => {
    setQuestions((prev) => {
      const copy = [...prev];
      if (copy[qIndex].options.length <= 2) return copy;
      copy[qIndex].options = copy[qIndex].options.filter((_, i) => i !== optIndex);
      if (copy[qIndex].correctOptionIndex >= copy[qIndex].options.length) {
        copy[qIndex].correctOptionIndex = 0;
      }
      return copy;
    });
  };

  const handleSaveQuiz = (publishStatus: boolean) => {
    if (!title.trim() || !topic.trim() || !subjectId) {
      setNotification({ type: "error", message: "Please fill in title, topic, and subject." });
      return;
    }

    // Validate questions
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.questionText.trim()) {
        setNotification({
          type: "error",
          message: `Question #${i + 1} is missing question prompt text.`,
        });
        return;
      }
      if (q.questionType === "multiple_choice") {
        if (q.options.some((o) => !o.trim())) {
          setNotification({
            type: "error",
            message: `Question #${i + 1} has blank options. Fill or remove them.`,
          });
          return;
        }
      } else if (q.questionType === "short_answer") {
        if (!q.acceptedAnswers.trim()) {
          setNotification({
            type: "error",
            message: `Question #${i + 1} must provide at least one accepted answer.`,
          });
          return;
        }
      }
    }

    setSubmitting(true);
    try {
      const preparedQuestions = questions.map((q) => {
        if (q.questionType === "multiple_choice") {
          return {
            id: q.id?.startsWith("draft_") ? undefined : q.id,
            questionText: q.questionText,
            questionType: q.questionType,
            options: q.options,
            correctOptionIndex: q.correctOptionIndex,
            explanation: q.explanation,
            points: q.points,
          };
        } else if (q.questionType === "true_false") {
          return {
            id: q.id?.startsWith("draft_") ? undefined : q.id,
            questionText: q.questionText,
            questionType: q.questionType,
            options: ["True", "False"],
            correctOptionIndex: q.correctOptionIndex,
            explanation: q.explanation,
            points: q.points,
          };
        } else {
          const accepted = q.acceptedAnswers
            .split(",")
            .map((ans) => ans.trim())
            .filter(Boolean);
          return {
            id: q.id?.startsWith("draft_") ? undefined : q.id,
            questionText: q.questionText,
            questionType: q.questionType,
            acceptedAnswers: accepted,
            explanation: q.explanation,
            points: q.points,
          };
        }
      });

      const updated = schoolStore.updateQuiz(
        id,
        {
          title,
          description,
          subject_id: subjectId,
          section_id: sectionId || undefined,
          topic,
          difficulty_level: difficultyLevel,
          time_limit_minutes: Number(timeLimitMinutes),
          max_attempts: Number(maxAttempts),
          pass_percentage: Number(passPercentage),
          is_published: publishStatus,
        },
        preparedQuestions
      );

      if (updated) {
        setNotification({
          type: "success",
          message: `Quiz "${updated.title}" successfully updated (${publishStatus ? "Published" : "Draft"}).`,
        });
        setTimeout(() => {
          router.push("/portal/teacher/quizzes");
        }, 800);
      }
    } catch {
      setNotification({ type: "error", message: "Failed to update quiz." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Teacher Workspace", href: "/portal/teacher" },
        { label: "Quiz Builder", href: "/portal/teacher/quizzes" },
        { label: "Edit Quiz", href: `/portal/teacher/quizzes/${id}/edit` },
      ]}
      title="Edit Assessment & Question Bank"
      description="Update quiz parameters, edit question text, revise answer keys, and manage point distributions."
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

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/teacher/quizzes"
            className="p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Edit Assessment Quiz
            </h1>
            <p className="text-xs text-slate-500">
              Update test parameters, question options, and scoring definitions
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPreviewMode(!previewMode)}
            className="px-3.5 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{previewMode ? "Edit Mode" : "Preview Assessment"}</span>
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSaveQuiz(false)}
            className="px-3.5 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            disabled={submitting}
            onClick={() => handleSaveQuiz(true)}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors disabled:opacity-50"
          >
            Publish Live
          </button>
        </div>
      </div>

      {previewMode ? (
        /* Preview Mode */
        <div className="space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
              Interactive Preview Mode
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-2">{title || "Untitled Quiz"}</h2>
            <p className="text-xs text-slate-500 mt-1">{description || "No description provided."}</p>
            <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
              <span>Time Limit: <strong>{timeLimitMinutes} mins</strong></span>
              <span>Attempts Allowed: <strong>{maxAttempts}</strong></span>
              <span>Pass Threshold: <strong>{passPercentage}%</strong></span>
              <span>Total Questions: <strong>{questions.length}</strong></span>
            </div>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span>Question #{idx + 1} ({q.questionType.replace("_", " ").toUpperCase()})</span>
                  <span className="text-sky-700 bg-sky-100 px-2 py-0.5 rounded">+{q.points} pts</span>
                </div>
                <p className="text-xs font-medium text-slate-900">{q.questionText || "Question text..."}</p>

                {q.questionType === "multiple_choice" && (
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt, oIdx) => (
                      <div
                        key={oIdx}
                        className={`text-xs px-3 py-2 rounded-lg border flex items-center justify-between ${
                          oIdx === q.correctOptionIndex
                            ? "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold"
                            : "bg-white border-slate-200 text-slate-600"
                        }`}
                      >
                        <span>{opt || `Option ${oIdx + 1}`}</span>
                        {oIdx === q.correctOptionIndex && (
                          <span className="text-[10px] text-emerald-700 uppercase font-bold">Answer Key</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {q.questionType === "true_false" && (
                  <div className="text-xs text-slate-700 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    Correct Choice: {q.correctOptionIndex === 0 ? "True" : "False"}
                  </div>
                )}

                {q.questionType === "short_answer" && (
                  <div className="text-xs text-slate-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                    Accepted Answers: <span className="font-bold">{q.acceptedAnswers || "None set"}</span>
                  </div>
                )}

                {q.explanation && (
                  <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200/50">
                    Explanation: {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Edit Mode */
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-sky-600" />
              <span>Assessment Configuration</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Quiz Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. AP Physics Mechanics: Rotational Kinematics & Angular Momentum Drill"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                  Target Cohort Section
                </label>
                <select
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                >
                  <option value="">All Cohort Sections</option>
                  {sections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Topic / Unit <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Angular Dynamics"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Difficulty Level
                </label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value as QuizDifficulty)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Limit (Mins)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={timeLimitMinutes}
                  onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Max Attempts
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxAttempts}
                  onChange={(e) => setMaxAttempts(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pass Mark (%)
                </label>
                <input
                  type="number"
                  min="40"
                  max="100"
                  value={passPercentage}
                  onChange={(e) => setPassPercentage(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Description & Instructions
              </label>
              <textarea
                rows={2}
                placeholder="Provide student instructions, formulas allowed, or objectives..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
              />
            </div>
          </div>

          {/* Question Builder List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Assessment Questions ({questions.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Multiple choice, True/False, and Normalized short-answer questions
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddQuestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div
                key={q.id || qIdx}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-xs">
                      #{qIdx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Question Editor
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleMoveQuestion(qIdx, "up")}
                      disabled={qIdx === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveQuestion(qIdx, "down")}
                      disabled={qIdx === questions.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveQuestion(qIdx)}
                      className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                      title="Delete Question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Question Text <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Which physical quantity remains constant in the absence of net external torque?"
                      value={q.questionText}
                      onChange={(e) => handleUpdateQuestion(qIdx, { questionText: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Question Type
                    </label>
                    <select
                      value={q.questionType}
                      onChange={(e) =>
                        handleUpdateQuestion(qIdx, {
                          questionType: e.target.value as QuizQuestionType,
                          correctOptionIndex: 0,
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900 font-medium"
                    >
                      <option value="multiple_choice">Multiple Choice</option>
                      <option value="true_false">True / False</option>
                      <option value="short_answer">Short Answer</option>
                    </select>
                  </div>
                </div>

                {/* Sub-form based on question type */}
                {q.questionType === "multiple_choice" && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Options & Correct Answer Choice
                    </label>
                    {q.options.map((opt, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct_${q.id || qIdx}`}
                          checked={q.correctOptionIndex === oIdx}
                          onChange={() => handleUpdateQuestion(qIdx, { correctOptionIndex: oIdx })}
                          className="text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
                          title="Mark as correct answer"
                        />
                        <input
                          type="text"
                          placeholder={`Option ${oIdx + 1}`}
                          value={opt}
                          onChange={(e) => {
                            const newOpts = [...q.options];
                            newOpts[oIdx] = e.target.value;
                            handleUpdateQuestion(qIdx, { options: newOpts });
                          }}
                          className={`flex-1 px-3 py-1.5 rounded-lg text-xs border ${
                            q.correctOptionIndex === oIdx
                              ? "bg-emerald-50/50 border-emerald-300 text-slate-900"
                              : "bg-slate-50 border-slate-200 text-slate-800"
                          }`}
                        />
                        {q.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveOption(qIdx, oIdx)}
                            className="p-1 text-slate-400 hover:text-rose-500"
                            title="Remove option"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                    {q.options.length < 6 && (
                      <button
                        type="button"
                        onClick={() => handleAddOption(qIdx)}
                        className="text-xs text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1 mt-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Option</span>
                      </button>
                    )}
                  </div>
                )}

                {q.questionType === "true_false" && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Correct State
                    </label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                        <input
                          type="radio"
                          name={`tf_${q.id || qIdx}`}
                          checked={q.correctOptionIndex === 0}
                          onChange={() => handleUpdateQuestion(qIdx, { correctOptionIndex: 0 })}
                          className="text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
                        />
                        <span>True</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-800 cursor-pointer">
                        <input
                          type="radio"
                          name={`tf_${q.id || qIdx}`}
                          checked={q.correctOptionIndex === 1}
                          onChange={() => handleUpdateQuestion(qIdx, { correctOptionIndex: 1 })}
                          className="text-sky-600 focus:ring-sky-500 h-4 w-4 border-slate-300"
                        />
                        <span>False</span>
                      </label>
                    </div>
                  </div>
                )}

                {q.questionType === "short_answer" && (
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-semibold text-slate-700">
                      Accepted Answers (comma separated for normalized matching)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. angular momentum, angular momentum vector, L"
                      value={q.acceptedAnswers}
                      onChange={(e) => handleUpdateQuestion(qIdx, { acceptedAnswers: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 text-slate-900"
                    />
                    <p className="text-[10px] text-slate-400">
                      Comparisons are trimmed and case-insensitive.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="sm:col-span-3">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Answer Explanation (displayed to students after grading)
                    </label>
                    <input
                      type="text"
                      placeholder="Provide reasoning or mathematical derivation..."
                      value={q.explanation}
                      onChange={(e) => handleUpdateQuestion(qIdx, { explanation: e.target.value })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Points
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={q.points}
                      onChange={(e) => handleUpdateQuestion(qIdx, { points: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSaveQuiz(false)}
              className="px-4 py-2 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Save as Draft
            </button>
            <button
              type="button"
              disabled={submitting}
              onClick={() => handleSaveQuiz(true)}
              className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors"
            >
              Update & Publish
            </button>
          </div>
        </div>
      )}
      </div>
    </PortalLayout>
  );
}

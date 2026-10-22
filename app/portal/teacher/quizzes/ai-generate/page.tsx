"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { schoolStore } from "@/lib/data/school-store";
import {
  generateQuizDrafts,
  validateDraftQuestion,
} from "@/lib/ai/quiz-generator";
import {
  GeneratedQuestionDraft,
  QuizDifficulty,
  QuizQuestionType,
} from "@/types/portal";
import {
  Sparkles,
  Save,
  Trash2,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
} from "lucide-react";

export default function TeacherAIGenerateQuizPage() {
  const router = useRouter();
  const subjects = schoolStore.getSubjects();
  const sections = schoolStore.getSections();
  const resources = schoolStore.getLearningResources({ isPublishedOnly: true });

  // Form states
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    subjects[0]?.id || "40000000-0000-0000-0000-000000000002"
  );
  const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.id || "");
  const [topic, setTopic] = useState("Newton's Laws & Momentum");
  const [difficulty, setDifficulty] = useState<QuizDifficulty>("intermediate");
  const [questionType, setQuestionType] = useState<QuizQuestionType | "mixed">("mixed");
  const [questionsCount, setQuestionsCount] = useState<number>(3);
  const [learningObjectives, setLearningObjectives] = useState(
    "Verify conceptual understanding of force, mass, and conservation of momentum with practical application problems."
  );
  const [sourceResourceId, setSourceResourceId] = useState<string>("");

  // Quiz Meta
  const [quizTitle, setQuizTitle] = useState("Diagnostic Review: Newton's Laws & Momentum");
  const [quizDescription, setQuizDescription] = useState(
    "Formative assessment generated with AI assistance. Review questions carefully before publishing."
  );
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(15);
  const [passPercentage, setPassPercentage] = useState(70);

  // Drafts & Generation state
  const [drafts, setDrafts] = useState<GeneratedQuestionDraft[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setSaveSuccessMessage(null);
    try {
      const generated = await generateQuizDrafts({
        subject_id: selectedSubjectId,
        topic,
        difficulty,
        question_type: questionType,
        questions_count: questionsCount,
        learning_objectives: learningObjectives,
        source_resource_id: sourceResourceId || undefined,
      });
      setDrafts(generated);
    } catch {
      alert("Failed to generate drafts. Please check your topic or try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUpdateDraft = (
    index: number,
    field: keyof GeneratedQuestionDraft,
    value: unknown
  ) => {
    setDrafts((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpdateOption = (
    draftIndex: number,
    optionIndex: number,
    value: string
  ) => {
    setDrafts((prev) => {
      const updated = [...prev];
      const currentOptions = updated[draftIndex].options || [];
      const newOptions = [...currentOptions];
      newOptions[optionIndex] = value;
      updated[draftIndex] = { ...updated[draftIndex], options: newOptions };
      return updated;
    });
  };

  const handleRemoveDraft = (index: number) => {
    setDrafts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveToStore = () => {
    // 1. Validate all drafts
    for (let i = 0; i < drafts.length; i++) {
      const val = validateDraftQuestion(drafts[i]);
      if (!val.isValid) {
        alert(`Question #${i + 1} validation error:\n${val.errors.join("\n")}`);
        return;
      }
    }

    if (drafts.length === 0) {
      alert("Please generate and approve at least 1 draft question before saving.");
      return;
    }

    // 2. Format question items for schoolStore.createQuiz
    const formattedQuestions = drafts.map((d) => ({
      questionText: d.question_text,
      questionType: d.question_type,
      options: d.options,
      correctOptionIndex: d.correct_option_index,
      acceptedAnswers: d.accepted_answers,
      explanation: d.explanation,
      points: d.points || 10,
    }));

    // 3. Save as strictly UNPUBLISHED
    schoolStore.createQuiz(
      {
        title: quizTitle || `AI Draft: ${topic}`,
        description: quizDescription,
        subjectId: selectedSubjectId,
        sectionId: selectedSectionId || undefined,
        topic,
        difficultyLevel: difficulty,
        timeLimitMinutes,
        maxAttempts: 3,
        passPercentage,
        isPublished: false, // Strict compliance: NEVER auto-publish AI quizzes
        createdByTeacherId: "30000000-0000-0000-0000-000000000001", // Dr. Aris Thorne
      },
      formattedQuestions
    );

    setSaveSuccessMessage(
      "Quiz successfully saved as an UNPUBLISHED draft. You can now review it in your Quiz Builder repository."
    );

    setTimeout(() => {
      router.push("/portal/teacher/quizzes");
    }, 1500);
  };

  return (
    <PortalLayout
      requiredRole="teacher"
      breadcrumbs={[
        { label: "Faculty Portal", href: "/portal/teacher" },
        { label: "Quiz Builder", href: "/portal/teacher/quizzes" },
        { label: "AI Quiz Generator", href: "/portal/teacher/quizzes/ai-generate" },
      ]}
      title="AI-Assisted Quiz Generation Workspace"
      description="Design curriculum-aligned assessments with pedagogical AI assistance. All questions require manual instructor review and remain unpublished until approved."
    >
      <div className="space-y-6">
        {/* Guardrail Disclaimer Alert */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px]">
              Instructor Review Policy
            </span>
            <p className="leading-relaxed">
              AI-generated questions are drafts and may contain conceptual or formatting errors. You are required to review, verify answer keys, and adjust points before saving. <strong>AI quizzes are never published automatically</strong> and remain in Draft mode until explicitly published.
            </p>
          </div>
        </div>

        {saveSuccessMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-100 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-semibold">{saveSuccessMessage}</span>
          </div>
        )}

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Requirements Form */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span>Quiz Prompt Parameters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Academic Subject
                  </label>
                  <select
                    value={selectedSubjectId}
                    onChange={(e) => setSelectedSubjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                  >
                    {subjects.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name} ({sub.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Assigned Class Section
                  </label>
                  <select
                    value={selectedSectionId}
                    onChange={(e) => setSelectedSectionId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                  >
                    {sections.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        {sec.name} ({sec.class_name})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Topic or Curriculum Unit
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      setQuizTitle(`Diagnostic Review: ${e.target.value}`);
                    }}
                    placeholder="e.g. Fractions, Momentum, Cellular Respiration"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value as QuizDifficulty)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Questions Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={questionsCount}
                      onChange={(e) => setQuestionsCount(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Question Type Format
                  </label>
                  <select
                    value={questionType}
                    onChange={(e) =>
                      setQuestionType(e.target.value as QuizQuestionType | "mixed")
                    }
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="mixed">Mixed (Multiple Choice, True/False, Short Answer)</option>
                    <option value="multiple_choice">Multiple Choice Only</option>
                    <option value="true_false">True / False Only</option>
                    <option value="short_answer">Short Answer Only</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Learning Objectives
                  </label>
                  <textarea
                    rows={3}
                    value={learningObjectives}
                    onChange={(e) => setLearningObjectives(e.target.value)}
                    placeholder="Describe specific competencies or learning outcomes..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Optional Library Source Material
                  </label>
                  <select
                    value={sourceResourceId}
                    onChange={(e) => setSourceResourceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="">-- No specific document (General Curriculum) --</option>
                    {resources.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.title} ({res.topic})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isGenerating ? "Synthesizing Draft Questions..." : "Generate AI Draft Questions"}</span>
                </button>
              </CardContent>
            </Card>

            {/* Quiz Settings Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Draft Quiz Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Quiz Description
                  </label>
                  <textarea
                    rows={2}
                    value={quizDescription}
                    onChange={(e) => setQuizDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Time (Minutes)
                    </label>
                    <input
                      type="number"
                      value={timeLimitMinutes}
                      onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                      Pass Target %
                    </label>
                    <input
                      type="number"
                      value={passPercentage}
                      onChange={(e) => setPassPercentage(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Draft Review & Editing Workspace */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  Teacher Review Workspace ({drafts.length} Draft Questions)
                </h3>
                <p className="text-xs text-slate-500">
                  Review each question, edit choices, verify the correct answer, or discard.
                </p>
              </div>

              {drafts.length > 0 && (
                <button
                  onClick={handleSaveToStore}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-2 shadow-xs transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Approved Draft to Store</span>
                </button>
              )}
            </div>

            {drafts.length > 0 ? (
              <div className="space-y-4">
                {drafts.map((draft, idx) => {
                  const validation = validateDraftQuestion(draft);
                  return (
                    <Card
                      key={draft.id}
                      className={
                        !validation.isValid
                          ? "border-amber-400 dark:border-amber-600 bg-amber-50/20"
                          : ""
                      }
                    >
                      <CardHeader className="pb-3 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" size="sm">
                            Question #{idx + 1}
                          </Badge>
                          <Badge variant="secondary" size="sm">
                            {draft.question_type.toUpperCase().replace(/_/g, " ")}
                          </Badge>
                          <Badge variant="accent" size="sm">
                            {draft.difficulty.toUpperCase()}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleRemoveDraft(idx)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            title="Remove Question"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Validation Errors Notice */}
                        {!validation.isValid && (
                          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-xs text-amber-800 dark:text-amber-300 space-y-1">
                            <span className="font-bold">Needs Correction:</span>
                            {validation.errors.map((err, eIdx) => (
                              <div key={eIdx}>• {err}</div>
                            ))}
                          </div>
                        )}

                        {/* Question Prompt */}
                        <div>
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            Question Prompt
                          </label>
                          <textarea
                            rows={2}
                            value={draft.question_text}
                            onChange={(e) =>
                              handleUpdateDraft(idx, "question_text", e.target.value)
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        {/* Options if Multiple Choice or True/False */}
                        {(draft.question_type === "multiple_choice" ||
                          draft.question_type === "true_false") &&
                          draft.options && (
                            <div className="space-y-2">
                              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                Answer Options (Select radio to set correct answer)
                              </label>
                              <div className="space-y-2">
                                {draft.options.map((opt, optIdx) => (
                                  <div
                                    key={optIdx}
                                    className="flex items-center gap-2.5"
                                  >
                                    <input
                                      type="radio"
                                      name={`correct-opt-${draft.id}`}
                                      checked={draft.correct_option_index === optIdx}
                                      onChange={() =>
                                        handleUpdateDraft(
                                          idx,
                                          "correct_option_index",
                                          optIdx
                                        )
                                      }
                                      className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                                    />
                                    <input
                                      type="text"
                                      value={opt}
                                      disabled={draft.question_type === "true_false"}
                                      onChange={(e) =>
                                        handleUpdateOption(idx, optIdx, e.target.value)
                                      }
                                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                                    />
                                    {draft.correct_option_index === optIdx && (
                                      <Badge variant="accent" size="sm">
                                        Correct Answer
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Short Answer Keys */}
                        {draft.question_type === "short_answer" && (
                          <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                              Accepted Answer Keys (comma separated)
                            </label>
                            <input
                              type="text"
                              value={(draft.accepted_answers || []).join(", ")}
                              onChange={(e) =>
                                handleUpdateDraft(
                                  idx,
                                  "accepted_answers",
                                  e.target.value.split(",").map((s) => s.trim())
                                )
                              }
                              placeholder="e.g. 5/4, five quarters"
                              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>
                        )}

                        {/* Explanation & Points */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          <div className="md:col-span-3">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                              Explanation / Worked Solution
                            </label>
                            <input
                              type="text"
                              value={draft.explanation}
                              onChange={(e) =>
                                handleUpdateDraft(idx, "explanation", e.target.value)
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                              Points
                            </label>
                            <input
                              type="number"
                              value={draft.points}
                              onChange={(e) =>
                                handleUpdateDraft(idx, "points", Number(e.target.value))
                              }
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                            />
                          </div>
                        </div>

                        {/* Source Reference Tag */}
                        {draft.source_reference && (
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                            <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                            <span>Context Source: {draft.source_reference}</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="min-h-[380px] flex flex-col items-center justify-center text-center p-8">
                <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-3" />
                <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-300">
                  No Questions Generated Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Configure your subject, topic, and difficulty on the left, then click &ldquo;Generate AI Draft Questions&rdquo; to begin.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

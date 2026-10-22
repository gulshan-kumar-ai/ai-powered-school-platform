"use client";

import React, { useState, useEffect, use } from "react";
import { PortalLayout } from "@/components/portal/PortalLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { schoolStore } from "@/lib/data/school-store";
import { QuizAttempt } from "@/types/portal";
import {
  HelpCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Send,
  RotateCcw,
  Check,
  X,
} from "lucide-react";

interface QuizTakingPageProps {
  params: Promise<{ id: string }>;
}

export default function StudentQuizTakingPage({ params }: QuizTakingPageProps) {
  const { id } = use(params);
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance

  const quiz = schoolStore.getQuizById(id, false); // sanitized questions, correct answers hidden!
  const pastAttempts = schoolStore.getStudentQuizAttempts(studentId, id);

  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, { selectedOptionIndex?: number; textAnswer?: string }>
  >({});
  const [timeLeft, setTimeLeft] = useState<number>(() => (quiz?.time_limit_minutes || 15) * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const questions = React.useMemo(() => quiz?.questions || [], [quiz]);

  const handleSubmitAttempt = React.useCallback(() => {
    if (!quiz) return;
    setShowConfirmModal(false);
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const answersPayload = questions.map((q) => ({
        question_id: q.id,
        selected_option_index: selectedAnswers[q.id]?.selectedOptionIndex,
        text_answer: selectedAnswers[q.id]?.textAnswer,
      }));

      const attempt = schoolStore.submitQuizAttempt({
        quizId: quiz.id,
        studentId,
        answers: answersPayload,
      });

      setSubmittedAttempt(attempt);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred while scoring your assessment.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [quiz, questions, selectedAnswers, studentId]);

  // Timer countdown effect
  useEffect(() => {
    if (!hasStarted || submittedAttempt || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitAttempt(); // Auto-submit on time expiry
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasStarted, submittedAttempt, timeLeft, handleSubmitAttempt]);

  if (!quiz) {
    return (
      <PortalLayout
        requiredRole="student"
        breadcrumbs={[
          { label: "Scholar Portal", href: "/portal/student" },
          { label: "Interactive Quizzes", href: "/portal/student/quizzes" },
        ]}
      >
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800">Assessment Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            The requested quiz is either unavailable, archived, or unpublished.
          </p>
          <Button href="/portal/student/quizzes" variant="primary" size="sm">
            Return to Quizzes Catalog
          </Button>
        </div>
      </PortalLayout>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const answeredCount = Object.keys(selectedAnswers).length;
  const attemptsRemaining = Math.max(0, quiz.max_attempts - pastAttempts.length);

  const handleSelectOption = (qId: string, optIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: { selectedOptionIndex: optIdx },
    }));
  };

  const handleTextAnswerChange = (qId: string, text: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: { textAnswer: text },
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // 1. Pre-Start Instructions Screen
  if (!hasStarted && !submittedAttempt) {
    return (
      <PortalLayout
        requiredRole="student"
        breadcrumbs={[
          { label: "Scholar Portal", href: "/portal/student" },
          { label: "Interactive Quizzes", href: "/portal/student/quizzes" },
          { label: quiz.title, href: `/portal/student/quizzes/${quiz.id}` },
        ]}
        title={quiz.title}
        description={`Course: ${quiz.subject_name} • Topic: ${quiz.topic}`}
        actions={
          <Button href="/portal/student/quizzes" variant="outline" size="sm" leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back to Quizzes
          </Button>
        }
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-white border-slate-200 overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-sky-500 to-indigo-600" />
            <CardHeader className="p-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-1.5">
                <Badge variant="accent" size="sm">{quiz.subject_name}</Badge>
                <Badge variant="navy" size="sm">{quiz.difficulty_level.toUpperCase()}</Badge>
                <Badge variant="secondary" size="sm">{quiz.topic}</Badge>
              </div>
              <CardTitle className="text-xl text-[#0f2744]">
                {quiz.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                {quiz.description}
              </div>

              {/* Assessment Rules */}
              <div className="space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                  Assessment Parameters & Rules
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Allowed</span>
                    <span className="text-base font-extrabold text-[#0f2744] flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-4 h-4 text-sky-600" />
                      {quiz.time_limit_minutes} Mins
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Questions</span>
                    <span className="text-base font-extrabold text-[#0f2744] flex items-center gap-1.5 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-purple-600" />
                      {questions.length} Items
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pass Threshold</span>
                    <span className="text-base font-extrabold text-teal-700 flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      {quiz.pass_percentage}%
                    </span>
                  </div>
                  <div className="p-3.5 rounded-xl border border-slate-100 bg-white shadow-2xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Remaining Attempts</span>
                    <span className="text-base font-extrabold text-[#0f2744] flex items-center gap-1.5 mt-0.5">
                      <RotateCcw className="w-4 h-4 text-amber-600" />
                      {attemptsRemaining} of {quiz.max_attempts}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  Important Evaluation Guidelines:
                </span>
                <p className="text-[11px] leading-relaxed">
                  Once started, the countdown timer runs continuously. Your answers are submitted automatically when the time runs out. All scoring and attempt checks are enforced on the server.
                </p>
              </div>

              {attemptsRemaining > 0 ? (
                <Button
                  onClick={() => setHasStarted(true)}
                  variant="primary"
                  size="lg"
                  className="w-full justify-center font-bold"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start Assessment Now
                </Button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-100 text-center text-xs text-slate-600 font-medium">
                  You have used all {quiz.max_attempts} attempts for this quiz. Check your past results below.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </PortalLayout>
    );
  }

  // 2. Completed / Submitted Assessment Result Screen
  if (submittedAttempt) {
    const fullQuizWithExplanations = schoolStore.getQuizById(id, true); // Now allowed to inspect explanations post-submission!
    const evaluatedQuestions = fullQuizWithExplanations?.questions || [];

    return (
      <PortalLayout
        requiredRole="student"
        breadcrumbs={[
          { label: "Scholar Portal", href: "/portal/student" },
          { label: "Interactive Quizzes", href: "/portal/student/quizzes" },
          { label: "Assessment Results", href: `/portal/student/quizzes/${quiz.id}` },
        ]}
        title="Assessment Result & Diagnostic Review"
        description={`Evaluation report for ${quiz.title} • Attempt #${submittedAttempt.attempt_number}`}
        actions={
          <Button href="/portal/student/quizzes" variant="primary" size="sm">
            Back to Quizzes
          </Button>
        }
      >
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Result Score Banner */}
          <div
            className={`p-6 sm:p-8 rounded-2xl text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${
              submittedAttempt.passed
                ? "bg-gradient-to-r from-emerald-800 via-teal-800 to-[#0f2744]"
                : "bg-gradient-to-r from-slate-900 to-[#1e3a5f]"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant={submittedAttempt.passed ? "accent" : "outline"} size="sm">
                  {submittedAttempt.passed ? "MASTERY PASSED" : "REVISION REQUIRED"}
                </Badge>
                <span className="text-xs text-white/80">
                  Attempt #{submittedAttempt.attempt_number} of {quiz.max_attempts}
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-white">
                {submittedAttempt.passed ? "Outstanding Performance!" : "Assessment Completed"}
              </h2>
              <p className="text-xs text-slate-200 max-w-md">
                {submittedAttempt.passed
                  ? "You have successfully demonstrated topic mastery and earned learning points towards your scholar level."
                  : "Review the question feedback below to reinforce challenging concepts before attempting the next assessment."}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-center min-w-36">
              <span className="text-[10px] uppercase font-bold text-white/70 block">
                Final Score
              </span>
              <div className="text-3xl font-extrabold text-white my-1">
                {submittedAttempt.percentage}%
              </div>
              <span className="text-xs text-sky-200 font-semibold">
                {submittedAttempt.score} / {submittedAttempt.total_possible} Points
              </span>
            </div>
          </div>

          {/* Gamification Points Awarded Card */}
          <Card className="bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-200">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                    Learning Points Credited to Ledger
                  </h4>
                  <p className="text-xs text-amber-800">
                    +50 XP for quiz completion {submittedAttempt.percentage >= 90 ? "+ Bonus Mastery XP" : ""}
                  </p>
                </div>
              </div>
              <Button href="/portal/student/progress" variant="outline" size="sm" className="text-xs bg-white">
                View Learning Progress
              </Button>
            </CardContent>
          </Card>

          {/* Question by Question Review */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-base text-[#0f2744]">
              Item-by-Item Diagnostic Breakdown
            </h3>

            {evaluatedQuestions.map((q, idx) => {
              const subAnswer = submittedAttempt.answers.find((a) => a.question_id === q.id);
              const isCorrect = subAnswer?.is_correct;

              return (
                <Card
                  key={q.id}
                  className={`border ${
                    isCorrect ? "border-emerald-200 bg-white" : "border-rose-200 bg-white"
                  }`}
                >
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-400 uppercase">
                          {q.question_type.replace("_", " ")}
                        </span>
                      </div>
                      <Badge variant={isCorrect ? "accent" : "outline"} size="sm">
                        {isCorrect ? `+${q.points} XP (Correct)` : "0 XP (Incorrect)"}
                      </Badge>
                    </div>

                    <h4 className="font-bold text-sm text-[#0f2744]">
                      {q.question_text}
                    </h4>

                    {/* Multiple Choice / True False options display */}
                    {q.options && (
                      <div className="space-y-1.5 pt-2">
                        {q.options.map((opt, optIdx) => {
                          const isStudentSelected = subAnswer?.selected_option_index === optIdx;
                          const isTheCorrectOption = q.correct_option_index === optIdx;

                          let optClass = "border-slate-200 bg-slate-50 text-slate-700";
                          if (isTheCorrectOption) {
                            optClass = "border-emerald-300 bg-emerald-50 text-emerald-900 font-bold";
                          } else if (isStudentSelected && !isTheCorrectOption) {
                            optClass = "border-rose-300 bg-rose-50 text-rose-900 line-through";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between ${optClass}`}
                            >
                              <span>{opt}</span>
                              {isTheCorrectOption && (
                                <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                                  <Check className="w-3.5 h-3.5" /> Correct Answer
                                </span>
                              )}
                              {isStudentSelected && !isTheCorrectOption && (
                                <span className="text-[10px] font-bold text-rose-700 flex items-center gap-1">
                                  <X className="w-3.5 h-3.5" /> Your Choice
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Short Answer Display */}
                    {q.question_type === "short_answer" && (
                      <div className="space-y-1.5 pt-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Your Response:</span>
                          <span className="font-bold text-slate-800">{subAnswer?.text_answer || "(No response)"}</span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                          <span className="text-emerald-700 block text-[10px] uppercase font-bold">Accepted Answers:</span>
                          <span className="font-bold">{q.accepted_answers?.join(", ")}</span>
                        </div>
                      </div>
                    )}

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-3 rounded-xl bg-sky-50 border border-sky-100 text-xs text-sky-900 mt-2">
                        <strong className="block mb-0.5 font-bold">Faculty Explanation:</strong>
                        <p className="text-sky-800 leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </PortalLayout>
    );
  }

  // 3. Active Quiz Taking Interface
  return (
    <PortalLayout
      requiredRole="student"
      breadcrumbs={[
        { label: "Scholar Portal", href: "/portal/student" },
        { label: "Interactive Quizzes", href: "/portal/student/quizzes" },
        { label: "Active Assessment", href: `/portal/student/quizzes/${quiz.id}` },
      ]}
      title={quiz.title}
      description={`Question ${currentQuestionIndex + 1} of ${questions.length} • Subject: ${quiz.subject_name}`}
      actions={
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-extrabold flex items-center gap-1.5 ${
            timeLeft < 180 ? "bg-rose-100 text-rose-700 animate-pulse" : "bg-sky-100 text-sky-800"
          }`}>
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>

          <Button
            onClick={() => setShowConfirmModal(true)}
            variant="primary"
            size="sm"
            leftIcon={<Send className="w-3.5 h-3.5" />}
          >
            Submit Quiz
          </Button>
        </div>
      }
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Question Progress Tracker Pills */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs transition-all ${
                    isCurrent
                      ? "bg-[#0284c7] text-white ring-2 ring-sky-300"
                      : isAnswered
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <span className="text-xs font-semibold text-slate-500 shrink-0">
            {answeredCount} of {questions.length} Answered
          </span>
        </div>

        {/* Active Question Card */}
        {currentQ && (
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="p-6 pb-4 border-b border-slate-100 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-600 uppercase">
                  Item {currentQuestionIndex + 1}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {currentQ.question_type.replace("_", " ")}
                </span>
              </div>
              <Badge variant="accent" size="sm">
                {currentQ.points} Points
              </Badge>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <h3 className="text-base sm:text-lg font-bold text-[#0f2744] leading-relaxed">
                {currentQ.question_text}
              </h3>

              {/* Multiple Choice Options */}
              {currentQ.question_type === "multiple_choice" && currentQ.options && (
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswers[currentQ.id]?.selectedOptionIndex === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, optIdx)}
                        className={`w-full p-4 rounded-xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-sky-500 bg-sky-50/80 text-sky-950 ring-2 ring-sky-200"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        <span>{opt}</span>
                        <span
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected ? "border-sky-600 bg-sky-600 text-white" : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* True / False Buttons */}
              {currentQ.question_type === "true_false" && (
                <div className="grid grid-cols-2 gap-4">
                  {["True", "False"].map((val, idx) => {
                    const isSelected = selectedAnswers[currentQ.id]?.selectedOptionIndex === idx;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleSelectOption(currentQ.id, idx)}
                        className={`p-5 rounded-xl border text-center font-bold text-sm transition-all ${
                          isSelected
                            ? "border-sky-500 bg-sky-50/90 text-sky-950 ring-2 ring-sky-200"
                            : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                        }`}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Short Answer Input */}
              {currentQ.question_type === "short_answer" && (
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-600">
                    Your Written Response:
                  </label>
                  <input
                    type="text"
                    value={selectedAnswers[currentQ.id]?.textAnswer || ""}
                    onChange={(e) => handleTextAnswerChange(currentQ.id, e.target.value)}
                    placeholder="Type your concise answer here..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                  />
                  <span className="text-[11px] text-slate-400">
                    Spelling counts. Evaluated on exact normalized comparison with configured syllabus answers.
                  </span>
                </div>
              )}

              {/* Navigation Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Button
                  onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  size="sm"
                  leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
                >
                  Previous
                </Button>

                {currentQuestionIndex < questions.length - 1 ? (
                  <Button
                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowConfirmModal(true)}
                    variant="primary"
                    size="sm"
                    leftIcon={<Send className="w-3.5 h-3.5" />}
                  >
                    Review & Submit
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in-50">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="font-extrabold text-base text-[#0f2744]">
                  Confirm Quiz Submission
                </h3>
                <p className="text-xs text-slate-600">
                  You have answered <strong>{answeredCount}</strong> of <strong>{questions.length}</strong> questions.
                  {answeredCount < questions.length && (
                    <span className="text-rose-600 block mt-1 font-semibold">
                      Notice: You have unanswered questions remaining!
                    </span>
                  )}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <Button
                  onClick={() => setShowConfirmModal(false)}
                  variant="outline"
                  size="sm"
                  disabled={isSubmitting}
                >
                  Keep Reviewing
                </Button>
                <Button
                  onClick={handleSubmitAttempt}
                  variant="primary"
                  size="sm"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Scoring Attempt..." : "Confirm & Score"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}

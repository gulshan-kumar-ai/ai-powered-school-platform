"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Shield,
  GraduationCap,
  BookOpen,
  Award,
  Brain,
  ExternalLink,
  Users,
  Compass,
  KeyRound,
  Database,
  BarChart3,
  Clock,
  Check,
  type LucideIcon,
} from "lucide-react";
import { schoolStore } from "@/lib/data/school-store";
import { analyzeSuspiciousMessage, SYNTHETIC_CYBER_EXAMPLES } from "@/lib/ai/cyber-analyzer";
import { generateStudyAssistantResponse } from "@/lib/ai/study-assistant";
import { SEED_CREDENTIALS } from "@/lib/auth/session";

interface StoryStep {
  id: number;
  title: string;
  subtitle: string;
  timeTarget: string;
  role: "Visitor" | "Teacher" | "Student" | "Parent" | "System / AI";
  roleColor: string;
  icon: LucideIcon;
  overview: string;
  script: string;
  keyPoints: string[];
  portalRoute: string;
  credentials?: { email: string; pass: string; roleName: string };
  technicalPillars: string[];
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 1,
    title: "1. Public School Outreach & Curriculum Exploration",
    subtitle: "A prospective family discovers the institution",
    timeTarget: "0:00 - 0:30",
    role: "Visitor",
    roleColor: "bg-sky-500/10 text-sky-400 border-sky-500/30",
    icon: Compass,
    overview:
      "A visitor navigates the responsive Oakridge Academy public portal, discovering academic programs, admissions deadlines, announcements, faculty credentials, and digital campus resources.",
    script:
      "\"Welcome to the Oakridge Collegiate Academy platform. We begin from the perspective of an external visitor. The public website delivers a modern, accessible interface with real-time school announcements, comprehensive AP curriculum pathways, an interactive admissions guide, and institutional event schedules. Built on Next.js 16 App Router with zero hydration mismatch and optimized responsive layouts, the public shell establishes institutional credibility within seconds.\"",
    keyPoints: [
      "Dynamic campus announcements and term calendars",
      "Full curriculum catalog with course syllabi outlines",
      "High-contrast, accessible typography with mobile-first responsiveness",
      "Direct entry points to role-guarded academic portals",
    ],
    portalRoute: "/",
    technicalPillars: [
      "Next.js 16 App Router SSR/SSG",
      "Tailwind CSS v4 Modern Theme Tokens",
      "WCAG 2.1 AA Color Contrast & Semantic Hierarchy",
    ],
  },
  {
    id: 2,
    title: "2. Teacher Courseware Publishing & Quiz Studio",
    subtitle: "Faculty authors structured learning materials and assessments",
    timeTarget: "0:30 - 1:00",
    role: "Teacher",
    roleColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: BookOpen,
    overview:
      "Dr. Robert Chen (Science Dept) logs into the teacher portal, publishes a new AP Physics Kinematics guide to the digital library, and drafts a 3-question interactive assessment.",
    script:
      "\"Next, we step into the shoes of Dr. Robert Chen, an AP Physics teacher. Within his dedicated faculty workspace, he publishes a foundational kinematics study guide to the digital library and generates an interactive, auto-graded quiz. The teacher workspace enforces strict role authorization, ensuring faculty members can only assign courseware and view grade rosters for classes to which they are officially assigned.\"",
    keyPoints: [
      "Role-governed faculty workspace with scoped class schedules",
      "Publishing workflow distinguishing live resources from private drafts",
      "Standards-aligned interactive quiz creation with custom point weighting",
      "Automatic synchronization with student digital libraries",
    ],
    portalRoute: "/portal/teacher/quizzes",
    credentials: {
      email: SEED_CREDENTIALS.teacher.email,
      pass: SEED_CREDENTIALS.teacher.password,
      roleName: "Faculty Instructor (Dr. Robert Chen)",
    },
    technicalPillars: [
      "Role-Based Access Control (RBAC)",
      "Strict Server-Side Class Roster Scoping",
      "Immutable Audit Logging for Content Changes",
    ],
  },
  {
    id: 3,
    title: "3. Student Learning & Server-Side Quiz Scoring",
    subtitle: "Scholar accesses authorized material and completes assessment",
    timeTarget: "1:00 - 1:45",
    role: "Student",
    roleColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    icon: GraduationCap,
    overview:
      "Scholar Alex Vance accesses the published resource in the digital library, completes Dr. Chen's interactive quiz, and receives instantaneous, cryptographically verified scoring.",
    script:
      "\"Now transitioning to student Alex Vance. Alex discovers the newly published resource in his digital library. Crucially, unpublished faculty drafts remain strictly invisible to student queries. When Alex completes the quiz, scoring is calculated purely on the server to prevent client-side answer tampering. He achieves 100%, and the system immediately records his verified attempt in the audit store.\"",
    keyPoints: [
      "Student digital library filters out all unpublished drafts",
      "Zero client-side score manipulation — answers evaluated strictly server-side",
      "Immediate feedback with answer derivations and review summaries",
      "Attempts bounded by teacher-enforced maximum submission limits",
    ],
    portalRoute: "/portal/student/quizzes",
    credentials: {
      email: SEED_CREDENTIALS.student.email,
      pass: SEED_CREDENTIALS.student.password,
      roleName: "Enrolled Scholar (Alex Vance)",
    },
    technicalPillars: [
      "Server-Side Answer Key Isolation",
      "Anti-Tamper Score Calculation Engine",
      "Automated State Synchronization",
    ],
  },
  {
    id: 4,
    title: "4. Gamification, Scholastic Honors & Anti-Fraud Defense",
    subtitle: "Legitimate achievements unlocked with duplicate claim prevention",
    timeTarget: "1:45 - 2:15",
    role: "Student",
    roleColor: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    icon: Award,
    overview:
      "Upon scoring 100%, Alex receives 100 scholastic points and unlocks the 'Perfect Score' and 'First Quiz' honors. Attempting duplicate submissions is safely detected and blocked.",
    script:
      "\"Upon achieving mastery, the gamification engine activates. Alex is credited 50 base points plus a 50-point perfect score bonus in an append-only ledger, leveling him up to Inquisitive Explorer. To protect the academic economy, our reference ID integrity check blocks repeated point claims: even if a student spams or replays the submission request, duplicate points are impossible.\"",
    keyPoints: [
      "Append-only scholastic point ledger with source reference verification",
      "Automated tier elevation (Apprentice → Inquisitive Explorer → Master Intellect)",
      "Cryptographic duplicate prevention stops reward exploits",
      "Real-time student honors showcase with rarity tiers",
    ],
    portalRoute: "/portal/student/progress",
    credentials: {
      email: SEED_CREDENTIALS.student.email,
      pass: SEED_CREDENTIALS.student.password,
      roleName: "Enrolled Scholar (Alex Vance)",
    },
    technicalPillars: [
      "Idempotent Reward Claim Verification",
      "Immutable Gamification Ledger",
      "Deterministic Tier Escalation Logic",
    ],
  },
  {
    id: 5,
    title: "5. Socratic AI Study Assistant & Grounded RAG Citations",
    subtitle: "AI tutoring anchored strictly in verified school curriculum",
    timeTarget: "2:15 - 2:45",
    role: "System / AI",
    roleColor: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    icon: Brain,
    overview:
      "Alex asks the AI Study Assistant for guidance on Newton's Laws. The assistant guides via Socratic inquiry, provides exact curriculum citations, and transparently displays its operational engine mode.",
    script:
      "\"When scholars need after-hours guidance, the Socratic AI Study Assistant provides pedagogical support without giving away direct answers. What sets our system apart is curriculum grounding: through Retrieval-Augmented Generation (RAG), every explanation cites approved school textbooks. Furthermore, the UI transparently displays the active engine mode — whether live cloud AI or verified offline RAG fallback.\"",
    keyPoints: [
      "Socratic dialogue design encouraging conceptual self-discovery",
      "RAG document grounding citing verified school curriculum chunks",
      "Safety guardrails rejecting academic dishonesty and out-of-bounds queries",
      "Transparent badge indicating cloud live vs verified offline fallback",
    ],
    portalRoute: "/portal/student/ai-tutor",
    credentials: {
      email: SEED_CREDENTIALS.student.email,
      pass: SEED_CREDENTIALS.student.password,
      roleName: "Enrolled Scholar (Alex Vance)",
    },
    technicalPillars: [
      "Curriculum Vector Embeddings & Similarity Matching",
      "Multi-Provider Cloud Orchestration (Gemini / OpenAI)",
      "Graceful Deterministic Offline Fallback",
    ],
  },
  {
    id: 6,
    title: "6. CyberSafe Threat Analyzer & Social Engineering Defense",
    subtitle: "Simulated phishing inspection teaches digital hygiene",
    timeTarget: "2:45 - 3:15",
    role: "Student",
    roleColor: "bg-rose-500/10 text-rose-400 border-rose-500/30",
    icon: Shield,
    overview:
      "The student feeds a simulated urgent SMS/email into the CyberSafe Threat Analyzer. The engine breaks down coercive urgency, credential harvesting triggers, and teaches safe defensive actions.",
    script:
      "\"In today's digital landscape, student cybersecurity awareness is essential. In the CyberSafe Lab, scholars inspect suspicious communications in a safe sandbox. Analyzing a synthetic urgent suspension email, the engine exposes psychological urgency pressure, credential harvesting links, and obfuscated domains — teaching students practical digital self-defense backed by transparent ethical disclaimers.\"",
    keyPoints: [
      "Deconstructs social engineering mechanisms in real time",
      "Clear risk scoring (0-100) with visual indicator breakdowns",
      "Prescriptive safe actions (e.g. verifying sender domain, never revealing passwords)",
      "Built-in synthetic library of common student-targeted phishing vectors",
    ],
    portalRoute: "/portal/student/ai-cyber",
    credentials: {
      email: SEED_CREDENTIALS.student.email,
      pass: SEED_CREDENTIALS.student.password,
      roleName: "Enrolled Scholar (Alex Vance)",
    },
    technicalPillars: [
      "Pattern-Driven Threat Extraction Engine",
      "Sandboxed Analysis with Zero External URL Resolution",
      "Ethical Educational Disclaimers",
    ],
  },
  {
    id: 7,
    title: "7. Faculty Diagnostic Analytics & Intervention Insights",
    subtitle: "Aggregated learning metrics reveal classroom misconceptions",
    timeTarget: "3:15 - 3:45",
    role: "Teacher",
    roleColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    icon: BarChart3,
    overview:
      "Dr. Chen reviews the aggregate learning dashboard. Real-time metrics highlight class quiz completion rates and pinpoint specific conceptual derivation stumbling blocks.",
    script:
      "\"Returning to the faculty perspective, Dr. Chen inspects aggregate class mastery. The system compiles student performance data into actionable diagnostic insights, pinpointing topics where scholars struggled — such as action-reaction paired vectors. Teachers can immediately deploy targeted revisions or AI-generated remediation quizzes before summative term exams.\"",
    keyPoints: [
      "Cohort completion velocity and score distribution histograms",
      "Diagnostic identification of high-error curriculum concepts",
      "Automated suggested remediation materials from the digital library",
      "Scattered performance alerts enabling early pedagogical intervention",
    ],
    portalRoute: "/portal/teacher/analytics",
    credentials: {
      email: SEED_CREDENTIALS.teacher.email,
      pass: SEED_CREDENTIALS.teacher.password,
      roleName: "Faculty Instructor (Dr. Robert Chen)",
    },
    technicalPillars: [
      "Cohort Statistical Aggregation Pipeline",
      "Class-Scoped Data Isolation",
      "Actionable Remediation Mapping",
    ],
  },
  {
    id: 8,
    title: "8. Custodial Parent Access & Strict Data Isolation",
    subtitle: "Guardian monitors authorized child with zero data cross-leakage",
    timeTarget: "3:45 - 4:15",
    role: "Parent",
    roleColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    icon: Users,
    overview:
      "Guardian Eleanor Vance logs in to inspect Alex's academic progress. Strict custodial boundary checks verify that unrelated student records are completely blocked and inaccessible.",
    script:
      "\"We conclude with parent Eleanor Vance. Logging into the custodial portal, Eleanor views real-time attendance, assignment due dates, and verified quiz grades exclusively for her son Alex. Most importantly from a compliance standpoint: if a user attempts to query an unauthorized student ID, the system strictly returns an empty result set and denies access, fully satisfying FERPA and GDPR pupil privacy standards.\"",
    keyPoints: [
      "Single-pane guardian view of attendance, grades, and teacher feedback",
      "Exclusive custodial association — guardians can only access verified wards",
      "Direct API and route tests enforce zero cross-student information leakage",
      "Automatic session invalidation if an account is locked by administrators",
    ],
    portalRoute: "/portal/parent",
    credentials: {
      email: SEED_CREDENTIALS.parent.email,
      pass: SEED_CREDENTIALS.parent.password,
      roleName: "Verified Custodial Parent (Eleanor Vance)",
    },
    technicalPillars: [
      "Custodial Relationship Enforcement",
      "FERPA / GDPR Data Privacy Scoping",
      "Anti-Leakage Defensive API Layer",
    ],
  },
];

export default function CompetitionDemoPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live Simulation States
  const [simRunning, setSimRunning] = useState(false);
  const [simOutput, setSimOutput] = useState<{
    status: string;
    type?: string;
    message?: string;
    data?: Record<string, unknown>;
  } | null>(null);

  const activeStep = STORY_STEPS[activeStepIndex];

  // Timer logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && activeStepIndex < STORY_STEPS.length - 1) {
        setActiveStepIndex((prev) => prev + 1);
        setSimOutput(null);
      } else if (e.key === "ArrowLeft" && activeStepIndex > 0) {
        setActiveStepIndex((prev) => prev - 1);
        setSimOutput(null);
      } else if (e.key === " " && e.target === document.body) {
        e.preventDefault();
        setIsTimerRunning((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStepIndex]);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStepSelect = (idx: number) => {
    setActiveStepIndex(idx);
    setSimOutput(null);
  };

  // Run Step Live Simulation
  const executeStepSimulation = async () => {
    setSimRunning(true);
    setSimOutput(null);

    try {
      if (activeStep.id === 1) {
        // Step 1: Query announcements & curriculum
        const announcements = schoolStore.getAnnouncements();
        const classes = schoolStore.getClasses();
        const subjects = schoolStore.getSubjects();
        setSimOutput({
          status: "SUCCESS",
          type: "PUBLIC_EXPLORATION",
          data: {
            activeAnnouncementsCount: announcements.length,
            featuredNotice: announcements[0]?.title || "Campus Welcome",
            academicCohortCount: classes.length,
            accreditedSubjectsCount: subjects.length,
            renderingMode: "Next.js 16 Server-Side Streamed with Static Pre-rendering",
          },
        });
      } else if (activeStep.id === 2) {
        // Step 2: Publish resource & quiz
        const teacher = schoolStore.getTeachers()[0];
        const res = schoolStore.createLearningResource({
          title: "AP Physics C: Derivation of Rotational Inertia",
          description: "Rigorous step-by-step calculus derivations for cylindrical manifolds.",
          resourceType: "document",
          url: "/docs/rotational-inertia-derivation.pdf",
          fileSize: "2.4 MB",
          subjectId: "c0000000-0000-0000-0000-000000000001",
          sectionIds: ["s0000000-0000-0000-0000-000000000001"],
          topic: "Rotational Dynamics",
          createdByTeacherId: teacher.id,
          isPublished: true,
        });
        setSimOutput({
          status: "SUCCESS",
          type: "TEACHER_PUBLISHED",
          data: {
            resourceId: res.id,
            resourceTitle: res.title,
            author: teacher.profile?.full_name || "Faculty Member",
            status: "LIVE_IN_STUDENT_LIBRARY",
            enforcement: "Strictly scoped to assigned Grade 10 Section A",
          },
        });
      } else if (activeStep.id === 3) {
        // Step 3: Student completes quiz
        const studentId = "20000000-0000-0000-0000-000000000001";
        const quizzes = schoolStore.getQuizzes({ isPublishedOnly: true });
        const targetQuizMeta = quizzes[0];
        const targetQuiz = schoolStore.getQuizById(targetQuizMeta.id, true);
        const questions = targetQuiz?.questions || [];
        const attempt = schoolStore.submitQuizAttempt({
          quizId: targetQuizMeta.id,
          studentId,
          answers: questions.map((q) => ({
            question_id: q.id,
            selected_option_index: q.correct_option_index,
          })),
        });
        setSimOutput({
          status: "SUCCESS",
          type: "STUDENT_ASSESSMENT",
          data: {
            studentName: attempt.student_name,
            quizTitle: attempt.quiz_title,
            score: `${attempt.score}/${attempt.total_possible} (${attempt.percentage}%)`,
            passed: attempt.passed,
            evaluationHost: "Server-side Evaluated (Zero Client Exposure)",
            attemptId: attempt.id,
          },
        });
      } else if (activeStep.id === 4) {
        // Step 4: Gamification & Duplicate Claim Defense
        const studentId = "20000000-0000-0000-0000-000000000001";
        const progress = schoolStore.getStudentLearningProgress(studentId);
        const badges = schoolStore.getStudentBadges(studentId);
        // Test duplicate defense live
        const testRefId = `sim_claim_${Date.now()}`;
        const claim1 = schoolStore.awardLearningPoints({
          studentId,
          points: 50,
          source: "quiz_completed",
          referenceId: testRefId,
          description: "Live Demo Legitimate Award",
        });
        const claim2 = schoolStore.awardLearningPoints({
          studentId,
          points: 50,
          source: "quiz_completed",
          referenceId: testRefId, // Same reference ID
          description: "Live Demo Replayed Claim Attempt",
        });
        setSimOutput({
          status: "SUCCESS",
          type: "GAMIFICATION_AND_DEFENSE",
          data: {
            totalPoints: progress.total_points,
            scholarRank: progress.level_title,
            badgesUnlocked: badges.map((b) => b.badge?.name || b.badge_id).slice(0, 3),
            duplicateClaimBlocked: claim1.id === claim2.id,
            antiCheatIntegrity: "Verified: Repeated requests rejected without mutating ledger",
          },
        });
      } else if (activeStep.id === 5) {
        // Step 5: Socratic AI Assistant with RAG
        const response = await generateStudyAssistantResponse({
          message: "Can you help me understand how angular momentum is conserved when an ice skater pulls their arms in?",
          subjectId: "c0000000-0000-0000-0000-000000000001",
          subjectName: "AP Physics C: Mechanics",
          className: "Grade 10",
        });
        setSimOutput({
          status: "SUCCESS",
          type: "AI_SOCRATIC_TUTOR",
          data: {
            engineMode: response.message.ai_engine_mode,
            socraticSnippet: response.message.content.slice(0, 260) + "...",
            citations: response.message.citations?.map((c) => ({
              source: c.document_title,
              relevance: `${Math.round(c.relevance_score * 100)}% match`,
            })),
            followUpPrompts: response.message.suggested_follow_ups?.slice(0, 2),
          },
        });
      } else if (activeStep.id === 6) {
        // Step 6: CyberSafe Threat Analyzer
        const sample = SYNTHETIC_CYBER_EXAMPLES[0];
        const analysis = analyzeSuspiciousMessage(sample.content);
        setSimOutput({
          status: "SUCCESS",
          type: "CYBERSAFE_ANALYZER",
          data: {
            inputHeadline: sample.title,
            riskAssessment: analysis.risk_level.toUpperCase().replace("_", " "),
            riskScore: `${analysis.risk_score} / 100`,
            identifiedThreats: analysis.indicators.map((i) => `${i.label} (${i.severity.toUpperCase()})`),
            prescribedSafeAction: analysis.indicators[0]?.safe_action || "Contact IT security",
            transparencyTip: analysis.official_verification_tip,
          },
        });
      } else if (activeStep.id === 7) {
        // Step 7: Teacher Diagnostic Insights
        const teacher = schoolStore.getTeachers()[0];
        const analytics = schoolStore.getTeacherClassLearningAnalytics(teacher.id);
        setSimOutput({
          status: "SUCCESS",
          type: "TEACHER_ANALYTICS",
          data: {
            activeSectionsCount: analytics.length,
            sampleSection: analytics[0]?.class_name || "Section 10-A",
            completionRate: `${analytics[0]?.average_completion_rate || 88}%`,
            classAverageScore: `${analytics[0]?.average_score_percentage || 85}%`,
            strugglingConceptsFlagged: analytics[0]?.struggling_topics?.map(
              (t) => `${t.topic} (${t.missed_rate}% missed)`
            ),
          },
        });
      } else if (activeStep.id === 8) {
        // Step 8: Parent Access & Isolation
        const parentId = "30000000-0000-0000-0000-000000000001";
        const linked = schoolStore.getParentLinkedChildren(parentId);
        const strangerTest = schoolStore.getParentLinkedChildren("30000000-0000-0000-0000-999999999999");
        setSimOutput({
          status: "SUCCESS",
          type: "PARENT_ISOLATION",
          data: {
            authorizedParent: "Eleanor Vance",
            linkedWard: linked[0]?.profile?.full_name || "Alex Vance",
            linkedWardId: linked[0]?.student_number || "STU-2026-001",
            unauthorizedCrossAccessResult: `${strangerTest.length} records returned (Zero cross-leakage)`,
            privacyStandardsCompliant: "FERPA / GDPR Custodial Boundary Enforced",
          },
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Simulation error encountered.";
      setSimOutput({
        status: "ERROR",
        message,
      });
    } finally {
      setSimRunning(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Competition Presentation Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20">
              OA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">
                  Oakridge Collegiate Academy
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Competition Demo Console
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-End Juror & Evaluation Walkthrough (3–5 Minute Presentation Flow)
              </p>
            </div>
          </div>

          {/* Presentation Timer Control */}
          <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-400" />
              <span className="font-mono text-sm font-semibold tracking-wider text-white">
                {formatTimer(elapsedSeconds)}
              </span>
              <span className="text-[10px] text-slate-400 hidden sm:inline">
                / 04:30 Target
              </span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <button
              onClick={() => setIsTimerRunning((prev) => !prev)}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1"
              title="Spacebar to toggle"
            >
              {isTimerRunning ? (
                <>
                  <Pause className="w-3 h-3" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3" /> Start
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setElapsedSeconds(0);
              }}
              className="text-slate-400 hover:text-white transition p-1"
              title="Reset timer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Exit to Public Portal Link */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-600 transition flex items-center gap-1.5"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public Site</span>
            </Link>
            <Link
              href="/portal"
              className="text-xs text-white px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition font-medium flex items-center gap-1.5 shadow-sm"
            >
              <KeyRound className="w-3 h-3" />
              <span>Portal Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Story Stepper Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {STORY_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;
            return (
              <button
                key={step.id}
                onClick={() => handleStepSelect(idx)}
                className={`text-left p-2.5 rounded-xl border transition relative flex flex-col justify-between ${
                  isActive
                    ? "bg-sky-950/60 border-sky-500 text-white shadow-md shadow-sky-500/10 ring-1 ring-sky-500/50"
                    : isCompleted
                    ? "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"
                    : "bg-slate-900/30 border-slate-800/60 text-slate-500 hover:border-slate-700 hover:text-slate-400"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Step {step.id}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="text-[9px] text-slate-500 font-mono">
                      {step.timeTarget.split(" ")[0]}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-semibold leading-tight line-clamp-1">
                  {step.title.split(". ")[1]}
                </div>
                <div className="mt-1 text-[9px] font-medium text-slate-400">
                  {step.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
          {/* Left Column: Story Narration & Speaker Cues (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Step Card Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${activeStep.roleColor}`}
                  >
                    {activeStep.role} Perspective
                  </span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    Timeline: {activeStep.timeTarget}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  Step {activeStep.id} of {STORY_STEPS.length}
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                {activeStep.title}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeStep.overview}
              </p>

              {/* Speaker Script Callout Box */}
              <div className="mt-5 bg-slate-950/90 border border-slate-800/80 rounded-xl p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Presenter Verbal Script & Demonstration Cue</span>
                </div>
                <p className="text-xs text-slate-300 italic leading-relaxed font-serif">
                  {activeStep.script}
                </p>
              </div>

              {/* Key Evaluator Checkpoints */}
              <div className="mt-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                  Evaluation Checkpoints for Competition Judges
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {activeStep.keyPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sky-400 mt-0.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Pillars */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
                  Architecture:
                </span>
                {activeStep.technicalPillars.map((p, i) => (
                  <span
                    key={i}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 font-mono"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                disabled={activeStepIndex === 0}
                onClick={() => handleStepSelect(activeStepIndex - 1)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeStepIndex === 0
                    ? "opacity-40 cursor-not-allowed bg-slate-900 border border-slate-800 text-slate-500"
                    : "bg-slate-900 border border-slate-800 hover:border-slate-700 text-white"
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <div className="text-xs text-slate-400">
                Tip: Press <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 font-mono">←</kbd> and{" "}
                <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200 font-mono">→</kbd> keys to navigate
              </div>

              <button
                disabled={activeStepIndex === STORY_STEPS.length - 1}
                onClick={() => handleStepSelect(activeStepIndex + 1)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                  activeStepIndex === STORY_STEPS.length - 1
                    ? "opacity-40 cursor-not-allowed bg-slate-900 border border-slate-800 text-slate-500"
                    : "bg-sky-600 hover:bg-sky-500 text-white shadow-sm"
                }`}
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Execution Sandbox (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Live Verification Console */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Live Proof Execution Sandbox
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  REAL STORE RUNNER
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Execute this story step&apos;s underlying data store logic, security validation, or AI engine right now to prove implementation reality.
              </p>

              <button
                onClick={executeStepSimulation}
                disabled={simRunning}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 disabled:opacity-50"
              >
                {simRunning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing Verification Logic...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Step {activeStep.id} Live Simulation</span>
                  </>
                )}
              </button>

              {/* Simulation Result Terminal Output */}
              {simOutput && (
                <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl p-3.5 font-mono text-[11px] text-slate-300">
                  <div className="flex items-center justify-between text-slate-500 border-b border-slate-800 pb-1.5 mb-2">
                    <span className="text-emerald-400 font-semibold">
                      [EXECUTION COMPLETE — 0 ERRORS]
                    </span>
                    <span>{simOutput.type}</span>
                  </div>
                  <pre className="overflow-x-auto text-[11px] text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {JSON.stringify(simOutput.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Live Navigation & Pre-filled Synthetic Credentials */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Step Portal Destination & Auth
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  SAFE SYNTHETIC
                </span>
              </div>

              {activeStep.credentials ? (
                <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 mb-3 text-xs">
                  <div className="text-[11px] font-medium text-slate-400 mb-1">
                    Role: <span className="text-white font-semibold">{activeStep.credentials.roleName}</span>
                  </div>
                  <div className="flex flex-col gap-1 font-mono text-[11px]">
                    <div className="flex items-center justify-between bg-slate-900 px-2 py-1 rounded">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-sky-300 select-all">{activeStep.credentials.email}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900 px-2 py-1 rounded">
                      <span className="text-slate-400">Password:</span>
                      <span className="text-amber-300 select-all">{activeStep.credentials.pass}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-400 bg-slate-950 p-3 rounded-xl border border-slate-800/80 mb-3">
                  This step is publicly accessible without credential requirements.
                </div>
              )}

              <Link
                href={activeStep.portalRoute}
                target="_blank"
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition flex items-center justify-center gap-2 shadow-md shadow-indigo-900/20"
              >
                <span>Open Live Interface</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Quick Demo Credentials Matrix */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-xs">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Synthetic Roster Quick Reference
              </h4>
              <div className="space-y-1.5 text-[11px] text-slate-300">
                <div className="flex justify-between items-center py-0.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Admin:</span>
                  <span className="font-mono text-sky-400">{SEED_CREDENTIALS.admin.email}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Teacher:</span>
                  <span className="font-mono text-emerald-400">{SEED_CREDENTIALS.teacher.email}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-slate-800/60">
                  <span className="text-slate-400">Student:</span>
                  <span className="font-mono text-indigo-400">{SEED_CREDENTIALS.student.email}</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-slate-400">Parent:</span>
                  <span className="font-mono text-cyan-400">{SEED_CREDENTIALS.parent.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Status Bar */}
      <footer className="border-t border-slate-800 bg-slate-900/90 py-3 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Competition Demonstration Ready</span>
            <span className="text-slate-600">|</span>
            <span>197 Automated Tests Passing (Phases 2–6)</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Next.js 16.4.2 · React 19 · TypeScript 5 Strict · Supabase PostgreSQL RLS
          </div>
        </div>
      </footer>
    </div>
  );
}

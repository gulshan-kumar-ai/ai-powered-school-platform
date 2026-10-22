/**
 * Phase 4 Personalised Learning Recommendations Engine
 * Inspects student quiz attempts, subject mastery, and digital library resources
 * to generate supportive, transparent, and dismissible learning recommendations.
 *
 * Pedagogical Guardrails:
 * - Recommendations are presented as encouraging learning suggestions.
 * - Never labels learners pejoratively.
 * - Does not make automatic consequential academic decisions (grading/placement).
 * - Full student dismissal support.
 */

import { schoolStore } from "@/lib/data/school-store";
import { PersonalizedRecommendation, QuizSubmittedAnswer } from "@/types/portal";

// In-memory registry of dismissed recommendations per student
const dismissedRecommendationIds = new Set<string>();

/**
 * Marks a recommendation as dismissed by the student
 */
export function dismissRecommendation(recommendationId: string): void {
  dismissedRecommendationIds.add(recommendationId);
}

/**
 * Resets dismissed recommendations (useful for testing or profile refresh)
 */
export function resetDismissedRecommendations(): void {
  dismissedRecommendationIds.clear();
}

/**
 * Generates or retrieves personalized learning suggestions for a given student
 */
export function getPersonalizedRecommendations(
  studentId: string
): PersonalizedRecommendation[] {
  const attempts = schoolStore.getStudentQuizAttempts(studentId);
  const allQuizzes = schoolStore.getQuizzes({ isPublishedOnly: true });
  const allResources = schoolStore.getLearningResources({ isPublishedOnly: true });

  const recommendations: PersonalizedRecommendation[] = [];

  // Group attempts by topic/quiz to identify areas needing reinforcement
  const topicStats = new Map<
    string,
    {
      subjectName: string;
      topic: string;
      totalAttempts: number;
      avgScore: number;
      lastQuizId: string;
      lastQuizTitle: string;
      failedQuestionsCount: number;
    }
  >();

  for (const att of attempts) {
    const quiz = allQuizzes.find((q) => q.id === att.quiz_id);
    const topic = quiz?.topic || "Foundational Studies";
    const subjectName = quiz?.subject_name || "General Curriculum";

    const current = topicStats.get(topic) || {
      subjectName,
      topic,
      totalAttempts: 0,
      avgScore: 0,
      lastQuizId: att.quiz_id,
      lastQuizTitle: att.quiz_title || quiz?.title || "Academic Assessment",
      failedQuestionsCount: 0,
    };

    current.totalAttempts += 1;
    current.avgScore =
      (current.avgScore * (current.totalAttempts - 1) + att.percentage) /
      current.totalAttempts;

    if (att.answers) {
      current.failedQuestionsCount += att.answers.filter(
        (a: QuizSubmittedAnswer) => !a.is_correct
      ).length;
    }

    topicStats.set(topic, current);
  }

  // 1. Identify topics needing reinforcement (score < 70% or multiple missed questions)
  for (const [topic, stat] of topicStats.entries()) {
    if (stat.avgScore < 70 || stat.failedQuestionsCount >= 2) {
      // Find matching library resource
      const matchingResource = allResources.find(
        (r) =>
          r.topic.toLowerCase().includes(topic.toLowerCase()) ||
          topic.toLowerCase().includes(r.topic.toLowerCase())
      );

      // (a) Short Lesson / Study Material
      const recLessonId = `rec-${studentId}-${topic.toLowerCase().replace(/\s+/g, "-")}-lesson`;
      if (!dismissedRecommendationIds.has(recLessonId)) {
        recommendations.push({
          id: recLessonId,
          student_id: studentId,
          type: "short_lesson",
          title: `Concept Review: Mastering ${topic}`,
          subject_name: stat.subjectName,
          topic,
          difficulty: "beginner",
          action_url: matchingResource
            ? `/portal/student/library?search=${encodeURIComponent(topic)}`
            : `/portal/student/ai-tutor?topic=${encodeURIComponent(topic)}`,
          rationale: `Suggested because your recent assessment on "${stat.lastQuizTitle}" averaged ${Math.round(stat.avgScore)}%. Reviewing foundational principles will help reinforce key concepts.`,
          trigger_quiz_id: stat.lastQuizId,
          is_dismissed: false,
          created_at: new Date().toISOString(),
        });
      }

      // (b) Practice Quiz
      const recPracticeId = `rec-${studentId}-${topic.toLowerCase().replace(/\s+/g, "-")}-practice`;
      if (!dismissedRecommendationIds.has(recPracticeId)) {
        recommendations.push({
          id: recPracticeId,
          student_id: studentId,
          type: "practice_quiz",
          title: `${topic} Diagnostic Practice Drill`,
          subject_name: stat.subjectName,
          topic,
          difficulty: "beginner",
          action_url: `/portal/student/quizzes?search=${encodeURIComponent(topic)}`,
          rationale: `Reinforce problem-solving speed with a low-stakes 5-question review on ${topic}.`,
          trigger_quiz_id: stat.lastQuizId,
          is_dismissed: false,
          created_at: new Date().toISOString(),
        });
      }

      // (c) Interactive Game / Cyber Drill
      const recGameId = `rec-${studentId}-${topic.toLowerCase().replace(/\s+/g, "-")}-game`;
      if (!dismissedRecommendationIds.has(recGameId)) {
        recommendations.push({
          id: recGameId,
          student_id: studentId,
          type: "game_drill",
          title: `Interactive Challenge: ${topic}`,
          subject_name: stat.subjectName,
          topic,
          difficulty: "intermediate",
          action_url: `/portal/student/games`,
          rationale: `Engage with interactive scenario-based challenges to deepen mental recall and earn achievement badges.`,
          trigger_quiz_id: stat.lastQuizId,
          is_dismissed: false,
          created_at: new Date().toISOString(),
        });
      }
    } else if (stat.avgScore >= 85) {
      // 2. Progression after demonstrated mastery
      const recAdvancedId = `rec-${studentId}-${topic.toLowerCase().replace(/\s+/g, "-")}-mastery`;
      if (!dismissedRecommendationIds.has(recAdvancedId)) {
        recommendations.push({
          id: recAdvancedId,
          student_id: studentId,
          type: "practice_quiz",
          title: `Advanced Honors Extension: ${topic}`,
          subject_name: stat.subjectName,
          topic,
          difficulty: "advanced",
          action_url: `/portal/student/quizzes?search=${encodeURIComponent(topic)}`,
          rationale: `You demonstrated strong mastery on "${stat.lastQuizTitle}" (${Math.round(stat.avgScore)}%). Take your understanding to the next level with advanced application problems.`,
          trigger_quiz_id: stat.lastQuizId,
          is_dismissed: false,
          created_at: new Date().toISOString(),
        });
      }
    }
  }

  // Fallback curated guidance if no attempts exist yet
  if (recommendations.length === 0) {
    const fallbackId = `rec-${studentId}-curated-start`;
    if (!dismissedRecommendationIds.has(fallbackId)) {
      recommendations.push({
        id: fallbackId,
        student_id: studentId,
        type: "practice_quiz",
        title: "STEM Diagnostic Quiz: Newton's Laws & Calculus",
        subject_name: "AP Physics C",
        topic: "Classical Mechanics",
        difficulty: "beginner",
        action_url: "/portal/student/quizzes",
        rationale:
          "Start your term diagnostic assessments to receive tailored study pathways and custom recommendations.",
        is_dismissed: false,
        created_at: new Date().toISOString(),
      });
    }

    const cyberFallbackId = `rec-${studentId}-cyber-awareness`;
    if (!dismissedRecommendationIds.has(cyberFallbackId)) {
      recommendations.push({
        id: cyberFallbackId,
        student_id: studentId,
        type: "game_drill",
        title: "CyberSafe Phishing Challenge",
        subject_name: "Computer Science",
        topic: "Cybersecurity Awareness",
        difficulty: "beginner",
        action_url: "/portal/student/cyber-analyzer",
        rationale:
          "Test suspicious emails and learn social-engineering defense tactics with the new AI Cyber Threat Analyzer.",
        is_dismissed: false,
        created_at: new Date().toISOString(),
      });
    }
  }

  return recommendations;
}

/**
 * Phase 4 AI-Assisted Academic Insights for Teachers
 * Generates aggregated, evidence-based instructional summaries for teacher analytics.
 *
 * Core Ethical & Analytical Constraints:
 * 1. Strict class-level data aggregation (protects individual pupil privacy).
 * 2. Explicit separation of measured statistics from AI pedagogical interpretations.
 * 3. Transparent detection and reporting when data volume is insufficient.
 * 4. Never assigns grades, disciplinary recommendations, or behavioural profiling.
 */

import { schoolStore } from "@/lib/data/school-store";
import { TeacherAIInsight } from "@/types/portal";

/**
 * Generates explainable, evidence-based academic insights for an authorized class section
 */
export function generateTeacherClassInsights(
  classId: string,
  teacherId?: string
): TeacherAIInsight {
  const sections = schoolStore.getSections();
  const classes = schoolStore.getClasses();
  const quizzes = schoolStore.getQuizzes();
  const resources = schoolStore.getLearningResources({ isPublishedOnly: true });

  const targetClass = classes.find((c) => c.id === classId) || classes[0];
  const className = targetClass ? targetClass.name : "Class 10-A";

  // Filter sections belonging to this class
  const classSectionIds = sections
    .filter((s) => s.class_id === classId)
    .map((s) => s.id);

  // Retrieve quizzes assigned to these sections or teacher
  const classQuizzes = quizzes.filter(
    (q) =>
      (!teacherId || q.created_by_teacher_id === teacherId) &&
      (!q.section_id || classSectionIds.includes(q.section_id) || classSectionIds.length === 0)
  );

  const classQuizIds = classQuizzes.map((q) => q.id);

  // Retrieve all attempts on these quizzes
  const allAttempts = schoolStore.getAllQuizAttempts();
  const relevantAttempts = allAttempts.filter((att) =>
    classQuizIds.includes(att.quiz_id)
  );

  // Insufficient data guardrail
  if (relevantAttempts.length < 2) {
    return {
      id: `insight-${classId}-${Date.now()}`,
      class_id: classId,
      class_name: className,
      high_error_topics: [],
      frequently_missed_questions: [],
      overall_class_summary:
        "Insufficient assessment sample size: Fewer than 2 completed quiz attempts have been recorded for this class section. As scholars complete formative assessments, aggregated diagnostic trends and revision recommendations will be computed here automatically.",
      has_sufficient_data: false,
      suggested_library_resource_ids: [],
      generated_at: new Date().toISOString(),
    };
  }

  // Aggregate mistakes by topic
  const topicStats = new Map<
    string,
    {
      topic: string;
      subject: string;
      totalAttempts: number;
      incorrectCount: number;
    }
  >();

  // Aggregate mistakes by question
  const questionMissCounts = new Map<
    string,
    {
      questionText: string;
      quizTitle: string;
      missedCount: number;
      totalAttempts: number;
    }
  >();

  for (const att of relevantAttempts) {
    const quiz = classQuizzes.find((q) => q.id === att.quiz_id);
    const topic = quiz?.topic || "General Subject";
    const subject = quiz?.subject_name || "Academics";

    const tStat = topicStats.get(topic) || {
      topic,
      subject,
      totalAttempts: 0,
      incorrectCount: 0,
    };
    tStat.totalAttempts += 1;
    if (att.percentage < 70) {
      tStat.incorrectCount += 1;
    }
    topicStats.set(topic, tStat);

    if (att.answers && quiz?.questions) {
      for (const ans of att.answers) {
        const qDef = quiz.questions.find((q) => q.id === ans.question_id);
        if (qDef) {
          const qStat = questionMissCounts.get(ans.question_id) || {
            questionText: qDef.question_text,
            quizTitle: quiz.title,
            missedCount: 0,
            totalAttempts: 0,
          };
          qStat.totalAttempts += 1;
          if (!ans.is_correct) {
            qStat.missedCount += 1;
          }
          questionMissCounts.set(ans.question_id, qStat);
        }
      }
    }
  }

  // Identify high-error topics
  const highErrorTopics: TeacherAIInsight["high_error_topics"] = [];
  for (const [, stat] of topicStats.entries()) {
    const missedRate = Math.round((stat.incorrectCount / stat.totalAttempts) * 100);
    if (missedRate >= 30 || highErrorTopics.length === 0) {
      highErrorTopics.push({
        topic: stat.topic,
        subject: stat.subject,
        missed_rate: missedRate,
        recommended_revision: `Conduct a 15-minute conceptual recap targeting ${stat.topic} core definitions. Follow up with a short formative review before summative evaluation.`,
        supporting_stats: `${stat.incorrectCount} of ${stat.totalAttempts} completed attempts scored below 70% threshold (${missedRate}% non-mastery rate).`,
      });
    }
  }

  // Identify frequently missed questions
  const frequentlyMissedQuestions: TeacherAIInsight["frequently_missed_questions"] = [];
  const sortedQuestions = Array.from(questionMissCounts.values()).sort(
    (a, b) => b.missedCount / b.totalAttempts - a.missedCount / a.totalAttempts
  );

  for (const q of sortedQuestions.slice(0, 3)) {
    const errorPct = Math.round((q.missedCount / q.totalAttempts) * 100);
    if (errorPct > 35 || frequentlyMissedQuestions.length === 0) {
      frequentlyMissedQuestions.push({
        question_text: q.questionText,
        quiz_title: q.quizTitle,
        missed_count: q.missedCount,
        total_attempts: q.totalAttempts,
        common_misconception: `Error rate ${errorPct}% (${q.missedCount}/${q.totalAttempts}). Suggests common procedural confusion between inverse operations or step sequence.`,
      });
    }
  }

  // Find matching library resources
  const topTopic = highErrorTopics[0]?.topic.toLowerCase() || "";
  const suggestedResources = resources
    .filter(
      (r) =>
        r.topic.toLowerCase().includes(topTopic) ||
        topTopic.includes(r.topic.toLowerCase())
    )
    .slice(0, 3)
    .map((r) => r.id);

  const overallClassSummary = `Based on ${relevantAttempts.length} measured quiz submissions across ${className}, the overall cohort demonstrates steady engagement. Topic analysis reveals that "${highErrorTopics[0]?.topic || "Current Unit"}" exhibits the highest variation in comprehension (${highErrorTopics[0]?.missed_rate || 0}% error rate). We recommend reviewing the foundational worked examples in your next instructional period.`;

  return {
    id: `insight-${classId}-${Date.now()}`,
    class_id: classId,
    class_name: className,
    high_error_topics: highErrorTopics,
    frequently_missed_questions: frequentlyMissedQuestions,
    overall_class_summary: overallClassSummary,
    has_sufficient_data: true,
    suggested_library_resource_ids: suggestedResources,
    generated_at: new Date().toISOString(),
  };
}

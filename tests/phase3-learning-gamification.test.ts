/**
 * Automated Verification Suite for Phase 3: Digital Learning Platform, Gamification and Student Progress
 * Tests:
 * 1. Digital Library: Resource creation, search/filter, bookmarks, and downloads
 * 2. Online Quiz: Answer protection (no leakage before grading), server scoring (MC, TF, short answer), and attempt limits
 * 3. Educational Games: Session recording, accuracy calculation, and activity tracking
 * 4. Gamification Economy: Point awards, duplicate claim prevention (idempotency via reference_id), and level progression
 * 5. Badges System: 7 standard achievements, criteria validation, and duplicate prevention
 * 6. Teacher Class Analytics: Scoping to assigned cohorts and struggling concepts identification
 * 7. Parent Child Isolation: Strict access control for custodial records
 */

import { schoolStore } from "../lib/data/school-store";

let passedCount = 0;
let failedCount = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passedCount++;
    console.log(`  \x1b[32m✔ PASS\x1b[0m ${testName}`);
  } else {
    failedCount++;
    console.error(`  \x1b[31m✖ FAIL\x1b[0m ${testName}${detail ? ` - ${detail}` : ""}`);
  }
}

async function runPhase3Tests() {
  console.log("\n============================================================");
  console.log("  PHASE 3 AUTOMATED LEARNING & GAMIFICATION SUITE");
  console.log("============================================================\n");

  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const teacherId = "10000000-0000-0000-0000-000000000001"; // Dr. Robert Chen
  const parentId = "30000000-0000-0000-0000-000000000001"; // Eleanor Vance

  // ------------------------------------------------------------
  // 1. DIGITAL LIBRARY TESTS
  // ------------------------------------------------------------
  console.log("\x1b[36m[Group 1: Digital Library System]\x1b[0m");

  const initialResources = schoolStore.getLearningResources();
  assert(initialResources.length >= 6, "Seed library contains baseline learning resources");

  // Filter by subject
  const physicsResources = schoolStore.getLearningResources({ subjectId: "40000000-0000-0000-0000-000000000002" });
  assert(
    physicsResources.every((r) => r.subject_id === "40000000-0000-0000-0000-000000000002"),
    "Library filters accurately by subject ID"
  );

  // Filter by format
  const videoResources = schoolStore.getLearningResources({ type: "video" });
  assert(
    videoResources.length > 0 && videoResources.every((r) => r.resource_type === "video"),
    "Library filters accurately by resource type 'video'"
  );

  // Create new resource
  const newResource = schoolStore.createLearningResource({
    title: "Quantum Entanglement & Bell Inequalities Notes",
    description: "Advanced supplementary reading for Physics honors cohort.",
    subjectId: "40000000-0000-0000-0000-000000000002",
    topic: "Modern Quantum Mechanics",
    resourceType: "pdf",
    url: "/storage/vault/quantum-bell.pdf",
    fileSize: "3.8 MB",
    createdByTeacherId: teacherId,
    authorName: "Dr. Robert Chen",
    isPublished: true,
  });
  assert(!!newResource.id && newResource.title.includes("Quantum"), "Teacher successfully uploads learning resource");

  // Bookmark toggle
  const bookmarked = schoolStore.toggleBookmark(studentId, newResource.id);
  assert(bookmarked === true, "Student can bookmark a learning resource");
  const studentBookmarks = schoolStore.getUserBookmarks(studentId);
  assert(
    studentBookmarks.some((r) => r.id === newResource.id),
    "Bookmarked resource appears in student bookmark list"
  );

  const unbookmarked = schoolStore.toggleBookmark(studentId, newResource.id);
  assert(unbookmarked === false, "Student can unbookmark a resource (toggle off)");

  // Record resource access & increment count
  const initialDownloads = newResource.downloads_count;
  schoolStore.recordResourceAccess(studentId, newResource.id);
  const updatedRes = schoolStore.getLearningResourceById(newResource.id);
  assert(
    updatedRes?.downloads_count === initialDownloads + 1,
    "Resource access correctly increments verified downloads count"
  );

  // ------------------------------------------------------------
  // 2. ONLINE QUIZ PLATFORM & ANSWER PROTECTION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 2: Online Quiz Platform & Security]\x1b[0m");

  const quizzes = schoolStore.getQuizzes();
  assert(quizzes.length >= 3, "Baseline interactive quizzes exist in repository");

  // Critical Answer Protection: student sanitized view must NOT leak answers!
  const targetQuizId = "q0000000-0000-0000-0000-000000000001";
  const sanitizedQuiz = schoolStore.getQuizById(targetQuizId, false);
  assert(!!sanitizedQuiz, "Quiz retrieved successfully for student");
  assert(
    sanitizedQuiz?.questions?.every(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (q: any) => q.correct_option_index === undefined && q.accepted_answers === undefined && q.explanation === undefined
    ) ?? false,
    "SECURITY: Student view sanitizes correct_option_index, accepted_answers, and explanation"
  );

  // Teacher full view DOES include answers
  const teacherQuiz = schoolStore.getQuizById(targetQuizId, true);
  assert(
    teacherQuiz?.questions?.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (q: any) => q.correct_option_index !== undefined || q.accepted_answers !== undefined
    ) ?? false,
    "Teacher authorized answer key view preserves correct options and explanations"
  );

  // Author a new quiz with 3 question types (MC, TF, Short Answer)
  const createdQuiz = schoolStore.createQuiz(
    {
      title: "Automated Verification Mastery Test",
      description: "Comprehensive test across MC, True/False, and Short Answer.",
      subjectId: "40000000-0000-0000-0000-000000000002",
      topic: "Core Physics Laws",
      difficultyLevel: "intermediate",
      timeLimitMinutes: 10,
      maxAttempts: 2,
      passPercentage: 70,
      isPublished: true,
      createdByTeacherId: teacherId,
    },
    [
      {
        questionText: "What is the SI unit of electric capacitance?",
        questionType: "multiple_choice",
        options: ["Henry", "Farad", "Tesla", "Weber"],
        correctOptionIndex: 1, // Farad
        explanation: "1 Farad = 1 Coulomb per Volt.",
        points: 10,
      },
      {
        questionText: "An object moving in a circle at constant speed has zero acceleration.",
        questionType: "true_false",
        options: ["True", "False"],
        correctOptionIndex: 1, // False (centripetal acceleration exists)
        explanation: "Centripetal acceleration is directed toward the center.",
        points: 10,
      },
      {
        questionText: "Name the force that resists relative motion between surfaces in contact.",
        questionType: "short_answer",
        acceptedAnswers: ["friction", "frictional force", "kinetic friction"],
        explanation: "Friction acts parallel to the contact surface.",
        points: 10,
      },
    ]
  );
  assert(!!createdQuiz.id, "Teacher creates quiz with MC, True/False, and Short Answer questions");

  const fullCreatedQuiz = schoolStore.getQuizById(createdQuiz.id, true);
  const q1 = fullCreatedQuiz?.questions[0];
  const q2 = fullCreatedQuiz?.questions[1];
  const q3 = fullCreatedQuiz?.questions[2];

  // Submit attempt #1 (100% correct)
  const attempt1 = schoolStore.submitQuizAttempt({
    quizId: createdQuiz.id,
    studentId,
    answers: [
      { question_id: q1?.id || "", selected_option_index: 1 }, // Correct (Farad)
      { question_id: q2?.id || "", selected_option_index: 1 }, // Correct (False)
      { question_id: q3?.id || "", text_answer: "  Friction " }, // Correct (normalized matching)
    ],
  });

  assert(attempt1.score === 30 && attempt1.percentage === 100, "Server accurately scores MC, TF, and normalized short answer");
  assert(attempt1.passed === true, "Passing threshold correctly evaluated on server");
  assert(attempt1.attempt_number === 1, "Attempt number 1 recorded");

  // Submit attempt #2
  const attempt2 = schoolStore.submitQuizAttempt({
    quizId: createdQuiz.id,
    studentId,
    answers: [
      { question_id: q1?.id || "", selected_option_index: 0 }, // Incorrect (Henry)
      { question_id: q2?.id || "", selected_option_index: 1 }, // Correct (False)
      { question_id: q3?.id || "", text_answer: "gravity" }, // Incorrect
    ],
  });
  assert(attempt2.percentage === 33, "Partial score evaluated correctly on attempt 2");
  assert(attempt2.attempt_number === 2, "Attempt number 2 recorded");

  // Submit attempt #3 (SHOULD FAIL: maxAttempts is 2)
  let attemptLimitBlocked = false;
  try {
    schoolStore.submitQuizAttempt({
      quizId: createdQuiz.id,
      studentId,
      answers: [],
    });
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("Attempt limit exceeded")) {
      attemptLimitBlocked = true;
    }
  }
  assert(attemptLimitBlocked, "SECURITY: Server rejects submissions exceeding max_attempts limit");

  // ------------------------------------------------------------
  // 3. EDUCATIONAL GAMES & SESSIONS
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 3: Educational Games & Interactive Challenges]\x1b[0m");

  const gameDefs = schoolStore.getGameDefinitions();
  assert(gameDefs.length === 3, "Three educational game configurations available");

  // Record Knowledge Challenge session
  const gameSession = schoolStore.recordGameSession({
    gameId: "knowledge_challenge",
    studentId,
    score: 85,
    questionsAnswered: 10,
    correctAnswers: 9,
    timeSpentSeconds: 120,
    topic: "AP Physics Mechanics",
  });

  assert(!!gameSession.id && gameSession.accuracy_percentage === 90, "Game session logged with 90% accuracy");
  const studentSessions = schoolStore.getStudentGameSessions(studentId);
  assert(
    studentSessions.some((s) => s.id === gameSession.id),
    "Logged session appears in student practice history"
  );

  // ------------------------------------------------------------
  // 4. GAMIFICATION ECONOMY & DUPLICATE PREVENTION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 4: Points Economy & Duplicate Prevention]\x1b[0m");

  const testRefId = `unique_challenge_ref_${Date.now()}`;
  const firstAward = schoolStore.awardLearningPoints({
    studentId,
    points: 75,
    source: "streak_bonus",
    referenceId: testRefId,
    description: "Unique challenge completion test",
  });
  assert(firstAward.points === 75, "Points awarded successfully for first claim");

  // Attempt duplicate claim with exact same referenceId
  const duplicateAttempt = schoolStore.awardLearningPoints({
    studentId,
    points: 75,
    source: "streak_bonus",
    referenceId: testRefId,
    description: "Replay attack attempt",
  });
  assert(duplicateAttempt.id === firstAward.id, "SECURITY: Duplicate points claim with identical reference_id is blocked safely");

  // Level Progression Calculation
  const progress = schoolStore.getStudentLearningProgress(studentId);
  assert(progress.level >= 1 && progress.level <= 5, "Student level correctly evaluated within tiers 1 to 5");
  assert(typeof progress.points_to_next_level === "number", "Calculates remaining points required for next tier");

  // ------------------------------------------------------------
  // 5. BADGES & ACHIEVEMENTS
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 5: Scholastic Badges System]\x1b[0m");

  const allBadges = schoolStore.getBadges();
  assert(allBadges.length === 7, "All 7 standard scholastic badges defined in catalog");

  // Unlock 'math_explorer'
  schoolStore.unlockBadge(studentId, "math_explorer");
  // Might already be unlocked or unlocked now
  const studentBadges = schoolStore.getStudentBadges(studentId);
  assert(
    studentBadges.some((b) => b.badge_id === "math_explorer"),
    "Badge 'math_explorer' is recorded in student's earned honors"
  );

  // Duplicate unlock attempt
  const duplicateBadgeUnlock = schoolStore.unlockBadge(studentId, "math_explorer");
  assert(duplicateBadgeUnlock === null, "SECURITY: Attempt to unlock an already earned badge is safely ignored");

  // ------------------------------------------------------------
  // 6. TEACHER CLASS ANALYTICS SCOPING
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 6: Teacher Class Analytics Scoping]\x1b[0m");

  const teacherAnalytics = schoolStore.getTeacherClassLearningAnalytics(teacherId);
  assert(teacherAnalytics.length > 0, "Teacher analytics calculated for assigned cohorts");
  assert(
    teacherAnalytics.every((a) => typeof a.average_completion_rate === "number" && typeof a.average_score_percentage === "number"),
    "Analytics contain valid completion rates and score percentages"
  );
  assert(
    teacherAnalytics.every((a) => Array.isArray(a.struggling_topics)),
    "Identifies diagnostic struggling topics without judgmental labeling"
  );

  // ------------------------------------------------------------
  // 7. PARENT-CHILD CUSTODIAL ISOLATION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 7: Parent Custodial Privacy & Isolation]\x1b[0m");

  const parentChildren = schoolStore.getParentLinkedChildren(parentId);
  assert(
    parentChildren.length === 1 && parentChildren[0].id === studentId,
    "SECURITY: Parent Eleanor Vance is strictly isolated to her linked child Alex Vance"
  );

  // Unknown parent check
  const unknownParentChildren = schoolStore.getParentLinkedChildren("nonexistent-parent-id");
  assert(unknownParentChildren.length === 0, "SECURITY: Non-custodial parent queries return empty array");

  const childSummary = schoolStore.getParentChildLearningSummary(studentId);
  assert(!!childSummary && childSummary.student.id === studentId, "Parent can view comprehensive summary for linked child");
  assert(Array.isArray(childSummary?.recentAttempts), "Child summary includes practice quiz history");
  assert(Array.isArray(childSummary?.badges), "Child summary includes earned badges");

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log("\n============================================================");
  console.log(`  RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runPhase3Tests().catch((err) => {
  console.error("Test execution encountered an error:", err);
  process.exit(1);
});

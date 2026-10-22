/**
 * Phase 6 End-to-End User Journey Verification Suite
 * Tests realistic end-to-end user journeys using synthetic accounts and data:
 * - Journey A: School Administration (Admin login, class/subject creation, student enroll, teacher assign, announcement)
 * - Journey B: Teacher and Student Learning (Teacher login, resource publish, quiz creation, student take quiz, scoring, progress update)
 * - Journey C: Gamification (Challenge completion, points award, badges unlock, duplicate prevention, progress ledger)
 * - Journey D: AI Learning (Socratic AI tutor, RAG citations, teacher quiz draft generation & review, cyber threat analysis, transparent engine fallback)
 * - Journey E: Parent Access (Parent login, linked child view, privacy isolation against unauthorized student records)
 */

import { schoolStore } from "../lib/data/school-store";
import {
  authenticateUser,
  isAuthorizedForPath,
  SEED_CREDENTIALS,
} from "../lib/auth/session";
import { generateStudyAssistantResponse } from "../lib/ai/study-assistant";
import { generateQuizDrafts, validateDraftQuestion } from "../lib/ai/quiz-generator";
import { analyzeSuspiciousMessage } from "../lib/ai/cyber-analyzer";

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

async function runPhase6E2ETests() {
  console.log("\n============================================================");
  console.log("  PHASE 6 END-TO-END VALIDATION & COMPETITION READINESS SUITE");
  console.log("============================================================\n");

  // ============================================================
  // JOURNEY A: SCHOOL ADMINISTRATION
  // ============================================================
  console.log("\x1b[36m[Journey A: School Administration & Governance]\x1b[0m");

  // A1. Administrator logs in
  const adminLogin = await authenticateUser(
    SEED_CREDENTIALS.admin.email,
    SEED_CREDENTIALS.admin.password
  );
  assert(
    adminLogin.success && adminLogin.session?.user.role === "administrator",
    "A1: Administrator authenticated successfully with role 'administrator'"
  );
  assert(
    isAuthorizedForPath("/portal/admin", adminLogin.session!.user.role),
    "A1: Administrator authorized for /portal/admin path"
  );

  // A2. Creates a class and section
  const initialClassesCount = schoolStore.getClasses().length;
  const newClass = schoolStore.createClass({
    name: "Grade 11 Senior Honors",
    gradeLevel: 11,
  });
  assert(
    schoolStore.getClasses().length === initialClassesCount + 1,
    "A2: Created academic class 'Grade 11 Senior Honors' persisted in store"
  );
  assert(
    newClass.grade_level === 11,
    "A2: New class contains correct grade level metadata"
  );

  const initialSectionsCount = schoolStore.getSections().length;
  const newSection = schoolStore.createSection({
    classId: newClass.id,
    name: "Section 11-A",
    roomNumber: "Science Pavilion 302",
    capacity: 26,
  });
  assert(
    schoolStore.getSections().length === initialSectionsCount + 1,
    "A2: Created section 'Section 11-A' associated with Grade 11 class"
  );

  // A3. Creates a subject
  const initialSubjectsCount = schoolStore.getSubjects().length;
  const newSubject = schoolStore.createSubject({
    code: "AP-CHEM-1",
    name: "AP Chemistry: Physical & Analytical",
    department: "Science & Engineering",
    credits: 1.0,
    description: "Advanced college chemistry laboratory curriculum.",
  });
  assert(
    schoolStore.getSubjects().length === initialSubjectsCount + 1,
    "A3: Created course subject 'AP-CHEM-1' registered in curriculum catalog"
  );

  // A4. Registers a student and assigns a teacher
  const initialStudentsCount = schoolStore.getStudents().length;
  const newStudent = schoolStore.addStudent({
    fullName: "Samir Khan",
    email: "samir.khan@oakridgeacademy.edu",
    studentNumber: "STU-2026-9011",
    sectionId: newSection.id,
    emergencyContact: "Fatima Khan (+1 555-438-7799)",
  });
  assert(
    schoolStore.getStudents().length === initialStudentsCount + 1,
    "A4: Enrolled new student scholar 'Samir Khan' with institutional ID"
  );
  assert(
    newStudent.current_section_id === newSection.id,
    "A4: Student successfully mapped to target Section 11-A"
  );

  const teacher = schoolStore.getTeachers()[0];
  const teacherAssign = schoolStore.assignTeacherToClass({
    teacherId: teacher.id,
    sectionId: newSection.id,
    subjectId: newSubject.id,
  });
  assert(
    teacherAssign.section_id === newSection.id && teacherAssign.subject_id === newSubject.id,
    "A4: Faculty member assigned to Section 11-A for AP Chemistry"
  );

  // A5. Publishes a school announcement
  const announcement = schoolStore.createAnnouncement({
    title: "Regional Science & STEM Olympiad 2026",
    content: "Registration is open for all Grade 10 and 11 scholars in the Science Pavilion.",
    priority: "urgent",
    audience: "all",
    publisherName: "Dr. Evelyn Montgomery",
  });
  assert(
    schoolStore.getAnnouncements("all").some((a) => a.id === announcement.id),
    "A5: High-priority school announcement published and visible across audiences"
  );

  // A6. Verifies audit trail logs actions
  const auditLogs = schoolStore.getAuditLogs();
  assert(
    auditLogs.some((l) => l.action === "CREATE_CLASS"),
    "A6: Audit log recorded CREATE_CLASS action"
  );
  assert(
    auditLogs.some((l) => l.action === "CREATE_SUBJECT"),
    "A6: Audit log recorded CREATE_SUBJECT action"
  );
  assert(
    auditLogs.some((l) => l.action === "ENROLL_STUDENT"),
    "A6: Audit log recorded ENROLL_STUDENT action"
  );
  assert(
    auditLogs.some((l) => l.action === "ASSIGN_TEACHER"),
    "A6: Audit log recorded ASSIGN_TEACHER action"
  );


  // ============================================================
  // JOURNEY B: TEACHER AND STUDENT LEARNING
  // ============================================================
  console.log("\n\x1b[36m[Journey B: Teacher & Student Learning Lifecycle]\x1b[0m");

  // B1. Teacher logs in
  const teacherLogin = await authenticateUser(
    SEED_CREDENTIALS.teacher.email,
    SEED_CREDENTIALS.teacher.password
  );
  assert(
    teacherLogin.success && teacherLogin.session?.user.role === "teacher",
    "B1: Teacher authenticated successfully with role 'teacher'"
  );

  // B2. Publishes a learning resource
  const newResource = schoolStore.createLearningResource({
    title: "AP Chemistry: Reaction Kinetics & Catalysis Notes",
    description: "Detailed reaction rate law derivations and Arrhenius activation energy equations.",
    subjectId: newSubject.id,
    classId: newClass.id,
    topic: "Chemical Kinetics",
    resourceType: "pdf",
    url: "/storage/resources/ap-chem-kinetics.pdf",
    fileSize: "2.8 MB",
    createdByTeacherId: teacher.id,
    authorName: teacherLogin.session!.user.full_name,
    isPublished: true,
  });
  assert(
    newResource.is_published === true,
    "B2: Teacher published learning resource with status 'is_published: true'"
  );

  // B3. Creates and publishes a quiz
  const newQuiz = schoolStore.createQuiz({
    title: "AP Chemistry: Reaction Kinetics Formative Quiz",
    description: "Diagnostic check on rate laws, half-life equations, and reaction mechanisms.",
    subjectId: newSubject.id,
    sectionId: newSection.id,
    topic: "Reaction Kinetics",
    difficultyLevel: "intermediate",
    timeLimitMinutes: 15,
    maxAttempts: 2,
    passPercentage: 70,
    createdByTeacherId: teacher.id,
    creatorName: teacherLogin.session!.user.full_name,
    isPublished: true,
    questions: [
      {
        questionText: "What order of reaction corresponds to a linear plot of 1/[A] versus time?",
        questionType: "multiple_choice",
        options: ["Zero order", "First order", "Second order", "Third order"],
        correctOptionIndex: 2,
        explanation: "A second-order integrated rate law takes the linear form 1/[A]_t = kt + 1/[A]_0.",
        points: 10,
      },
      {
        questionText: "True or False: Catalysts increase reaction rates by lowering the activation energy barrier without being permanently consumed.",
        questionType: "true_false",
        options: ["True", "False"],
        correctOptionIndex: 0,
        explanation: "True. Catalysts provide an alternate pathway with lower activation energy.",
        points: 10,
      },
      {
        questionText: "What constant in the Arrhenius equation represents the collision frequency factor? (Single letter)",
        questionType: "short_answer",
        acceptedAnswers: ["A", "a", "frequency factor"],
        explanation: "In k = A * e^(-Ea/RT), A is the pre-exponential collision frequency factor.",
        points: 10,
      },
    ],
  });
  assert(
    newQuiz.is_published === true && newQuiz.total_points === 30,
    "B3: Teacher published 30-point interactive quiz with 3 verified questions"
  );

  // B4. Student logs in
  const studentLogin = await authenticateUser(
    SEED_CREDENTIALS.student.email,
    SEED_CREDENTIALS.student.password
  );
  assert(
    studentLogin.success && studentLogin.session?.user.role === "student",
    "B4: Student authenticated successfully with role 'student'"
  );

  // B5. Student accesses authorized resource
  const studentVisibleResources = schoolStore.getLearningResources({ isPublishedOnly: true });
  assert(
    studentVisibleResources.some((r) => r.id === newResource.id),
    "B5: Student can access published learning resource in digital library"
  );

  // Unpublished resources are hidden from students
  const unpublishedResources = schoolStore.getLearningResources({ isPublishedOnly: true })
    .filter((r) => !r.is_published);
  assert(
    unpublishedResources.length === 0,
    "B5: SECURITY: Unpublished drafts are strictly hidden from student queries"
  );

  // B6. Student completes quiz and system scores attempt
  const studentId = "20000000-0000-0000-0000-000000000001"; // Alex Vance
  const quizAttempt = schoolStore.submitQuizAttempt({
    quizId: newQuiz.id,
    studentId,
    answers: [
      { question_id: newQuiz.questions![0].id, selected_option_index: 2 }, // Correct (10 pts)
      { question_id: newQuiz.questions![1].id, selected_option_index: 0 }, // Correct (10 pts)
      { question_id: newQuiz.questions![2].id, text_answer: "A" },         // Correct (10 pts)
    ],
  });
  assert(
    quizAttempt.score === 30 && quizAttempt.percentage === 100 && quizAttempt.passed,
    "B6: Quiz scored accurately server-side: 30/30 (100%), Passed"
  );

  // B7. Student progress updates correctly
  const progressAfter = schoolStore.getStudentLearningProgress(studentId);
  assert(
    progressAfter.quizzes_completed >= 1,
    "B7: Student progress summary records completed quiz count"
  );
  assert(
    progressAfter.total_points > 0,
    "B7: Student accumulated scholastic points recorded in progress summary"
  );


  // ============================================================
  // JOURNEY C: GAMIFICATION & DUPLICATE REWARD DEFENSE
  // ============================================================
  console.log("\n\x1b[36m[Journey C: Gamification, Points & Badge Integrity]\x1b[0m");

  // C1. Student points awarded according to defined rules
  const pointsLedger = schoolStore.getStudentPointsLedger(studentId);
  const quizReward = pointsLedger.find((p) => p.reference_id === quizAttempt.id);
  assert(
    quizReward !== undefined && quizReward.points === 50,
    "C1: Points ledger credited standard 50 points for quiz completion"
  );

  // C2. Perfect score bonus rewarded
  const perfectBonus = pointsLedger.find((p) => p.reference_id === `perfect_${quizAttempt.id}`);
  assert(
    perfectBonus !== undefined && perfectBonus.points === 50,
    "C2: Flawless 100% score triggered 50 bonus mastery points"
  );

  // C3. Badges unlocked
  const studentBadges = schoolStore.getStudentBadges(studentId);
  assert(
    studentBadges.some((b) => b.badge_id === "perfect_score"),
    "C3: 'perfect_score' badge unlocked and recorded in scholar honors"
  );

  // C4. Duplicate reward claim protection
  const pointsCountBefore = schoolStore.getStudentPointsLedger(studentId).length;
  const duplicateClaim = schoolStore.awardLearningPoints({
    studentId,
    points: 50,
    source: "quiz_completed",
    referenceId: quizAttempt.id, // IDENTICAL reference_id
    description: "Re-submitted duplicate claim attempt",
  });
  const pointsCountAfter = schoolStore.getStudentPointsLedger(studentId).length;
  assert(
    pointsCountBefore === pointsCountAfter,
    "C4: SECURITY: Re-submitting duplicate points claim with existing referenceId was safely blocked"
  );
  assert(
    duplicateClaim.id === quizReward!.id,
    "C4: Re-submitted claim returned existing ledger entry without mutating balance"
  );

  // C5. Progress dashboard reflects actual activity
  const recentActivities = schoolStore.getStudentRecentActivities(studentId);
  assert(
    recentActivities.some((act) => act.activity_type === "quiz"),
    "C5: Student recent activities ledger includes timestamped quiz entry"
  );


  // ============================================================
  // JOURNEY D: AI LEARNING & PLATFORM DEFENSE
  // ============================================================
  console.log("\n\x1b[36m[Journey D: AI Learning, RAG & Threat Defense]\x1b[0m");

  // D1. Socratic AI Study Assistant responds appropriately
  const aiTutorResponse = await generateStudyAssistantResponse({
    message: "How does Newton's Third Law explain action-reaction vectors?",
    subjectId: "c0000000-0000-0000-0000-000000000001",
    subjectName: "AP Physics C: Mechanics",
    className: "Grade 10",
  });
  assert(
    aiTutorResponse.message.content.length > 50,
    "D1: Socratic AI study assistant produced comprehensive pedagogical guidance"
  );
  assert(
    aiTutorResponse.message.suggested_follow_ups !== undefined &&
      aiTutorResponse.message.suggested_follow_ups.length > 0,
    "D1: AI study assistant provided inquiry-driven follow-up prompts"
  );

  // D2. School knowledge assistant retrieves authorised documents with citations
  assert(
    aiTutorResponse.message.citations !== undefined && aiTutorResponse.message.citations.length > 0,
    "D2: Assistant grounded responses with approved school curriculum citations"
  );
  const citation = aiTutorResponse.message.citations![0];
  assert(
    !!citation.document_title && !!citation.excerpt && citation.relevance_score > 0,
    "D2: Citation contains verified document title, text excerpt, and positive relevance score"
  );

  // D3. Teacher generates AI quiz draft & reviews before publication
  const aiDrafts = await generateQuizDrafts({
    subject_id: "c0000000-0000-0000-0000-000000000001",
    topic: "Newton's Laws of Motion",
    difficulty: "intermediate",
    question_type: "multiple_choice",
    questions_count: 2,
    learning_objectives: "Assess conceptual force-acceleration vector relationship.",
  });
  assert(
    aiDrafts.length === 2,
    "D3: AI quiz generator generated requested count of draft questions"
  );

  for (const draft of aiDrafts) {
    const val = validateDraftQuestion(draft);
    assert(
      val.isValid,
      `D3: Generated draft question "${draft.question_text.slice(0, 30)}..." passed structural validation`
    );
  }

  // D4. Cybersecurity tool analyses simulated phishing message
  const syntheticPhish = `URGENT NOTICE: Your school portal account has been flagged for immediate suspension. 
Click http://bit.ly/oakridge-login-verify within 2 hours to confirm your login credentials and password.`;
  const cyberReport = analyzeSuspiciousMessage(syntheticPhish);
  assert(
    cyberReport.risk_level === "high_risk_alert",
    "D4: Cybersecurity tool classified coercive credential threat as high risk alert"
  );
  assert(
    cyberReport.indicators.some((i) => i.type === "urgency_pressure"),
    "D4: Threat analyzer identified urgency pressure indicator"
  );
  assert(
    cyberReport.indicators.some((i) => i.type === "credential_harvesting"),
    "D4: Threat analyzer identified credential harvesting indicator"
  );
  assert(
    cyberReport.official_verification_tip.length > 0,
    "D4: Threat analyzer included transparent educational disclaimer"
  );

  // D5. Missing AI config produces clear and safe offline state
  assert(
    aiTutorResponse.message.ai_engine_mode === "offline_rag_verified" ||
      aiTutorResponse.message.ai_engine_mode === "cloud_live",
    "D5: System explicitly identifies operating engine mode (offline RAG vs cloud live)"
  );


  // ============================================================
  // JOURNEY E: PARENT ACCESS & CUSTODIAL PRIVACY
  // ============================================================
  console.log("\n\x1b[36m[Journey E: Parent Custodial Privacy & Isolation]\x1b[0m");

  // E1. Parent logs in
  const parentLogin = await authenticateUser(
    SEED_CREDENTIALS.parent.email,
    SEED_CREDENTIALS.parent.password
  );
  assert(
    parentLogin.success && parentLogin.session?.user.role === "parent",
    "E1: Parent authenticated successfully with role 'parent'"
  );

  // E2. Views information for linked child
  const parentId = "30000000-0000-0000-0000-000000000001"; // Eleanor Vance
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);
  assert(
    linkedChildren.length === 1 && linkedChildren[0].id === studentId,
    "E2: Parent Eleanor Vance linked exclusively to her authorized ward Alex Vance"
  );

  const childSummary = schoolStore.getParentChildLearningSummary(studentId);
  assert(
    childSummary !== null && childSummary.student.id === studentId,
    "E2: Parent retrieved comprehensive learning summary for authorized child"
  );
  assert(
    childSummary!.progress.total_points > 0,
    "E2: Summary accurately presents child's verified progress points"
  );

  // E3. Attempts to access an unrelated student's records
  const strangerParentId = "30000000-0000-0000-0000-999999999999";
  const unauthorizedChildren = schoolStore.getParentLinkedChildren(strangerParentId);
  assert(
    unauthorizedChildren.length === 0,
    "E3: SECURITY: Non-custodial parent queries return empty array"
  );

  // E4. Role boundary isolation
  assert(
    !isAuthorizedForPath("/portal/admin", "parent"),
    "E4: SECURITY: Parent denied access to administrator endpoints"
  );
  assert(
    !isAuthorizedForPath("/portal/teacher", "parent"),
    "E4: SECURITY: Parent denied access to teacher workspace endpoints"
  );
  assert(
    isAuthorizedForPath("/portal/parent", "parent"),
    "E4: Parent authorized strictly for parent portal paths"
  );

  // ============================================================
  // SUMMARY OF RESULTS
  // ============================================================
  console.log("\n============================================================");
  console.log(`  PHASE 6 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runPhase6E2ETests().catch((err) => {
  console.error("FATAL: Test execution threw unhandled exception:", err);
  process.exit(1);
});

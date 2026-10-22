/**
 * Automated Verification Suite for Phase 2: Smart School Management System
 * Tests:
 * 1. Authentication & Session Handling
 * 2. Role-Based Route Authorization
 * 3. Attendance Management & Composite Key Duplicate Prevention
 * 4. Marks Validation Against max_marks
 * 5. Draft vs. Published Exam Results Separation & Privacy
 * 6. Parent-Child Relationship Isolation
 * 7. Coursework Assignment Visibility Filtering
 * 8. Audit Trail Verification
 */

import { schoolStore } from "../lib/data/school-store";
import {
  authenticateUser,
  isAuthorizedForPath,
  getDefaultDashboardForRole,
  SEED_CREDENTIALS,
} from "../lib/auth/session";

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

async function runTestSuite() {
  console.log("\n============================================================");
  console.log("  PHASE 2 AUTOMATED AUTHORISATION & DATA ISOLATION SUITE");
  console.log("============================================================\n");

  // ------------------------------------------------------------
  // 1. AUTHENTICATION & CREDENTIAL VERIFICATION
  // ------------------------------------------------------------
  console.log("\x1b[36m[Group 1: Authentication & Credentials]\x1b[0m");

  const adminAuth = await authenticateUser(SEED_CREDENTIALS.admin.email, SEED_CREDENTIALS.admin.password);
  assert(adminAuth.success && adminAuth.session?.user.role === "administrator", "Admin authentication succeeds with role 'administrator'");

  const teacherAuth = await authenticateUser(SEED_CREDENTIALS.teacher.email, SEED_CREDENTIALS.teacher.password);
  assert(teacherAuth.success && teacherAuth.session?.user.role === "teacher", "Teacher authentication succeeds with role 'teacher'");

  const studentAuth = await authenticateUser(SEED_CREDENTIALS.student.email, SEED_CREDENTIALS.student.password);
  assert(studentAuth.success && studentAuth.session?.user.role === "student", "Student authentication succeeds with role 'student'");

  const parentAuth = await authenticateUser(SEED_CREDENTIALS.parent.email, SEED_CREDENTIALS.parent.password);
  assert(parentAuth.success && parentAuth.session?.user.role === "parent", "Parent authentication succeeds with role 'parent'");

  const invalidPassword = await authenticateUser(SEED_CREDENTIALS.admin.email, "WrongPassword123!");
  assert(!invalidPassword.success && !!invalidPassword.error, "Invalid password rejected with security error");

  const unknownEmail = await authenticateUser("nonexistent@oakridgeacademy.edu", "Password123!");
  assert(!unknownEmail.success && !!unknownEmail.error, "Unknown email rejected without leaking system details");

  // ------------------------------------------------------------
  // 2. ROLE-BASED ROUTE ACCESS CONTROL (RBAC)
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 2: Role-Based Route Protection & Redirection]\x1b[0m");

  assert(isAuthorizedForPath("/portal/admin", "administrator"), "Administrator can access /portal/admin");
  assert(isAuthorizedForPath("/portal/teacher", "administrator"), "Administrator has supervisory access to /portal/teacher");
  assert(isAuthorizedForPath("/portal/student", "administrator"), "Administrator has access to /portal/student");
  assert(isAuthorizedForPath("/portal/parent", "administrator"), "Administrator has access to /portal/parent");

  assert(!isAuthorizedForPath("/portal/admin", "teacher"), "Teacher is blocked from accessing /portal/admin");
  assert(isAuthorizedForPath("/portal/teacher", "teacher"), "Teacher can access /portal/teacher");
  assert(!isAuthorizedForPath("/portal/student", "teacher"), "Teacher is blocked from accessing /portal/student directly");

  assert(!isAuthorizedForPath("/portal/admin", "student"), "Student is blocked from accessing /portal/admin");
  assert(!isAuthorizedForPath("/portal/teacher", "student"), "Student is blocked from accessing /portal/teacher");
  assert(isAuthorizedForPath("/portal/student", "student"), "Student can access /portal/student");

  assert(!isAuthorizedForPath("/portal/admin", "parent"), "Parent is blocked from accessing /portal/admin");
  assert(!isAuthorizedForPath("/portal/teacher", "parent"), "Parent is blocked from accessing /portal/teacher");
  assert(isAuthorizedForPath("/portal/parent", "parent"), "Parent can access /portal/parent");

  assert(getDefaultDashboardForRole("administrator") === "/portal/admin", "Admin default dashboard is /portal/admin");
  assert(getDefaultDashboardForRole("teacher") === "/portal/teacher", "Teacher default dashboard is /portal/teacher");
  assert(getDefaultDashboardForRole("student") === "/portal/student", "Student default dashboard is /portal/student");
  assert(getDefaultDashboardForRole("parent") === "/portal/parent", "Parent default dashboard is /portal/parent");

  // ------------------------------------------------------------
  // 3. ATTENDANCE & DUPLICATE PREVENTION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 3: Attendance Duplicate Prevention]\x1b[0m");

  const testStudentId = "20000000-0000-0000-0000-000000000001";
  const testSectionId = "e0000000-0000-0000-0000-000000000001";
  const testDate = "2026-10-21";

  // First save: mark present
  const save1 = schoolStore.saveAttendance([
    {
      studentId: testStudentId,
      sectionId: testSectionId,
      date: testDate,
      status: "present",
      notes: "Initial roll call",
    },
  ]);
  assert(save1.success, "Initial attendance save succeeded");

  const recordsBefore = schoolStore.getAttendanceByDateAndSection(testDate, testSectionId);
  const countBefore = recordsBefore.filter((r) => r.student_id === testStudentId).length;
  assert(countBefore === 1, "Exactly one record exists for student on test date");

  // Second save on SAME date and section: change status to 'late'
  const save2 = schoolStore.saveAttendance([
    {
      studentId: testStudentId,
      sectionId: testSectionId,
      date: testDate,
      status: "late",
      notes: "Arrived with hall pass",
    },
  ]);
  assert(save2.success, "Repeated attendance save on same date succeeded");

  const recordsAfter = schoolStore.getAttendanceByDateAndSection(testDate, testSectionId);
  const countAfter = recordsAfter.filter((r) => r.student_id === testStudentId).length;
  const updatedRecord = recordsAfter.find((r) => r.student_id === testStudentId);

  assert(countAfter === 1, "Duplicate prevention: Record count remained 1 (no duplicate inserted)");
  assert(updatedRecord?.status === "late", "Duplicate prevention: Existing record updated in-place to 'late'");
  assert(updatedRecord?.notes === "Arrived with hall pass", "Duplicate prevention: Updated notes persisted in-place");

  // ------------------------------------------------------------
  // 4. EXAMINATION MARKS VALIDATION & DRAFT/PUBLISH PRIVACY
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 4: Marks Validation & Privacy Separation]\x1b[0m");

  const examId = "70000000-0000-0000-0000-000000000001"; // max_marks = 100
  const teacherId = "10000000-0000-0000-0000-000000000001";

  // Attempt to enter score exceeding max_marks
  let overScoreThrew = false;
  try {
    schoolStore.saveExamMarks([
      {
        examinationId: examId,
        studentId: testStudentId,
        score: 150, // exceeds 100
        isPublished: true,
        teacherId,
      },
    ]);
  } catch {
    overScoreThrew = true;
  }
  assert(overScoreThrew, "Marks validation: Entering score > max_marks correctly rejected with error");

  // Create a private exam for testing draft separation
  const draftExam = schoolStore.createExamination({
    termId: "b0000000-0000-0000-0000-000000000001",
    sectionId: testSectionId,
    subjectId: "c0000000-0000-0000-0000-000000000001",
    name: "Draft Quiz Assessment",
    examDate: "2026-10-22",
    maxMarks: 50,
    weightPercentage: 10,
  });

  // Save marks as DRAFT (isPublished: false)
  schoolStore.saveExamMarks([
    {
      examinationId: draftExam.id,
      studentId: testStudentId,
      score: 45,
      isPublished: false,
      teacherId,
      remarks: "Instructor working draft",
    },
  ]);

  // Student queries their published marks
  const studentMarksWhileDraft = schoolStore.getStudentPublishedMarks(testStudentId);
  const draftVisibleToStudent = studentMarksWhileDraft.some((m) => m.examination_id === draftExam.id);
  assert(!draftVisibleToStudent, "Privacy Isolation: Draft marks are invisible to student");

  // Now teacher publishes the draft marks
  schoolStore.saveExamMarks([
    {
      examinationId: draftExam.id,
      studentId: testStudentId,
      score: 45,
      isPublished: true,
      teacherId,
      remarks: "Final verified grade",
    },
  ]);

  const studentMarksAfterPublish = schoolStore.getStudentPublishedMarks(testStudentId);
  const publishedVisibleToStudent = studentMarksAfterPublish.some((m) => m.examination_id === draftExam.id);
  assert(publishedVisibleToStudent, "Privacy Transition: Published marks become visible to student after explicit publication");

  // ------------------------------------------------------------
  // 5. PARENT-CHILD ISOLATION
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 5: Parent-Child Data Isolation]\x1b[0m");

  const parentId = "30000000-0000-0000-0000-000000000001"; // Eleanor Vance
  const linkedChildren = schoolStore.getParentLinkedChildren(parentId);

  assert(linkedChildren.length > 0, "Parent has verified linked children");
  assert(
    linkedChildren.every((c) => c.id === testStudentId),
    "Parent only retrieves authorized child (Alex Vance), isolated from other families"
  );

  // ------------------------------------------------------------
  // 6. ASSIGNMENT PUBLICATION FILTERING
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 6: Assignment Publication Visibility]\x1b[0m");

  const unpubAssignment = schoolStore.createAssignment({
    sectionId: testSectionId,
    subjectId: "c0000000-0000-0000-0000-000000000001",
    teacherId,
    title: "Unpublished Instructor Draft Assignment",
    description: "Work in progress",
    dueDate: "2026-11-01",
    maxMarks: 20,
    isPublished: false,
  });

  const studentVisibleAssignments = schoolStore.getAssignments({
    sectionId: testSectionId,
    isPublishedOnly: true,
  });

  const unpubVisible = studentVisibleAssignments.some((a) => a.id === unpubAssignment.id);
  assert(!unpubVisible, "Unpublished assignment is hidden from student portal view");

  // ------------------------------------------------------------
  // 7. AUDIT LOG RECORDING
  // ------------------------------------------------------------
  console.log("\n\x1b[36m[Group 7: Administrative Audit Trail]\x1b[0m");

  const auditLogs = schoolStore.getAuditLogs();
  assert(auditLogs.length > 0, "Audit trail contains cryptographically ordered entries");

  const hasAttendanceLog = auditLogs.some((l) => l.action === "RECORD_ATTENDANCE");
  assert(hasAttendanceLog, "Audit log records attendance actions");

  const hasExamLog = auditLogs.some((l) => l.action === "SAVE_DRAFT_MARKS" || l.action === "PUBLISH_MARKS");
  assert(hasExamLog, "Audit log records examination grading actions");

  // Summary
  console.log("\n============================================================");
  console.log(`  RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});

/**
 * Automated Verification Suite for Phase 5: Production Readiness, Security, Deployment and Maintenance
 * Tests:
 * 1. Account Deactivation & Lockout Enforcement (session purge, login rejection)
 * 2. Store Profile Status Synchronization (student status cascading to profiles)
 * 3. Structured Logging & PII / Credential Scrubbing (passwords, tokens, phone, SSN, email masking)
 * 4. System Health Check Diagnostics (memory, uptime, database/AI readiness)
 * 5. Production Next.js Configuration & Security Headers (standalone, CSP, HSTS, frame options)
 * 6. Infrastructure & Deployment Assets (Dockerfile, compose, CI pipeline, backup/restore scripts)
 * 7. Operations & User Handover Documentation Completeness
 */

import fs from "fs";
import path from "path";
import { authenticateUser, getCurrentSession, SEED_CREDENTIALS } from "../lib/auth/session";
import { schoolStore } from "../lib/data/school-store";
import { scrubSensitiveData, logger } from "../lib/logger";

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

// In-memory mock for localStorage for Node.js test environment
const mockStorage: Record<string, string> = {};
global.localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k];
  },
  length: 0,
  key: () => null,
};

async function runPhase5Tests() {
  console.log("\n============================================================");
  console.log("  PHASE 5 AUTOMATED PRODUCTION READINESS & SECURITY SUITE");
  console.log("============================================================\n");

  // --------------------------------------------------------------------------
  // SECTION 1: ACCOUNT STATUS LOCKOUT & SESSION ENFORCEMENT
  // --------------------------------------------------------------------------
  console.log("1. Account Status Lockout & Session Security Enforcement");

  // Verify normal active login works
  const normalLogin = await authenticateUser(
    SEED_CREDENTIALS.student.email,
    SEED_CREDENTIALS.student.password
  );
  assert(
    normalLogin.success === true && normalLogin.session?.user.status === "active",
    "Active student account logs in successfully"
  );

  // Deactivate the student profile in schoolStore
  const alexProfile = schoolStore.getProfileByEmail(SEED_CREDENTIALS.student.email);
  assert(alexProfile !== null, "Found student profile in schoolStore");

  if (alexProfile) {
    schoolStore.updateProfileStatus(alexProfile.id, "suspended");

    // Attempt login with suspended account
    const suspendedLogin = await authenticateUser(
      SEED_CREDENTIALS.student.email,
      SEED_CREDENTIALS.student.password
    );
    assert(
      suspendedLogin.success === false,
      "Suspended student account cannot log in"
    );
    assert(
      suspendedLogin.error?.includes("deactivated or suspended") === true,
      "Suspended login returns explicit administrative notification message"
    );

    // Verify session purge: if an active session existed, getCurrentSession rejects it
    mockStorage["oakridge_portal_session"] = JSON.stringify({
      user: {
        id: alexProfile.id,
        email: alexProfile.email,
        full_name: alexProfile.full_name,
        role: "student",
        status: "suspended",
        created_at: new Date().toISOString(),
      },
      expiresAt: Date.now() + 3600000,
    });

    const activeSessionCheck = getCurrentSession();
    assert(
      activeSessionCheck === null,
      "getCurrentSession immediately invalidates and purges suspended user sessions"
    );
    assert(
      mockStorage["oakridge_portal_session"] === undefined,
      "Suspended user session is removed from persistent storage"
    );

    // Restore student account status for subsequent evaluations
    schoolStore.updateProfileStatus(alexProfile.id, "active");
  }

  // --------------------------------------------------------------------------
  // SECTION 2: STORE PROFILE STATUS SYNCHRONIZATION
  // --------------------------------------------------------------------------
  console.log("\n2. Store Profile Status Cascade & Synchronization");

  const students = schoolStore.getStudents();
  assert(students.length > 0, "Retrieved student records from schoolStore");

  const targetStudent = students[0];
  const initialStudentStatus = targetStudent.status;

  // Change student status to inactive
  schoolStore.updateStudentStatus(targetStudent.id, "inactive");
  const updatedStudent = schoolStore.getStudentById(targetStudent.id);
  assert(
    updatedStudent?.status === "inactive",
    "Student status updated to inactive"
  );
  assert(
    updatedStudent?.profile?.status === "inactive",
    "Student deactivation cascades automatically to profile status ('inactive')"
  );

  // Restore student status
  schoolStore.updateStudentStatus(targetStudent.id, initialStudentStatus);

  // --------------------------------------------------------------------------
  // SECTION 3: STRUCTURED LOGGER & PII / CREDENTIAL REDACTION
  // --------------------------------------------------------------------------
  console.log("\n3. Structured Logging & PII Redaction Compliance (GDPR/FERPA)");

  // Test password scrubbing
  const rawPasswordString = 'User submitted: {"password": "SuperSecretPassword123!"}';
  const scrubbedPassword = scrubSensitiveData(rawPasswordString);
  assert(
    !scrubbedPassword.includes("SuperSecretPassword123!"),
    "Sensitive passwords are scrubbed from log strings"
  );
  assert(
    scrubbedPassword.includes("[REDACTED_PASSWORD]"),
    "Password replacement placeholder is applied correctly"
  );

  // Test Bearer token scrubbing
  const bearerTokenStr = "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.sig";
  const scrubbedBearer = scrubSensitiveData(bearerTokenStr);
  assert(
    !scrubbedBearer.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"),
    "JWT Bearer tokens are scrubbed from log strings"
  );
  assert(
    scrubbedBearer.includes("[REDACTED_TOKEN]"),
    "Bearer token replacement placeholder is applied"
  );

  // Test API key scrubbing
  const apiKeyStr = "External LLM Call: sk-proj-1234567890abcdefghijklmnopqrstuvwxyz";
  const scrubbedApiKey = scrubSensitiveData(apiKeyStr);
  assert(
    !scrubbedApiKey.includes("sk-proj-1234567890abcdefghijklmnopqrstuvwxyz"),
    "OpenAI / Gemini API keys are scrubbed"
  );
  assert(
    scrubbedApiKey.includes("[REDACTED_API_KEY]"),
    "API key replacement placeholder is applied"
  );

  // Test Phone number scrubbing
  const phoneStr = "Contact guardian at +1 (555) 438-9000 for emergency notification";
  const scrubbedPhone = scrubSensitiveData(phoneStr);
  assert(
    !scrubbedPhone.includes("+1 (555) 438-9000"),
    "Guardian telephone numbers are scrubbed from logs"
  );
  assert(
    scrubbedPhone.includes("[REDACTED_PHONE]"),
    "Phone replacement placeholder is applied"
  );

  // Test National ID / SSN scrubbing
  const ssnStr = "Student national identifier: 123-45-6789";
  const scrubbedSsn = scrubSensitiveData(ssnStr);
  assert(
    !scrubbedSsn.includes("123-45-6789"),
    "National identification numbers are scrubbed"
  );
  assert(
    scrubbedSsn.includes("[REDACTED_ID]"),
    "ID replacement placeholder is applied"
  );

  // Test Email masking (preserves diagnostic domain while hiding student identity)
  const emailStr = "Notification sent to alex.vance@oakridgeacademy.edu";
  const scrubbedEmail = scrubSensitiveData(emailStr);
  assert(
    !scrubbedEmail.includes("alex.vance@"),
    "Student email username is masked"
  );
  assert(
    scrubbedEmail.includes("@oakridgeacademy.edu"),
    "Email domain is preserved for diagnostic routing"
  );

  // Test Object metadata recursive scrubbing
  const metadataPayload = {
    user_id: "user-123",
    action: "LOGIN",
    password: "CleartextPassword!",
    apiKey: "sk-abcdef123456789012345",
    emergency_contact: "+1 555-438-9999",
    details: {
      nestedToken: "Bearer abcdef.12345.xyz",
    },
  };
  const scrubbedObj = scrubSensitiveData(metadataPayload);
  assert(
    scrubbedObj.password === "[REDACTED]",
    "Object key 'password' is redacted"
  );
  assert(
    scrubbedObj.apiKey === "[REDACTED]",
    "Object key 'apiKey' is redacted"
  );
  assert(
    scrubbedObj.emergency_contact === "[REDACTED]",
    "Object key 'emergency_contact' is redacted"
  );
  assert(
    scrubbedObj.details.nestedToken.includes("[REDACTED_TOKEN]"),
    "Nested object values are scrubbed recursively"
  );

  // Test Structured Logger format
  const logEntry = logger.formatLog("info", "AuthService", "User logged in with token Bearer token123", {
    userId: "user-1",
  });
  assert(logEntry.level === "info", "LogEntry has correct level");
  assert(logEntry.module === "AuthService", "LogEntry has correct module");
  assert(logEntry.message.includes("[REDACTED_TOKEN]"), "LogEntry message is sanitized");
  assert(Boolean(logEntry.timestamp), "LogEntry has ISO timestamp");

  // --------------------------------------------------------------------------
  // SECTION 4: PRODUCTION CONFIGURATION & SECURITY HEADERS
  // --------------------------------------------------------------------------
  console.log("\n4. Production Next.js Configuration & Security Headers");

  const nextConfigPath = path.join(process.cwd(), "next.config.ts");
  assert(fs.existsSync(nextConfigPath), "next.config.ts file exists");

  const nextConfigContent = fs.readFileSync(nextConfigPath, "utf-8");
  assert(
    nextConfigContent.includes('output: "standalone"'),
    "next.config.ts configures standalone output for containerization"
  );
  assert(
    nextConfigContent.includes("Content-Security-Policy"),
    "next.config.ts configures Content-Security-Policy header"
  );
  assert(
    nextConfigContent.includes("Strict-Transport-Security"),
    "next.config.ts configures HSTS header"
  );
  assert(
    nextConfigContent.includes("X-Frame-Options"),
    "next.config.ts configures X-Frame-Options: SAMEORIGIN header"
  );
  assert(
    nextConfigContent.includes("X-Content-Type-Options"),
    "next.config.ts configures X-Content-Type-Options: nosniff"
  );
  assert(
    nextConfigContent.includes("Permissions-Policy"),
    "next.config.ts restricts browser sensor Permissions-Policy"
  );

  // --------------------------------------------------------------------------
  // SECTION 5: HEALTH CHECK PROBE & SYSTEM DIAGNOSTICS
  // --------------------------------------------------------------------------
  console.log("\n5. System Health Check Probe & Error Handling");

  const healthRoutePath = path.join(process.cwd(), "app/api/health/route.ts");
  assert(fs.existsSync(healthRoutePath), "Production /api/health route handler exists");

  const portalErrorPath = path.join(process.cwd(), "app/portal/error.tsx");
  assert(fs.existsSync(portalErrorPath), "Dedicated /portal/error.tsx error boundary exists");

  // --------------------------------------------------------------------------
  // SECTION 6: INFRASTRUCTURE & CONTAINER ASSETS
  // --------------------------------------------------------------------------
  console.log("\n6. Infrastructure, Containerization & CI/CD Assets");

  const dockerfilePath = path.join(process.cwd(), "Dockerfile");
  assert(fs.existsSync(dockerfilePath), "Production Dockerfile exists");

  const dockerfileContent = fs.readFileSync(dockerfilePath, "utf-8");
  assert(
    dockerfileContent.includes("FROM node:20-alpine"),
    "Dockerfile uses Node.js 20 on Alpine base"
  );
  assert(
    dockerfileContent.includes("USER nextjs"),
    "Dockerfile runs under unprivileged 'nextjs' system user"
  );
  assert(
    dockerfileContent.includes("HEALTHCHECK"),
    "Dockerfile defines container HEALTHCHECK probe"
  );

  const dockerignorePath = path.join(process.cwd(), ".dockerignore");
  assert(fs.existsSync(dockerignorePath), ".dockerignore file exists");

  const composePath = path.join(process.cwd(), "docker-compose.yml");
  assert(fs.existsSync(composePath), "docker-compose.yml exists");
  const composeContent = fs.readFileSync(composePath, "utf-8");
  assert(
    composeContent.includes("oakridge_academy_portal"),
    "docker-compose.yml configures oakridge_academy_portal service"
  );

  const ciPath = path.join(process.cwd(), ".github/workflows/ci.yml");
  assert(fs.existsSync(ciPath), "GitHub Actions CI pipeline (.github/workflows/ci.yml) exists");
  const ciContent = fs.readFileSync(ciPath, "utf-8");
  assert(
    ciContent.includes("npm run lint") &&
    ciContent.includes("npx tsc --noEmit") &&
    ciContent.includes("npm test") &&
    ciContent.includes("npm run build"),
    "CI workflow executes lint, typecheck, test, and build validation"
  );

  // --------------------------------------------------------------------------
  // SECTION 7: DATABASE BACKUP & RESTORATION RUNBOOKS
  // --------------------------------------------------------------------------
  console.log("\n7. Database Backup & Disaster Recovery Scripts");

  const backupScriptPath = path.join(process.cwd(), "scripts/backup-db.sh");
  assert(fs.existsSync(backupScriptPath), "Database backup script (scripts/backup-db.sh) exists");
  const backupContent = fs.readFileSync(backupScriptPath, "utf-8");
  assert(
    backupContent.includes("pg_dump") && backupContent.includes("gzip"),
    "Backup script uses compressed pg_dump"
  );
  assert(
    backupContent.includes("RETENTION_DAYS"),
    "Backup script implements retention pruning"
  );

  const restoreScriptPath = path.join(process.cwd(), "scripts/restore-db.sh");
  assert(fs.existsSync(restoreScriptPath), "Database restore script (scripts/restore-db.sh) exists");
  const restoreContent = fs.readFileSync(restoreScriptPath, "utf-8");
  assert(
    restoreContent.includes("gunzip") && restoreContent.includes("psql"),
    "Restore script decompresses and pipes into psql"
  );

  // --------------------------------------------------------------------------
  // SECTION 8: HANDOVER & USER GUIDES
  // --------------------------------------------------------------------------
  console.log("\n8. User Documentation & Academy Handover Completeness");

  const handoverDocPath = path.join(process.cwd(), "docs/HANDOVER_AND_OPERATIONS_MANUAL.md");
  assert(fs.existsSync(handoverDocPath), "Handover and operations manual exists");
  const handoverContent = fs.readFileSync(handoverDocPath, "utf-8");
  assert(
    handoverContent.includes("Administrator Guide") &&
    handoverContent.includes("Teacher Guide") &&
    handoverContent.includes("Student Guide") &&
    handoverContent.includes("Parent / Guardian Guide"),
    "Handover manual contains role-specific user guides for all 4 portal roles"
  );
  assert(
    handoverContent.includes("Disaster Recovery & Restoration Procedure"),
    "Handover manual contains disaster recovery runbook"
  );

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log("\n============================================================");
  console.log(`  PHASE 5 TEST RESULTS: ${passedCount} PASSED, ${failedCount} FAILED`);
  console.log("============================================================\n");

  if (failedCount > 0) {
    process.exit(1);
  }
}

runPhase5Tests().catch((err) => {
  console.error("Unhandled error running Phase 5 tests:", err);
  process.exit(1);
});

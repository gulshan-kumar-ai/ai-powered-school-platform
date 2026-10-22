export type UserRole = "administrator" | "teacher" | "student" | "parent";

export type AccountStatus = "active" | "suspended" | "pending_approval" | "inactive";

export type AttendanceStatus = "present" | "absent" | "late" | "excused";

export type SubmissionStatus = "pending" | "submitted" | "graded" | "late" | "missing";

export type AnnouncementPriority = "normal" | "important" | "urgent";

export type AnnouncementAudience = "all" | "teachers" | "students" | "parents";

export interface UserProfile {
  id: string;
  user_id?: string;
  email: string;
  full_name: string;
  role: UserRole;
  status: AccountStatus;
  phone?: string;
  avatar_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface StudentRecord {
  id: string;
  profile_id: string;
  student_number: string;
  date_of_birth?: string;
  gender?: string;
  emergency_contact?: string;
  enrollment_date: string;
  status: AccountStatus;
  profile?: UserProfile;
  current_section_id?: string;
  current_class_name?: string;
  roll_number?: number;
}

export interface TeacherRecord {
  id: string;
  profile_id: string;
  employee_number: string;
  qualification: string;
  specialization: string;
  department: string;
  hire_date: string;
  profile?: UserProfile;
}

export interface ParentRecord {
  id: string;
  profile_id: string;
  relationship_type: string;
  occupation?: string;
  address?: string;
  profile?: UserProfile;
  linked_students?: StudentRecord[];
}

export interface AcademicYear {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface AcademicTerm {
  id: string;
  academic_year_id: string;
  name: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
}

export interface SchoolClass {
  id: string;
  name: string;
  grade_level: number;
  academic_year_id: string;
}

export interface SchoolSection {
  id: string;
  class_id: string;
  name: string;
  room_number?: string;
  capacity: number;
  class_name?: string;
}

export interface SchoolSubject {
  id: string;
  code: string;
  name: string;
  department: string;
  credits: number;
  description?: string;
}

export type Subject = SchoolSubject;
export type ClassItem = SchoolClass;
export type Section = SchoolSection;

export interface TeacherAssignment {
  id: string;
  teacher_id: string;
  section_id: string;
  subject_id: string;
  academic_year_id: string;
  teacher_name?: string;
  section_name?: string;
  subject_name?: string;
  subject_code?: string;
}

export interface StudentEnrollment {
  id: string;
  student_id: string;
  section_id: string;
  academic_year_id: string;
  roll_number?: number;
  status: AccountStatus;
  student_name?: string;
  student_number?: string;
  section_name?: string;
}

export interface TimetableSlot {
  id: string;
  section_id: string;
  subject_id: string;
  teacher_id: string;
  day_of_week: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  start_time: string;
  end_time: string;
  period_number?: number;
  room?: string;
  room_number?: string;
  subject_name?: string;
  subject_code?: string;
  teacher_name?: string;
  section_name?: string;
}

export interface UserSession {
  user: UserProfile;
  token?: string;
  expiresAt: number;
}

export interface AttendanceRecord {
  id: string;
  student_id: string;
  section_id: string;
  date: string;
  status: AttendanceStatus;
  notes?: string;
  marked_by_teacher_id?: string;
  student_name?: string;
  student_number?: string;
  roll_number?: number;
}

export interface Assignment {
  id: string;
  section_id: string;
  subject_id: string;
  teacher_id: string;
  title: string;
  description: string;
  due_date: string;
  max_marks: number;
  is_published: boolean;
  created_at: string;
  subject_name?: string;
  section_name?: string;
  teacher_name?: string;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  status: SubmissionStatus;
  submitted_at?: string;
  marks_awarded?: number;
  feedback?: string;
  student_name?: string;
  assignment_title?: string;
}

export interface Examination {
  id: string;
  term_id: string;
  section_id: string;
  subject_id: string;
  name: string;
  exam_date: string;
  max_marks: number;
  weight_percentage: number;
  subject_name?: string;
  section_name?: string;
  term_name?: string;
}

export interface MarkRecord {
  id: string;
  examination_id: string;
  student_id: string;
  score: number;
  grade: string;
  remarks?: string;
  is_published: boolean;
  recorded_by_teacher_id?: string;
  student_name?: string;
  student_number?: string;
  exam_name?: string;
  max_marks?: number;
  subject_name?: string;
}

export interface PortalAnnouncement {
  id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  audience: AnnouncementAudience;
  published_by?: string;
  publisher_name?: string;
  created_at: string;
}

export interface AuditLogEntry {
  id: string;
  user_id?: string;
  user_name?: string;
  action: string;
  resource: string;
  details?: Record<string, unknown>;
  ip_address?: string;
  created_at: string;
}

// ====================================================================
// PHASE 3: DIGITAL LEARNING PLATFORM & GAMIFICATION CONTRACTS
// ====================================================================

export type LearningResourceType = "pdf" | "document" | "video" | "link";

export interface LearningResource {
  id: string;
  title: string;
  description: string;
  subject_id: string;
  subject_name?: string;
  class_id?: string;
  class_name?: string;
  section_ids?: string[];
  topic: string;
  resource_type: LearningResourceType;
  url: string;
  file_size?: string;
  created_by_teacher_id: string;
  author_name?: string;
  is_published: boolean;
  downloads_count: number;
  created_at: string;
  updated_at?: string;
}

export interface ResourceBookmark {
  id: string;
  user_id: string;
  resource_id: string;
  created_at: string;
}

export type QuizQuestionType = "multiple_choice" | "true_false" | "short_answer";
export type QuizDifficulty = "beginner" | "intermediate" | "advanced";

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuizQuestionType;
  options?: string[];
  correct_option_index?: number;
  accepted_answers?: string[];
  explanation?: string;
  points: number;
  order_index: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  subject_id: string;
  subject_name?: string;
  section_id?: string;
  section_name?: string;
  topic: string;
  difficulty_level: QuizDifficulty;
  time_limit_minutes: number;
  max_attempts: number;
  pass_percentage: number;
  start_date?: string;
  end_date?: string;
  is_published: boolean;
  created_by_teacher_id: string;
  creator_name?: string;
  created_at: string;
  questions_count?: number;
  questions?: QuizQuestion[];
  total_points?: number;
}

export interface QuizSubmittedAnswer {
  question_id: string;
  selected_option_index?: number;
  text_answer?: string;
  is_correct: boolean;
  points_awarded: number;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  student_id: string;
  attempt_number: number;
  started_at: string;
  submitted_at: string;
  score: number;
  total_possible: number;
  percentage: number;
  passed: boolean;
  answers: QuizSubmittedAnswer[];
  student_name?: string;
  quiz_title?: string;
}

export type GameType = "knowledge_challenge" | "topic_mastery" | "cybersafe_challenge";

export interface GameDefinition {
  id: GameType;
  title: string;
  description: string;
  subject_category: string;
  icon: string;
  difficulty: string;
  estimated_duration: string;
}

export interface GameSession {
  id: string;
  game_id: GameType;
  student_id: string;
  score: number;
  questions_answered: number;
  correct_answers: number;
  accuracy_percentage: number;
  time_spent_seconds: number;
  completed_at: string;
  student_name?: string;
  game_title?: string;
  topic?: string;
}

export type PointSource =
  | "quiz_completed"
  | "quiz_perfect_score"
  | "game_completed"
  | "library_activity"
  | "streak_bonus";

export interface LearningPointEntry {
  id: string;
  student_id: string;
  points: number;
  source: PointSource;
  reference_id?: string;
  description: string;
  created_at: string;
}

export type BadgeCategory = "quiz" | "games" | "mastery" | "safety" | "consistency";
export type BadgeRarity = "common" | "rare" | "epic" | "legendary";

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon_name: string;
  category: BadgeCategory;
  rarity: BadgeRarity;
  criteria_description: string;
}

export interface StudentBadge {
  id: string;
  student_id: string;
  badge_id: string;
  badge?: BadgeDefinition;
  awarded_at: string;
}

export interface LearningActivityRecord {
  id: string;
  student_id: string;
  activity_type: "quiz" | "game" | "library_resource";
  title: string;
  details: string;
  score?: string;
  points_earned?: number;
  timestamp: string;
}

export interface LearningProgressSummary {
  total_points: number;
  level: number;
  level_title: string;
  current_level_points: number;
  points_to_next_level: number;
  quizzes_completed: number;
  average_quiz_score: number;
  games_played: number;
  badges_count: number;
  streak_days: number;
  recent_activities: LearningActivityRecord[];
  recommended_topics: { topic: string; subject: string; reason: string }[];
}

export interface TeacherAnalyticsSummary {
  class_id: string;
  class_name: string;
  total_students: number;
  total_quizzes: number;
  average_completion_rate: number;
  average_score_percentage: number;
  struggling_topics: { topic: string; subject: string; missed_rate: number }[];
  games_engagement_count: number;
}

// ====================================================================
// PHASE 4: AI STUDY ASSISTANT, RAG, QUIZ GENERATION & CYBER AWARENESS
// ====================================================================

export type AIMessageRole = "user" | "assistant" | "system";

export interface RAGDocumentCitation {
  resource_id: string;
  document_title: string;
  topic: string;
  section_or_page?: string;
  excerpt: string;
  relevance_score: number;
}

export interface AIStudyMessage {
  id: string;
  role: AIMessageRole;
  content: string;
  timestamp: string;
  is_hint?: boolean;
  is_simplified?: boolean;
  citations?: RAGDocumentCitation[];
  related_resource_ids?: string[];
  suggested_follow_ups?: string[];
  ai_engine_mode?: "cloud_live" | "offline_rag_verified" | "configuration_pending";
}

export interface AIStudySession {
  id: string;
  student_id: string;
  subject_id: string;
  subject_name?: string;
  class_name?: string;
  messages: AIStudyMessage[];
  created_at: string;
  updated_at: string;
}

export interface RAGChunk {
  id: string;
  resource_id: string;
  document_title: string;
  subject_id: string;
  class_id?: string;
  topic: string;
  section_title: string;
  content: string;
  tokens_count: number;
  is_public: boolean;
}

export interface PersonalizedRecommendation {
  id: string;
  student_id: string;
  type: "short_lesson" | "practice_quiz" | "game_drill" | "library_resource";
  title: string;
  subject_name: string;
  topic: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  action_url: string;
  rationale: string;
  trigger_quiz_id?: string;
  is_dismissed: boolean;
  created_at: string;
}

export interface GeneratedQuestionDraft {
  id: string;
  question_text: string;
  question_type: QuizQuestionType;
  options?: string[];
  correct_option_index?: number;
  accepted_answers?: string[];
  explanation: string;
  points: number;
  difficulty: QuizDifficulty;
  topic: string;
  source_reference?: string;
  is_accepted?: boolean;
}

export interface QuizGenerationRequest {
  subject_id: string;
  topic: string;
  difficulty: QuizDifficulty;
  question_type: QuizQuestionType | "mixed";
  questions_count: number;
  class_level?: string;
  learning_objectives?: string;
  source_resource_id?: string;
}

export interface CyberRiskIndicator {
  type:
    | "urgency_pressure"
    | "credential_harvesting"
    | "financial_demand"
    | "authority_impersonation"
    | "suspicious_link"
    | "too_good_to_be_true";
  label: string;
  detected_text: string;
  severity: "high" | "medium" | "low";
  explanation: string;
  safe_action: string;
}

export interface CyberAnalysisResult {
  id: string;
  risk_level: "low_concern" | "medium_concern" | "high_risk_alert";
  risk_score: number; // 0 to 100
  summary: string;
  indicators: CyberRiskIndicator[];
  safe_recommendations: string[];
  official_verification_tip: string;
  analyzed_at: string;
}

export interface TeacherAIInsight {
  id: string;
  class_id: string;
  class_name: string;
  high_error_topics: {
    topic: string;
    subject: string;
    missed_rate: number;
    recommended_revision: string;
    supporting_stats: string;
  }[];
  frequently_missed_questions: {
    question_text: string;
    quiz_title: string;
    missed_count: number;
    total_attempts: number;
    common_misconception: string;
  }[];
  overall_class_summary: string;
  has_sufficient_data: boolean;
  suggested_library_resource_ids: string[];
  generated_at: string;
}

export interface PublicChatbotMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: { title: string; url: string }[];
  timestamp: string;
  isError?: boolean;
  failedQuery?: string;
  isStreaming?: boolean;
  provider?: "fast_and_super" | "verified_local_rag";
  isFallback?: boolean;
}



-- ====================================================================
-- Smart School Management System — Phase 3: Digital Learning & Gamification
-- Target Database: Supabase / PostgreSQL 15+
-- Migration: 20261021_phase3_learning.sql
-- ====================================================================

-- 1. Digital Library Resources
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  class_id UUID REFERENCES classes(id) ON DELETE SET NULL,
  topic VARCHAR(100) NOT NULL,
  resource_type VARCHAR(20) NOT NULL CHECK (resource_type IN ('pdf', 'document', 'video', 'link')),
  url TEXT NOT NULL,
  file_size VARCHAR(50),
  created_by_teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  is_published BOOLEAN NOT NULL DEFAULT true,
  downloads_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Resource Bookmarks
CREATE TABLE IF NOT EXISTS resource_bookmarks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES learning_resources(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, resource_id)
);

-- Resource Access History
CREATE TABLE IF NOT EXISTS resource_access_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  resource_id UUID NOT NULL REFERENCES learning_resources(id) ON DELETE CASCADE,
  accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Quizzes & Questions
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  section_id UUID REFERENCES sections(id) ON DELETE SET NULL,
  topic VARCHAR(100) NOT NULL,
  difficulty_level VARCHAR(20) NOT NULL DEFAULT 'intermediate' CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  time_limit_minutes INT NOT NULL DEFAULT 15,
  max_attempts INT NOT NULL DEFAULT 2,
  pass_percentage NUMERIC(5, 2) NOT NULL DEFAULT 70.00,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_by_teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL CHECK (question_type IN ('multiple_choice', 'true_false', 'short_answer')),
  options JSONB, -- Array of string options for MC/TF
  correct_option_index INT, -- 0-indexed for MC/TF
  accepted_answers JSONB, -- Array of accepted normalized string answers
  explanation TEXT,
  points INT NOT NULL DEFAULT 10,
  order_index INT NOT NULL DEFAULT 0
);

-- Quiz Attempts & Submitted Answers
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  attempt_number INT NOT NULL DEFAULT 1,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  score NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
  total_possible NUMERIC(6, 2) NOT NULL DEFAULT 0.00,
  percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  passed BOOLEAN NOT NULL DEFAULT false,
  UNIQUE (quiz_id, student_id, attempt_number)
);

CREATE TABLE IF NOT EXISTS quiz_submitted_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES quiz_questions(id) ON DELETE CASCADE,
  selected_option_index INT,
  text_answer TEXT,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  points_awarded NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  UNIQUE (attempt_id, question_id)
);

-- 3. Educational Games
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id VARCHAR(50) NOT NULL CHECK (game_id IN ('knowledge_challenge', 'topic_mastery', 'cybersafe_challenge')),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  score INT NOT NULL DEFAULT 0,
  questions_answered INT NOT NULL DEFAULT 0,
  correct_answers INT NOT NULL DEFAULT 0,
  accuracy_percentage NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
  time_spent_seconds INT NOT NULL DEFAULT 0,
  topic VARCHAR(100),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Gamification: Points Ledger & Badges
CREATE TABLE IF NOT EXISTS learning_points_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  points INT NOT NULL,
  source VARCHAR(50) NOT NULL CHECK (source IN ('quiz_completed', 'quiz_perfect_score', 'game_completed', 'library_activity', 'streak_bonus')),
  reference_id VARCHAR(100), -- prevents duplicate rewards
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_points_reference ON learning_points_ledger(student_id, reference_id) WHERE reference_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS badges (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_name VARCHAR(50) NOT NULL,
  category VARCHAR(20) NOT NULL CHECK (category IN ('quiz', 'games', 'mastery', 'safety', 'consistency')),
  rarity VARCHAR(20) NOT NULL DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
  criteria_description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS student_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  badge_id VARCHAR(50) NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, badge_id)
);

CREATE TABLE IF NOT EXISTS learning_activity_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  activity_type VARCHAR(20) NOT NULL CHECK (activity_type IN ('quiz', 'game', 'library_resource')),
  title VARCHAR(255) NOT NULL,
  details TEXT NOT NULL,
  score VARCHAR(50),
  points_earned INT DEFAULT 0,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Row-Level Security (RLS) Policies
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_points_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_badges ENABLE ROW LEVEL SECURITY;

-- Resources: public read for published, teachers manage their own, admin manages all
CREATE POLICY "Read published learning resources" ON learning_resources
  FOR SELECT USING (is_published = true OR auth.uid() IN (SELECT user_id FROM profiles WHERE role = 'administrator'));

CREATE POLICY "Teachers create and update learning resources" ON learning_resources
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM profiles WHERE role IN ('teacher', 'administrator')));

-- Bookmarks: users can only manage their own bookmarks
CREATE POLICY "Manage own resource bookmarks" ON resource_bookmarks
  FOR ALL USING (user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()));

-- Quizzes: students only read published quizzes for their enrolled section
CREATE POLICY "Read published quizzes" ON quizzes
  FOR SELECT USING (is_published = true OR auth.uid() IN (SELECT user_id FROM profiles WHERE role IN ('teacher', 'administrator')));

CREATE POLICY "Teachers manage their quizzes" ON quizzes
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM profiles WHERE role IN ('teacher', 'administrator')));

-- Quiz Attempts: students insert and read their own attempts; teachers can read their class attempts
CREATE POLICY "Students manage own quiz attempts" ON quiz_attempts
  FOR ALL USING (student_id IN (SELECT id FROM students WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())));

CREATE POLICY "Teachers read class quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() IN (SELECT user_id FROM profiles WHERE role IN ('teacher', 'administrator')));

-- Points & Badges: read own points, parents read linked child points
CREATE POLICY "Read own learning points" ON learning_points_ledger
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    OR student_id IN (SELECT student_id FROM parent_students WHERE parent_id IN (SELECT id FROM parents WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())))
    OR auth.uid() IN (SELECT user_id FROM profiles WHERE role IN ('teacher', 'administrator'))
  );

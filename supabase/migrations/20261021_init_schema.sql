-- ====================================================================
-- Smart School Management System — PostgreSQL Schema & RLS Policies
-- Target Database: Supabase / PostgreSQL 15+
-- Migration: 20261021_init_schema.sql
-- ====================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Enumerated Types
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('administrator', 'teacher', 'student', 'parent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE account_status AS ENUM ('active', 'suspended', 'pending_approval', 'inactive');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE attendance_status AS ENUM ('present', 'absent', 'late', 'excused');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM ('pending', 'submitted', 'graded', 'late', 'missing');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE announcement_priority AS ENUM ('normal', 'important', 'urgent');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE announcement_audience AS ENUM ('all', 'teachers', 'students', 'parents');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. Core User Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE, -- References auth.users(id) in Supabase
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  status account_status NOT NULL DEFAULT 'active',
  phone VARCHAR(50),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Academic Years & Terms
CREATE TABLE IF NOT EXISTS academic_years (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE, -- e.g. "2026–2027"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_academic_year_dates CHECK (end_date > start_date)
);

CREATE TABLE IF NOT EXISTS terms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL, -- e.g. "Fall Term 2026"
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_current BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_term_dates CHECK (end_date > start_date)
);

-- 5. Classes, Sections & Subjects
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL, -- e.g. "Grade 10", "Grade 8"
  grade_level INT NOT NULL, -- 0 for K, 1..12
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (name, academic_year_id)
);

CREATE TABLE IF NOT EXISTS sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL, -- e.g. "Section A", "Section B"
  room_number VARCHAR(50),
  capacity INT NOT NULL DEFAULT 25,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (class_id, name)
);

CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) NOT NULL UNIQUE, -- e.g. "AP-PHYS-C", "MATH-ALG2"
  name VARCHAR(150) NOT NULL,
  department VARCHAR(100) NOT NULL,
  credits DECIMAL(3,1) NOT NULL DEFAULT 1.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Teachers & Teacher Assignments
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  employee_number VARCHAR(50) NOT NULL UNIQUE,
  qualification VARCHAR(255),
  specialization VARCHAR(255),
  department VARCHAR(100),
  hire_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teacher_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (teacher_id, section_id, subject_id, academic_year_id)
);

-- 7. Students & Enrollments
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  student_number VARCHAR(50) NOT NULL UNIQUE,
  date_of_birth DATE,
  gender VARCHAR(20),
  emergency_contact VARCHAR(255),
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status account_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  academic_year_id UUID NOT NULL REFERENCES academic_years(id) ON DELETE CASCADE,
  roll_number INT,
  status account_status NOT NULL DEFAULT 'active',
  enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, academic_year_id)
);

-- 8. Parents & Parent-Student Links
CREATE TABLE IF NOT EXISTS parents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  relationship_type VARCHAR(50) NOT NULL DEFAULT 'Guardian',
  occupation VARCHAR(100),
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS parent_students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_id UUID NOT NULL REFERENCES parents(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  is_primary_guardian BOOLEAN NOT NULL DEFAULT true,
  relationship VARCHAR(50) NOT NULL DEFAULT 'Parent',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (parent_id, student_id)
);

-- 9. Timetables
CREATE TABLE IF NOT EXISTS timetables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', ...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_timetable_time CHECK (end_time > start_time)
);

-- 10. Attendance Records (Prevent Duplicate records with UNIQUE constraint)
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'present',
  notes TEXT,
  marked_by_teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (student_id, section_id, date)
);

-- 11. Assignments & Submissions
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  teacher_id UUID NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL DEFAULT 100.0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  status submission_status NOT NULL DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  marks_awarded DECIMAL(5,2),
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assignment_id, student_id)
);

-- 12. Examinations & Marks
CREATE TABLE IF NOT EXISTS examinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  term_id UUID NOT NULL REFERENCES terms(id) ON DELETE CASCADE,
  section_id UUID NOT NULL REFERENCES sections(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name VARCHAR(150) NOT NULL, -- e.g. "Mid-Term Examination"
  exam_date DATE NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL DEFAULT 100.0,
  weight_percentage DECIMAL(4,1) NOT NULL DEFAULT 20.0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  examination_id UUID NOT NULL REFERENCES examinations(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  score DECIMAL(5,2) NOT NULL,
  grade VARCHAR(10),
  remarks TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  recorded_by_teacher_id UUID REFERENCES teachers(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (examination_id, student_id)
);

-- 13. Announcements
CREATE TABLE IF NOT EXISTS portal_announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  priority announcement_priority NOT NULL DEFAULT 'normal',
  audience announcement_audience NOT NULL DEFAULT 'all',
  published_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL, -- e.g. "PUBLISH_RESULTS", "UPDATE_ENROLLMENT", "MARK_ATTENDANCE"
  resource VARCHAR(100) NOT NULL,
  details JSONB,
  ip_address VARCHAR(50),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_section ON enrollments(section_id);
CREATE INDEX IF NOT EXISTS idx_teacher_assignments ON teacher_assignments(teacher_id, section_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_assignments_section ON assignments(section_id);
CREATE INDEX IF NOT EXISTS idx_marks_examination ON marks(examination_id);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(student_id);
CREATE INDEX IF NOT EXISTS idx_parent_students_parent ON parent_students(parent_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetables ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE examinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE portal_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper Function to check current user role from profiles
CREATE OR REPLACE FUNCTION current_user_role()
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- 1. Profiles Policies
CREATE POLICY "Admins full access on profiles" ON profiles
  FOR ALL USING (current_user_role() = 'administrator');

CREATE POLICY "Users read own profile" ON profiles
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users update own contact info" ON profiles
  FOR UPDATE USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid() AND role = (SELECT role FROM profiles WHERE user_id = auth.uid()));

-- 2. Student & Teacher Records
CREATE POLICY "Admins manage all student records" ON students
  FOR ALL USING (current_user_role() = 'administrator');

CREATE POLICY "Teachers view enrolled students" ON students
  FOR SELECT USING (
    current_user_role() = 'teacher' OR
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Parents view authorized children" ON students
  FOR SELECT USING (
    id IN (
      SELECT ps.student_id FROM parent_students ps
      JOIN parents p ON p.id = ps.parent_id
      JOIN profiles pr ON pr.id = p.profile_id
      WHERE pr.user_id = auth.uid()
    )
  );

-- 3. Attendance Policies
CREATE POLICY "Admins manage attendance" ON attendance
  FOR ALL USING (current_user_role() = 'administrator');

CREATE POLICY "Teachers mark attendance for assigned sections" ON attendance
  FOR ALL USING (
    section_id IN (
      SELECT ta.section_id FROM teacher_assignments ta
      JOIN teachers t ON t.id = ta.teacher_id
      JOIN profiles p ON p.id = t.profile_id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Students view own attendance" ON attendance
  FOR SELECT USING (
    student_id IN (
      SELECT s.id FROM students s
      JOIN profiles p ON p.id = s.profile_id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents view child attendance" ON attendance
  FOR SELECT USING (
    student_id IN (
      SELECT ps.student_id FROM parent_students ps
      JOIN parents p ON p.id = ps.parent_id
      JOIN profiles pr ON pr.id = p.profile_id
      WHERE pr.user_id = auth.uid()
    )
  );

-- 4. Marks and Results Policies
CREATE POLICY "Admins manage marks" ON marks
  FOR ALL USING (current_user_role() = 'administrator');

CREATE POLICY "Teachers manage marks for assigned sections" ON marks
  FOR ALL USING (
    examination_id IN (
      SELECT e.id FROM examinations e
      JOIN teacher_assignments ta ON ta.section_id = e.section_id AND ta.subject_id = e.subject_id
      JOIN teachers t ON t.id = ta.teacher_id
      JOIN profiles p ON p.id = t.profile_id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Students view only published marks" ON marks
  FOR SELECT USING (
    is_published = true AND
    student_id IN (
      SELECT s.id FROM students s
      JOIN profiles p ON p.id = s.profile_id
      WHERE p.user_id = auth.uid()
    )
  );

CREATE POLICY "Parents view child published marks" ON marks
  FOR SELECT USING (
    is_published = true AND
    student_id IN (
      SELECT ps.student_id FROM parent_students ps
      JOIN parents p ON p.id = ps.parent_id
      JOIN profiles pr ON pr.id = p.profile_id
      WHERE pr.user_id = auth.uid()
    )
  );

-- 5. Audit Logs Policy (Append-only for security)
CREATE POLICY "Admins read audit logs" ON audit_logs
  FOR SELECT USING (current_user_role() = 'administrator');

CREATE POLICY "System insert audit logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

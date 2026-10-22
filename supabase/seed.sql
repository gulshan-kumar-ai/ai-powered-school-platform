-- ====================================================================
-- Smart School Management System — Fictional Seed Data
-- Database: Supabase / PostgreSQL
-- File: supabase/seed.sql
-- ====================================================================

-- 1. Seed Academic Year & Term
INSERT INTO academic_years (id, name, start_date, end_date, is_current)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', '2026–2027 Academic Year', '2026-09-01', '2027-06-25', true)
ON CONFLICT (name) DO NOTHING;

INSERT INTO terms (id, academic_year_id, name, start_date, end_date, is_current)
VALUES 
  ('b0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Fall Term 2026', '2026-09-01', '2026-12-18', true)
ON CONFLICT DO NOTHING;

-- 2. Seed Subjects
INSERT INTO subjects (id, code, name, department, credits)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'AP-PHYS-C', 'AP Physics C: Mechanics', 'Science & Engineering', 1.0),
  ('c0000000-0000-0000-0000-000000000002', 'AP-CALC-BC', 'AP Calculus BC', 'Mathematics', 1.0),
  ('c0000000-0000-0000-0000-000000000003', 'ENG-LIT-10', 'World Literature & Rhetoric', 'Humanities', 1.0),
  ('c0000000-0000-0000-0000-000000000004', 'ROBOTICS-1', 'Robotics & Embedded Systems', 'STEM & Technology', 0.5)
ON CONFLICT (code) DO NOTHING;

-- 3. Seed Classes & Sections
INSERT INTO classes (id, name, grade_level, academic_year_id)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Grade 10 Senior Preparatory', 10, 'a0000000-0000-0000-0000-000000000001'),
  ('d0000000-0000-0000-0000-000000000002', 'Grade 8 Middle Discovery', 8, 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

INSERT INTO sections (id, class_id, name, room_number, capacity)
VALUES
  ('e0000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'Section 10-A', 'Lab Science Pavilion 204', 24),
  ('e0000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'Section 8-B', 'Discovery Commons 108', 22)
ON CONFLICT DO NOTHING;

-- 4. Seed Profiles
-- Administrator: Dr. Evelyn Montgomery
INSERT INTO profiles (id, email, full_name, role, status, phone)
VALUES
  ('f0000000-0000-0000-0000-000000000001', 'admin@oakridgeacademy.edu', 'Dr. Evelyn Montgomery', 'administrator', 'active', '+1 (555) 438-9200')
ON CONFLICT (email) DO NOTHING;

-- Teacher: Dr. Marcus Chen
INSERT INTO profiles (id, email, full_name, role, status, phone)
VALUES
  ('f0000000-0000-0000-0000-000000000002', 'm.chen@oakridgeacademy.edu', 'Dr. Marcus Chen', 'teacher', 'active', '+1 (555) 438-9214')
ON CONFLICT (email) DO NOTHING;

-- Student: Alex Vance
INSERT INTO profiles (id, email, full_name, role, status, phone)
VALUES
  ('f0000000-0000-0000-0000-000000000003', 'student.alex@oakridgeacademy.edu', 'Alex Vance', 'student', 'active', '+1 (555) 438-9842')
ON CONFLICT (email) DO NOTHING;

-- Parent: Eleanor Vance
INSERT INTO profiles (id, email, full_name, role, status, phone)
VALUES
  ('f0000000-0000-0000-0000-000000000004', 'parent.vance@oakridgeacademy.edu', 'Eleanor Vance', 'parent', 'active', '+1 (555) 438-7711')
ON CONFLICT (email) DO NOTHING;

-- 5. Seed Roles Details
INSERT INTO teachers (id, profile_id, employee_number, qualification, specialization, department)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000002', 'FAC-2016-042', 'Ph.D. Robotics, CMU', 'Physics & Robotics', 'Science & Engineering')
ON CONFLICT (profile_id) DO NOTHING;

INSERT INTO teacher_assignments (id, teacher_id, section_id, subject_id, academic_year_id)
VALUES
  ('11000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

INSERT INTO students (id, profile_id, student_number, date_of_birth, gender, emergency_contact)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000003', 'STU-2024-1089', '2010-04-12', 'Non-Binary', 'Eleanor Vance (+1 555-438-7711)')
ON CONFLICT (profile_id) DO NOTHING;

INSERT INTO enrollments (id, student_id, section_id, academic_year_id, roll_number, status)
VALUES
  ('21000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 14, 'active')
ON CONFLICT (student_id, academic_year_id) DO NOTHING;

INSERT INTO parents (id, profile_id, relationship_type, occupation, address)
VALUES
  ('30000000-0000-0000-0000-000000000001', 'f0000000-0000-0000-0000-000000000004', 'Mother', 'Biomedical Scientist', '42 Beacon Hill Rd, Boston, MA')
ON CONFLICT (profile_id) DO NOTHING;

INSERT INTO parent_students (id, parent_id, student_id, is_primary_guardian, relationship)
VALUES
  ('31000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', true, 'Mother')
ON CONFLICT (parent_id, student_id) DO NOTHING;

-- 6. Seed Timetable
INSERT INTO timetables (id, section_id, subject_id, teacher_id, day_of_week, start_time, end_time, room)
VALUES
  ('40000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Monday', '08:30:00', '09:45:00', 'Science 204'),
  ('40000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000002', '10000000-0000-0000-0000-000000000001', 'Monday', '10:00:00', '11:15:00', 'Math Wing 102')
ON CONFLICT DO NOTHING;

-- 7. Seed Attendance Record
INSERT INTO attendance (id, student_id, section_id, date, status, notes, marked_by_teacher_id)
VALUES
  ('50000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', CURRENT_DATE, 'present', 'On time and engaged in lab experiment.', '10000000-0000-0000-0000-000000000001')
ON CONFLICT (student_id, section_id, date) DO NOTHING;

-- 8. Seed Assignment & Submission
INSERT INTO assignments (id, section_id, subject_id, teacher_id, title, description, due_date, max_marks, is_published)
VALUES
  ('60000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', '10000000-0000-0000-0000-000000000001', 'Newtonian Gravitational Dynamics & Orbital Mechanics', 'Complete problem sets 4.1 through 4.12 including derivation of Kepler third law.', NOW() + INTERVAL '5 days', 100.0, true)
ON CONFLICT DO NOTHING;

-- 9. Seed Examination & Published Mark
INSERT INTO examinations (id, term_id, section_id, subject_id, name, exam_date, max_marks, weight_percentage)
VALUES
  ('70000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000001', 'Fall Mid-Term Physics Assessment', '2026-10-18', 100.0, 25.0)
ON CONFLICT DO NOTHING;

INSERT INTO marks (id, examination_id, student_id, score, grade, remarks, is_published, recorded_by_teacher_id)
VALUES
  ('71000000-0000-0000-0000-000000000001', '70000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 94.5, 'A', 'Superb analytical rigor demonstrated on rotational mechanics questions.', true, '10000000-0000-0000-0000-000000000001')
ON CONFLICT (examination_id, student_id) DO NOTHING;

-- 10. Seed Announcements
INSERT INTO portal_announcements (id, title, content, priority, audience, published_by)
VALUES
  ('80000000-0000-0000-0000-000000000001', 'Fall Term Examination Schedules Published', 'The examination schedule for all secondary division subjects is now active on the portal.', 'important', 'all', 'f0000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

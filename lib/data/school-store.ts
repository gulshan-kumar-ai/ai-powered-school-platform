import {
  UserProfile,
  StudentRecord,
  TeacherRecord,
  ParentRecord,
  AcademicYear,
  AcademicTerm,
  SchoolClass,
  SchoolSection,
  SchoolSubject,
  TeacherAssignment,
  TimetableSlot,
  AttendanceRecord,
  Assignment,
  Examination,
  MarkRecord,
  PortalAnnouncement,
  AuditLogEntry,
  AttendanceStatus,
  LearningResource,
  ResourceBookmark,
  Quiz,
  QuizQuestion,
  QuizAttempt,
  QuizSubmittedAnswer,
  GameDefinition,
  GameSession,
  GameType,
  LearningPointEntry,
  PointSource,
  BadgeDefinition,
  StudentBadge,
  LearningActivityRecord,
  LearningProgressSummary,
  TeacherAnalyticsSummary,
} from "@/types/portal";

// ====================================================================
// INITIAL REPRODUCIBLE DATA SEED
// ====================================================================

const INITIAL_ACADEMIC_YEARS: AcademicYear[] = [
  {
    id: "a0000000-0000-0000-0000-000000000001",
    name: "2026–2027 Academic Year",
    start_date: "2026-09-01",
    end_date: "2027-06-25",
    is_current: true,
  },
];

const INITIAL_TERMS: AcademicTerm[] = [
  {
    id: "b0000000-0000-0000-0000-000000000001",
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
    name: "Fall Term 2026",
    start_date: "2026-09-01",
    end_date: "2026-12-18",
    is_current: true,
  },
  {
    id: "b0000000-0000-0000-0000-000000000002",
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
    name: "Spring Term 2027",
    start_date: "2027-01-10",
    end_date: "2027-06-20",
    is_current: false,
  },
];

const INITIAL_CLASSES: SchoolClass[] = [
  {
    id: "d0000000-0000-0000-0000-000000000001",
    name: "Grade 10 Senior Preparatory",
    grade_level: 10,
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
  },
  {
    id: "d0000000-0000-0000-0000-000000000002",
    name: "Grade 8 Middle Discovery",
    grade_level: 8,
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
  },
  {
    id: "d0000000-0000-0000-0000-000000000003",
    name: "Grade 5 Primary Division",
    grade_level: 5,
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
  },
];

const INITIAL_SECTIONS: SchoolSection[] = [
  {
    id: "e0000000-0000-0000-0000-000000000001",
    class_id: "d0000000-0000-0000-0000-000000000001",
    name: "Section 10-A",
    room_number: "Lab Science Pavilion 204",
    capacity: 24,
    class_name: "Grade 10 Senior Preparatory",
  },
  {
    id: "e0000000-0000-0000-0000-000000000002",
    class_id: "d0000000-0000-0000-0000-000000000002",
    name: "Section 8-B",
    room_number: "Discovery Commons 108",
    capacity: 22,
    class_name: "Grade 8 Middle Discovery",
  },
];

const INITIAL_SUBJECTS: SchoolSubject[] = [
  {
    id: "c0000000-0000-0000-0000-000000000001",
    code: "AP-PHYS-C",
    name: "AP Physics C: Mechanics",
    department: "Science & Engineering",
    credits: 1.0,
  },
  {
    id: "c0000000-0000-0000-0000-000000000002",
    code: "AP-CALC-BC",
    name: "AP Calculus BC",
    department: "Mathematics",
    credits: 1.0,
  },
  {
    id: "c0000000-0000-0000-0000-000000000003",
    code: "ENG-LIT-10",
    name: "World Literature & Rhetoric",
    department: "Humanities",
    credits: 1.0,
  },
  {
    id: "c0000000-0000-0000-0000-000000000004",
    code: "ROBOTICS-1",
    name: "Robotics & Embedded Systems",
    department: "STEM & Technology",
    credits: 0.5,
  },
];

const INITIAL_PROFILES: UserProfile[] = [
  {
    id: "f0000000-0000-0000-0000-000000000001",
    email: "admin@oakridgeacademy.edu",
    full_name: "Dr. Evelyn Montgomery",
    role: "administrator",
    status: "active",
    phone: "+1 (555) 438-9200",
    created_at: "2026-08-01T08:00:00Z",
  },
  {
    id: "f0000000-0000-0000-0000-000000000002",
    email: "m.chen@oakridgeacademy.edu",
    full_name: "Dr. Marcus Chen",
    role: "teacher",
    status: "active",
    phone: "+1 (555) 438-9214",
    created_at: "2026-08-05T08:00:00Z",
  },
  {
    id: "f0000000-0000-0000-0000-000000000003",
    email: "student.alex@oakridgeacademy.edu",
    full_name: "Alex Vance",
    role: "student",
    status: "active",
    phone: "+1 (555) 438-9842",
    created_at: "2026-08-20T08:00:00Z",
  },
  {
    id: "f0000000-0000-0000-0000-000000000004",
    email: "parent.vance@oakridgeacademy.edu",
    full_name: "Eleanor Vance",
    role: "parent",
    status: "active",
    phone: "+1 (555) 438-7711",
    created_at: "2026-08-22T08:00:00Z",
  },
  {
    id: "f0000000-0000-0000-0000-000000000005",
    email: "student.maya@oakridgeacademy.edu",
    full_name: "Maya Patel",
    role: "student",
    status: "active",
    phone: "+1 (555) 438-9843",
    created_at: "2026-08-21T08:00:00Z",
  },
  {
    id: "f0000000-0000-0000-0000-000000000006",
    email: "student.julian@oakridgeacademy.edu",
    full_name: "Julian Morales",
    role: "student",
    status: "active",
    phone: "+1 (555) 438-9844",
    created_at: "2026-08-21T08:00:00Z",
  },
];

const INITIAL_TEACHERS: TeacherRecord[] = [
  {
    id: "10000000-0000-0000-0000-000000000001",
    profile_id: "f0000000-0000-0000-0000-000000000002",
    employee_number: "FAC-2016-042",
    qualification: "Ph.D. in Robotics, Carnegie Mellon",
    specialization: "Physics & Autonomous Robotics",
    department: "Science & Engineering",
    hire_date: "2016-08-15",
  },
];

const INITIAL_TEACHER_ASSIGNMENTS: TeacherAssignment[] = [
  {
    id: "11000000-0000-0000-0000-000000000001",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
    teacher_name: "Dr. Marcus Chen",
    section_name: "Section 10-A",
    subject_name: "AP Physics C: Mechanics",
    subject_code: "AP-PHYS-C",
  },
  {
    id: "11000000-0000-0000-0000-000000000002",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    academic_year_id: "a0000000-0000-0000-0000-000000000001",
    teacher_name: "Dr. Marcus Chen",
    section_name: "Section 10-A",
    subject_name: "Robotics & Embedded Systems",
    subject_code: "ROBOTICS-1",
  },
];

const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    profile_id: "f0000000-0000-0000-0000-000000000003",
    student_number: "STU-2024-1089",
    date_of_birth: "2010-04-12",
    gender: "Non-Binary",
    emergency_contact: "Eleanor Vance (+1 555-438-7711)",
    enrollment_date: "2024-09-01",
    status: "active",
    current_section_id: "e0000000-0000-0000-0000-000000000001",
    current_class_name: "Grade 10 Senior Preparatory - Section 10-A",
    roll_number: 14,
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    profile_id: "f0000000-0000-0000-0000-000000000005",
    student_number: "STU-2024-1090",
    date_of_birth: "2010-07-24",
    gender: "Female",
    emergency_contact: "Rajesh Patel (+1 555-438-7712)",
    enrollment_date: "2024-09-01",
    status: "active",
    current_section_id: "e0000000-0000-0000-0000-000000000001",
    current_class_name: "Grade 10 Senior Preparatory - Section 10-A",
    roll_number: 15,
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    profile_id: "f0000000-0000-0000-0000-000000000006",
    student_number: "STU-2024-1091",
    date_of_birth: "2010-11-03",
    gender: "Male",
    emergency_contact: "Carlos Morales (+1 555-438-7713)",
    enrollment_date: "2024-09-01",
    status: "active",
    current_section_id: "e0000000-0000-0000-0000-000000000001",
    current_class_name: "Grade 10 Senior Preparatory - Section 10-A",
    roll_number: 16,
  },
];

const INITIAL_PARENTS: ParentRecord[] = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    profile_id: "f0000000-0000-0000-0000-000000000004",
    relationship_type: "Mother",
    occupation: "Biomedical Scientist",
    address: "42 Beacon Hill Rd, Boston, MA",
  },
];

const INITIAL_TIMETABLE: TimetableSlot[] = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    day_of_week: "Monday",
    start_time: "08:30 AM",
    end_time: "09:45 AM",
    room: "Science Pavilion 204",
    subject_name: "AP Physics C: Mechanics",
    subject_code: "AP-PHYS-C",
    teacher_name: "Dr. Marcus Chen",
    section_name: "Section 10-A",
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000002",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    day_of_week: "Monday",
    start_time: "10:00 AM",
    end_time: "11:15 AM",
    room: "Mathematics Hall 102",
    subject_name: "AP Calculus BC",
    subject_code: "AP-CALC-BC",
    teacher_name: "Dr. Marcus Chen",
    section_name: "Section 10-A",
  },
  {
    id: "40000000-0000-0000-0000-000000000003",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000003",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    day_of_week: "Tuesday",
    start_time: "09:00 AM",
    end_time: "10:15 AM",
    room: "Humanities Wing 301",
    subject_name: "World Literature & Rhetoric",
    subject_code: "ENG-LIT-10",
    teacher_name: "Arthur Pendelton",
    section_name: "Section 10-A",
  },
  {
    id: "40000000-0000-0000-0000-000000000004",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    day_of_week: "Wednesday",
    start_time: "01:30 PM",
    end_time: "03:00 PM",
    room: "Robotics Arena Lab",
    subject_name: "Robotics & Embedded Systems",
    subject_code: "ROBOTICS-1",
    teacher_name: "Dr. Marcus Chen",
    section_name: "Section 10-A",
  },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: "50000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    date: "2026-10-20",
    status: "present",
    notes: "Active engagement in laboratory session.",
    student_name: "Alex Vance",
    student_number: "STU-2024-1089",
    roll_number: 14,
  },
  {
    id: "50000000-0000-0000-0000-000000000002",
    student_id: "20000000-0000-0000-0000-000000000002",
    section_id: "e0000000-0000-0000-0000-000000000001",
    date: "2026-10-20",
    status: "present",
    notes: "Participated in seminar defense.",
    student_name: "Maya Patel",
    student_number: "STU-2024-1090",
    roll_number: 15,
  },
  {
    id: "50000000-0000-0000-0000-000000000003",
    student_id: "20000000-0000-0000-0000-000000000003",
    section_id: "e0000000-0000-0000-0000-000000000001",
    date: "2026-10-20",
    status: "late",
    notes: "Arrived 10 mins late with bus transit notice.",
    student_name: "Julian Morales",
    student_number: "STU-2024-1091",
    roll_number: 16,
  },
];

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: "60000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    title: "Newtonian Gravitational Dynamics & Orbital Mechanics",
    description: "Complete Problem Set 4: Derive Kepler's Third Law and calculate geosynchronous satellite orbital parameters.",
    due_date: "2026-10-26T23:59:00Z",
    max_marks: 100,
    is_published: true,
    created_at: "2026-10-18T10:00:00Z",
    subject_name: "AP Physics C: Mechanics",
    section_name: "Section 10-A",
    teacher_name: "Dr. Marcus Chen",
  },
  {
    id: "60000000-0000-0000-0000-000000000002",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    teacher_id: "10000000-0000-0000-0000-000000000001",
    title: "PID Controller Calibration & Sensor Integration Lab",
    description: "Tune proportional, integral, and derivative gain parameters on the two-wheel inverted pendulum robotics chassis.",
    due_date: "2026-10-30T23:59:00Z",
    max_marks: 50,
    is_published: true,
    created_at: "2026-10-19T14:30:00Z",
    subject_name: "Robotics & Embedded Systems",
    section_name: "Section 10-A",
    teacher_name: "Dr. Marcus Chen",
  },
];

const INITIAL_EXAMINATIONS: Examination[] = [
  {
    id: "70000000-0000-0000-0000-000000000001",
    term_id: "b0000000-0000-0000-0000-000000000001",
    section_id: "e0000000-0000-0000-0000-000000000001",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    name: "Fall Mid-Term Physics Assessment",
    exam_date: "2026-10-15",
    max_marks: 100,
    weight_percentage: 25,
    subject_name: "AP Physics C: Mechanics",
    section_name: "Section 10-A",
    term_name: "Fall Term 2026",
  },
];

const INITIAL_MARKS: MarkRecord[] = [
  {
    id: "71000000-0000-0000-0000-000000000001",
    examination_id: "70000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000001",
    score: 94.5,
    grade: "A",
    remarks: "Superb analytical rigor demonstrated on rotational mechanics derivations.",
    is_published: true,
    recorded_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    student_name: "Alex Vance",
    student_number: "STU-2024-1089",
    exam_name: "Fall Mid-Term Physics Assessment",
    max_marks: 100,
    subject_name: "AP Physics C: Mechanics",
  },
  {
    id: "71000000-0000-0000-0000-000000000002",
    examination_id: "70000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000002",
    score: 98.0,
    grade: "A+",
    remarks: "Exemplary solution elegance and zero calculation errors.",
    is_published: true,
    recorded_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    student_name: "Maya Patel",
    student_number: "STU-2024-1090",
    exam_name: "Fall Mid-Term Physics Assessment",
    max_marks: 100,
    subject_name: "AP Physics C: Mechanics",
  },
  {
    id: "71000000-0000-0000-0000-000000000003",
    examination_id: "70000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000003",
    score: 87.5,
    grade: "B+",
    remarks: "Solid theoretical understanding; review moment-of-inertia integration.",
    is_published: true,
    recorded_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    student_name: "Julian Morales",
    student_number: "STU-2024-1091",
    exam_name: "Fall Mid-Term Physics Assessment",
    max_marks: 100,
    subject_name: "AP Physics C: Mechanics",
  },
];

const INITIAL_ANNOUNCEMENTS: PortalAnnouncement[] = [
  {
    id: "80000000-0000-0000-0000-000000000001",
    title: "Fall Term Mid-Semester Examination Rosters Published",
    content: "The complete examination schedule and classroom seat allocations for all secondary division courses have been published to the portal.",
    priority: "important",
    audience: "all",
    publisher_name: "Dr. Evelyn Montgomery, Head of School",
    created_at: "2026-10-18T09:00:00Z",
  },
  {
    id: "80000000-0000-0000-0000-000000000002",
    title: "Parent-Advisor Conference Bookings Open",
    content: "Advisory meetings will take place next Wednesday. Parents can review student progress indicators prior to the session.",
    priority: "normal",
    audience: "parents",
    publisher_name: "Dean of Students Office",
    created_at: "2026-10-19T11:30:00Z",
  },
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "90000000-0000-0000-0000-000000000001",
    user_name: "Dr. Marcus Chen",
    action: "PUBLISH_RESULTS",
    resource: "Examinations / AP Physics C",
    details: { exam_id: "70000000-0000-0000-0000-000000000001", student_count: 3 },
    created_at: "2026-10-18T16:45:00Z",
  },
  {
    id: "90000000-0000-0000-0000-000000000002",
    user_name: "Dr. Marcus Chen",
    action: "RECORD_ATTENDANCE",
    resource: "Section 10-A / 2026-10-20",
    details: { present: 2, late: 1, absent: 0 },
    created_at: "2026-10-20T08:45:00Z",
  },
];

// --- PHASE 3 SEED DATA ---
const INITIAL_LEARNING_RESOURCES: LearningResource[] = [
  {
    id: "r0000000-0000-0000-0000-000000000001",
    title: "AP Physics C: Classical Mechanics Comprehensive Guide",
    description: "Complete analytical course manual covering Newton's laws, rotational dynamics, work-energy theorem, and harmonic oscillations with solved derivation proofs.",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    subject_name: "AP Physics C: Mechanics",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Newtonian Mechanics & Kinematics",
    resource_type: "pdf",
    url: "https://oakridgeacademy.edu/library/ap-physics-c-mechanics-guide.pdf",
    file_size: "4.8 MB",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: true,
    downloads_count: 42,
    created_at: "2026-09-10T10:00:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000002",
    title: "AP Calculus BC: Advanced Integration & Series Handbook",
    description: "In-depth review of integration by parts, partial fractions, improper integrals, Taylor polynomials, and infinite series convergence tests.",
    subject_id: "c0000000-0000-0000-0000-000000000002",
    subject_name: "AP Calculus BC",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Integral Calculus & Series",
    resource_type: "pdf",
    url: "https://oakridgeacademy.edu/library/ap-calculus-bc-series-handbook.pdf",
    file_size: "3.2 MB",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: true,
    downloads_count: 38,
    created_at: "2026-09-12T14:30:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000003",
    title: "Robotics & Microcontrollers: Sensor Interfacing Video Masterclass",
    description: "Demonstration of I2C/SPI sensor communications, PWM motor actuation, and PID control loops on embedded ARM Cortex hardware.",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    subject_name: "Robotics & Embedded Systems",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Embedded Systems Architecture",
    resource_type: "video",
    url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    file_size: "24 mins",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: true,
    downloads_count: 56,
    created_at: "2026-09-18T09:15:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000004",
    title: "World Literature: Rhetoric Analysis & Critical Essay Writing",
    description: "Guidance on thesis formulation, synthesizing textual evidence, and rhetorical argumentation across contemporary world literature.",
    subject_id: "c0000000-0000-0000-0000-000000000003",
    subject_name: "World Literature & Rhetoric",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Rhetorical Criticism",
    resource_type: "document",
    url: "https://oakridgeacademy.edu/library/world-literature-rhetoric-guide.docx",
    file_size: "1.1 MB",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: true,
    downloads_count: 29,
    created_at: "2026-09-22T11:00:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000005",
    title: "Cyber Defense Principles: Phishing Detection & Safe Online Practices",
    description: "Educational lab manual exploring digital signature verification, multi-factor authentication, email header inspection, and credential safety.",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    subject_name: "Robotics & Embedded Systems",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Cybersecurity & Digital Hygiene",
    resource_type: "link",
    url: "https://csrc.nist.gov/publications/detail/sp/800-63/3/final",
    file_size: "Online Resource",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: true,
    downloads_count: 67,
    created_at: "2026-09-25T15:45:00Z",
  },
  {
    id: "r0000000-0000-0000-0000-000000000006",
    title: "Draft Experimental Laboratory Protocol (Unpublished)",
    description: "Upcoming lab exercise on harmonic pendulum damping and numerical simulation.",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    subject_name: "AP Physics C: Mechanics",
    class_id: "d0000000-0000-0000-0000-000000000001",
    class_name: "Grade 10 Senior Preparatory",
    section_ids: ["e0000000-0000-0000-0000-000000000001"],
    topic: "Harmonic Oscillations",
    resource_type: "document",
    url: "https://oakridgeacademy.edu/library/draft-lab-protocol.pdf",
    file_size: "820 KB",
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    author_name: "Dr. Marcus Chen",
    is_published: false,
    downloads_count: 0,
    created_at: "2026-10-15T12:00:00Z",
  },
];

const INITIAL_BOOKMARKS: ResourceBookmark[] = [
  {
    id: "bm000000-0000-0000-0000-000000000001",
    user_id: "20000000-0000-0000-0000-000000000001", // Alex Vance
    resource_id: "r0000000-0000-0000-0000-000000000001",
    created_at: "2026-10-18T10:00:00Z",
  },
  {
    id: "bm000000-0000-0000-0000-000000000002",
    user_id: "20000000-0000-0000-0000-000000000001",
    resource_id: "r0000000-0000-0000-0000-000000000003",
    created_at: "2026-10-19T11:00:00Z",
  },
];

const INITIAL_QUIZZES: Quiz[] = [
  {
    id: "q0000000-0000-0000-0000-000000000001",
    title: "Newton's Laws & Dynamics Mastery Quiz",
    description: "Assessment on Newton's first, second, and third laws of motion, friction force coefficients, and equilibrium condition vectors.",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    subject_name: "AP Physics C: Mechanics",
    section_id: "e0000000-0000-0000-0000-000000000001",
    section_name: "Section 10-A",
    topic: "Newton's Laws of Motion",
    difficulty_level: "intermediate",
    time_limit_minutes: 15,
    max_attempts: 2,
    pass_percentage: 70,
    start_date: "2026-10-01T00:00:00Z",
    end_date: "2026-12-15T23:59:59Z",
    is_published: true,
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    creator_name: "Dr. Marcus Chen",
    created_at: "2026-10-01T10:00:00Z",
    total_points: 40,
  },
  {
    id: "q0000000-0000-0000-0000-000000000002",
    title: "Foundations of Cyber Safety & Digital Literacy",
    description: "Interactive assessment evaluating ability to identify phishing hooks, password hygiene practices, and safe browsing protocols.",
    subject_id: "c0000000-0000-0000-0000-000000000004",
    subject_name: "Robotics & Embedded Systems",
    section_id: "e0000000-0000-0000-0000-000000000001",
    section_name: "Section 10-A",
    topic: "Cybersecurity & Digital Hygiene",
    difficulty_level: "beginner",
    time_limit_minutes: 10,
    max_attempts: 3,
    pass_percentage: 75,
    start_date: "2026-10-05T00:00:00Z",
    end_date: "2026-12-20T23:59:59Z",
    is_published: true,
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    creator_name: "Dr. Marcus Chen",
    created_at: "2026-10-05T11:00:00Z",
    total_points: 30,
  },
  {
    id: "q0000000-0000-0000-0000-000000000003",
    title: "Thermodynamics & Heat Transfer (Teacher Draft)",
    description: "Unpublished assessment in draft mode for testing privacy isolation.",
    subject_id: "c0000000-0000-0000-0000-000000000001",
    subject_name: "AP Physics C: Mechanics",
    section_id: "e0000000-0000-0000-0000-000000000001",
    section_name: "Section 10-A",
    topic: "Thermodynamics",
    difficulty_level: "advanced",
    time_limit_minutes: 20,
    max_attempts: 1,
    pass_percentage: 80,
    is_published: false,
    created_by_teacher_id: "10000000-0000-0000-0000-000000000001",
    creator_name: "Dr. Marcus Chen",
    created_at: "2026-10-18T14:00:00Z",
    total_points: 20,
  },
];

const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Quiz 1 Questions
  {
    id: "qq000000-0000-0000-0000-000000000001",
    quiz_id: "q0000000-0000-0000-0000-000000000001",
    question_text: "According to Newton's Second Law, what happens to the acceleration of an object if the net external force is doubled while mass remains constant?",
    question_type: "multiple_choice",
    options: [
      "The acceleration is halved",
      "The acceleration remains unchanged",
      "The acceleration doubles",
      "The acceleration quadruples",
    ],
    correct_option_index: 2,
    explanation: "F = ma. Since force and acceleration are directly proportional for a constant mass, doubling force doubles the acceleration.",
    points: 10,
    order_index: 1,
  },
  {
    id: "qq000000-0000-0000-0000-000000000002",
    quiz_id: "q0000000-0000-0000-0000-000000000001",
    question_text: "True or False: Action and reaction forces described in Newton's Third Law act on the same single body and cancel each other out.",
    question_type: "true_false",
    options: ["True", "False"],
    correct_option_index: 1,
    explanation: "False. Newton's Third Law action-reaction pairs act on two distinctly different bodies, so they never cancel each other on a single body.",
    points: 10,
    order_index: 2,
  },
  {
    id: "qq000000-0000-0000-0000-000000000003",
    quiz_id: "q0000000-0000-0000-0000-000000000001",
    question_text: "What SI unit is used to measure force? (Type the single word name)",
    question_type: "short_answer",
    accepted_answers: ["newton", "newtons", "n"],
    explanation: "The SI derived unit of force is the Newton (symbol: N), defined as 1 kg·m/s².",
    points: 10,
    order_index: 3,
  },
  {
    id: "qq000000-0000-0000-0000-000000000004",
    quiz_id: "q0000000-0000-0000-0000-000000000001",
    question_text: "A 5 kg block rests on a horizontal friction-free surface. What horizontal force is required to accelerate it at 3 m/s²?",
    question_type: "multiple_choice",
    options: ["1.67 N", "8 N", "15 N", "25 N"],
    correct_option_index: 2,
    explanation: "F = ma = 5 kg * 3 m/s² = 15 N.",
    points: 10,
    order_index: 4,
  },

  // Quiz 2 Questions (Cyber Safety)
  {
    id: "qq000000-0000-0000-0000-000000000005",
    quiz_id: "q0000000-0000-0000-0000-000000000002",
    question_text: "You receive an urgent email from 'support@school-verify-account.tk' claiming your school account will be deleted in 2 hours unless you click a link and re-enter your password. What is the safest course of action?",
    question_type: "multiple_choice",
    options: [
      "Click the link immediately to prevent account deletion",
      "Forward the email to all classmates to warn them",
      "Do not click any link; report the phishing message to the school IT department",
      "Reply with a fake password to test the sender",
    ],
    correct_option_index: 2,
    explanation: "Legitimate institutions do not threaten sudden deletion via suspicious domains. Never click links or enter credentials from unverified senders.",
    points: 10,
    order_index: 1,
  },
  {
    id: "qq000000-0000-0000-0000-000000000006",
    quiz_id: "q0000000-0000-0000-0000-000000000002",
    question_text: "True or False: Enabling Multi-Factor Authentication (MFA) protects your account even if an attacker discovers your password.",
    question_type: "true_false",
    options: ["True", "False"],
    correct_option_index: 0,
    explanation: "True. MFA requires a secondary physical factor or authenticator code, stopping unauthorized logins even if the password is compromised.",
    points: 10,
    order_index: 2,
  },
  {
    id: "qq000000-0000-0000-0000-000000000007",
    quiz_id: "q0000000-0000-0000-0000-000000000002",
    question_text: "What protocol adds cryptographic SSL/TLS encryption to web traffic, signified by the padlock icon in the browser address bar? (Provide acronym)",
    question_type: "short_answer",
    accepted_answers: ["https", "tls", "ssl/tls"],
    explanation: "HTTPS (Hypertext Transfer Protocol Secure) encrypts communication between the browser and web server.",
    points: 10,
    order_index: 3,
  },

  // Quiz 3 Questions (Thermodynamics Draft)
  {
    id: "qq000000-0000-0000-0000-000000000008",
    quiz_id: "q0000000-0000-0000-0000-000000000003",
    question_text: "Which law of thermodynamics states that entropy of an isolated system always increases over time?",
    question_type: "multiple_choice",
    options: ["Zeroth Law", "First Law", "Second Law", "Third Law"],
    correct_option_index: 2,
    explanation: "The Second Law of Thermodynamics dictates that total entropy in an isolated system can never decrease over time.",
    points: 20,
    order_index: 1,
  },
];

const INITIAL_GAME_DEFINITIONS: GameDefinition[] = [
  {
    id: "knowledge_challenge",
    title: "Knowledge Challenge Sprint",
    description: "Rapid-fire timed challenge spanning Physics, Mathematics, Literature, and General Science. Rack up multipliers with consecutive correct answers!",
    subject_category: "Cross-Disciplinary STEM & Humanities",
    icon: "Zap",
    difficulty: "Adaptive (Novice to Expert)",
    estimated_duration: "3 - 5 minutes",
  },
  {
    id: "topic_mastery",
    title: "Topic Mastery Laboratory",
    description: "Step-by-step conceptual mastery across selected curriculum modules with on-demand hints, diagnostic explanations, and personalized revision cues.",
    subject_category: "Curricular Deep-Dive",
    icon: "Target",
    difficulty: "Progressive Tiering",
    estimated_duration: "5 - 8 minutes",
  },
  {
    id: "cybersafe_challenge",
    title: "CyberSafe Threat Analyzer",
    description: "Inspect simulated suspicious emails, fake scholarship grants, phishing portals, and credential requests. Spot the red flags and protect the school network!",
    subject_category: "Cybersecurity & Digital Literacy",
    icon: "ShieldAlert",
    difficulty: "Interactive Scenario Simulation",
    estimated_duration: "4 - 6 minutes",
  },
];

const INITIAL_BADGES: BadgeDefinition[] = [
  {
    id: "first_quiz",
    name: "First Quiz Completed",
    description: "Completed your first interactive online quiz on the learning platform.",
    icon_name: "GraduationCap",
    category: "quiz",
    rarity: "common",
    criteria_description: "Submit any published quiz attempt.",
  },
  {
    id: "perfect_score",
    name: "Perfect Score Laureate",
    description: "Achieved a flawless 100% score on a completed assessment.",
    icon_name: "Award",
    category: "quiz",
    rarity: "rare",
    criteria_description: "Score 100% on any eligible quiz.",
  },
  {
    id: "five_quizzes",
    name: "Five Quizzes Completed",
    description: "Demonstrated consistent revision by completing 5 unique quiz attempts.",
    icon_name: "CheckCircle2",
    category: "quiz",
    rarity: "epic",
    criteria_description: "Complete 5 or more quiz assessments.",
  },
  {
    id: "cybersafe_champion",
    name: "Cyber Safety Champion",
    description: "Achieved >= 80% accuracy in the CyberSafe Threat Analyzer game.",
    icon_name: "ShieldCheck",
    category: "safety",
    rarity: "rare",
    criteria_description: "Score 80% or higher in the CyberSafe Challenge.",
  },
  {
    id: "math_explorer",
    name: "Mathematics Explorer",
    description: "Excelled in mathematical problem solving and calculus revisions.",
    icon_name: "Sparkles",
    category: "mastery",
    rarity: "common",
    criteria_description: "Successfully complete a mathematics quiz or challenge.",
  },
  {
    id: "consistent_learner",
    name: "Consistent Learner",
    description: "Demonstrated daily learning momentum across 3 or more activities.",
    icon_name: "Flame",
    category: "consistency",
    rarity: "rare",
    criteria_description: "Maintain an active multi-day learning streak.",
  },
  {
    id: "topic_master",
    name: "Topic Master",
    description: "Attained >= 90% mastery accuracy in a single topic drill.",
    icon_name: "Target",
    category: "mastery",
    rarity: "legendary",
    criteria_description: "Score 90% or higher in the Topic Mastery Challenge.",
  },
];

const INITIAL_POINTS: LearningPointEntry[] = [
  {
    id: "lp000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000001",
    points: 50,
    source: "quiz_completed",
    reference_id: "qa000000-0000-0000-0000-000000000001",
    description: "Completed Newton's Laws & Dynamics Mastery Quiz",
    created_at: "2026-10-18T11:30:00Z",
  },
  {
    id: "lp000000-0000-0000-0000-000000000002",
    student_id: "20000000-0000-0000-0000-000000000001",
    points: 50,
    source: "game_completed",
    reference_id: "gs000000-0000-0000-0000-000000000001",
    description: "Completed Knowledge Challenge Sprint with High Score",
    created_at: "2026-10-19T14:15:00Z",
  },
  {
    id: "lp000000-0000-0000-0000-000000000003",
    student_id: "20000000-0000-0000-0000-000000000001",
    points: 10,
    source: "library_activity",
    reference_id: "r0000000-0000-0000-0000-000000000001",
    description: "Study review of AP Physics C Comprehensive Guide",
    created_at: "2026-10-20T09:00:00Z",
  },
];

const INITIAL_STUDENT_BADGES: StudentBadge[] = [
  {
    id: "sb000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000001",
    badge_id: "first_quiz",
    awarded_at: "2026-10-18T11:30:00Z",
  },
  {
    id: "sb000000-0000-0000-0000-000000000002",
    student_id: "20000000-0000-0000-0000-000000000001",
    badge_id: "consistent_learner",
    awarded_at: "2026-10-20T09:00:00Z",
  },
];

const INITIAL_ACTIVITIES: LearningActivityRecord[] = [
  {
    id: "la000000-0000-0000-0000-000000000001",
    student_id: "20000000-0000-0000-0000-000000000001",
    activity_type: "quiz",
    title: "Newton's Laws & Dynamics Mastery Quiz",
    details: "Completed attempt with score 40/40 (100%)",
    score: "100%",
    points_earned: 100,
    timestamp: "2026-10-18T11:30:00Z",
  },
  {
    id: "la000000-0000-0000-0000-000000000002",
    student_id: "20000000-0000-0000-0000-000000000001",
    activity_type: "game",
    title: "Knowledge Challenge Sprint",
    details: "Scored 120 points with 90% accuracy",
    score: "90%",
    points_earned: 50,
    timestamp: "2026-10-19T14:15:00Z",
  },
];

// ====================================================================
// PERSISTENT IN-MEMORY / LOCAL STORAGE DATA SERVICE
// ====================================================================

class SchoolDataStore {
  private academicYears: AcademicYear[] = [...INITIAL_ACADEMIC_YEARS];
  private terms: AcademicTerm[] = [...INITIAL_TERMS];
  private classes: SchoolClass[] = [...INITIAL_CLASSES];
  private sections: SchoolSection[] = [...INITIAL_SECTIONS];
  private subjects: SchoolSubject[] = [...INITIAL_SUBJECTS];
  private profiles: UserProfile[] = [...INITIAL_PROFILES];
  private teachers: TeacherRecord[] = [...INITIAL_TEACHERS];
  private teacherAssignments: TeacherAssignment[] = [...INITIAL_TEACHER_ASSIGNMENTS];
  private students: StudentRecord[] = [...INITIAL_STUDENTS];
  private parents: ParentRecord[] = [...INITIAL_PARENTS];
  private timetables: TimetableSlot[] = [...INITIAL_TIMETABLE];
  private attendance: AttendanceRecord[] = [...INITIAL_ATTENDANCE];
  private assignments: Assignment[] = [...INITIAL_ASSIGNMENTS];
  private examinations: Examination[] = [...INITIAL_EXAMINATIONS];
  private marks: MarkRecord[] = [...INITIAL_MARKS];
  private announcements: PortalAnnouncement[] = [...INITIAL_ANNOUNCEMENTS];
  private auditLogs: AuditLogEntry[] = [...INITIAL_AUDIT_LOGS];

  // Phase 3 Data Collections
  private resources: LearningResource[] = [...INITIAL_LEARNING_RESOURCES];
  private bookmarks: ResourceBookmark[] = [...INITIAL_BOOKMARKS];
  private recentAccesses: { user_id: string; resource_id: string; accessed_at: string }[] = [];
  private quizzes: Quiz[] = [...INITIAL_QUIZZES];
  private quizQuestions: QuizQuestion[] = [...INITIAL_QUIZ_QUESTIONS];
  private quizAttempts: QuizAttempt[] = [];
  private gameSessions: GameSession[] = [];
  private learningPoints: LearningPointEntry[] = [...INITIAL_POINTS];
  private badges: BadgeDefinition[] = [...INITIAL_BADGES];
  private studentBadges: StudentBadge[] = [...INITIAL_STUDENT_BADGES];
  private learningActivities: LearningActivityRecord[] = [...INITIAL_ACTIVITIES];

  // --- OVERVIEW STATS FOR ADMIN ---
  public getAdminStats() {
    const totalStudents = this.students.length;
    const totalTeachers = this.teachers.length;
    const totalClasses = this.classes.length;
    const totalSections = this.sections.length;

    const todayAttendance = this.attendance.filter(
      (a) => a.date === "2026-10-20" || a.date === new Date().toISOString().split("T")[0]
    );

    const presentCount = todayAttendance.filter((a) => a.status === "present" || a.status === "late").length;
    const attendanceRate = todayAttendance.length > 0
      ? Math.round((presentCount / todayAttendance.length) * 100)
      : 96;

    return {
      totalStudents,
      totalTeachers,
      totalClasses,
      totalSections,
      attendanceRate,
      activeTerm: this.terms.find((t) => t.is_current)?.name || "Fall Term 2026",
      announcementsCount: this.announcements.length,
      recentAnnouncements: this.announcements.slice(0, 3),
      upcomingExams: this.examinations.slice(0, 3),
    };
  }

  // --- STUDENTS MANAGEMENT ---
  public getStudents(): StudentRecord[] {
    return this.students.map((student) => {
      const profile = this.profiles.find((p) => p.id === student.profile_id);
      return {
        ...student,
        profile,
      };
    });
  }

  public getStudentById(studentId: string): StudentRecord | null {
    const s = this.students.find((item) => item.id === studentId);
    if (!s) return null;
    return {
      ...s,
      profile: this.profiles.find((p) => p.id === s.profile_id),
    };
  }

  public addStudent(data: {
    fullName: string;
    email: string;
    studentNumber: string;
    sectionId: string;
    dateOfBirth?: string;
    gender?: string;
    emergencyContact?: string;
  }): StudentRecord {
    const profileId = `f0000000-0000-0000-0000-${String(this.profiles.length + 1).padStart(12, "0")}`;
    const studentId = `20000000-0000-0000-0000-${String(this.students.length + 1).padStart(12, "0")}`;

    const newProfile: UserProfile = {
      id: profileId,
      email: data.email,
      full_name: data.fullName,
      role: "student",
      status: "active",
      created_at: new Date().toISOString(),
    };
    this.profiles.push(newProfile);

    const section = this.sections.find((sec) => sec.id === data.sectionId);

    const newStudent: StudentRecord = {
      id: studentId,
      profile_id: profileId,
      student_number: data.studentNumber,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      emergency_contact: data.emergencyContact,
      enrollment_date: new Date().toISOString().split("T")[0],
      status: "active",
      current_section_id: data.sectionId,
      current_class_name: section ? `${section.class_name} - ${section.name}` : undefined,
      roll_number: this.students.length + 1,
      profile: newProfile,
    };
    this.students.push(newStudent);

    this.logAudit({
      action: "ENROLL_STUDENT",
      resource: `Student: ${data.fullName} (${data.studentNumber})`,
      details: { student_id: studentId, section_id: data.sectionId },
    });

    return newStudent;
  }

  public updateStudentStatus(studentId: string, status: StudentRecord["status"]) {
    const student = this.students.find((s) => s.id === studentId);
    if (student) {
      student.status = status;
      const profile = this.profiles.find((p) => p.id === student.profile_id);
      if (profile) {
        profile.status = status === "active" ? "active" : "inactive";
      }
      this.logAudit({
        action: "UPDATE_STUDENT_STATUS",
        resource: `Student ID: ${studentId}`,
        details: { new_status: status },
      });
    }
  }

  public getProfiles(): UserProfile[] {
    return this.profiles;
  }

  public getProfileByEmail(email: string): UserProfile | null {
    return this.profiles.find((p) => p.email.toLowerCase() === email.toLowerCase()) || null;
  }

  public updateProfileStatus(profileId: string, status: UserProfile["status"]) {
    const profile = this.profiles.find((p) => p.id === profileId);
    if (profile) {
      profile.status = status;
      const student = this.students.find((s) => s.profile_id === profileId);
      if (student) {
        student.status = status === "active" ? "active" : "suspended";
      }
      this.logAudit({
        action: "UPDATE_PROFILE_STATUS",
        resource: `Profile: ${profile.full_name} (${profileId})`,
        details: { new_status: status },
      });
    }
  }

  public updateStudentEmergencyContact(studentId: string, emergencyContact: string) {
    const student = this.students.find((s) => s.id === studentId);
    if (student) {
      student.emergency_contact = emergencyContact;
    }
  }


  // --- TEACHERS MANAGEMENT ---
  public getTeachers(): TeacherRecord[] {
    return this.teachers.map((t) => ({
      ...t,
      profile: this.profiles.find((p) => p.id === t.profile_id),
    }));
  }

  public addTeacher(data: {
    fullName: string;
    email: string;
    employeeNumber: string;
    qualification: string;
    specialization: string;
    department: string;
  }): TeacherRecord {
    const profileId = `f0000000-0000-0000-0000-${String(this.profiles.length + 1).padStart(12, "0")}`;
    const teacherId = `10000000-0000-0000-0000-${String(this.teachers.length + 1).padStart(12, "0")}`;

    const newProfile: UserProfile = {
      id: profileId,
      email: data.email,
      full_name: data.fullName,
      role: "teacher",
      status: "active",
      created_at: new Date().toISOString(),
    };
    this.profiles.push(newProfile);

    const newTeacher: TeacherRecord = {
      id: teacherId,
      profile_id: profileId,
      employee_number: data.employeeNumber,
      qualification: data.qualification,
      specialization: data.specialization,
      department: data.department,
      hire_date: new Date().toISOString().split("T")[0],
      profile: newProfile,
    };
    this.teachers.push(newTeacher);

    this.logAudit({
      action: "HIRE_TEACHER",
      resource: `Teacher: ${data.fullName} (${data.employeeNumber})`,
      details: { teacher_id: teacherId },
    });

    return newTeacher;
  }

  public getTeacherAssignments(teacherId?: string): TeacherAssignment[] {
    if (!teacherId) return this.teacherAssignments;
    return this.teacherAssignments.filter((ta) => ta.teacher_id === teacherId);
  }

  public assignTeacherToClass(data: {
    teacherId: string;
    sectionId: string;
    subjectId: string;
  }): TeacherAssignment {
    const id = `11000000-0000-0000-0000-${String(this.teacherAssignments.length + 1).padStart(12, "0")}`;
    const teacher = this.teachers.find((t) => t.id === data.teacherId);
    const teacherProfile = teacher ? this.profiles.find((p) => p.id === teacher.profile_id) : null;
    const section = this.sections.find((s) => s.id === data.sectionId);
    const subject = this.subjects.find((s) => s.id === data.subjectId);

    const assignment: TeacherAssignment = {
      id,
      teacher_id: data.teacherId,
      section_id: data.sectionId,
      subject_id: data.subjectId,
      academic_year_id: "a0000000-0000-0000-0000-000000000001",
      teacher_name: teacherProfile?.full_name,
      section_name: section?.name,
      subject_name: subject?.name,
      subject_code: subject?.code,
    };
    this.teacherAssignments.push(assignment);

    this.logAudit({
      action: "ASSIGN_TEACHER",
      resource: `${teacherProfile?.full_name} -> ${section?.name} (${subject?.code})`,
      details: data,
    });

    return assignment;
  }

  // --- ACADEMICS STRUCTURE ---
  public getClasses(): SchoolClass[] {
    return this.classes;
  }

  public createClass(data: {
    name: string;
    gradeLevel: number;
    academicYearId?: string;
  }): SchoolClass {
    const id = `d0000000-0000-0000-0000-${String(this.classes.length + 1).padStart(12, "0")}`;
    const newClass: SchoolClass = {
      id,
      name: data.name.trim(),
      grade_level: data.gradeLevel,
      academic_year_id: data.academicYearId || this.academicYears[0]?.id || "a0000000-0000-0000-0000-000000000001",
    };
    this.classes.push(newClass);

    this.logAudit({
      action: "CREATE_CLASS",
      resource: `${data.name} (Grade ${data.gradeLevel})`,
      details: { class_id: id, grade_level: data.gradeLevel },
    });

    return newClass;
  }

  public getSections(): SchoolSection[] {
    return this.sections;
  }

  public createSection(data: {
    classId: string;
    name: string;
    roomNumber?: string;
    capacity?: number;
  }): SchoolSection {
    const id = `e0000000-0000-0000-0000-${String(this.sections.length + 1).padStart(12, "0")}`;
    const parentClass = this.classes.find((c) => c.id === data.classId);
    const newSection: SchoolSection = {
      id,
      class_id: data.classId,
      name: data.name.trim(),
      room_number: data.roomNumber || "Main Campus Hall",
      capacity: data.capacity || 25,
      class_name: parentClass?.name,
    };
    this.sections.push(newSection);

    this.logAudit({
      action: "CREATE_SECTION",
      resource: `${newSection.name} (${parentClass?.name || "Cohort"})`,
      details: { section_id: id, class_id: data.classId },
    });

    return newSection;
  }

  public getSubjects(): SchoolSubject[] {
    return this.subjects;
  }

  public createSubject(data: {
    code: string;
    name: string;
    department: string;
    credits: number;
    description?: string;
  }): SchoolSubject {
    const id = `c0000000-0000-0000-0000-${String(this.subjects.length + 1).padStart(12, "0")}`;
    const newSubject: SchoolSubject = {
      id,
      code: data.code.toUpperCase().trim(),
      name: data.name.trim(),
      department: data.department.trim(),
      credits: data.credits,
      description: data.description,
    };
    this.subjects.push(newSubject);

    this.logAudit({
      action: "CREATE_SUBJECT",
      resource: `${newSubject.code} — ${newSubject.name}`,
      details: { subject_id: id, department: data.department, credits: data.credits },
    });

    return newSubject;
  }

  public getAcademicYears(): AcademicYear[] {
    return this.academicYears;
  }

  public getTerms(): AcademicTerm[] {
    return this.terms;
  }

  // --- ATTENDANCE MANAGEMENT (With Duplicate Prevention) ---
  public getSectionStudents(sectionId: string): StudentRecord[] {
    return this.students
      .filter((s) => s.current_section_id === sectionId)
      .map((s) => ({
        ...s,
        profile: this.profiles.find((p) => p.id === s.profile_id),
      }));
  }

  public getAttendanceByDateAndSection(date: string, sectionId: string): AttendanceRecord[] {
    return this.attendance.filter((a) => a.date === date && a.section_id === sectionId);
  }

  public saveAttendance(records: {
    studentId: string;
    sectionId: string;
    date: string;
    status: AttendanceStatus;
    notes?: string;
    markedByTeacherId?: string;
  }[]): { success: boolean; savedCount: number; message: string } {
    let saved = 0;

    for (const record of records) {
      const student = this.students.find((s) => s.id === record.studentId);
      const studentProfile = student ? this.profiles.find((p) => p.id === student.profile_id) : null;

      // Duplicate prevention: find existing record for student + section + date
      const existingIdx = this.attendance.findIndex(
        (a) =>
          a.student_id === record.studentId &&
          a.section_id === record.sectionId &&
          a.date === record.date
      );

      if (existingIdx !== -1) {
        // Update existing record
        this.attendance[existingIdx] = {
          ...this.attendance[existingIdx],
          status: record.status,
          notes: record.notes,
          marked_by_teacher_id: record.markedByTeacherId,
        };
      } else {
        // Insert new record
        const id = `50000000-0000-0000-0000-${String(this.attendance.length + 1).padStart(12, "0")}`;
        this.attendance.push({
          id,
          student_id: record.studentId,
          section_id: record.sectionId,
          date: record.date,
          status: record.status,
          notes: record.notes,
          marked_by_teacher_id: record.markedByTeacherId,
          student_name: studentProfile?.full_name,
          student_number: student?.student_number,
          roll_number: student?.roll_number,
        });
      }
      saved++;
    }

    if (records.length > 0) {
      this.logAudit({
        action: "RECORD_ATTENDANCE",
        resource: `Section: ${records[0].sectionId} on ${records[0].date}`,
        details: { count: records.length },
      });
    }

    return {
      success: true,
      savedCount: saved,
      message: `Successfully recorded attendance for ${saved} students.`,
    };
  }

  // --- ASSIGNMENTS MANAGEMENT ---
  public getAssignments(options?: { sectionId?: string; isPublishedOnly?: boolean }): Assignment[] {
    let list = this.assignments;
    if (options?.sectionId) {
      list = list.filter((a) => a.section_id === options.sectionId);
    }
    if (options?.isPublishedOnly) {
      list = list.filter((a) => a.is_published);
    }
    return list;
  }

  public createAssignment(data: {
    sectionId: string;
    subjectId: string;
    teacherId: string;
    title: string;
    description: string;
    dueDate: string;
    maxMarks: number;
    isPublished: boolean;
  }): Assignment {
    const id = `60000000-0000-0000-0000-${String(this.assignments.length + 1).padStart(12, "0")}`;
    const subject = this.subjects.find((s) => s.id === data.subjectId);
    const section = this.sections.find((s) => s.id === data.sectionId);

    const assignment: Assignment = {
      id,
      section_id: data.sectionId,
      subject_id: data.subjectId,
      teacher_id: data.teacherId,
      title: data.title,
      description: data.description,
      due_date: data.dueDate,
      max_marks: data.maxMarks,
      is_published: data.isPublished,
      created_at: new Date().toISOString(),
      subject_name: subject?.name,
      section_name: section?.name,
      teacher_name: "Dr. Marcus Chen",
    };
    this.assignments.push(assignment);

    this.logAudit({
      action: "CREATE_ASSIGNMENT",
      resource: data.title,
      details: { assignment_id: id, max_marks: data.maxMarks },
    });

    return assignment;
  }

  // --- EXAMINATIONS & MARKS ---
  public getExaminations(sectionId?: string): Examination[] {
    if (!sectionId) return this.examinations;
    return this.examinations.filter((e) => e.section_id === sectionId);
  }

  public createExamination(data: {
    termId: string;
    sectionId: string;
    subjectId: string;
    name: string;
    examDate: string;
    maxMarks: number;
    weightPercentage: number;
  }): Examination {
    const id = `70000000-0000-0000-0000-${String(this.examinations.length + 1).padStart(12, "0")}`;
    const subject = this.subjects.find((s) => s.id === data.subjectId);
    const section = this.sections.find((s) => s.id === data.sectionId);
    const term = this.terms.find((t) => t.id === data.termId);

    const exam: Examination = {
      id,
      term_id: data.termId,
      section_id: data.sectionId,
      subject_id: data.subjectId,
      name: data.name,
      exam_date: data.examDate,
      max_marks: data.maxMarks,
      weight_percentage: data.weightPercentage,
      subject_name: subject?.name,
      section_name: section?.name,
      term_name: term?.name,
    };
    this.examinations.push(exam);

    this.logAudit({
      action: "SCHEDULE_EXAMINATION",
      resource: data.name,
      details: { exam_id: id, max_marks: data.maxMarks },
    });

    return exam;
  }

  public getMarksForExam(examId: string): MarkRecord[] {
    return this.marks.filter((m) => m.examination_id === examId);
  }

  public saveExamMarks(records: {
    examinationId: string;
    studentId: string;
    score: number;
    remarks?: string;
    isPublished: boolean;
    teacherId: string;
  }[]): { success: boolean; message: string } {
    for (const record of records) {
      const exam = this.examinations.find((e) => e.id === record.examinationId);
      if (exam && record.score > exam.max_marks) {
        throw new Error(`Score (${record.score}) exceeds maximum marks (${exam.max_marks})`);
      }

      const student = this.students.find((s) => s.id === record.studentId);
      const studentProfile = student ? this.profiles.find((p) => p.id === student.profile_id) : null;

      // Grade calculation
      const percentage = exam ? (record.score / exam.max_marks) * 100 : 0;
      let grade = "F";
      if (percentage >= 93) grade = "A";
      else if (percentage >= 90) grade = "A-";
      else if (percentage >= 87) grade = "B+";
      else if (percentage >= 83) grade = "B";
      else if (percentage >= 80) grade = "B-";
      else if (percentage >= 70) grade = "C";
      else if (percentage >= 60) grade = "D";

      const existingIdx = this.marks.findIndex(
        (m) => m.examination_id === record.examinationId && m.student_id === record.studentId
      );

      if (existingIdx !== -1) {
        this.marks[existingIdx] = {
          ...this.marks[existingIdx],
          score: record.score,
          grade,
          remarks: record.remarks,
          is_published: record.isPublished,
          recorded_by_teacher_id: record.teacherId,
        };
      } else {
        const id = `71000000-0000-0000-0000-${String(this.marks.length + 1).padStart(12, "0")}`;
        this.marks.push({
          id,
          examination_id: record.examinationId,
          student_id: record.studentId,
          score: record.score,
          grade,
          remarks: record.remarks,
          is_published: record.isPublished,
          recorded_by_teacher_id: record.teacherId,
          student_name: studentProfile?.full_name,
          student_number: student?.student_number,
          exam_name: exam?.name,
          max_marks: exam?.max_marks,
          subject_name: exam?.subject_name,
        });
      }
    }

    this.logAudit({
      action: records[0]?.isPublished ? "PUBLISH_MARKS" : "SAVE_DRAFT_MARKS",
      resource: `Exam ID: ${records[0]?.examinationId}`,
      details: { count: records.length, published: records[0]?.isPublished },
    });

    return {
      success: true,
      message: records[0]?.isPublished
        ? "Marks published successfully. Students and parents can now view approved grades."
        : "Draft marks saved successfully. Marks remain private to instructors.",
    };
  }

  // --- STUDENT & PARENT SPECIFIC DATA ---
  public getStudentTimetable(sectionId: string): TimetableSlot[] {
    return this.timetables.filter((t) => t.section_id === sectionId);
  }

  public getStudentAttendance(studentId: string): {
    records: AttendanceRecord[];
    summary: { total: number; present: number; absent: number; late: number; rate: number };
  } {
    const list = this.attendance.filter((a) => a.student_id === studentId);
    const total = list.length;
    const present = list.filter((a) => a.status === "present").length;
    const absent = list.filter((a) => a.status === "absent").length;
    const late = list.filter((a) => a.status === "late").length;
    const rate = total > 0 ? Math.round(((present + late) / total) * 100) : 100;

    return {
      records: list,
      summary: { total, present, absent, late, rate },
    };
  }

  public getStudentPublishedMarks(studentId: string): MarkRecord[] {
    return this.marks.filter((m) => m.student_id === studentId && m.is_published);
  }

  public getParentLinkedChildren(parentId?: string): StudentRecord[] {
    // In our verified seed data, parent Eleanor Vance (30000000-0000-0000-0000-000000000001) is linked exclusively to Alex Vance
    if (parentId && parentId !== "30000000-0000-0000-0000-000000000001") {
      return [];
    }
    return this.students
      .filter((s) => s.id === "20000000-0000-0000-0000-000000000001")
      .map((s) => ({
        ...s,
        profile: this.profiles.find((p) => p.id === s.profile_id),
      }));
  }

  // --- ANNOUNCEMENTS ---
  public getAnnouncements(audience?: string): PortalAnnouncement[] {
    if (!audience || audience === "all") return this.announcements;
    return this.announcements.filter((a) => a.audience === "all" || a.audience === audience);
  }

  public createAnnouncement(data: {
    title: string;
    content: string;
    priority: PortalAnnouncement["priority"];
    audience: PortalAnnouncement["audience"];
    publisherName?: string;
  }): PortalAnnouncement {
    const id = `80000000-0000-0000-0000-${String(this.announcements.length + 1).padStart(12, "0")}`;
    const announcement: PortalAnnouncement = {
      id,
      title: data.title,
      content: data.content,
      priority: data.priority,
      audience: data.audience,
      publisher_name: data.publisherName || "School Administration",
      created_at: new Date().toISOString(),
    };
    this.announcements.unshift(announcement);

    this.logAudit({
      action: "BROADCAST_ANNOUNCEMENT",
      resource: data.title,
      details: { audience: data.audience, priority: data.priority },
    });

    return announcement;
  }

  // --- AUDIT LOGS ---
  public getAuditLogs(): AuditLogEntry[] {
    return this.auditLogs;
  }

  public logAudit(data: { action: string; resource: string; details?: Record<string, unknown> }) {
    const entry: AuditLogEntry = {
      id: `90000000-0000-0000-0000-${String(this.auditLogs.length + 1).padStart(12, "0")}`,
      user_name: "Active Administrator",
      action: data.action,
      resource: data.resource,
      details: data.details,
      ip_address: "127.0.0.1 (Local Verified)",
      created_at: new Date().toISOString(),
    };
    this.auditLogs.unshift(entry);
  }

  // ====================================================================
  // PHASE 3: DIGITAL LIBRARY METHODS
  // ====================================================================

  public getLearningResources(params?: {
    subjectId?: string;
    classId?: string;
    isPublishedOnly?: boolean;
    query?: string;
    type?: string;
  }): LearningResource[] {
    return this.resources.filter((res) => {
      if (params?.isPublishedOnly && !res.is_published) return false;
      if (params?.subjectId && params.subjectId !== "all" && res.subject_id !== params.subjectId) return false;
      if (params?.classId && params.classId !== "all" && res.class_id !== params.classId) return false;
      if (params?.type && params.type !== "all" && res.resource_type !== params.type) return false;
      if (params?.query) {
        const q = params.query.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesTopic = res.topic.toLowerCase().includes(q);
        const matchesDesc = res.description.toLowerCase().includes(q);
        const matchesSub = res.subject_name?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesTopic && !matchesDesc && !matchesSub) return false;
      }
      return true;
    });
  }

  public getLearningResourceById(id: string): LearningResource | undefined {
    return this.resources.find((r) => r.id === id);
  }

  public createLearningResource(data: {
    title: string;
    description: string;
    subjectId: string;
    classId?: string;
    sectionIds?: string[];
    topic: string;
    resourceType: LearningResource["resource_type"];
    url: string;
    fileSize?: string;
    createdByTeacherId: string;
    authorName?: string;
    isPublished?: boolean;
  }): LearningResource {
    const id = `r0000000-0000-0000-0000-${String(this.resources.length + 1).padStart(12, "0")}`;
    const subject = this.subjects.find((s) => s.id === data.subjectId);
    const cls = data.classId ? this.classes.find((c) => c.id === data.classId) : undefined;

    const resource: LearningResource = {
      id,
      title: data.title,
      description: data.description,
      subject_id: data.subjectId,
      subject_name: subject?.name || "General Curriculum",
      class_id: data.classId,
      class_name: cls?.name,
      section_ids: data.sectionIds,
      topic: data.topic,
      resource_type: data.resourceType,
      url: data.url,
      file_size: data.fileSize || "Digital Vault Document",
      created_by_teacher_id: data.createdByTeacherId,
      author_name: data.authorName || "Faculty Instructor",
      is_published: data.isPublished !== undefined ? data.isPublished : true,
      downloads_count: 0,
      created_at: new Date().toISOString(),
    };

    this.resources.unshift(resource);

    this.logAudit({
      action: "UPLOAD_LEARNING_RESOURCE",
      resource: resource.title,
      details: {
        resource_id: resource.id,
        type: resource.resource_type,
        subject: resource.subject_name,
        is_published: resource.is_published,
      },
    });

    return resource;
  }

  public updateLearningResource(
    id: string,
    data: Partial<Omit<LearningResource, "id" | "created_at">>
  ): LearningResource | null {
    const index = this.resources.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const existing = this.resources[index];
    const updated: LearningResource = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString(),
    };

    this.resources[index] = updated;

    this.logAudit({
      action: "UPDATE_LEARNING_RESOURCE",
      resource: updated.title,
      details: { resource_id: id, changes: data },
    });

    return updated;
  }

  public deleteLearningResource(id: string): boolean {
    const idx = this.resources.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    const deleted = this.resources.splice(idx, 1)[0];
    this.logAudit({
      action: "DELETE_LEARNING_RESOURCE",
      resource: deleted.title,
      details: { resource_id: id },
    });

    return true;
  }

  public toggleBookmark(userId: string, resourceId: string): boolean {
    const existingIndex = this.bookmarks.findIndex(
      (b) => b.user_id === userId && b.resource_id === resourceId
    );

    if (existingIndex !== -1) {
      this.bookmarks.splice(existingIndex, 1);
      return false; // Removed
    } else {
      const id = `bm000000-0000-0000-0000-${String(this.bookmarks.length + 1).padStart(12, "0")}`;
      this.bookmarks.push({
        id,
        user_id: userId,
        resource_id: resourceId,
        created_at: new Date().toISOString(),
      });
      return true; // Added
    }
  }

  public isBookmarked(userId: string, resourceId: string): boolean {
    return this.bookmarks.some((b) => b.user_id === userId && b.resource_id === resourceId);
  }

  public getUserBookmarks(userId: string): LearningResource[] {
    const resourceIds = this.bookmarks.filter((b) => b.user_id === userId).map((b) => b.resource_id);
    return this.resources.filter((r) => resourceIds.includes(r.id));
  }

  public recordResourceAccess(userId: string, resourceId: string): LearningResource | null {
    const res = this.resources.find((r) => r.id === resourceId);
    if (!res) return null;

    res.downloads_count += 1;
    this.recentAccesses.unshift({
      user_id: userId,
      resource_id: resourceId,
      accessed_at: new Date().toISOString(),
    });

    // Award initial bookmark/access points if student and not yet claimed
    const isStudent = this.students.some((s) => s.id === userId || s.profile_id === userId);
    if (isStudent) {
      const student = this.students.find((s) => s.id === userId || s.profile_id === userId);
      if (student) {
        this.awardLearningPoints({
          studentId: student.id,
          points: 10,
          source: "library_activity",
          referenceId: `library_${resourceId}`,
          description: `Reviewed learning resource: ${res.title}`,
        });
      }
    }

    return res;
  }

  public getRecentResourceAccesses(userId: string): LearningResource[] {
    const userAccesses = this.recentAccesses.filter((a) => a.user_id === userId);
    const uniqueIds = Array.from(new Set(userAccesses.map((a) => a.resource_id)));
    return uniqueIds
      .map((id) => this.resources.find((r) => r.id === id))
      .filter((r): r is LearningResource => Boolean(r));
  }

  // ====================================================================
  // PHASE 3: ONLINE QUIZ PLATFORM METHODS
  // ====================================================================

  public getQuizzes(params?: {
    sectionId?: string;
    subjectId?: string;
    isPublishedOnly?: boolean;
  }): Quiz[] {
    return this.quizzes
      .filter((q) => {
        if (params?.isPublishedOnly && !q.is_published) return false;
        if (params?.subjectId && params.subjectId !== "all" && q.subject_id !== params.subjectId) return false;
        if (params?.sectionId && params.sectionId !== "all" && q.section_id !== params.sectionId) return false;
        return true;
      })
      .map((q) => {
        const questions = this.quizQuestions.filter((qq) => qq.quiz_id === q.id);
        const totalPoints = questions.reduce((sum, item) => sum + item.points, 0);
        return {
          ...q,
          questions_count: questions.length,
          total_points: totalPoints,
        };
      });
  }

  public getQuizById(id: string, includeAnswers: boolean = false): (Quiz & { questions: QuizQuestion[] }) | undefined {
    const quiz = this.quizzes.find((q) => q.id === id);
    if (!quiz) return undefined;

    const questions = this.quizQuestions
      .filter((qq) => qq.quiz_id === id)
      .sort((a, b) => a.order_index - b.order_index)
      .map((q) => {
        if (includeAnswers) {
          return q;
        }
        // Protect correct answers and explanations from student inspection before submission!
        const sanitized: Partial<QuizQuestion> = { ...q };
        delete sanitized.correct_option_index;
        delete sanitized.accepted_answers;
        delete sanitized.explanation;
        return sanitized as QuizQuestion;
      });

    const totalPoints = questions.reduce((sum, item) => sum + item.points, 0);

    return {
      ...quiz,
      questions,
      questions_count: questions.length,
      total_points: totalPoints,
    };
  }

  public createQuiz(
    data: {
      title: string;
      description: string;
      subjectId: string;
      sectionId?: string;
      topic: string;
      difficultyLevel: Quiz["difficulty_level"];
      timeLimitMinutes: number;
      maxAttempts: number;
      passPercentage: number;
      startDate?: string;
      endDate?: string;
      isPublished: boolean;
      createdByTeacherId: string;
      creatorName?: string;
      questions?: {
        questionText: string;
        questionType: QuizQuestion["question_type"];
        options?: string[];
        correctOptionIndex?: number;
        acceptedAnswers?: string[];
        explanation?: string;
        points: number;
      }[];
    },
    questionsList?: {
      questionText: string;
      questionType: QuizQuestion["question_type"];
      options?: string[];
      correctOptionIndex?: number;
      acceptedAnswers?: string[];
      explanation?: string;
      points: number;
    }[]
  ): Quiz {
    const id = `q0000000-0000-0000-0000-${String(this.quizzes.length + 1).padStart(12, "0")}`;
    const subject = this.subjects.find((s) => s.id === data.subjectId);
    const section = data.sectionId ? this.sections.find((sec) => sec.id === data.sectionId) : undefined;
    const teacher = this.teachers.find((t) => t.id === data.createdByTeacherId);
    const rawQuestions = questionsList || data.questions || [];
    const calculatedPoints = rawQuestions.reduce((sum, q) => sum + (q.points || 10), 0);

    const quiz: Quiz = {
      id,
      title: data.title,
      description: data.description,
      subject_id: data.subjectId,
      subject_name: subject?.name || "Course Subject",
      section_id: data.sectionId,
      section_name: section?.name || "All Cohorts",
      topic: data.topic,
      difficulty_level: data.difficultyLevel,
      time_limit_minutes: data.timeLimitMinutes,
      max_attempts: data.maxAttempts,
      pass_percentage: data.passPercentage,
      start_date: data.startDate,
      end_date: data.endDate,
      is_published: data.isPublished,
      created_by_teacher_id: data.createdByTeacherId,
      creator_name: data.creatorName || teacher?.profile?.full_name || "Faculty Instructor",
      created_at: new Date().toISOString(),
      total_points: calculatedPoints,
    };

    this.quizzes.unshift(quiz);

    // Save Question Items
    const savedQuestions: QuizQuestion[] = [];
    rawQuestions.forEach((q, idx) => {
      const qId = `qq000000-0000-0000-0000-${String(this.quizQuestions.length + 1).padStart(12, "0")}`;
      const questionItem: QuizQuestion = {
        id: qId,
        quiz_id: id,
        question_text: q.questionText,
        question_type: q.questionType,
        options: q.options,
        correct_option_index: q.correctOptionIndex,
        accepted_answers: q.acceptedAnswers,
        explanation: q.explanation,
        points: q.points || 10,
        order_index: idx + 1,
      };
      this.quizQuestions.push(questionItem);
      savedQuestions.push(questionItem);
    });

    quiz.questions = savedQuestions;

    this.logAudit({
      action: "CREATE_QUIZ",
      resource: quiz.title,
      details: {
        quiz_id: quiz.id,
        questions_count: rawQuestions.length,
        is_published: quiz.is_published,
      },
    });

    return quiz;
  }

  public updateQuiz(
    id: string,
    data: Partial<Omit<Quiz, "id" | "created_at">>,
    questions?: {
      id?: string;
      questionText: string;
      questionType: QuizQuestion["question_type"];
      options?: string[];
      correctOptionIndex?: number;
      acceptedAnswers?: string[];
      explanation?: string;
      points: number;
    }[]
  ): Quiz | null {
    const idx = this.quizzes.findIndex((q) => q.id === id);
    if (idx === -1) return null;

    const existing = this.quizzes[idx];
    const updated: Quiz = {
      ...existing,
      ...data,
    };
    this.quizzes[idx] = updated;

    if (questions && questions.length > 0) {
      // Replace questions for quiz
      this.quizQuestions = this.quizQuestions.filter((qq) => qq.quiz_id !== id);
      questions.forEach((q, qIdx) => {
        const qId = q.id || `qq000000-0000-0000-0000-${String(this.quizQuestions.length + 1).padStart(12, "0")}`;
        this.quizQuestions.push({
          id: qId,
          quiz_id: id,
          question_text: q.questionText,
          question_type: q.questionType,
          options: q.options,
          correct_option_index: q.correctOptionIndex,
          accepted_answers: q.acceptedAnswers,
          explanation: q.explanation,
          points: q.points || 10,
          order_index: qIdx + 1,
        });
      });
    }

    this.logAudit({
      action: "UPDATE_QUIZ",
      resource: updated.title,
      details: { quiz_id: id, is_published: updated.is_published },
    });

    return updated;
  }

  public submitQuizAttempt(params: {
    quizId: string;
    studentId: string;
    answers: {
      question_id: string;
      selected_option_index?: number;
      text_answer?: string;
    }[];
  }): QuizAttempt {
    const quiz = this.quizzes.find((q) => q.id === params.quizId);
    if (!quiz) throw new Error("Quiz not found in system repository.");

    // 1. Enforce attempt limits on server
    const existingAttempts = this.quizAttempts.filter(
      (a) => a.quiz_id === params.quizId && a.student_id === params.studentId
    );
    if (existingAttempts.length >= quiz.max_attempts) {
      throw new Error(`Attempt limit exceeded. Maximum attempts allowed: ${quiz.max_attempts}.`);
    }

    const questions = this.quizQuestions.filter((qq) => qq.quiz_id === params.quizId);
    let totalScore = 0;
    let totalPossible = 0;

    const evaluatedAnswers: QuizSubmittedAnswer[] = [];

    questions.forEach((q) => {
      totalPossible += q.points;
      const submitted = params.answers.find((a) => a.question_id === q.id);

      let isCorrect = false;
      let pointsAwarded = 0;

      if (submitted) {
        if (q.question_type === "multiple_choice" || q.question_type === "true_false") {
          isCorrect = submitted.selected_option_index === q.correct_option_index;
        } else if (q.question_type === "short_answer") {
          const userText = (submitted.text_answer || "").trim().toLowerCase();
          const accepted = q.accepted_answers || [];
          isCorrect = accepted.some((ans) => ans.trim().toLowerCase() === userText);
        }

        if (isCorrect) {
          pointsAwarded = q.points;
          totalScore += pointsAwarded;
        }
      }

      evaluatedAnswers.push({
        question_id: q.id,
        selected_option_index: submitted?.selected_option_index,
        text_answer: submitted?.text_answer,
        is_correct: isCorrect,
        points_awarded: pointsAwarded,
      });
    });

    const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;
    const passed = percentage >= quiz.pass_percentage;
    const attemptNumber = existingAttempts.length + 1;
    const attemptId = `qa000000-0000-0000-0000-${String(this.quizAttempts.length + 1).padStart(12, "0")}`;

    const student = this.students.find((s) => s.id === params.studentId);

    const attempt: QuizAttempt = {
      id: attemptId,
      quiz_id: params.quizId,
      student_id: params.studentId,
      attempt_number: attemptNumber,
      started_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
      submitted_at: new Date().toISOString(),
      score: totalScore,
      total_possible: totalPossible,
      percentage,
      passed,
      answers: evaluatedAnswers,
      student_name: student?.profile?.full_name || "Enrolled Scholar",
      quiz_title: quiz.title,
    };

    this.quizAttempts.push(attempt);

    // 2. Server Gamification Points Award (with unique reference ID check)
    this.awardLearningPoints({
      studentId: params.studentId,
      points: 50,
      source: "quiz_completed",
      referenceId: attemptId,
      description: `Completed ${quiz.title} (Score: ${percentage}%)`,
    });

    if (percentage === 100) {
      this.awardLearningPoints({
        studentId: params.studentId,
        points: 50,
        source: "quiz_perfect_score",
        referenceId: `perfect_${attemptId}`,
        description: `Flawless 100% Score on ${quiz.title}`,
      });
      this.unlockBadge(params.studentId, "perfect_score");
    } else if (percentage >= 90) {
      this.awardLearningPoints({
        studentId: params.studentId,
        points: 30,
        source: "streak_bonus",
        referenceId: `high_score_${attemptId}`,
        description: `High Honors Mastery (${percentage}%) on ${quiz.title}`,
      });
    }

    // 3. Automated Badge Check & Unlocks
    this.unlockBadge(params.studentId, "first_quiz");

    const totalStudentAttempts = this.quizAttempts.filter((a) => a.student_id === params.studentId).length;
    if (totalStudentAttempts >= 5) {
      this.unlockBadge(params.studentId, "five_quizzes");
    }

    if (quiz.subject_name?.toLowerCase().includes("math") && passed) {
      this.unlockBadge(params.studentId, "math_explorer");
    }

    // Add Activity Record
    this.learningActivities.unshift({
      id: `la000000-0000-0000-0000-${String(this.learningActivities.length + 1).padStart(12, "0")}`,
      student_id: params.studentId,
      activity_type: "quiz",
      title: quiz.title,
      details: `Completed attempt #${attemptNumber} with score ${totalScore}/${totalPossible} (${percentage}%)`,
      score: `${percentage}%`,
      points_earned: percentage === 100 ? 100 : percentage >= 90 ? 80 : 50,
      timestamp: new Date().toISOString(),
    });

    this.logAudit({
      action: "SUBMIT_QUIZ_ATTEMPT",
      resource: quiz.title,
      details: {
        quiz_id: quiz.id,
        student_id: params.studentId,
        score: totalScore,
        percentage,
        passed,
      },
    });

    return attempt;
  }

  public getStudentQuizAttempts(studentId: string, quizId?: string): QuizAttempt[] {
    return this.quizAttempts.filter((a) => {
      if (a.student_id !== studentId) return false;
      if (quizId && a.quiz_id !== quizId) return false;
      return true;
    });
  }

  public getAllQuizAttempts(quizId?: string): QuizAttempt[] {
    if (!quizId) return this.quizAttempts;
    return this.quizAttempts.filter((a) => a.quiz_id === quizId);
  }

  // ====================================================================
  // PHASE 3: EDUCATIONAL GAMES & SESSIONS
  // ====================================================================

  public getGameDefinitions(): GameDefinition[] {
    return INITIAL_GAME_DEFINITIONS;
  }

  public recordGameSession(params: {
    gameId: GameType;
    studentId: string;
    score: number;
    questionsAnswered: number;
    correctAnswers: number;
    timeSpentSeconds: number;
    topic?: string;
  }): GameSession {
    const gameDef = INITIAL_GAME_DEFINITIONS.find((g) => g.id === params.gameId);
    const accuracy = params.questionsAnswered > 0
      ? Math.round((params.correctAnswers / params.questionsAnswered) * 100)
      : 0;

    const id = `gs000000-0000-0000-0000-${String(this.gameSessions.length + 1).padStart(12, "0")}`;
    const student = this.students.find((s) => s.id === params.studentId);

    const session: GameSession = {
      id,
      game_id: params.gameId,
      student_id: params.studentId,
      score: params.score,
      questions_answered: params.questionsAnswered,
      correct_answers: params.correctAnswers,
      accuracy_percentage: accuracy,
      time_spent_seconds: params.timeSpentSeconds,
      topic: params.topic || "Core Curriculum",
      completed_at: new Date().toISOString(),
      student_name: student?.profile?.full_name || "Enrolled Scholar",
      game_title: gameDef?.title || "Educational Game",
    };

    this.gameSessions.unshift(session);

    // Gamification Points Award
    const pointsAwarded = accuracy >= 80 ? 50 : 30;
    this.awardLearningPoints({
      studentId: params.studentId,
      points: pointsAwarded,
      source: "game_completed",
      referenceId: id,
      description: `Completed ${session.game_title} (${accuracy}% accuracy)`,
    });

    // Check Game Badges
    if (params.gameId === "cybersafe_challenge" && accuracy >= 80) {
      this.unlockBadge(params.studentId, "cybersafe_champion");
    }
    if (params.gameId === "topic_mastery" && accuracy >= 90) {
      this.unlockBadge(params.studentId, "topic_master");
    }

    // Add Activity Record
    this.learningActivities.unshift({
      id: `la000000-0000-0000-0000-${String(this.learningActivities.length + 1).padStart(12, "0")}`,
      student_id: params.studentId,
      activity_type: "game",
      title: session.game_title || "Educational Challenge",
      details: `Solved ${params.correctAnswers}/${params.questionsAnswered} items correctly with ${accuracy}% precision`,
      score: `${accuracy}%`,
      points_earned: pointsAwarded,
      timestamp: new Date().toISOString(),
    });

    this.logAudit({
      action: "COMPLETE_GAME_SESSION",
      resource: session.game_title || "Game Session",
      details: {
        game_id: params.gameId,
        student_id: params.studentId,
        score: params.score,
        accuracy,
      },
    });

    return session;
  }

  public getStudentGameSessions(studentId: string): GameSession[] {
    return this.gameSessions.filter((s) => s.student_id === studentId);
  }

  // ====================================================================
  // PHASE 3: GAMIFICATION, POINTS & BADGES
  // ====================================================================

  public awardLearningPoints(params: {
    studentId: string;
    points: number;
    source: PointSource;
    referenceId?: string;
    description: string;
  }): LearningPointEntry {
    // Prevent duplicate reward claims using reference ID check
    if (params.referenceId) {
      const existing = this.learningPoints.find(
        (p) => p.student_id === params.studentId && p.reference_id === params.referenceId
      );
      if (existing) {
        return existing; // Duplicate blocked safely!
      }
    }

    const id = `lp000000-0000-0000-0000-${String(this.learningPoints.length + 1).padStart(12, "0")}`;
    const entry: LearningPointEntry = {
      id,
      student_id: params.studentId,
      points: params.points,
      source: params.source,
      reference_id: params.referenceId,
      description: params.description,
      created_at: new Date().toISOString(),
    };

    this.learningPoints.push(entry);
    return entry;
  }

  public getStudentPointsLedger(studentId: string): LearningPointEntry[] {
    return this.learningPoints.filter((p) => p.student_id === studentId);
  }

  public getBadges(): BadgeDefinition[] {
    return this.badges;
  }

  public getStudentBadges(studentId: string): StudentBadge[] {
    return this.studentBadges
      .filter((sb) => sb.student_id === studentId)
      .map((sb) => ({
        ...sb,
        badge: this.badges.find((b) => b.id === sb.badge_id),
      }));
  }

  public unlockBadge(studentId: string, badgeId: string): StudentBadge | null {
    const alreadyEarned = this.studentBadges.some(
      (sb) => sb.student_id === studentId && sb.badge_id === badgeId
    );
    if (alreadyEarned) return null;

    const badgeDef = this.badges.find((b) => b.id === badgeId);
    if (!badgeDef) return null;

    const id = `sb000000-0000-0000-0000-${String(this.studentBadges.length + 1).padStart(12, "0")}`;
    const newBadge: StudentBadge = {
      id,
      student_id: studentId,
      badge_id: badgeId,
      badge: badgeDef,
      awarded_at: new Date().toISOString(),
    };

    this.studentBadges.push(newBadge);

    // Award bonus points for achievement unlock
    this.awardLearningPoints({
      studentId,
      points: badgeDef.rarity === "legendary" ? 100 : badgeDef.rarity === "epic" ? 75 : 50,
      source: "streak_bonus",
      referenceId: `badge_unlock_${badgeId}`,
      description: `Unlocked Achievement: ${badgeDef.name}`,
    });

    return newBadge;
  }

  public getStudentRecentActivities(studentId: string): LearningActivityRecord[] {
    return this.learningActivities.filter((a) => a.student_id === studentId);
  }

  public getStudentLearningProgress(studentId: string): LearningProgressSummary {
    const studentPoints = this.learningPoints.filter((p) => p.student_id === studentId);
    const totalPoints = studentPoints.reduce((sum, item) => sum + item.points, 0);

    // Level Tiers
    let level = 1;
    let levelTitle = "Apprentice Scholar";
    let currentLevelPoints = totalPoints;
    let pointsToNextLevel = 200 - totalPoints;

    if (totalPoints >= 2000) {
      level = 5;
      levelTitle = "Distinguished Laureate";
      currentLevelPoints = totalPoints - 2000;
      pointsToNextLevel = 0;
    } else if (totalPoints >= 1000) {
      level = 4;
      levelTitle = "Master Intellect";
      currentLevelPoints = totalPoints - 1000;
      pointsToNextLevel = 2000 - totalPoints;
    } else if (totalPoints >= 500) {
      level = 3;
      levelTitle = "Academic Achiever";
      currentLevelPoints = totalPoints - 500;
      pointsToNextLevel = 1000 - totalPoints;
    } else if (totalPoints >= 200) {
      level = 2;
      levelTitle = "Inquisitive Explorer";
      currentLevelPoints = totalPoints - 200;
      pointsToNextLevel = 500 - totalPoints;
    }

    const attempts = this.quizAttempts.filter((a) => a.student_id === studentId);
    const avgScore = attempts.length > 0
      ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / attempts.length)
      : 88;

    const gameSessions = this.gameSessions.filter((s) => s.student_id === studentId);
    const badges = this.studentBadges.filter((b) => b.student_id === studentId);
    const activities = this.learningActivities.filter((a) => a.student_id === studentId).slice(0, 10);

    // Diagnostic Recommendations based on quiz performance
    const recommendedTopics: { topic: string; subject: string; reason: string }[] = [];
    const lowAttempts = attempts.filter((a) => a.percentage < 75);
    if (lowAttempts.length > 0) {
      lowAttempts.forEach((att) => {
        const q = this.quizzes.find((quiz) => quiz.id === att.quiz_id);
        if (q) {
          recommendedTopics.push({
            topic: q.topic,
            subject: q.subject_name || "Science",
            reason: `Recent assessment score was ${att.percentage}%. Reinforce conceptual derivations.`,
          });
        }
      });
    } else {
      recommendedTopics.push({
        topic: "Rotational Kinematics & Angular Momentum",
        subject: "AP Physics C: Mechanics",
        reason: "Practice foundational torque equations before the upcoming lab assessment.",
      });
      recommendedTopics.push({
        topic: "Password Entropy & Social Engineering Hooks",
        subject: "Cybersecurity & Digital Hygiene",
        reason: "Sharpen phishing recognition skills in the CyberSafe Threat Analyzer.",
      });
    }

    return {
      total_points: totalPoints,
      level,
      level_title: levelTitle,
      current_level_points: currentLevelPoints,
      points_to_next_level: Math.max(0, pointsToNextLevel),
      quizzes_completed: attempts.length > 0 ? attempts.length : 3,
      average_quiz_score: avgScore,
      games_played: gameSessions.length > 0 ? gameSessions.length : 2,
      badges_count: badges.length,
      streak_days: 4,
      recent_activities: activities,
      recommended_topics: recommendedTopics,
    };
  }

  public getLeaderboard(): {
    rank: number;
    studentId: string;
    displayName: string;
    points: number;
    badgesCount: number;
    levelTitle: string;
  }[] {
    const list = this.students.map((student) => {
      const studentPoints = this.learningPoints.filter((p) => p.student_id === student.id);
      const totalPoints = studentPoints.reduce((sum, item) => sum + item.points, 0);
      const badgesCount = this.studentBadges.filter((b) => b.student_id === student.id).length;

      let levelTitle = "Apprentice Scholar";
      if (totalPoints >= 1000) levelTitle = "Master Intellect";
      else if (totalPoints >= 500) levelTitle = "Academic Achiever";
      else if (totalPoints >= 200) levelTitle = "Inquisitive Explorer";

      return {
        studentId: student.id,
        displayName: `${student.profile?.full_name?.split(" ")[0]} (${student.student_number})`,
        points: totalPoints,
        badgesCount,
        levelTitle,
      };
    });

    list.sort((a, b) => b.points - a.points);
    return list.map((item, idx) => ({ ...item, rank: idx + 1 }));
  }

  // ====================================================================
  // PHASE 3: TEACHER & PARENT LEARNING ANALYTICS
  // ====================================================================

  public getTeacherClassLearningAnalytics(teacherId: string): TeacherAnalyticsSummary[] {
    const assignments = this.teacherAssignments.filter((a) => a.teacher_id === teacherId);
    const sectionIds = Array.from(new Set(assignments.map((a) => a.section_id)));

    return sectionIds.map((secId) => {
      const section = this.sections.find((s) => s.id === secId);
      const enrolledStudents = this.getSectionStudents(secId);
      const classQuizzes = this.quizzes.filter((q) => q.section_id === secId);
      const quizAttempts = this.quizAttempts.filter((att) =>
        classQuizzes.some((q) => q.id === att.quiz_id)
      );

      const avgScore = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((sum, a) => sum + a.percentage, 0) / quizAttempts.length)
        : 84;

      const completionRate = (enrolledStudents.length * Math.max(classQuizzes.length, 1)) > 0
        ? Math.round((quizAttempts.length / (enrolledStudents.length * Math.max(classQuizzes.length, 1))) * 100)
        : 85;

      return {
        class_id: secId,
        class_name: section?.name || "Assigned Section",
        total_students: enrolledStudents.length,
        total_quizzes: classQuizzes.length,
        average_completion_rate: Math.min(100, Math.max(70, completionRate)),
        average_score_percentage: avgScore,
        struggling_topics: [
          { topic: "Newton's Third Law Paired Action Vectors", subject: "AP Physics C", missed_rate: 34 },
          { topic: "Friction Coefficients on Inclined Planes", subject: "AP Physics C", missed_rate: 28 },
        ],
        games_engagement_count: this.gameSessions.length,
      };
    });
  }

  public getParentChildLearningSummary(studentId: string) {
    const student = this.students.find((s) => s.id === studentId);
    if (!student) return null;

    const progress = this.getStudentLearningProgress(studentId);
    const attempts = this.getStudentQuizAttempts(studentId);
    const gameSessions = this.getStudentGameSessions(studentId);
    const badges = this.getStudentBadges(studentId);

    return {
      student,
      progress,
      recentAttempts: attempts.slice(0, 5),
      recentGameSessions: gameSessions.slice(0, 5),
      badges,
    };
  }

}

// Global Singleton Instance
export const schoolStore = new SchoolDataStore();

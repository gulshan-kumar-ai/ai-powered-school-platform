export type NavItem = {
  title: string;
  href: string;
  description?: string;
  badge?: string;
  isExternal?: boolean;
};

export type AcademicProgram = {
  id: string;
  title: string;
  level: string;
  ageRange: string;
  description: string;
  curriculumHighlights: string[];
  icon: string;
  featuredBadge?: string;
  overview?: string;
  coreSubjects?: string[];
};

export type AnnouncementCategory = "notice" | "academic" | "event" | "achievement";

export type Announcement = {
  id: string;
  title: string;
  category: AnnouncementCategory;
  date: string;
  summary: string;
  department: string;
  priority?: "normal" | "important" | "urgent";
  isDemo: boolean;
  content?: string[];
  author?: string;
  readTime?: string;
};

export type EventCategory = "academic" | "athletics" | "arts" | "community" | "admissions";

export type EventItem = {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  summary: string;
  description: string;
  agenda?: { time: string; title: string }[];
  speaker?: string;
  audience: string;
  isPast?: boolean;
  isDemo: boolean;
};

export type FacultyMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  qualification: string;
  bio: string;
  email: string;
  image?: string;
};

export type CampusFacility = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  features: string[];
};

export type FAQItem = {
  id: string;
  category: "admissions" | "academics" | "campus-life" | "tuition";
  question: string;
  answer: string;
};

export type AdmissionStep = {
  step: number;
  title: string;
  description: string;
  duration: string;
  actionHint?: string;
};

export type AdmissionDate = {
  date: string;
  title: string;
  description: string;
  isPast?: boolean;
};

export type DigitalPreviewItem = {
  id: string;
  title: string;
  description: string;
  phase: string;
  icon: string;
  highlights: string[];
  statusBadge: "Phase 3 Roadmap" | "Phase 4 Roadmap";
};

export type StatItem = {
  id: string;
  label: string;
  value: string;
  subtext: string;
  icon: string;
};

export type SchoolValue = {
  title: string;
  description: string;
  icon: string;
};

export type ContactInfo = {
  schoolName: string;
  addressLine1: string;
  addressLine2: string;
  cityStateZip: string;
  mainPhone: string;
  admissionsPhone: string;
  mainEmail: string;
  admissionsEmail: string;
  officeHours: string;
  campusTourHours: string;
  isDemoData: boolean;
  postalCode?: string;
  facebookUrl?: string;
  principal?: string;
  smcChairman?: string;
  affiliation?: string;
  governingBody?: string;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  acronym?: string;
  tagline: string;
  description: string;
  established: number;
  motto: string;
  logo?: string;
  navigation: NavItem[];
  portalLinks: {
    title: string;
    description: string;
    role: "student" | "teacher" | "parent" | "admin";
    phaseNote: string;
  }[];
  contact: ContactInfo;
  values: {
    vision: string;
    mission: string;
    coreValues: SchoolValue[];
  };
  sampleStats: StatItem[];
  academicPrograms: AcademicProgram[];
  announcements: Announcement[];
  events: EventItem[];
  faculty: FacultyMember[];
  facilities: CampusFacility[];
  faqs: FAQItem[];
  admissionSteps: AdmissionStep[];
  admissionDates: AdmissionDate[];
  digitalPreviews: DigitalPreviewItem[];
};


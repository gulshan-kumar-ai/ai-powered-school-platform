import { SiteConfig } from "@/types";
import { schoolNews } from "@/data/news";
import { schoolEvents } from "@/data/events";
import { schoolFaculty } from "@/data/faculty";
import { schoolFacilities } from "@/data/facilities";
import { schoolFaqs } from "@/data/faqs";
import { admissionSteps, admissionDates } from "@/data/admissions";

export const siteConfig: SiteConfig = {
  name: "Govt. Boys Qazi Sultan Higher Secondary School, Kunri",
  shortName: "GBHSS Qazi Sultan Kunri",
  acronym: "GBHSS",
  tagline: "Striving for Excellence, Inspiring Character, Empowering Future Generations",
  description:
    "Govt. Boys Qazi Sultan Higher Secondary School, Kunri (GBHSS Qazi Sultan Kunri) is a prominent public boys' educational institution located on Station Road, Kunri, within the Umerkot District of Sindh, Pakistan (Mirpur Khas Region), offering comprehensive education from primary to higher secondary levels (Class XI & XII).",
  established: 1988,
  motto: "وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ (And that man can have nothing but what he strives for)",
  logo: "/images/school/logo.png",
  
  navigation: [
    { title: "Home", href: "/" },
    { title: "About", href: "/about" },
    { title: "Academics", href: "/academics" },
    { title: "Admissions", href: "/admissions", badge: "2026-27" },
    { title: "News", href: "/news" },
    { title: "Events", href: "/events" },
    { title: "Gallery", href: "/gallery" },
    { title: "Contact", href: "/contact" },
  ],


  portalLinks: [
    {
      title: "Student Portal",
      description: "Access timetables, assignments, and learning resources.",
      role: "student",
      phaseNote: "Scheduled for Phase 2 implementation",
    },
    {
      title: "Parent Portal",
      description: "Monitor student progress, attendance, and fee statements.",
      role: "parent",
      phaseNote: "Scheduled for Phase 2 implementation",
    },
    {
      title: "Teacher Portal",
      description: "Gradebook management, classroom attendance, and lesson plans.",
      role: "teacher",
      phaseNote: "Scheduled for Phase 2 implementation",
    },
    {
      title: "Administrative Suite",
      description: "School governance, admissions pipeline, and staff records.",
      role: "admin",
      phaseNote: "Scheduled for Phase 2 implementation",
    },
  ],

  contact: {
    schoolName: "Govt. Boys Qazi Sultan Higher Secondary School, Kunri",
    addressLine1: "Station Road Corridor, Bab-e-Ibraheem Momin Campus",
    addressLine2: "Kunri Taluka, Umerkot District, Mirpur Khas Region",
    cityStateZip: "Sindh, Pakistan",
    postalCode: "69160",
    mainPhone: "+92 238 558252",
    admissionsPhone: "+92 238 558252",
    mainEmail: "info@qazisultanboys.edu.pk",
    admissionsEmail: "admissions@qazisultanboys.edu.pk",
    principal: "Sir Rahmatullah Lashari",
    smcChairman: "Mr. Ubaidullah Gill (2019–20)",
    affiliation: "Board of Intermediate and Secondary Education (BISE) Mirpur Khas",
    governingBody: "School Education & Literacy Department, Government of Sindh",
    facebookUrl: "https://www.facebook.com/p/GHSS-QAZI-SULTAN-KUNRI-100084404045927/",
    officeHours: "Monday – Saturday: 7:30 AM – 1:30 PM (Friday: 7:30 AM – 12:00 PM)",
    campusTourHours: "Tuesdays & Thursdays: 10:00 AM – 12:30 PM (by appointment)",
    isDemoData: false,
  },

  values: {
    vision:
      "To be a distinguished center of educational achievement in Sindh that empowers young scholars with academic mastery, scientific curiosity, moral integrity, and the determination to serve their communities with distinction.",
    mission:
      "Qazi Sultan Boys Higher Secondary School, Kunri, Sindh educates young minds through rigorous curriculum delivery, moral and ethical guidance, technological learning, and active community partnership.",
    coreValues: [
      {
        title: "Diligence & Striving (Sa'ee)",
        description:
          "Inspired by Surah An-Najm ('And that man can have nothing but what he strives for'), we instill persevering effort and honest labor as the foundation of all true success.",
        icon: "BookOpen",
      },
      {
        title: "Enlightenment & Knowledge (Shama-e-Ilm)",
        description:
          "Reflecting Allama Iqbal's prayer ('Zindagi shama ki soorat ho khudaya meri'), our learners strive to become beacons of knowledge, compassion, and selfless service.",
        icon: "Cpu",
      },
      {
        title: "Community & Self-Reliance",
        description:
          "Building on our proud history of community self-help through the School Management Committee (SMC), we foster civic duty, teamwork, and responsible citizenship.",
        icon: "HeartHandshake",
      },
      {
        title: "Leadership & Integrity",
        description:
          "Empowering young scholars to lead purposeful initiatives, uphold moral values, mentor peers, and contribute positively to our region and nation.",
        icon: "Compass",
      },
    ],
  },

  sampleStats: [
    {
      id: "stat-1",
      label: "Scholars Enrolled",
      value: "1,200+",
      subtext: "Serving Kunri Taluka and Umerkot District across Secondary and Higher Secondary grades",
      icon: "Users",
    },
    {
      id: "stat-2",
      label: "Qualified Faculty",
      value: "92%+",
      subtext: "Subject specialists and certified educators delivering Sindh Textbook Board curriculum",
      icon: "GraduationCap",
    },
    {
      id: "stat-3",
      label: "Dedicated Science Labs",
      value: "100%",
      subtext: "Active Physics, Chemistry, Biology & Computer labs for BISE practical examinations",
      icon: "FlaskConical",
    },
    {
      id: "stat-4",
      label: "Years of Educational Service",
      value: "38+",
      subtext: "Established in 1988 with enduring School Management Committee (SMC) stewardship",
      icon: "Trophy",
    },
  ],

  academicPrograms: [
    {
      id: "early-primary",
      title: "Early Years & Primary Division",
      level: "Kindergarten to Grade 5",
      ageRange: "Ages 5 – 10",
      description:
        "Building foundational literacy, mathematical reasoning, scientific curiosity, and social-emotional confidence through interactive, guided inquiry.",
      curriculumHighlights: [
        "Phonics & Guided Reading Immersion",
        "Singapore-inspired Conceptual Mathematics",
        "Introduction to Coding & Hands-on Science",
        "Visual Arts, Music & Physical Well-being",
      ],
      icon: "Sparkles",
      featuredBadge: "Foundation Stage",
    },
    {
      id: "middle-school",
      title: "Middle School Discovery",
      level: "Grades 6 to 8",
      ageRange: "Ages 11 – 13",
      description:
        "A bridge to independent scholarship encouraging analytical writing, experimental science, world languages, and collaborative design projects.",
      curriculumHighlights: [
        "Integrated Natural Sciences & Robotics",
        "Algebraic Foundations & Data Exploration",
        "Global Humanities & Debating Society",
        "Dual Language Options (Spanish, Mandarin, French)",
      ],
      icon: "Compass",
      featuredBadge: "Exploration Stage",
    },
    {
      id: "high-school-ap",
      title: "Senior School & Advanced Placement",
      level: "Grades 9 to 12",
      ageRange: "Ages 14 – 18",
      description:
        "Pre-university academic programs offering intensive Honors, AP courses, university counseling, and independent senior research capstones.",
      curriculumHighlights: [
        "22+ Advanced Placement (AP) Course Offerings",
        "Interdisciplinary STEM & Biomedical Pathways",
        "Individualized University & Career Counseling",
        "Senior Capstone Research & Defense Presentation",
      ],
      icon: "Award",
      featuredBadge: "College Preparatory",
    },
    {
      id: "stem-innovation",
      title: "Applied STEM & Digital Innovation",
      level: "All Divisions (Cross-Curricular)",
      ageRange: "Ages 7 – 18",
      description:
        "Practical engineering, algorithmic problem solving, digital arts, and scientific investigation preparing students for modern technological literacy.",
      curriculumHighlights: [
        "Robotics, CAD & 3D Prototyping Laboratory",
        "Python, Web Development & Data Analysis",
        "Sustainable Environmental Science Projects",
        "Participatory Science Olympiad & Hackathons",
      ],
      icon: "Cpu",
      featuredBadge: "Specialized Track",
    },
  ],
  announcements: schoolNews,
  events: schoolEvents,
  faculty: schoolFaculty,
  facilities: schoolFacilities,
  faqs: schoolFaqs,
  admissionSteps: admissionSteps,
  admissionDates: admissionDates,

  digitalPreviews: [
    {
      id: "ai-tutor",
      title: "AI Learning Assistant & Knowledge Bot",
      description:
        "An intelligent, safe educational assistant designed to explain difficult concepts, generate study summaries, and answer homework inquiries 24/7.",
      phase: "Phase 4 Development",
      icon: "Bot",
      highlights: [
        "Curriculum-aligned concept explanations",
        "Interactive math step-by-step problem solver",
        "Strict academic safety & pedagogical guardrails",
      ],
      statusBadge: "Phase 4 Roadmap",
    },
    {
      id: "digital-library",
      title: "Connected Digital Library & E-Resources",
      description:
        "A centralized repository of curated e-books, scholarly articles, video lectures, and syllabus study guides accessible from any device.",
      phase: "Phase 3 Development",
      icon: "Library",
      highlights: [
        "Searchable research papers and audiobooks",
        "Grade-filtered digital textbooks and notes",
        "Offline bookmarking and reading lists",
      ],
      statusBadge: "Phase 3 Roadmap",
    },
    {
      id: "quizzes-gamification",
      title: "Interactive Quizzes & Learning Games",
      description:
        "Engaging gamified formative assessments, challenge leaderboards, and subject badges to make daily revision motivating and fun.",
      phase: "Phase 3 Development",
      icon: "Gamepad2",
      highlights: [
        "Timed practice rounds with instant feedback",
        "Subject mastery badges & streak rewards",
        "Adaptive difficulty matching student progress",
      ],
      statusBadge: "Phase 3 Roadmap",
    },
    {
      id: "cyber-awareness",
      title: "Cybersecurity & Message Safety Guard",
      description:
        "Educational modules on digital citizenship, phishing detection drills, and automated warnings for suspicious online communications.",
      phase: "Phase 4 Development",
      icon: "ShieldCheck",
      highlights: [
        "Real-time heuristic suspicious message detection",
        "Age-appropriate internet safety tutorials",
        "Safe digital communication simulations",
      ],
      statusBadge: "Phase 4 Roadmap",
    },
  ],
};

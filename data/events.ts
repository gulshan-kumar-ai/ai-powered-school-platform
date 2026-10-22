import { EventItem } from "@/types";

export const schoolEvents: EventItem[] = [
  {
    id: "pakistan-day-celebration",
    title: "Pakistan Day Grand Celebration & Speech Competition",
    category: "community",
    date: "2026-03-23",
    time: "8:00 AM – 12:30 PM PKT",
    venue: "Grand Campus Assembly Grounds & Parade Plaza",
    summary:
      "Vibrant campus-wide commemoration featuring national flag hoisting, bilingual Urdu & Sindhi speech contests, national songs, and patriotic tableaus.",
    description:
      "Government Qazi Sultan Higher Secondary School, Kunri observes Pakistan Day (March 23rd) with deep patriotic fervor. Scholars from primary through higher secondary divisions participate in historical declamation contests, national anthem recitations, and student-acted drama tableaus highlighting the struggle for independence. The event is attended by community elders, School Management Committee (SMC) members, and parents.",
    speaker: "Principal Mr. Rehmatullah Lashari & SMC Leadership",
    audience: "Students, Guardians, Teachers & Community Guests",
    isPast: false,
    isDemo: false,
    agenda: [
      { time: "8:00 AM", title: "National Flag Hoisting & Guard of Honor" },
      { time: "8:30 AM", title: "Recitation from the Holy Quran & Hadith" },
      { time: "9:00 AM", title: "Inter-House Declamation & Speech Contests" },
      { time: "10:30 AM", title: "Patriotic Tableaus & National Song Ensembles" },
      { time: "11:45 AM", title: "Address by Principal & Prize Distribution for Orators" },
    ],
  },
  {
    id: "inter-school-football-tournament",
    title: "Regional Inter-School Football Championship Match",
    category: "athletics",
    date: "2026-11-18",
    time: "2:30 PM – 5:30 PM PKT",
    venue: "Main Campus Athletic Lawn & Football Grounds",
    summary:
      "The GQSHSS Kunri varsity football team hosts neighboring Umerkot District school squads in the annual regional tournament final.",
    description:
      "Football is a beloved pillar of student life at Government Qazi Sultan Higher Secondary School. The school coordinates this competitive tournament welcoming guest squads from across Kunri Taluka and Mirpur Khas Division. The tournament fosters athletic sportsmanship, camaraderie, physical fitness, and civic teamwork.",
    speaker: "Master Ghulam Rasool Kumbhar (Physical Education Teacher & Coach)",
    audience: "All Students, Alumni, Sports Enthusiasts & Regional Visitors",
    isPast: false,
    isDemo: false,
    agenda: [
      { time: "2:30 PM", title: "Team Lineup & Official Referee Briefing" },
      { time: "3:00 PM", title: "First Half Kick-off: GQSHSS Kunri vs Umerkot Combined" },
      { time: "3:50 PM", title: "Halftime Break & Parade Drill Exhibition" },
      { time: "4:15 PM", title: "Second Half Decider & Penalty Shootout (if tied)" },
      { time: "5:00 PM", title: "Trophy Presentation & Best Player Accolades" },
    ],
  },
  {
    id: "annual-prize-distribution",
    title: "Annual Terminal Examination Prize Distribution Ceremony",
    category: "academic",
    date: "2026-12-10",
    time: "9:30 AM – 1:30 PM PKT",
    venue: "Central Academic Complex Courtyard & Veranda",
    summary:
      "Prestigious recognition ceremony honoring Session 2025–2026 academic position holders, board laureates, and dedicated teaching faculty.",
    description:
      "An enduring institutional tradition at GQSHSS Kunri, the annual prize distribution honors exceptional student diligence and scholarship. Trophies, medals, and merit certificates are conferred upon the 1st, 2nd, and 3rd rank position holders across secondary and higher secondary grades, as well as outstanding science practical scholars and sports laureates.",
    speaker: "Mr. Rehmatullah Lashari (Principal) & Haji Ubaidullah Gill (SMC)",
    audience: "Position Holders, Enrolled Families, Teachers & SMC Members",
    isPast: false,
    isDemo: false,
    agenda: [
      { time: "9:30 AM", title: "Opening Tilawat & Welcome Address" },
      { time: "10:15 AM", title: "Academic Performance Review & Merit Report" },
      { time: "11:00 AM", title: "Conferral of Position Holder Trophies & Merit Certificates" },
      { time: "12:15 PM", title: "Distinguished Teacher & SMC Recognition Awards" },
      { time: "1:00 PM", title: "Concluding Address & Traditional Refreshments" },
    ],
  },
  {
    id: "bise-science-practical-workshop",
    title: "BISE Mirpur Khas Science Practical Examination Workshop",
    category: "academic",
    date: "2026-11-28",
    time: "8:30 AM – 1:00 PM PKT",
    venue: "Physics, Chemistry & Biology Science Laboratories",
    summary:
      "Hands-on preparatory laboratory practical sessions for Class IX, X, XI, and XII scholars under senior subject specialist supervision.",
    description:
      "Targeted board examination preparation focusing on required syllabus experiments under the Sindh Textbook Board. Students perform circuit analysis, titration experiments, salt identification, and optical bench experiments to prepare thoroughly for upcoming BISE Mirpur Khas practical assessments.",
    speaker: "Prof. Muhammad Tariq Memon & Prof. Abdul Samad Soomro",
    audience: "Matriculation (IX-X) & Intermediate (XI-XII) Science Scholars",
    isPast: false,
    isDemo: false,
    agenda: [
      { time: "8:30 AM", title: "Laboratory Safety & Board Guidelines Briefing" },
      { time: "9:00 AM", title: "Physics Practical Rotations: Vernier, Screw Gauge & Optics" },
      { time: "10:30 AM", title: "Chemistry Volumetric Analysis & Chemical Balance Sessions" },
      { time: "11:45 AM", title: "Biology Microscopic Specimen Analysis & Dissections" },
      { time: "12:30 PM", title: "Examiner Viva Voce Technique Coaching" },
    ],
  },
  {
    id: "campus-open-day-fall",
    title: "Station Road Campus Admissions & Orientation Open Day",
    category: "admissions",
    date: "2026-11-05",
    time: "9:00 AM – 12:30 PM PKT",
    venue: "Bab-e-Ibraheem Momin Main Gate & Academic Veranda",
    summary:
      "Welcoming prospective students and parents to discover academic programs, tour science classrooms, and consult admissions coordinators.",
    description:
      "Prospective students and guardians are invited to visit Government Qazi Sultan Higher Secondary School, Kunri. Walk through the historic tiled mosaic arches, visit the solar system science classroom, meet Principal Mr. Rehmatullah Lashari, and receive direct guidance on secondary and higher secondary enrollment pathways.",
    speaker: "Admissions Committee & Senior Faculty Heads",
    audience: "Prospective Scholars (Primary through Grade XI) & Parents",
    isPast: false,
    isDemo: false,
    agenda: [
      { time: "9:00 AM", title: "Arrival via Bab-e-Ibraheem Momin Gate & Welcome Desk" },
      { time: "9:45 AM", title: "Guided Walk: Academic Complex, Labs & Sports Grounds" },
      { time: "10:45 AM", title: "Subject Streams Presentation (Pre-Medical, Pre-Engineering)" },
      { time: "11:30 AM", title: "Interactive Admissions Q&A & Document Verification Desk" },
    ],
  },
];

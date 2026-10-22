import { AdmissionStep, AdmissionDate } from "@/types";

export const admissionSteps: AdmissionStep[] = [
  {
    step: 1,
    title: "Submit Admissions Inquiry",
    description:
      "Complete the online inquiry form to receive our official prospectus, view open house dates, and connect with our admissions counselors.",
    duration: "Day 1",
    actionHint: "Fill out the online form below",
  },
  {
    step: 2,
    title: "Attend a Campus Discovery Tour",
    description:
      "Visit our campus on a scheduled Tuesday or Thursday to experience classrooms, meet department chairs, and tour science and arts facilities.",
    duration: "Week 2 – 4",
    actionHint: "Book via Admissions Office",
  },
  {
    step: 3,
    title: "Complete Candidate Dossier",
    description:
      "Provide past two years of official academic transcripts, confidential teacher recommendations (English and Math/Science), and student personal statement.",
    duration: "Due Dec 15 (Priority) / Feb 1 (Regular)",
    actionHint: "Document checklist provided below",
  },
  {
    step: 4,
    title: "Student Shadow Day & Interview",
    description:
      "Applicants spend a half or full day paired with a student ambassador, attending sample seminars followed by a relaxed personal conversation with division deans.",
    duration: "January – February",
    actionHint: "Scheduled after dossier review",
  },
  {
    step: 5,
    title: "Decision & Enrollment Confirmation",
    description:
      "Admissions committee decisions and financial aid awards are released. Admitted families secure placement with an enrollment agreement.",
    duration: "March 10, 2027",
    actionHint: "Official letter & portal notification",
  },
];

export const admissionDates: AdmissionDate[] = [
  {
    date: "October 15, 2026",
    title: "Admissions Applications Open",
    description: "Online application system opens for all divisions (Kindergarten – Grade 12).",
    isPast: true,
  },
  {
    date: "November 5, 2026",
    title: "Fall Campus Open House",
    description: "Interactive campus tour and faculty symposium for prospective families.",
    isPast: false,
  },
  {
    date: "December 15, 2026",
    title: "Priority Application Deadline",
    description: "Early evaluation deadline for prioritized financial aid and placement.",
    isPast: false,
  },
  {
    date: "January 15, 2027",
    title: "Financial Aid Dossier Deadline",
    description: "Confidential financial assistance applications due to the Business Office.",
    isPast: false,
  },
  {
    date: "February 1, 2027",
    title: "Regular Decision Application Deadline",
    description: "Final deadline for candidate portfolios and required teacher recommendations.",
    isPast: false,
  },
  {
    date: "March 10, 2027",
    title: "Admissions Decisions Dispatched",
    description: "Admissions notifications and enrollment agreements released to families.",
    isPast: false,
  },
];

export const sampleTuitionSchedule = [
  {
    division: "Primary Division (Class I – V)",
    tuition: "100% Free Public Education",
    includes: "Free textbooks provided by Sindh Textbook Board Jamshoro, zero tuition charges under Sindh Education Department.",
  },
  {
    division: "Secondary School (Class VI – X Matric)",
    tuition: "Free Education (Nominal Annual Fund)",
    includes: "Sindh Textbook Board curriculum materials, science laboratory access, annual library & sports fund.",
  },
  {
    division: "Higher Secondary (Class XI – XII Intermediate)",
    tuition: "Government Subsidized (BISE Board Reg.)",
    includes: "Pre-Engineering & Pre-Medical lab chemicals, physics apparatus practical training, BISE Mirpur Khas registration and terminal examination subsidy.",
  },
];

export const requiredDocumentsList = [
  {
    title: "NADRA B-Form or Certified Birth Certificate",
    description: "Official government-issued identity proof for the student (original for verification with 2 attested copies).",
    isSample: false,
  },
  {
    title: "School Leaving Certificate (SLC) / Character Certificate",
    description: "Original transfer certificate from the previously attended recognized middle or primary school.",
    isSample: false,
  },
  {
    title: "Matriculation (SSC) Marks Sheet & Board Certificate",
    description: "For Class XI Intermediate admission: verified BISE marks sheet indicating eligibility for Pre-Medical or Pre-Engineering.",
    isSample: false,
  },
  {
    title: "Father / Guardian Computerized National Identity Card (CNIC)",
    description: "Attested photocopy of Father or legal guardian's valid CNIC card.",
    isSample: false,
  },
  {
    title: "Passport-Sized Photographs in School Uniform",
    description: "Four recent passport-size photographs with blue or white background for student profile & board card.",
    isSample: false,
  },
];

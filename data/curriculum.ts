export interface DepartmentInfo {
  id: string;
  name: string;
  overview: string;
  lead: string;
  courses: string[];
}

export interface APListing {
  code: string;
  title: string;
  category: "STEM & Mathematics" | "Humanities & Social Sciences" | "Languages & Arts";
  prerequisites: string;
  description: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  overview: string;
  lead: string;
  courses: string[];
}

export interface APListing {
  code: string;
  title: string;
  category: "STEM & Mathematics" | "Humanities & Social Sciences" | "Languages & Arts";
  prerequisites: string;
  description: string;
}

export const academicDepartments: DepartmentInfo[] = [
  {
    id: "physical-sciences",
    name: "Physical Sciences & Pre-Engineering",
    overview:
      "Delivering rigorous instruction in classical Newtonian mechanics, thermodynamics, electrodynamics, modern physics, and structured laboratory apparatus practicals.",
    lead: "Prof. Muhammad Tariq Memon, M.Sc. Physics",
    courses: [
      "Secondary Physics (Class IX & X)",
      "Intermediate Physics Part-I (Mechanics & Heat)",
      "Intermediate Physics Part-II (Electromagnetism & Nuclear)",
      "Higher Mathematics & Analytical Geometry",
      "Calculus, Differential Equations & Vectors",
      "BISE Physics Laboratory Practical Training",
    ],
  },
  {
    id: "chemical-biological",
    name: "Chemical Sciences & Pre-Medical (Life Sciences)",
    overview:
      "Comprehensive laboratory-backed instruction preparing aspiring doctors, pharmacists, and biochemists through intensive study of chemical reactions and biological systems.",
    lead: "Prof. Abdul Samad Soomro & Prof. Sikandar Ali Khaskheli",
    courses: [
      "Secondary Chemistry & Biology (Class IX & X)",
      "Intermediate Chemistry Part-I (Inorganic & Physical)",
      "Intermediate Chemistry Part-II (Organic & Applied)",
      "Intermediate Biology Part-I (Botany & Cell Systems)",
      "Intermediate Biology Part-II (Zoology, Physiology & Genetics)",
      "Chemical Qualitative Analysis & Microscopic Dissections",
    ],
  },
  {
    id: "mathematics-computing",
    name: "Mathematics, Computer Science & Information Technology",
    overview:
      "Cultivates rigorous algebraic logic, trigonometry, computational problem solving, data processing, and modern digital literacy.",
    lead: "Prof. Ghulam Mustafa Nohri, M.Sc. Mathematics",
    courses: [
      "Matriculation Mathematics (Algebra & Geometry)",
      "Intermediate Higher Mathematics (College Level)",
      "Computer Science Fundamentals & Information Technology",
      "Algorithm Design & Flowcharting",
      "Database Systems & Electronic Spreadsheet Operations",
    ],
  },
  {
    id: "languages-humanities",
    name: "Languages, Humanities & Islamic Studies",
    overview:
      "Instilling cultural eloquence, ethical character, national pride, and historical consciousness across Sindhi, Urdu, English, Pakistan Studies, and Islamic Education.",
    lead: "Senior Humanities Faculty",
    courses: [
      "Sindhi Literature & Grammar (Class IX to XII)",
      "Urdu Compulsory & Eloquent Rhetoric",
      "English Compulsory & Functional Composition",
      "Pakistan Studies (National History & Geo-Politics)",
      "Islamic Studies / Ethics (Character & Moral Philosophy)",
    ],
  },
  {
    id: "athletics-sports",
    name: "Physical Education, Football & Athletics",
    overview:
      "Encouraging physical stamina, sportsmanship, and civic teamwork through regular morning drills and competitive inter-school football tournaments.",
    lead: "Master Ghulam Rasool Kumbhar, PET & Football Coach",
    courses: [
      "Morning Assembly Parade Discipline & Drill Routine",
      "Inter-School Football Championship Training",
      "Track & Field Athletics (Sprints, Relays, Long Jump)",
      "Table Tennis & Badminton Racket Sports",
      "First Aid, Health & Sportsmanship Ethics",
    ],
  },
];

export const apCoursesDirectory: APListing[] = [
  {
    code: "HSC-PHYSICS",
    title: "Higher Secondary Physics (Theory & Practicals)",
    category: "STEM & Mathematics",
    prerequisites: "Matriculation (SSC) Science with Grade B or above",
    description:
      "Two-year college-preparatory syllabus encompassing vector mechanics, wave optics, electrostatics, electromagnetic induction, atomic spectra, and hands-on laboratory apparatus sessions.",
  },
  {
    code: "HSC-CHEMISTRY",
    title: "Higher Secondary Chemistry (Organic & Inorganic)",
    category: "STEM & Mathematics",
    prerequisites: "Matriculation (SSC) Science Group",
    description:
      "In-depth investigation of atomic structure, periodic trends, chemical bonding, organic hydrocarbon reactions, aromatic compounds, volumetric titrations, and qualitative salt analysis.",
  },
  {
    code: "HSC-BIOLOGY",
    title: "Higher Secondary Biology (Botany & Zoology)",
    category: "STEM & Mathematics",
    prerequisites: "Matriculation Science (Pre-Medical Option)",
    description:
      "Rigorous pre-medical preparation covering cellular biology, plant anatomy, human physiology, nervous coordination, genetics, biotechnology, and dissection practicals.",
  },
  {
    code: "HSC-MATH",
    title: "Intermediate Higher Mathematics",
    category: "STEM & Mathematics",
    prerequisites: "Matriculation Mathematics with Strong Algebra Foundation",
    description:
      "College-level mathematics covering matrices, determinants, trigonometry, analytic geometry of straight lines and conic sections, differentiation, and integral calculus.",
  },
  {
    code: "SSC-ENG-COMP",
    title: "Secondary English Compulsory & Reading Comprehension",
    category: "Humanities & Social Sciences",
    prerequisites: "Middle School Completion (Grade 8)",
    description:
      "Grammatical accuracy, formal essay writing, precis writing, comprehension of classic and contemporary prose, and communicative spoken English.",
  },
  {
    code: "SSC-PAK-STUDIES",
    title: "Pakistan Studies & Constitutional Heritage",
    category: "Humanities & Social Sciences",
    prerequisites: "Secondary Class Enrollment",
    description:
      "Chronological overview of the Pakistan Movement, ideological foundations, geo-strategic significance of Sindh, natural resources, and civic governance.",
  },
  {
    code: "LANG-SINDHI",
    title: "Sindhi Language & Cultural Literature",
    category: "Languages & Arts",
    prerequisites: "Provincial Curriculum Standards",
    description:
      "Study of classical Sindhi poetry, Sufi heritage (Shah Abdul Latif Bhittai), modern prose, grammar, and communicative dialogue.",
  },
  {
    code: "LANG-URDU",
    title: "Urdu Literature, Nazm & Ghazal Heritage",
    category: "Languages & Arts",
    prerequisites: "Secondary Education Track",
    description:
      "Exploration of classical Urdu poetry (Allama Iqbal, Mirza Ghalib), contemporary national literature, essay composition, and speech declamation.",
  },
];

export const graduationRequirements = [
  { subject: "Secondary School Certificate (SSC / Matric)", credits: "Class IX & X", note: "BISE Mirpur Khas Board Examinations (Science / General Group)" },
  { subject: "Higher Secondary Certificate (HSC / Inter)", credits: "Class XI & XII", note: "Pre-Engineering or Pre-Medical streams under BISE Mirpur Khas" },
  { subject: "Physics, Chemistry & Biology Practicals", credits: "Mandatory", note: "Supervised science laboratory journal and viva voce certification" },
  { subject: "Mathematics / Higher Mathematics", credits: "Core Requirement", note: "Continuous secondary and higher secondary quantitative curriculum" },
  { subject: "Languages (Urdu, Sindhi & English)", credits: "Bilingual Core", note: "Comprehensive literary fluency and grammar assessment" },
  { subject: "Pakistan Studies & Islamic Studies / Ethics", credits: "Civic Core", note: "National identity, historical knowledge, and moral education" },
  { subject: "Physical Education & Sports", credits: "Campus Life", note: "Regular morning assembly drills and football participation" },
  { subject: "Terminal & Model Examinations", credits: "Annual", note: "Formal internal assessments and merit-based rank positioning" },
];

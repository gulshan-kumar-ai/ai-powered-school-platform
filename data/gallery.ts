export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "architecture" | "academics" | "achievements" | "campus-life" | "heritage";
  categoryLabel: string;
  image: string;
  caption: string;
  location: string;
  date: string;
  featured?: boolean;
  aspect?: string;
  dimensions?: { width: number; height: number };
}

export const galleryCategories = [
  { id: "all", label: "All Photographs", count: 12 },
  { id: "architecture", label: "Campus Architecture", count: 3 },
  { id: "academics", label: "Academic Inquiry", count: 1 },
  { id: "achievements", label: "Honors & Awards", count: 2 },
  { id: "campus-life", label: "Student Traditions", count: 2 },
  { id: "heritage", label: "Insignia & Leadership", count: 4 },
] as const;

export const schoolGallery: GalleryItem[] = [
  {
    id: "main-building",
    title: "Central Academic Complex & Allama Iqbal Monument",
    category: "architecture",
    categoryLabel: "Campus Architecture",
    image: "/images/school/main-building.jpg",
    caption:
      "The historic main academic building featuring Sindh's traditional glazed blue-tile mosaic arched portico and the iconic Allama Iqbal open-book and candle sculpture symbolizing the light of education ('Zindagi Shama Ki Soorat Ho Khudaya Meri').",
    location: "Central Academic Quadrangle, Station Road Campus",
    date: "Architectural Heritage",
    featured: true,
    dimensions: { width: 1200, height: 900 },
  },
  {
    id: "morning-assembly",
    title: "Grand Campus Assembly Grounds & Parade Plaza",
    category: "campus-life",
    categoryLabel: "Student Traditions",
    image: "/images/school/morning-assembly.jpg",
    caption:
      "Hundreds of scholars gathered in disciplined uniform columns under the Pakistan national flag for the daily morning assembly, national anthem, Tilawat, and character addresses by senior faculty.",
    location: "Grand Assembly Grounds & Parade Field",
    date: "Daily Morning Tradition",
    featured: true,
    dimensions: { width: 1200, height: 750 },
  },
  {
    id: "position-holders-2026",
    title: "Annual Merit Laureates & Position Holders 2025–2026",
    category: "achievements",
    categoryLabel: "Honors & Awards",
    image: "/images/school/position-holders-2026.jpg",
    caption:
      "Official award banner celebrating the 1st, 2nd, and 3rd position holders across secondary and higher secondary examinations, honored with trophies, merit certificates, and traditional Sindhi ajraks and topis.",
    location: "Campus Courtyard Stage",
    date: "Session 2025–2026 Annual Awards",
    featured: true,
    dimensions: { width: 1200, height: 900 },
  },
  {
    id: "principal-rahmatullah-lashari",
    title: "Sir Rahmatullah Lashari — Principal of School",
    category: "heritage",
    categoryLabel: "Insignia & Leadership",
    image: "/images/school/principal-rahmatullah-lashari.jpg",
    caption:
      "Portrait of Sir Rahmatullah Lashari, Principal of Government Boys Qazi Sultan Higher Secondary School, Kunri, Sindh, pictured in traditional attire before the historic blue-and-white tiled arches of the central academic block.",
    location: "Main Building Arched Portico, GBHSS Qazi Sultan Kunri",
    date: "Institutional Leadership",
    featured: true,
    dimensions: { width: 960, height: 960 },
  },
  {
    id: "classroom-space-mural",
    title: "Solar System Science Classroom & Astronomy Hall",
    category: "academics",
    categoryLabel: "Academic Inquiry",
    image: "/images/school/classroom-space-mural.jpg",
    caption:
      "Scholars seated at traditional solid-wood writing desks during supervised examination sittings beneath the expansive hand-painted solar system planetary wall mural.",
    location: "Secondary Science Block, Room 4",
    date: "Classroom Instruction",
    featured: true,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "official-logo-seal",
    title: "Official Institutional Crest & Insignia Seal",
    category: "heritage",
    categoryLabel: "Insignia & Memorials",
    image: "/images/school/logo.png",
    caption:
      "The official circular crest of Government Qazi Sultan Higher Secondary School, Kunri. Rich royal blue and gold emblem featuring the sacred flame torch (Masha'al / Shama-e-Ilm), radiating sunburst rays, open book of wisdom, and Arabic calligraphy 'علم'.",
    location: "Institutional Heraldry & Official Seal",
    date: "Chartered 1988",
    featured: true,
    dimensions: { width: 1024, height: 1024 },
  },
  {
    id: "certificate-distribution",
    title: "Board Examination Certificate & Merit Distribution",
    category: "achievements",
    categoryLabel: "Honors & Awards",
    image: "/images/school/certificate-distribution.jpg",
    caption:
      "Students proudly displaying their official BISE Mirpur Khas examination certificates and result dossiers before the traditional blue-and-white glazed mosaic pillars.",
    location: "Main Building Academic Colonnade",
    date: "Annual Result Conferral",
    featured: false,
    dimensions: { width: 1200, height: 900 },
  },
  {
    id: "main-gate",
    title: "Bab-e-Ibraheem Momin Main Campus Entrance Gate",
    category: "architecture",
    categoryLabel: "Campus Architecture",
    image: "/images/school/main-gate.jpg",
    caption:
      "The imposing campus gateway 'Bab-e-Ibraheem Momin' on Station Road, featuring security post infrastructure, perimeter neem shade trees, and Town Committee Kunri direction signage.",
    location: "Station Road Arrival Corridor",
    date: "Campus Perimeter Gateway",
    featured: false,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "mural-verse",
    title: "Calligraphic Quranic Motto Wall (Surah An-Najm 53:39)",
    category: "heritage",
    categoryLabel: "Insignia & Memorials",
    image: "/images/school/mural-verse.jpg",
    caption:
      "Prominent campus wall mural carrying the sacred inscription: 'وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ' ('And that man can have nothing but what he strives for'), establishing our daily moral compass and ethos of honest diligence.",
    location: "Central Gathering Plaza & Courtyard",
    date: "Permanent Moral Foundation",
    featured: true,
    dimensions: { width: 1200, height: 900 },
  },
  {
    id: "corridor-veranda",
    title: "Academic Wing Veranda & Shaded Colonnade",
    category: "architecture",
    categoryLabel: "Campus Architecture",
    image: "/images/school/corridor-veranda.jpg",
    caption:
      "Sheltered academic breezeway featuring traditional blue-and-white pillars, lush potted flora, and high-ceiling stone circulation corridors connecting classrooms to the Principal's chamber.",
    location: "Senior Academic Wing",
    date: "Campus Walkways",
    featured: false,
    dimensions: { width: 1200, height: 800 },
  },
  {
    id: "monument-smc",
    title: "SMC Link Road Dedication Monument",
    category: "heritage",
    categoryLabel: "Insignia & Memorials",
    image: "/images/school/monument-smc.jpg",
    caption:
      "Commemorative marble monument celebrating the campus link road constructed on a self-help basis through the School Management Committee (SMC), inaugurated October 12, 2019 by Chairman Town Committee Shakeel Ahmed Bajwa and Principal Prof. Rahmatullah Lashari.",
    location: "Approach Link Road & Campus Frontage",
    date: "Inaugurated October 12, 2019",
    featured: false,
    dimensions: { width: 1200, height: 750 },
  },
  {
    id: "outdoor-learning",
    title: "Open-Air Study Quadrangle & Green Lawns",
    category: "campus-life",
    categoryLabel: "Student Traditions",
    image: "/images/school/outdoor-learning.jpg",
    caption:
      "Lush shaded green lawns where scholars participate in open-air academic reviews, group study circles, and quiet examination sessions amidst natural breezes and mature foliage.",
    location: "Campus Botanical Garden Lawns",
    date: "Academic Study Sessions",
    featured: false,
    dimensions: { width: 1200, height: 800 },
  },
];

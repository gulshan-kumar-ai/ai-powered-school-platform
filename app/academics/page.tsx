import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { ProgramCard } from "@/components/ui/ProgramCard";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/ui/CTASection";
import {
  academicDepartments,
  apCoursesDirectory,
  graduationRequirements,
} from "@/data/curriculum";
import {
  Award,
  CheckCircle2,
} from "lucide-react";


export const metadata: Metadata = {
  title: "Academic Curriculum & Board Pathways | Government Qazi Sultan Higher Secondary School, Kunri",
  description:
    "Explore the academic framework of Government Qazi Sultan Higher Secondary School, Kunri. Pre-Engineering, Pre-Medical, Matriculation, BISE Mirpur Khas practical laboratories, and Sindh Textbook Board curriculum.",
};

export default function AcademicsPage() {
  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="Sindh Textbook Board & BISE Mirpur Khas"
        badgeVariant="accent"
        title="Scholarly Rigor, Intellectual Passion, Lifelong Mastery"
        description="Comprehensive public education extending from foundational primary learning through Higher Secondary (Class XI & XII), preparing scholars for collegiate distinction in Pre-Engineering, Pre-Medical, and Humanities."
        breadcrumbs={[{ label: "Academics" }]}
        actions={
          <Button href="/admissions" variant="primary" size="md">
            Admissions &amp; Enrollment
          </Button>
        }
      />

      {/* 2. Educational Pedagogy Overview */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Teaching Methodology &amp; Academic Framework
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight">
                Grounded in Diligence, Inquiry &amp; Practical Science
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                At {siteConfig.name}, our curriculum transitions students from foundational literacy to advanced college-preparatory coursework dictated by the Sindh Textbook Board and examined under the Board of Intermediate and Secondary Education (BISE) Mirpur Khas.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Led by veteran educators and subject specialists in Physics, Chemistry, Biology, and Higher Mathematics, our students engage in rigorous classroom instruction reinforced by supervised laboratory experiments and regular terminal examinations.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>BISE Mirpur Khas Board Curriculum</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                  <span>Pre-Medical &amp; Pre-Engineering Streams</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Supervised Science Lab Practicals</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 font-medium p-3 bg-slate-50 rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Merit-Based Terminal Rank Laureates</span>
                </div>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f2744] to-[#08162b] text-white p-6 sm:p-8 rounded-2xl shadow-md border border-slate-800">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-sky-400" />
                <span>Academic Hallmarks</span>
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-b border-white/10 pb-3">
                  <div className="text-2xl font-extrabold text-sky-400">Class I – XII</div>
                  <div className="text-slate-300">Complete Educational Pathways (Primary to Higher Secondary)</div>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <div className="text-2xl font-extrabold text-teal-400">BISE Mirpur Khas</div>
                  <div className="text-slate-300">Official Provincial Board Affiliation &amp; Exam Center</div>
                </div>

                <div className="border-b border-white/10 pb-3">
                  <div className="text-2xl font-extrabold text-indigo-300">Physics &amp; Chemistry</div>
                  <div className="text-slate-300">Dedicated Science Practical Counter Facilities</div>
                </div>

                <div>
                  <div className="text-2xl font-extrabold text-amber-300">Annual Merit Honors</div>
                  <div className="text-slate-300">Trophies &amp; Certificates for Top Position Holders</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Academic Divisions Grid */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="accent" size="sm" className="mb-2">
              Four Core Pathways
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Divisions & Academic Programs
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Each educational division is developmentally calibrated to build foundational confidence,
              intellectual independence, and college readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.academicPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Departments & Course Catalog */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="secondary" size="sm" className="mb-2">
              Academic Departments
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Subject Departments & Course Offerings
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Our multidisciplinary departments deliver comprehensive curricula spanning theoretical sciences,
              creative arts, and global cultural perspectives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicDepartments.map((dept) => (
              <Card key={dept.id} className="border-slate-200/90 bg-white flex flex-col justify-between">
                <CardHeader className="pb-3">
                  <div className="text-[11px] font-semibold text-[#0284c7] uppercase tracking-wider mb-1">
                    Department Chair: {dept.lead}
                  </div>
                  <CardTitle className="text-lg text-[#0f2744]">
                    {dept.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4 flex-1">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {dept.overview}
                  </p>

                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-2">
                      Featured Courses:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {dept.courses.map((course, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0" />
                          <span>{course}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. AP Directory & Course Catalog */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="navy" size="sm" className="mb-2">
              BISE Mirpur Khas Syllabi
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Secondary &amp; Higher Secondary Course Offerings
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Key board-examined courses across Pre-Engineering, Pre-Medical, Computer Science, and Humanities under the Sindh Textbook Board.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {apCoursesDirectory.map((ap) => (
              <div
                key={ap.code}
                className="bg-white p-5 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                      {ap.code}
                    </span>
                    <Badge variant="secondary" size="sm">
                      {ap.category.split(" ")[0]}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-sm text-[#0f2744] mb-1">
                    {ap.title}
                  </h4>
                  <div className="text-[11px] text-sky-700 font-medium mb-3">
                    Prereq: {ap.prerequisites}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ap.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. Graduation Requirements Matrix */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-10">
            <Badge variant="accent" size="sm" className="mb-2">
              Board Certification Standards
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Matriculation &amp; Intermediate Completion Criteria
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Official assessment standards for the Secondary School Certificate (SSC / Class X) and Higher Secondary Certificate (HSC / Class XII) under BISE Mirpur Khas.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90 shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-[#0f2744] text-white text-xs uppercase font-semibold">
                <tr>
                  <th scope="col" className="px-6 py-4">Academic Discipline</th>
                  <th scope="col" className="px-6 py-4">Required Credits</th>
                  <th scope="col" className="px-6 py-4">Curriculum Guidelines & Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {graduationRequirements.map((req, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                    <td className="px-6 py-3.5 font-bold text-[#0f2744]">{req.subject}</td>
                    <td className="px-6 py-3.5 font-semibold text-[#0284c7]">{req.credits}</td>
                    <td className="px-6 py-3.5 text-slate-600">{req.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* 7. Real Academic Achievements & Campus Life in Action */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm">
                Academic Distinctions
              </Badge>
              <Badge variant="accent" size="sm">
                Session 2025–2026 Honors
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Celebrating Academic Striving &amp; Student Laurels
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              At Qazi Sultan Boys Higher Secondary School, Kunri, Sindh, intellectual discipline and diligence are celebrated with pride. From annual position holders to interactive astronomy and outdoor examination sessions, our students thrive through active learning.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-6">
            {/* Left 7 Columns: Top Position Holders Official Banner Feature */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
                <Image
                  src="/images/school/position-holders-2026.jpg"
                  alt="Official School Top Position Holders Session 2025-2026 - Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4">
                  <Badge variant="accent" size="sm">
                    Annual Academic Laureates
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs uppercase tracking-wider font-semibold text-sky-300">
                    Qazi Sultan Boys Higher Secondary School
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mt-0.5">
                    School Top Position Holders (Session 2025–2026)
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-slate-600 leading-relaxed">
                  Honoring the distinguished scholars who secured 1st, 2nd, and 3rd positions in annual board and school-wide evaluations. Trophies and commendations were awarded in the presence of faculty heads and community elders, embodying the school motto: <em>&ldquo;And that man can have nothing but what he strives for.&rdquo;</em>
                </p>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-center">
                  <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
                    <div className="text-xs font-bold text-amber-800">1st Position</div>
                    <div className="text-[11px] text-amber-900/80 mt-0.5 font-medium">Gold Trophy Honor</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200">
                    <div className="text-xs font-bold text-slate-800">2nd Position</div>
                    <div className="text-[11px] text-slate-600 mt-0.5 font-medium">Silver Trophy Honor</div>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-100/50 border border-amber-200/50">
                    <div className="text-xs font-bold text-amber-900">3rd Position</div>
                    <div className="text-[11px] text-amber-800 mt-0.5 font-medium">Bronze Trophy Honor</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Certificate Distribution & Science Classroom in action */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              {/* Certificate Distribution Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/school/certificate-distribution.jpg"
                    alt="Students receiving official examination certificates at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-bold">Annual Examination Merit Distribution</div>
                    <div className="text-[11px] text-slate-300">Awarded before the historic mosaic arches</div>
                  </div>
                </div>
                <div className="p-4 text-xs text-slate-600 leading-relaxed">
                  Scholars proudly displaying official board certificates and result dossiers following successful secondary evaluations.
                </div>
              </div>

              {/* Classroom Solar System Space Mural Card */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden group">
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <Image
                    src="/images/school/classroom-space-mural.jpg"
                    alt="Solar System Science Classroom and Examination at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs font-bold">Astronomy &amp; Science Learning Room</div>
                    <div className="text-[11px] text-slate-300">Supervised study with planetary science mural</div>
                  </div>
                </div>
                <div className="p-4 text-xs text-slate-600 leading-relaxed">
                  Active examination and conceptual science sessions with teacher guidance under visual celestial murals.
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 8. CTA Section */}
      <CTASection
        title="Ready to Explore Our Academic Community?"
        description="Connect with our academic advising team or begin your online application for the upcoming academic year."
        primaryActionLabel="Start Admissions Process"
        primaryActionHref="/admissions"
        secondaryActionLabel="Contact Admissions Office"
        secondaryActionHref="/contact"
      />
    </div>
  );
}

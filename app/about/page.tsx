import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FacilityCard } from "@/components/ui/FacilityCard";
import { CTASection } from "@/components/ui/CTASection";
import {
  GraduationCap,
  BookOpen,
  HeartHandshake,
  Compass,
  Mail,
  ShieldCheck,
  Calendar,
  Building,
  Sparkles,
} from "lucide-react";


export const metadata: Metadata = {
  title: "About Our School | Heritage, Leadership & Facilities",
  description:
    "Discover the history, educational mission, School Management Committee (SMC) leadership, and authentic campus facilities of Qazi Sultan Boys Higher Secondary School, Kunri, Sindh.",
};

const historyMilestones = [
  {
    year: "1988",
    title: "Founding Charter & Campus Establishment",
    description:
      "Established as a secondary institution dedicated to serving the youth of Kunri and surrounding districts with accessible, high-standard education.",
  },
  {
    year: "2013",
    title: "Bab-e-Ibraheem Momin & Campus Fortification",
    description:
      "Constructed the dedicated Bab-e-Ibraheem Momin main campus gates and security infrastructure under the School Management Committee leadership.",
  },
  {
    year: "2019",
    title: "Link Road Inauguration & Self-Help Development",
    description:
      "Constructed the campus link road on a self-help basis through the School Management Committee (SMC), inaugurated by Town Committee Chairman Shakeel Ahmed Bajwa and Principal Prof. Rahmatullah Lashari.",
  },
  {
    year: "2026",
    title: "Smart Digital Management System",
    description:
      "Modernized school operations with a role-based Smart School Management System connecting students, parents, teachers, and administrators.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="Institutional Profile"
        badgeVariant="accent"
        title="Heritage of Inquiring Minds, Tradition of Excellence"
        description={`Founded in ${siteConfig.established}, ${siteConfig.name} empowers scholars through intellectual rigor, moral integrity, creative arts, and cutting-edge STEM literacy.`}
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* 2. Heritage & History Section */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Our Foundation Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight">
                A Legacy of Educational Striving in Kunri
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {siteConfig.name} was founded with a clear and enduring purpose: to provide the youth of Kunri and the wider district with high-caliber education grounded in moral integrity, intellectual striving, and civic consciousness.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                The institution has flourished through collaborative community support and the dedicated stewardship of the School Management Committee (SMC). Landmark campus improvements — including the Bab-e-Ibraheem Momin gateway and the link road connecting town infrastructure to school grounds — have been achieved through active community partnership on a self-help basis.
              </p>

              {/* SMC Monument feature badge */}
              <div className="relative rounded-xl overflow-hidden border border-slate-200/90 shadow-sm mt-3 bg-slate-900 group">
                <Image
                  src="/images/school/monument-smc.jpg"
                  alt="School Management Committee Link Road Monument at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                  width={600}
                  height={350}
                  className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent p-3.5 flex flex-col justify-end text-white">
                  <div className="text-xs font-bold text-sky-300">
                    SMC Self-Help Link Road Memorial
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    Dedicated by Chairman SMC Haji Ubedullah Gill &amp; Principal Prof. Rahmatullah Lashari
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-4 text-xs font-medium text-slate-600">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Sindh Education Department</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  <span>Secondary &amp; Higher Secondary</span>
                </span>
              </div>
            </div>

            {/* Historical Milestones */}
            <div className="lg:col-span-6 bg-slate-50/70 p-6 sm:p-8 rounded-2xl border border-slate-200/80">
              <h3 className="text-lg font-bold text-[#0f2744] mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#0284c7]" />
                <span>Key Institutional Milestones</span>
              </h3>

              <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-6">
                {historyMilestones.map((milestone, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#0284c7] group-hover:bg-[#0284c7] transition-colors" />

                    <div className="text-xs font-bold text-[#0284c7] font-mono">
                      {milestone.year}
                    </div>
                    <div className="font-bold text-sm text-[#0f2744] mt-0.5">
                      {milestone.title}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2.5 Official School Crest & Insignia Heraldry */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80">
        <Container>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Crest Emblem Showcase */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-50 to-sky-50/40 rounded-2xl border border-sky-100">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 drop-shadow-xl hover:scale-105 transition-transform duration-300">
                  <Image
                    src="/images/school/logo.png"
                    alt="Official Crest of Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                    width={220}
                    height={220}
                    priority
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="mt-4">
                  <div className="text-xs font-bold text-[#0f2744] uppercase tracking-wider">
                    Official Institutional Seal
                  </div>
                  <div className="text-[11px] text-slate-500 font-arabic mt-1" dir="rtl">
                    گورنمنٹ بوائز ہائر سیکنڈری اسکول قاضی سلطان کنری
                  </div>
                </div>
              </div>

              {/* Symbolism Details */}
              <div className="lg:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-xs font-bold text-[#0284c7]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Heraldic Symbolism &amp; Mottos</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight">
                  The Crest of Knowledge and Character
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  The official seal of <strong>Qazi Sultan Boys Higher Secondary School, Kunri</strong> embodies our profound commitment to scholarship, spiritual illumination, and civic responsibility in Sindh.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                    <div className="text-xs font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span>Shama-e-Ilm &amp; Radiating Sun</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The central flame torch (Masha&apos;al) and sunburst rays symbolize the illumination of ignorance through science, literature, and moral clarity.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                    <div className="text-xs font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                      <span>Open Book &amp; Calligraphy &ldquo;علم&rdquo;</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      The open volume paired with the Arabic calligraphy for &ldquo;Ilm&rdquo; honors our perpetual pursuit of inquiry, critical thinking, and wisdom.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                    <div className="text-xs font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Royal Blue &amp; Gold Ring</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Royal blue represents intellectual discipline and steadfast integrity, bordered in luminous gold signifying institutional dignity and excellence.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50">
                    <div className="text-xs font-bold text-[#0f2744] flex items-center gap-1.5 mb-1">
                      <span className="w-2 h-2 rounded-full bg-[#0f2744]" />
                      <span>Bilingual Banner Ribbon</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Inscribed with pride in English and Urdu/Sindhi, affirming deep cultural roots in Kunri alongside global scientific readiness.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Vision, Mission & Values */}
      <section className="py-16 sm:py-24 bg-slate-50/60 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="secondary" size="md" className="mb-3">
              Guiding Philosophy
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Mission, Vision & Core Pillars
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              The fundamental convictions that govern our pedagogy, curriculum design, and student life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-white border-slate-200/90 shadow-xs">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center mb-2">
                  <Compass className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl text-[#0f2744]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {siteConfig.values.vision}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-slate-200/90 shadow-xs">
              <CardHeader className="pb-3">
                <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0f2744] flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5" />
                </div>
                <CardTitle className="text-xl text-[#0f2744]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {siteConfig.values.mission}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* 4 Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteConfig.values.coreValues.map((val) => (
              <div
                key={val.title}
                className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-shadow"
              >
                <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-[#0f2744] mb-1.5">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Real Student Life & Morning Assembly Tradition */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative group">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-lg bg-slate-900 aspect-[16/10]">
                <Image
                  src="/images/school/morning-assembly.jpg"
                  alt="Daily Morning Assembly and Parade Ground at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xs font-bold text-sky-300">
                    Grand Campus Assembly Grounds
                  </div>
                  <div className="text-sm font-semibold mt-0.5">
                    Disciplined morning gathering under the national flag
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Campus Culture &amp; Unity
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight">
                Daily Morning Assembly &amp; Civic Discipline
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every school morning begins with a unified assembly on our expansive parade grounds. Hundreds of scholars stand in disciplined columns for the national anthem, Quranic recitation, and moral guidance from senior teachers.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                This cherished daily tradition builds mutual respect, time management, patriotic duty, and collective identity across all grades.
              </p>

              <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="font-bold text-[#0f2744]">Daily Anthem</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">National pride &amp; unity</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                  <div className="font-bold text-[#0f2744]">Value Guidance</div>
                  <div className="text-slate-500 text-[11px] mt-0.5">Ethical morning address</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3.8 Principal's Desk: Executive Address */}
      <section id="principals-message" className="py-16 sm:py-24 bg-white border-b border-slate-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <Container>
          <div className="rounded-3xl border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-white p-6 sm:p-10 lg:p-12 shadow-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-[#0f2744] via-[#0284c7] to-teal-500" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Principal Photo Showcase */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  <div className="absolute -inset-2.5 rounded-3xl bg-gradient-to-tr from-sky-500/25 via-teal-500/20 to-amber-400/25 blur-lg group-hover:blur-xl transition-all" />
                  
                  <div className="relative w-64 h-72 sm:w-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-slate-950">
                    <Image
                      src="/images/school/principal-rahmatullah-lashari.jpg"
                      alt="Sir Rahmatullah Lashari, Principal of Govt. Boys Qazi Sultan Higher Secondary School, Kunri"
                      fill
                      priority
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 640px) 256px, 320px"
                    />

                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-sky-400/40 shadow-md">
                      <span className="text-[11px] font-black text-amber-300 tracking-wider uppercase">
                        Principal of School
                      </span>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-4 text-white">
                      <div className="text-base sm:text-lg font-black tracking-wide">
                        Sir Rahmatullah Lashari
                      </div>
                      <div className="text-xs text-sky-200">
                        Principal &amp; Institutional Head
                      </div>
                      <div className="text-[10px] text-slate-300 mt-0.5">
                        Govt. Boys Qazi Sultan Higher Secondary School, Kunri
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-[#0f2744] text-xs font-semibold border border-slate-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    <span>Sindh Education &amp; Literacy Department</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    M.Sc., M.Ed. • Executive Institutional Governance
                  </div>
                </div>
              </div>

              {/* Principal's Official Address */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm">
                    Principal&apos;s Desk
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">
                    Official Executive Address
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f2744] tracking-tight leading-tight">
                  &ldquo;Nurturing Striving Scholars, Serving Our Community with Honor&rdquo;
                </h2>

                {/* Quranic Anchor */}
                <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-base sm:text-lg font-arabic font-bold text-[#0f2744]" dir="rtl">
                    وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
                  </span>
                  <span className="text-xs text-slate-600 italic">
                    &ldquo;And that man can have nothing but what he strives for&rdquo; (Surah An-Najm 53:39)
                  </span>
                </div>

                <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Assalamu Alaikum and warm greetings to our students, parents, esteemed faculty, and respected community elders. As Principal of <strong>Government Boys Qazi Sultan Higher Secondary School, Kunri</strong>, it is my profound honor to guide an institution steeped in character, scholastic discipline, and public service.
                  </p>
                  <p>
                    Our mission is rooted in the belief that education is the ultimate catalyst for human elevation. We do not merely prepare students for examinations; we cultivate inquiring minds, moral uprightness, and civic responsibility. In our classrooms and practical science laboratories, our dedicated faculty prepare scholars for BISE Mirpur Khas board excellence across Pre-Medical, Pre-Engineering, and General Science disciplines.
                  </p>
                  <p>
                    Through the enduring collaboration of the School Management Committee (SMC), patron leaders like Haji Ubaidullah Gill, and our supportive local community, we continue to enhance our academic environment on a proud self-help foundation. Whether in academic laureates, athletic camaraderie, or digital innovation, our boys are prepared to serve Sindh and Pakistan with distinction.
                  </p>
                </div>

                {/* Signature Block */}
                <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-lg font-extrabold text-[#0f2744]">
                      Sir Rahmatullah Lashari
                    </div>
                    <div className="text-xs font-medium text-slate-600">
                      Principal of School • GBHSS Qazi Sultan Kunri
                    </div>
                    <div className="text-[11px] text-sky-700 font-mono mt-0.5">
                      principal@qazisultanboys.edu.pk
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button href="/contact" variant="primary" size="sm">
                      Contact Principal&apos;s Office
                    </Button>
                    <Button href="/academics" variant="outline" size="sm">
                      Explore Programs
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* 4. Leadership & Faculty */}
      <section className="py-16 sm:py-24 bg-slate-50/50 border-b border-slate-200/80">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="navy" size="sm">
                  School Administration
                </Badge>
                <Badge variant="accent" size="sm">
                  BISE Mirpur Khas Affiliated
                </Badge>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
                Institutional Leadership &amp; Senior Faculty
              </h2>
              <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl">
                Led by Principal Sir Rahmatullah Lashari and the School Management Committee (SMC), our dedicated educators foster academic rigor, scientific inquiry, and civic integrity in Kunri, Sindh.
              </p>
            </div>

            <Button href="/contact" variant="outline" size="sm">
              Contact Leadership Office
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteConfig.faculty.map((member) => (
              <Card key={member.id} className="border-slate-200/90 bg-white flex flex-col justify-between hover:border-sky-300 hover:shadow-md transition-all">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-semibold text-[#0284c7] uppercase tracking-wider">
                      {member.department}
                    </span>
                    {member.image ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-500 shadow-xs shrink-0 bg-slate-900">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="44px"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-slate-100 text-[#0f2744] flex items-center justify-center font-bold text-xs shrink-0">
                        {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg text-[#0f2744]">
                    {member.name}
                  </CardTitle>
                  <div className="text-xs font-medium text-slate-700">
                    {member.role}
                  </div>
                  <div className="text-[11px] text-slate-500 italic mt-0.5">
                    {member.qualification}
                  </div>
                </CardHeader>

                <CardContent className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-sky-700 font-mono">
                    <Mail className="w-3.5 h-3.5 text-sky-500" />
                    <span className="truncate">{member.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 5. Campus Facilities & Photo Gallery */}
      <section id="campus-facilities" className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm">
                Campus Grounds
              </Badge>
              <Badge variant="accent" size="sm">
                Authentic Photography
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Campus Grounds &amp; Architectural Landmarks
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Explore the authentic facilities of Qazi Sultan Boys Higher Secondary School, Kunri, Sindh — from the historic Bab-e-Ibraheem Momin gate and blue-tiled academic block to the Allama Iqbal open-book monument and shaded study corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            {siteConfig.facilities.map((facility) => (
              <FacilityCard key={facility.id} facility={facility} />
            ))}
          </div>

          {/* Virtual Tour Banner */}
          <div className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-[#0f2744]">
                  Would you like to experience the campus in person?
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
                  We host weekly discovery mornings for prospective students and parents, including
                  guided access to science laboratories, art studios, and athletic arenas.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Button href="/gallery" variant="outline" size="md">
                View Full Photo Gallery &rarr;
              </Button>
              <Button href="/contact" variant="primary" size="md">
                Plan Campus Visit
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 6. CTA Section */}
      <CTASection
        title="Discover What Makes Qazi Sultan Boys HSS Exceptional"
        description="Connect with our administration, explore academic syllabi, or schedule a personalized campus orientation."
        primaryActionLabel="Admissions Guide"
        primaryActionHref="/admissions"
        secondaryActionLabel="Contact Directory"
        secondaryActionHref="/contact"
      />
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/ui/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Navigation,
  Car,
  Bus,
  ShieldCheck,
  Calendar,
} from "lucide-react";


export const metadata: Metadata = {
  title: "Contact & Campus Directory | Government Qazi Sultan Higher Secondary School, Kunri",
  description:
    "Official directory and contact information for Government Qazi Sultan Higher Secondary School, Kunri (Station Road, Umerkot District, Sindh). Reach Principal Sir Rahmatullah Lashari, SMC leadership, and admissions.",
};

const departmentDirectory = [
  {
    name: "Principal & Institutional Head",
    lead: "Sir Rahmatullah Lashari, Principal",
    phone: "+92 238 558252",
    email: "principal@qazisultanboys.edu.pk",
    hours: "Monday – Saturday: 8:00 AM – 1:30 PM (Friday: 8:00 AM – 12:00 PM)",
    image: "/images/school/principal-rahmatullah-lashari.jpg",
  },
  {
    name: "School Management Committee (SMC)",
    lead: "Haji Ubaidullah Gill, SMC Leadership",
    phone: "+92 238 558252",
    email: "smc@qazisultanboys.edu.pk",
    hours: "Community consultations by appointment",
  },
  {
    name: "Admissions & Student Registration",
    lead: "Admissions & Records Cell",
    phone: "+92 238 558252",
    email: "admissions@qazisultanboys.edu.pk",
    hours: "Monday – Saturday: 8:00 AM – 1:00 PM",
  },
  {
    name: "BISE Board Examination & Science Cell",
    lead: "Prof. M. Tariq Memon & Prof. A. Samad Soomro",
    phone: "+92 238 558252",
    email: "exams@qazisultanboys.edu.pk",
    hours: "Monday – Saturday: 8:30 AM – 1:30 PM",
  },
];

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="Campus Inquiries & Directory"
        badgeVariant="accent"
        title="We Welcome Your Questions & Campus Visits"
        description="Whether inquiring about 2026–2027 admissions, curriculum standards, or arranging a campus discovery appointment, our staff is delighted to assist you."
        breadcrumbs={[{ label: "Contact & Directory" }]}
      />

      {/* 2. Main Contact Form & Primary Office Info */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-1">
                  Online Inquiry Desk
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744]">
                  Send a Message to Our Office
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Complete the validated inquiry form below. In Phase 1, form validation executes
                  in the browser with demo confirmation feedback.
                </p>
              </div>

              <ContactForm />
            </div>

            {/* Right: Office Headquarters Card */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-[#0f2744]">
                        Main Administration Center
                      </h3>
                      <p className="text-xs text-slate-500">
                        Visitor Reception & Executive Offices
                      </p>
                    </div>
                  </div>
                  <Badge variant="demo" size="sm">
                    Configurable
                  </Badge>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Campus Address</div>
                      <div className="text-slate-600 mt-0.5">
                        {siteConfig.contact.schoolName}
                        <br />
                        {siteConfig.contact.addressLine1}
                        <br />
                        {siteConfig.contact.addressLine2}
                        <br />
                        {siteConfig.contact.cityStateZip}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <Phone className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Direct Telephones</div>
                      <div className="text-slate-600 mt-0.5 space-y-0.5">
                        <div>Main Switchboard: {siteConfig.contact.mainPhone}</div>
                        <div>Admissions Direct: {siteConfig.contact.admissionsPhone}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <Mail className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Electronic Mail</div>
                      <div className="text-slate-600 mt-0.5 space-y-0.5">
                        <div>General: {siteConfig.contact.mainEmail}</div>
                        <div>Admissions: {siteConfig.contact.admissionsEmail}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-200/60">
                    <Clock className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900">Office & Visiting Hours</div>
                      <div className="text-slate-600 mt-0.5">
                        {siteConfig.contact.officeHours}
                        <br />
                        <span className="text-xs text-sky-700 font-medium">
                          {siteConfig.contact.campusTourHours}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Visitor Guidelines Card */}
              <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-100 text-xs text-sky-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-sky-900">
                  <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
                  <span>Visitor Safety & Campus Protocol</span>
                </div>
                <p className="leading-relaxed text-slate-600">
                  For student safety, all campus visitors must check in at the Bab-e-Ibraheem Momin security gatehouse upon arrival on Station Road.
                </p>
              </div>

              {/* Official Facebook Community Portal */}
              <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950 space-y-2">
                <div className="font-bold flex items-center justify-between text-blue-900">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Official Community Facebook Page</span>
                  </div>
                  <Badge variant="navy" size="sm">Active</Badge>
                </div>
                <p className="leading-relaxed text-slate-700">
                  Stay updated with campus celebrations, football tournament scores, examination circulars, and merit lists on our community page.
                </p>
                {siteConfig.contact.facebookUrl && (
                  <a
                    href={siteConfig.contact.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-700 hover:text-blue-900 hover:underline pt-1"
                  >
                    <span>Visit GHSS Qazi Sultan Kunri on Facebook &rarr;</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Departmental Directory Table */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-10">
            <Badge variant="secondary" size="sm" className="mb-2">
              Campus Extensions
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Departmental Contact Directory
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Direct routing for specific academic, administrative, and student wellness inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departmentDirectory.map((dept, idx) => (
              <Card key={idx} className="bg-white border-slate-200/90 shadow-2xs flex flex-col justify-between hover:border-sky-300 hover:shadow-sm transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-[#0f2744]">
                        {dept.name}
                      </h3>
                      <div className="text-xs text-slate-500 font-medium mt-0.5">
                        {dept.lead}
                      </div>
                    </div>
                    {dept.image && (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-sky-500 shadow-xs shrink-0 bg-slate-900">
                        <Image
                          src={dept.image}
                          alt={dept.lead}
                          fill
                          sizes="44px"
                          className="object-cover object-top"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-2 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                    <span>{dept.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                    <span className="truncate">{dept.email}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{dept.hours}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Location & Campus Map (Real Campus Gate Orientation) */}
      <section className="py-16 sm:py-24 bg-white">
        <Container>
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="accent" size="sm">
                Campus Location
              </Badge>
              <Badge variant="accent" size="sm">
                Real Campus Entrance
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Finding Our Campus in Kunri
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Conveniently located on Link Road near the Town Committee, accessible from across Kunri and neighboring towns of Umerkot district.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual Campus Orientation Gate Card */}
            <div className="lg:col-span-8 rounded-2xl overflow-hidden border border-slate-200/90 shadow-md bg-slate-900 relative group">
              <div className="aspect-video w-full relative">
                <Image
                  src="/images/school/main-gate.jpg"
                  alt="Bab-e-Ibraheem Momin Main Entrance Gate at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                {/* Information Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#0f2744] text-white flex items-center justify-center shrink-0">
                      <Navigation className="w-5 h-5 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f2744]">
                        Bab-e-Ibraheem Momin (Main Entrance Gate)
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
                        Link Road, Near Town Committee, Kunri, Sindh, Pakistan
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Open for Inquiries</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transit and Parking Instructions */}
            <div className="lg:col-span-4 space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-[#0f2744] mb-1">
                  <Car className="w-4 h-4 text-[#0284c7]" />
                  <span>By Road &amp; Parking</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct access via Link Road from Main Kunri Bazaar and Mirpurkhas–Umerkot highway. Dedicated visitor parking space available outside the main gate.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-[#0f2744] mb-1">
                  <Bus className="w-4 h-4 text-[#0284c7]" />
                  <span>Public Transit &amp; Rickshaws</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Centrally connected to local rickshaw stands and bus/coach stops in Kunri, providing convenient morning commutes for students from surrounding rural union councils.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-2 font-bold text-[#0f2744] mb-1">
                  <Calendar className="w-4 h-4 text-[#0284c7]" />
                  <span>Visiting &amp; Office Hours</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Office timings: Monday to Saturday from 7:30 AM to 1:30 PM (Friday until 12:00 PM). Parents and prospective students are welcome to visit during morning hours.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

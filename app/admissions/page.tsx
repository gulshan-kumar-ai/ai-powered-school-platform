import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { ContactForm } from "@/components/ui/ContactForm";
import { CTASection } from "@/components/ui/CTASection";
import {
  admissionSteps,
  admissionDates,
  sampleTuitionSchedule,
  requiredDocumentsList,
} from "@/data/admissions";
import {
  CheckCircle2,
  Calendar,
  FileCheck,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";


export const metadata: Metadata = {
  title: "Admissions & Enrollment 2026–2027 | How to Apply",
  description:
    "Complete admissions guide for Qazi Sultan Boys Higher Secondary School, Kunri, Sindh: eligibility criteria, application steps, required documents, key dates, and FAQs.",
};

export default function AdmissionsPage() {
  const admissionsFaqs = siteConfig.faqs.filter(
    (faq) => faq.category === "admissions" || faq.category === "tuition"
  );

  return (
    <div className="bg-white">
      {/* 1. Page Header */}
      <PageHeader
        badge="Admissions Open 2026–2027"
        badgeVariant="accent"
        title="Welcoming Inquiring Scholars to Our School Family"
        description="We evaluate each candidate through a holistic, personalized admissions process. Learn about entry criteria, timeline milestones, required documentation, and financial aid."
        breadcrumbs={[{ label: "Admissions & Enrollment" }]}
        actions={
          <Button href="#apply-form" variant="primary" size="md">
            Submit Admissions Inquiry
          </Button>
        }
      />

      {/* 2. Admissions Overview & Eligibility */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
                Holistic Admissions Philosophy
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744] tracking-tight">
                Who Thrives at Qazi Sultan Boys HSS?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We seek curious, collaborative scholars who demonstrate an eagerness to learn,
                integrity of character, and respect for our diverse scholarly community. Admissions
                is selective, yet grounded in our commitment to identifying student potential rather
                than standardized test metrics alone.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Candidates are admitted across four standard entry levels: Primary (Kindergarten – Grade 5),
                Middle School Discovery (Grades 6 – 8), Senior School (Grades 9 – 11), and limited Grade 12
                transfer openings.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Kindergarten: Age 5 by Sept 1, 2026</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Grades 1–5: Developmental Readiness</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Grades 6–8: Academic Diagnostic Interview</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Grades 9–12: High School Transcript Review</span>
                </div>
              </div>
            </div>

            {/* Admissions Committee Note */}
            <div className="lg:col-span-5 bg-sky-50/70 border border-sky-100 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-800 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#0284c7]" />
                <span>Director&apos;s Welcome</span>
              </div>
              <blockquote className="text-sm text-slate-700 italic leading-relaxed">
                &ldquo;Our admissions committee looks for scholars who will actively enrich our classrooms,
                assemblies, and sports fields. We encourage families to visit our campus and experience the warmth and
                vitality of our school community firsthand.&rdquo;
              </blockquote>
              <div className="text-xs">
                <div className="font-bold text-[#0f2744]">Elena Rostova</div>
                <div className="text-slate-500">Director of Admissions & Financial Aid</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Five-Step Application Process */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <Badge variant="accent" size="sm" className="mb-2">
              Application Roadmap
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Five Steps to Enrollment
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Follow this step-by-step roadmap to complete your candidate dossier for the 2026–2027 school year.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {admissionSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#0f2744] text-white flex items-center justify-center font-bold text-sm mb-4">
                    0{step.step}
                  </div>
                  <h4 className="font-bold text-base text-[#0f2744] mb-2 leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#0284c7]" />
                    <span>{step.duration}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Required Documents & Key Dates */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Required Documents Checklist */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" size="sm">
                    Dossier Checklist
                  </Badge>
                  <Badge variant="demo" size="sm">
                    Sample Requirements
                  </Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744]">
                  Required Candidate Documentation
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  Please review the sample checklist below. Final confirmation of required documentation
                  will be verified by the Admissions Office upon formal file opening.
                </p>
              </div>

              <div className="space-y-3">
                {requiredDocumentsList.map((doc, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center shrink-0 mt-0.5">
                      <FileCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0f2744]">
                        {doc.title}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Key Dates & Admissions Calendar */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="accent" size="sm">
                    2026–2027 Admissions Calendar
                  </Badge>
                  <Badge variant="demo" size="sm">
                    Illustrative Dates
                  </Badge>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744]">
                  Key Dates & Decision Milestones
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  Mark these critical evaluation milestones in your family calendar to ensure priority review.
                </p>
              </div>

              <div className="space-y-3">
                {admissionDates.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200/80 bg-white flex items-start justify-between gap-4 shadow-2xs"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-[#0f2744] flex items-center justify-center shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-sky-600" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#0f2744]">
                          {item.title}
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-xs font-semibold text-[#0284c7] bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100 block">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 5. Tuition & Financial Assistance Overview */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" size="sm">
                Financial Transparency
              </Badge>
              <Badge variant="demo" size="sm">
                Sample Schedule
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Tuition Schedule & Financial Assistance
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              We are dedicated to making a quality education accessible to families from all economic
              backgrounds through public education support and community scholarship initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {sampleTuitionSchedule.map((tier, idx) => (
              <Card key={idx} className="bg-white border-slate-200/90 shadow-2xs flex flex-col justify-between">
                <CardHeader>
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Academic Division
                  </div>
                  <CardTitle className="text-lg text-[#0f2744]">
                    {tier.division}
                  </CardTitle>
                  <div className="text-2xl font-black text-[#0284c7] mt-3">
                    {tier.tuition}
                  </div>
                </CardHeader>
                <CardContent className="pt-2 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider mb-1">
                    Tuition Inclusions:
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tier.includes}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-3.5 text-xs sm:text-sm text-sky-950">
            <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div>
              <strong>Endowed Financial Aid:</strong> Over 28% of enrolled scholars receive tuition assistance.
              Financial aid requests are evaluated confidentially by the Business Office independently of admissions decisions.
            </div>
          </div>
        </Container>
      </section>

      {/* 6. Application Enquiry Form (Demo Mode) */}
      <section id="apply-form" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto mb-10 text-center">
            <Badge variant="accent" size="sm" className="mb-2">
              Admissions Enquiry
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Start Your Admissions Dossier Enquiry
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Submit your inquiry below to request candidate application packages, schedule a campus visit,
              or speak directly with an admissions advisor.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ContactForm isAdmissionsEnquiry initialSubject="Admissions Application Inquiry" />
          </div>
        </Container>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <Badge variant="secondary" size="sm" className="mb-2">
              Admissions Inquiries
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f2744]">
              Admissions & Tuition FAQ
            </h2>
            <p className="mt-2 text-slate-600 text-sm sm:text-base">
              Common questions from prospective families regarding application criteria, testing, tours, and scholarships.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={admissionsFaqs} allowCategoryFilter={false} />
          </div>
        </Container>
      </section>

      {/* 8. CTA Section */}
      <CTASection
        title="Schedule Your Campus Discovery Experience"
        description="We invite prospective scholars and parents to observe live classroom inquiry, tour laboratory suites, and meet our faculty."
        primaryActionLabel="Contact Admissions Office"
        primaryActionHref="/contact"
        secondaryActionLabel="Explore Academic Programs"
        secondaryActionHref="/academics"
      />
    </div>
  );
}

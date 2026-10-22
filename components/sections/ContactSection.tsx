import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { ContactForm } from "../ui/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  ShieldCheck,
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80 relative">
      <Container>
        <SectionHeading
          badge="Inquiries & Campus Office"
          badgeVariant="accent"
          title="Connect with Our Admissions & Administration Team"
          description="We warmly welcome inquiries from prospective families, educators, and community partners. Reach our Station Road campus administration directly."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-[#0f2744]" />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100 shadow-xs">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f2744]">
                      Central Administrative Office
                    </h3>
                    <p className="text-xs text-slate-500">
                      Admissions &amp; Academic Inquiries
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Official Desk</span>
                </span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Campus Address</div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed">
                      {siteConfig.contact.addressLine1}
                      <br />
                      {siteConfig.contact.addressLine2}
                      <br />
                      {siteConfig.contact.cityStateZip}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <Phone className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Telephone Switchboard</div>
                    <div className="text-slate-600 mt-0.5 font-mono">
                      Main Campus: {siteConfig.contact.mainPhone}
                      <br />
                      Admissions Desk: {siteConfig.contact.admissionsPhone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <Mail className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Official Electronic Mail</div>
                    <div className="text-slate-600 mt-0.5 font-mono">
                      General: {siteConfig.contact.mainEmail}
                      <br />
                      Admissions: {siteConfig.contact.admissionsEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
                  <Clock className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900">Administrative Office Hours</div>
                    <div className="text-slate-600 mt-0.5">
                      {siteConfig.contact.officeHours}
                      <br />
                      <span className="text-xs text-sky-700 font-semibold mt-0.5 block">
                        Guided Tours: {siteConfig.contact.campusTourHours}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Reusable Validated ContactForm */}
          <div className="lg:col-span-7">
            <ContactForm isAdmissionsEnquiry initialSubject="Campus Inquiry" />
          </div>
        </div>
      </Container>
    </section>
  );
}

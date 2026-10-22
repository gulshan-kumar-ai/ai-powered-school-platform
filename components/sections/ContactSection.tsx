import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { ContactForm } from "../ui/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-slate-50/70 border-t border-slate-200/80">
      <Container>
        <SectionHeading
          badge="Inquiries & Campus Visits"
          badgeVariant="accent"
          title="Connect with Our Admissions & Administration Team"
          description="We welcome inquiries from prospective families, educators, and community partners. All contact details below are configurable template values."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurable Office Details */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="p-6 sm:p-8 bg-white border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0f2744]">
                      Central Administrative Office
                    </h3>
                    <p className="text-xs text-slate-500">
                      Admissions & General Inquiries
                    </p>
                  </div>
                </div>
                <Badge variant="demo" size="sm">
                  Configurable
                </Badge>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <MapPin className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Campus Address</div>
                    <div className="text-slate-600 mt-0.5">
                      {siteConfig.contact.addressLine1}
                      <br />
                      {siteConfig.contact.addressLine2}
                      <br />
                      {siteConfig.contact.cityStateZip}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <Phone className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Direct Telephone</div>
                    <div className="text-slate-600 mt-0.5">
                      Main Switchboard: {siteConfig.contact.mainPhone}
                      <br />
                      Admissions Line: {siteConfig.contact.admissionsPhone}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <Mail className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Email Addresses</div>
                    <div className="text-slate-600 mt-0.5">
                      General: {siteConfig.contact.mainEmail}
                      <br />
                      Admissions: {siteConfig.contact.admissionsEmail}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/60">
                  <Clock className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-900">Visiting & Office Hours</div>
                    <div className="text-slate-600 mt-0.5">
                      {siteConfig.contact.officeHours}
                      <br />
                      <span className="text-xs text-slate-500">
                        {siteConfig.contact.campusTourHours}
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

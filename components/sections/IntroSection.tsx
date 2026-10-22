import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";
import {
  BookOpen,
  Cpu,
  HeartHandshake,
  Compass,
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Building,
} from "lucide-react";
import { Button } from "../ui/Button";

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen,
  Cpu,
  HeartHandshake,
  Compass,
};

export function IntroSection() {
  return (
    <section id="introduction" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-70 pointer-events-none" />

      <Container className="relative z-10">
        <SectionHeading
          badge="Institutional Heritage & Profile"
          badgeVariant="secondary"
          title="Nurturing Inquiring Minds, Guiding Purposeful Futures"
          description={`Established in ${siteConfig.established} in the heart of Kunri, ${siteConfig.name} is dedicated to fostering academic mastery, moral integrity, scientific inquiry, and collaborative civic pride.`}
        />

        {/* Vision & Mission Monoliths */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision Monolith */}
          <Card className="border border-sky-100 bg-gradient-to-br from-white via-sky-50/20 to-white relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-sky-400 to-[#0284c7]" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-50 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <CardHeader className="pl-8 pt-7">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-sky-100/80 text-[#0284c7] flex items-center justify-center border border-sky-200/60 shadow-xs">
                  <Eye className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  Future Horizon
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-[#0f2744]">
                Our Institutional Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-8 pb-7">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteConfig.values.vision}
              </p>
            </CardContent>
          </Card>

          {/* Mission Monolith */}
          <Card className="border border-slate-200 bg-gradient-to-br from-white via-slate-50/50 to-white relative overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#0f2744] to-[#1e3a5f]" />
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-100 rounded-full blur-2xl group-hover:scale-125 transition-transform" />

            <CardHeader className="pl-8 pt-7">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-[#0f2744] flex items-center justify-center border border-slate-200/80 shadow-xs">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0f2744] bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  Daily Pedagogy
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-[#0f2744]">
                Our Educational Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-8 pb-7">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteConfig.values.mission}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Spotlight: Motto Calligraphy Wall + Educational Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Campus Heritage & Motto Calligraphy Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-xl group bg-slate-950">
              <Image
                src="/images/school/mural-verse.jpg"
                alt="Inspirational Quranic Motto Mural at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                width={800}
                height={600}
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Glowing Calligraphic Accent Box */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent p-6 sm:p-7 flex flex-col justify-end text-white">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                    Institutional Motto &amp; Moral Anchor
                  </span>
                </div>

                <h4 className="text-2xl sm:text-3xl font-bold text-white font-arabic leading-snug drop-shadow-md" dir="rtl">
                  وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
                </h4>

                <p className="text-xs sm:text-sm text-slate-200 mt-2 max-w-md leading-relaxed">
                  &ldquo;And that man can have nothing but what he strives for&rdquo; (Surah An-Najm 53:39). Our scholars are guided by the timeless virtues of diligent effort, honest labor, and unyielding character.
                </p>

                <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] text-sky-200">
                  <span>Preserved on Historic Campus Wall</span>
                  <span className="font-semibold text-amber-300">Kunri, Sindh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="lg:col-span-6 space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold uppercase tracking-wider text-[#0284c7] mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Foundational Character</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f2744] tracking-tight">
                Four Pillars of Scholarly Character
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                Our educational framework balances intellectual rigor with character
                formation, preparing students to be principled contributors to society.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.values.coreValues.map((val) => {
                const Icon = valueIcons[val.icon] || CheckCircle;
                return (
                  <div
                    key={val.title}
                    className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-sky-300 hover:shadow-md transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center mb-3 group-hover:bg-[#0284c7] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="font-bold text-sm text-[#0f2744] mb-1">
                      {val.title}
                    </h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <Button
                href="/about"
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Learn About Our Heritage &amp; Leadership
              </Button>

              <Button
                href="/gallery"
                variant="outline"
                size="md"
                leftIcon={<Building className="w-4 h-4 text-sky-600" />}
                className="w-full sm:w-auto"
              >
                Explore Campus Grounds
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

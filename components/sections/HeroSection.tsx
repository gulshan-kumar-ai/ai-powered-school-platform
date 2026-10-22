import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  ArrowRight,
  LogIn,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/50 border-b border-slate-200/70">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent" size="md" className="gap-1.5 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Admissions Open for Academic Year 2026–2027</span>
              </Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0f2744] tracking-tight leading-[1.12]">
              Fostering Curious Minds,{" "}
              <span className="text-[#0284c7]">Empowering Global Leaders</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {siteConfig.description} We combine rigorous academic standards with
              emerging technologies, creative arts, and compassionate ethical values.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                href="#introduction"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-md hover:shadow-lg"
              >
                Explore Our School
              </Button>

              <Button
                href="/portal"
                variant="secondary"
                size="lg"
                leftIcon={<LogIn className="w-4 h-4 text-[#0284c7]" />}
                className="w-full sm:w-auto"
              >
                Student & Parent Portal
              </Button>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Inquiry-Based Learning</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                <Award className="w-4 h-4 text-sky-600 shrink-0" />
                <span>AP & Honors Rigor</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-white/80 p-2.5 rounded-lg border border-slate-200/60 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>Safe & Inclusive Campus</span>
              </div>
            </div>
          </div>

          {/* Right Column: Campus Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#0f2744] via-[#0284c7] to-teal-400 rounded-3xl opacity-20 blur-sm" />

              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-900 group">
                <Image
                  src="/images/school/main-building.jpg"
                  alt={`${siteConfig.name} Main Academic Building & Allama Iqbal Monument`}
                  width={1200}
                  height={900}
                  priority
                  className="w-full h-[320px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08162b]/80 via-transparent to-transparent pointer-events-none" />

                {/* Floating pill badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/40 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 shrink-0 drop-shadow-xs">
                      <Image
                        src="/images/school/logo.png"
                        alt={`${siteConfig.name} Crest`}
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0f2744]">
                        Main Building & Iqbal Memorial
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Kunri, Sindh • Authentic Campus
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/gallery"
                    className="text-xs font-semibold text-[#0284c7] hover:underline"
                  >
                    Campus Gallery &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

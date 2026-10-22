"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import {
  ArrowRight,
  LogIn,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
} from "lucide-react";

const heroSlides = [
  {
    id: "main-building",
    src: "/images/school/main-building.jpg",
    alt: "Main Academic Building & Allama Iqbal Monument, GQSHSS Kunri",
    title: "Historic Academic Complex & Monument",
    subtitle: "Bab-e-Ibraheem Momin Corridor • Kunri, Sindh",
    tag: "Campus Heritage",
  },
  {
    id: "morning-assembly",
    src: "/images/school/morning-assembly.jpg",
    alt: "Grand Morning Assembly at Qazi Sultan Boys HSS Kunri",
    title: "Disciplined Daily Morning Assembly",
    subtitle: "Parade grounds under the national flag",
    tag: "Civic Discipline",
  },
  {
    id: "position-holders",
    src: "/images/school/position-holders-2026.jpg",
    alt: "Merit Position Holders & Award Ceremony 2026",
    title: "Academic Laureates & Board Distinctions",
    subtitle: "BISE Mirpur Khas Session 2025–2026",
    tag: "Merit Recognition",
  },
];

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const activeSlide = heroSlides[activeSlideIndex];

  return (
    <section className="relative overflow-hidden bg-cinema-hero text-white pt-10 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-800/80">
      {/* Background ambient lighting effects */}
      <div className="absolute inset-0 bg-grid-pattern-dark opacity-35 pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Prestigious Institutional Headlines */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Glowing Institutional Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-sky-400/30 backdrop-blur-md shadow-lg shadow-sky-950/40">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-xs font-semibold text-sky-200">
                Admissions Open 2026–2027
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-[11px] font-medium text-slate-300">
                BISE Mirpur Khas Affiliated
              </span>
            </div>

            {/* Main Cinematic Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Striving for Excellence,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-cyan-200 to-teal-300">
                Inspiring Character &amp; Intellect
              </span>
            </h1>

            {/* Arabic Quranic Motto Calligraphy Strip */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/90 via-sky-950/40 to-slate-900/90 border border-sky-500/20 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="text-lg sm:text-xl font-arabic font-bold text-amber-300" dir="rtl">
                  وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
                </div>
                <div className="text-xs text-slate-300 italic">
                  &ldquo;And that man can have nothing but what he strives for&rdquo;
                  <span className="text-[10px] text-sky-400 font-normal ml-1">(53:39)</span>
                </div>
              </div>
            </div>

            {/* Narrative description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Established in {siteConfig.established} on Station Road, Kunri,{" "}
              <strong className="text-white font-semibold">GQSHSS</strong> blends rigorous Sindh Board
              curriculum delivery, state-of-the-art science laboratories, and high ethical ideals to educate the region&apos;s next generation of leaders.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button
                href="#introduction"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-white shadow-xl shadow-sky-600/25 border-0 font-semibold"
              >
                Discover Campus Life
              </Button>

              <Button
                href="/portal"
                variant="outline"
                size="lg"
                leftIcon={<LogIn className="w-4 h-4 text-sky-400" />}
                className="w-full sm:w-auto bg-slate-900/60 hover:bg-slate-800/80 text-white border-slate-700 hover:border-sky-400/60 backdrop-blur-md"
              >
                Student &amp; Parent Portal
              </Button>

              <Link
                href="/gallery"
                className="text-xs font-semibold text-sky-300 hover:text-white flex items-center gap-1.5 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
              >
                <span>Photo Gallery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Prestige Value Pillars */}
            <div className="pt-6 border-t border-slate-800/90 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sindh Textbook Curriculum</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
                <Award className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Pre-Med &amp; Pre-Eng Labs</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>SMC Community Heritage</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Campus Imagery Monolith */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Outer decorative ambient glow aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-sky-600/30 via-teal-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-70" />

              {/* Main Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-950 group">
                <div className="relative h-[360px] sm:h-[420px] w-full overflow-hidden">
                  <Image
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    priority
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Top slide badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-sky-300 text-[11px] font-bold border border-sky-500/30 shadow-md">
                      {activeSlide.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-slate-300 text-[10px] font-mono border border-white/10">
                      Authentic Photography
                    </span>
                  </div>

                  {/* Gradient vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Floating glass info caption */}
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-white/15 shadow-2xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-11 h-11 shrink-0 drop-shadow-md rounded-lg bg-white/10 p-1 border border-white/20">
                        <Image
                          src="/images/school/logo.png"
                          alt={`${siteConfig.name} Crest`}
                          width={44}
                          height={44}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white leading-snug">
                          {activeSlide.title}
                        </div>
                        <div className="text-[11px] text-slate-300 mt-0.5">
                          {activeSlide.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Slide Switcher Buttons */}
                <div className="p-2.5 bg-slate-900/95 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-slate-400 font-medium pl-2">
                    Campus Showcase:
                  </div>
                  <div className="flex items-center gap-1.5">
                    {heroSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          activeSlideIndex === idx
                            ? "bg-sky-500 text-white shadow-xs"
                            : "bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700"
                        }`}
                        aria-label={`View ${slide.title}`}
                      >
                        {idx + 1}. {slide.tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Stat Pill (Floating Left) */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-6 bg-slate-900/90 backdrop-blur-md py-2.5 px-4 rounded-xl border border-sky-400/30 shadow-xl shadow-black/50">
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Est. 1988</div>
                  <div className="text-[10px] text-slate-400">38+ Years of Service</div>
                </div>
              </div>

              {/* Floating Stat Pill (Floating Right) */}
              <div className="hidden sm:flex items-center gap-3 absolute -top-5 -right-6 bg-slate-900/90 backdrop-blur-md py-2.5 px-4 rounded-xl border border-amber-400/30 shadow-xl shadow-black/50">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-black text-amber-300">Top Position Holders</div>
                  <div className="text-[10px] text-slate-300">BISE Mirpur Khas 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

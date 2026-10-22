import React from "react";
import Image from "next/image";
import { Container } from "../layout/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import {
  GraduationCap,
  Award,
  ArrowRight,
  ShieldCheck,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export function PrincipalSpotlightSection() {
  return (
    <section id="principals-welcome" className="py-20 sm:py-28 bg-gradient-to-b from-white via-slate-50/60 to-white relative overflow-hidden border-b border-slate-200/80">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-sky-100 rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-50 pointer-events-none" />

      <Container className="relative z-10">
        <div className="rounded-3xl border border-sky-100 bg-white shadow-xl shadow-sky-950/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left Column: Dignified Portrait of Principal */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f2744] via-[#163a66] to-[#0f2744] p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden text-white">
              {/* Traditional Sindhi geometric backdrop pattern */}
              <div className="absolute inset-0 bg-grid-pattern-dark opacity-20 pointer-events-none" />
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-sky-400/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-sky-200 uppercase tracking-widest">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    Institutional Leadership
                  </span>
                  <span className="text-[11px] font-mono text-slate-300">
                    Kunri, Sindh
                  </span>
                </div>

                {/* Portrait Container */}
                <div className="relative mx-auto w-64 h-72 sm:w-72 sm:h-84 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl group bg-slate-900">
                  <Image
                    src="/images/school/principal-rahmatullah-lashari.jpg"
                    alt="Sir Rahmatullah Lashari, Principal of Govt. Boys Qazi Sultan Higher Secondary School, Kunri, Sindh"
                    fill
                    priority
                    sizes="(max-width: 640px) 256px, 288px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  
                  {/* Subtle vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-full border border-sky-400/40 shadow-md">
                    <span className="text-[11px] font-black text-amber-300 tracking-wider uppercase">
                      Principal of School
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 text-white text-center">
                    <div className="text-sm font-black tracking-wide">
                      Sir Rahmatullah Lashari
                    </div>
                    <div className="text-[11px] text-sky-200 font-medium">
                      Principal &amp; Institutional Head
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Credential Bar */}
              <div className="relative z-10 mt-6 pt-6 border-t border-white/15 text-center">
                <div className="text-xs font-semibold text-slate-200">
                  Sindh Education &amp; Literacy Department
                </div>
                <div className="text-[11px] text-sky-300 font-mono mt-0.5">
                  Govt. Boys Qazi Sultan Higher Secondary School
                </div>
              </div>
            </div>

            {/* Right Column: Inspiring Principal's Message & Commitments */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between bg-white">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="accent" size="sm">
                    Principal&apos;s Welcome
                  </Badge>
                  <span className="text-xs text-slate-500 font-medium">
                    Office of the Institutional Head
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0f2744] tracking-tight leading-tight">
                  &ldquo;Every scholar has the power to achieve greatness through dedicated effort and character.&rdquo;
                </h3>

                {/* Surah An-Najm Verse Banner */}
                <div className="p-3.5 rounded-xl bg-sky-50/80 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-lg font-arabic font-bold text-[#0f2744]" dir="rtl">
                    وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
                  </div>
                  <div className="text-xs text-slate-600 italic">
                    &ldquo;And that man can have nothing but what he strives for&rdquo; (53:39)
                  </div>
                </div>

                <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  <p>
                    Warm greetings to our scholars, parents, alumni, and community elders. At <strong>Govt. Boys Qazi Sultan Higher Secondary School, Kunri</strong>, our sacred duty is to awaken intellectual inquiry and cultivate righteous character in our young men.
                  </p>
                  <p>
                    Through rigorous Sindh Board curricula, modern science laboratories, disciplined morning assemblies, and the self-help stewardship of our School Management Committee (SMC), we prepare students for distinguished careers and responsible citizenship across Pakistan.
                  </p>
                </div>

                {/* 4 Pillars of Principal's Vision */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0f2744]">Academic Rigor</div>
                      <div className="text-[11px] text-slate-500">BISE Mirpur Khas board distinction</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0f2744]">Character Building</div>
                      <div className="text-[11px] text-slate-500">Moral ethics, honesty &amp; discipline</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0f2744]">SMC Community Pride</div>
                      <div className="text-[11px] text-slate-500">Self-help infrastructure development</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                    <GraduationCap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-[#0f2744]">Future Pathways</div>
                      <div className="text-[11px] text-slate-500">Pre-Med, Pre-Eng &amp; Computer Science</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons & Signature Footnote */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-base font-extrabold text-[#0f2744]">
                    Sir Rahmatullah Lashari
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Principal of School • GBHSS Qazi Sultan Kunri
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <Button
                    href="/about#principals-message"
                    variant="primary"
                    size="sm"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    Read Full Message
                  </Button>

                  <Button
                    href="/contact"
                    variant="outline"
                    size="sm"
                    leftIcon={<Mail className="w-4 h-4 text-sky-600" />}
                    className="w-full sm:w-auto"
                  >
                    Contact Principal
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
}

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
    <section id="introduction" className="py-20 sm:py-28 bg-white">
      <Container>
        <SectionHeading
          badge="Institutional Profile"
          badgeVariant="secondary"
          title="Nurturing Inquiring Minds, Guiding Purposeful Futures"
          description={`Founded in ${siteConfig.established}, ${siteConfig.name} is dedicated to fostering academic excellence, moral integrity, and technological fluency in an inclusive, collaborative scholarly community.`}
        />

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Vision */}
          <Card className="border-slate-200/90 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0284c7]" />
            <CardHeader className="pl-8">
              <div className="w-12 h-12 rounded-xl bg-sky-100/70 text-[#0284c7] flex items-center justify-center mb-3">
                <Eye className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl text-[#0f2744]">
                Our Institutional Vision
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-8">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteConfig.values.vision}
              </p>
            </CardContent>
          </Card>

          {/* Mission */}
          <Card className="border-slate-200/90 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0f2744]" />
            <CardHeader className="pl-8">
              <div className="w-12 h-12 rounded-xl bg-[#0f2744]/10 text-[#0f2744] flex items-center justify-center mb-3">
                <Target className="w-6 h-6" />
              </div>
              <CardTitle className="text-2xl text-[#0f2744]">
                Our Educational Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="pl-8">
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                {siteConfig.values.mission}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Feature Spotlight: STEM Lab + Educational Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Campus Heritage & Motto Calligraphy Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-md group">
              <Image
                src="/images/school/mural-verse.jpg"
                alt="Inspirational Quranic Motto Mural at Qazi Sultan Boys Higher Secondary School, Kunri, Sindh"
                width={800}
                height={600}
                className="w-full h-[340px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#08162b]/95 via-[#08162b]/70 to-transparent p-6 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-sky-300">
                  Institutional Motto & Moral Heritage
                </span>
                <h4 className="text-xl font-bold mt-1 text-white font-arabic">
                  وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-md leading-relaxed">
                  &ldquo;And that man can have nothing but what he strives for&rdquo; (Surah An-Najm 53:39). Our scholars are guided by the timeless virtues of diligence, perseverance, and character.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values Grid */}
          <div className="lg:col-span-6 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0284c7]">
              Four Pillars of Character
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0f2744] tracking-tight">
              Core Educational Values
            </h3>
            <p className="text-sm text-slate-600 mb-6">
              Our educational framework balances intellectual rigor with character
              formation, preparing students to be principled innovators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.values.coreValues.map((val) => {
                const Icon = valueIcons[val.icon] || CheckCircle;
                return (
                  <div
                    key={val.title}
                    className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-sky-50 text-[#0284c7] flex items-center justify-center mb-3">
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

            <div className="pt-4">
              <Button
                href="/about"
                variant="outline"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Learn More About Our History & Leadership
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


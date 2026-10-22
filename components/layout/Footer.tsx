import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";
import { Badge } from "../ui/Badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#050d1a] text-slate-300 border-t border-slate-800/90 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Notice */}
      <div className="bg-[#0a192f] border-b border-slate-800/80 py-3.5">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Badge variant="accent" size="sm" className="font-bold">
              Official Institutional Platform
            </Badge>
            <span className="text-slate-300 font-medium">
              Govt. Boys Qazi Sultan Higher Secondary School, Kunri — Smart School Management Platform
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>BISE Mirpur Khas • Sindh Education &amp; Literacy Dept.</span>
          </div>
        </Container>
      </div>

      <Container className="py-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20 group-hover:bg-white/20 transition-all shrink-0 shadow-lg">
                <Image
                  src="/images/school/logo.png"
                  alt={`${siteConfig.name} Official Logo Crest`}
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-sky-300 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-xs text-amber-300/90 font-arabic mt-0.5" dir="rtl">
                  گورنمنٹ بوائز ہائر سیکنڈری اسکول قاضی سلطان کنری
                </span>
              </div>
            </Link>

            {/* Quranic motto */}
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-sky-200">
              <div className="font-arabic font-bold text-amber-300 text-sm mb-1" dir="rtl">
                وَأَن لَّيْسَ لِلْإِنسَانِ إِلَّا مَا سَعَىٰ
              </div>
              <span className="italic text-slate-300">
                &ldquo;And that man can have nothing but what he strives for&rdquo;
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {siteConfig.description}
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1.5">
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  <strong className="text-slate-200">Affiliation:</strong> Board of Intermediate and Secondary Education (BISE) Mirpur Khas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>
                  <strong className="text-slate-200">Established:</strong> {siteConfig.established} • Kunri, Umerkot District
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Institutional Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/portal"
                  className="text-sky-400 hover:text-sky-300 transition-colors font-semibold"
                >
                  Portal Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Academic Pathways */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Academic Streams
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              {siteConfig.academicPrograms.map((prog) => (
                <li key={prog.id}>
                  <Link
                    href={`/academics#${prog.id}`}
                    className="hover:text-white transition-colors"
                  >
                    {prog.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/admissions"
                  className="text-xs text-sky-300 hover:text-white flex items-center gap-1 font-semibold"
                >
                  <span>Admissions &amp; Prospectus</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Official Campus Office */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Station Road Campus
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  {siteConfig.contact.addressLine1},{" "}
                  {siteConfig.contact.cityStateZip}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono">{siteConfig.contact.mainPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="font-mono">{siteConfig.contact.mainEmail}</span>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contact.officeHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="mt-12 pt-8 border-t border-slate-800/90 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            &copy; {currentYear} {siteConfig.name}. All rights reserved. Government of Sindh.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About School</Link>
            <span>•</span>
            <Link href="/gallery" className="hover:text-sky-300 transition-colors font-semibold text-slate-300">Photo Gallery</Link>
            <span>•</span>
            <Link href="/admissions" className="hover:text-slate-300 transition-colors">Admissions</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact Office</Link>
            <span>•</span>
            <Link href="/portal" className="hover:text-slate-300 transition-colors font-semibold text-sky-400">Portal Hub</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

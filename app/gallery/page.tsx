import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/layout/Container";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";
import { CTASection } from "@/components/ui/CTASection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ShieldCheck,
  Building,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Official Campus Photography & Heritage Gallery | Government Qazi Sultan Higher Secondary School, Kunri",
  description:
    "Explore authentic real-world photographs of Government Qazi Sultan Higher Secondary School, Kunri: historic blue-tile mosaic arches, Allama Iqbal monument, grand morning assembly, Bab-e-Ibraheem Momin gate, annual position holders, and official insignia crest.",
};

export default function GalleryPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Page Header */}
      <PageHeader
        badge="Official Visual Archive"
        badgeVariant="accent"
        title="Campus Photography & Heritage Gallery"
        description="An authentic visual record of Government Qazi Sultan Higher Secondary School, Kunri, showcasing our historic tiled architecture, daily morning assemblies, academic classrooms, annual merit laureates, and institutional memorials on Station Road."
        breadcrumbs={[{ label: "Campus Gallery" }]}
        actions={
          <Button href="/contact" variant="primary" size="md">
            Plan a Campus Visit
          </Button>
        }
      />

      {/* 2. Introduction & Curatorial Overview */}
      <section className="py-10 bg-slate-50/70 border-b border-slate-200/80">
        <Container>
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="navy" size="sm">
                  Station Road Campus
                </Badge>
                <Badge variant="accent" size="sm">
                  11 Verified Photographs
                </Badge>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f2744] tracking-tight">
                Authentic Glimpses into Daily Scholarly Life in Kunri
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Every photograph in this collection captures the real facilities and lived experiences at <strong>Government Qazi Sultan Higher Secondary School, Kunri</strong>. From the Bab-e-Ibraheem Momin gatehouse to the science inquiry room and the annual merit trophy celebrations, these images reflect decades of educational striving in Umerkot District.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-2.5 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>Station Road Corridor</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>BISE Mirpur Khas Affiliated</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Session 2025–2026 Laureates</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Interactive Gallery Grid & Lightbox */}
      <section className="py-14 sm:py-20 bg-white">
        <Container>
          <GalleryViewer />
        </Container>
      </section>

      {/* 4. Bottom Campus Visit CTA */}
      <CTASection
        title="Experience the Campus in Person"
        description="Prospective students, guardians, and alumni are cordially invited to visit our Station Road campus during morning office hours to tour the classrooms, science laboratories, and sports grounds."
        primaryActionLabel="View Contact & Location Guide"
        primaryActionHref="/contact"
        secondaryActionLabel="Explore Academic Programs"
        secondaryActionHref="/academics"
      />
    </div>
  );
}

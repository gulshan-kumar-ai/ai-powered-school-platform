"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  ArrowRight,
  Camera,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CampusPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
}

const campusPhotos: CampusPhoto[] = [
  {
    id: "main-building",
    src: "/images/school/main-building.jpg",
    title: "Main Building & Iqbal Memorial",
    category: "Architecture",
    description: "Historic blue-tiled mosaic arches and open-book monument in the central courtyard.",
  },
  {
    id: "morning-assembly",
    src: "/images/school/morning-assembly.jpg",
    title: "Grand Morning Assembly",
    category: "Campus Life",
    description: "Hundreds of scholars in disciplined formation for the national anthem on parade grounds.",
  },
  {
    id: "position-holders",
    src: "/images/school/position-holders-2026.jpg",
    title: "Annual Merit Position Holders",
    category: "Achievements",
    description: "Trophy celebrations honoring BISE Mirpur Khas top board rank achievers.",
  },
  {
    id: "classroom-mural",
    src: "/images/school/classroom-space-mural.jpg",
    title: "Solar System Science Studio",
    category: "Academics",
    description: "Immersive astronomical celestial murals and practical inquiry counters.",
  },
  {
    id: "corridor-veranda",
    src: "/images/school/corridor-veranda.jpg",
    title: "Veranda & Shaded Corridors",
    category: "Architecture",
    description: "Tranquil outdoor arcades connecting academic classrooms and study verandas.",
  },
  {
    id: "main-gate",
    src: "/images/school/main-gate.jpg",
    title: "Bab-e-Ibraheem Momin Gate",
    category: "Landmarks",
    description: "The grand fortified entrance welcoming scholars on Station Road.",
  },
];

export function CampusGalleryPreview() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : campusPhotos.length - 1
    );
  }, [selectedPhotoIndex]);

  const goToNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! < campusPhotos.length - 1 ? prev! + 1 : 0
    );
  }, [selectedPhotoIndex]);

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedPhotoIndex, closeLightbox, goToPrevious, goToNext]);

  // Touch swipe handling for mobile
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const activePhoto = selectedPhotoIndex !== null ? campusPhotos[selectedPhotoIndex] : null;

  return (
    <section className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="accent" size="md" className="gap-1.5 font-bold">
                <Camera className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Authentic Campus Photography</span>
              </Badge>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                Kunri, Sindh
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0f2744]">
              Campus Architecture &amp; Scholarly Grounds
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
              Explore authentic glimpses into daily life at Government Qazi Sultan Higher Secondary School — from historic tiled arches to science laboratories and sports lawns. Click any photograph to open the full interactive viewer.
            </p>
          </div>

          <div className="shrink-0">
            <Button
              href="/gallery"
              variant="outline"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="border-slate-300 hover:border-sky-500"
            >
              Full Visual Archive (12 Photos)
            </Button>
          </div>
        </div>

        {/* 6-Photo Masonry / Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer aspect-[16/11] bg-slate-900"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Top tag badge */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-400/30">
                  {photo.category}
                </span>
              </div>

              {/* Zoom icon on hover */}
              <div className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                <h3 className="text-base font-bold text-white group-hover:text-sky-300 transition-colors drop-shadow-sm">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                  {photo.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox with Left / Right Navigation */}
        {selectedPhotoIndex !== null && activePhoto && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200 select-none"
            onClick={closeLightbox}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/80 shadow-2xl flex flex-col justify-between max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Toolbar */}
              <div className="p-3 sm:p-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between gap-3 text-white z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 text-xs font-bold uppercase tracking-wider border border-sky-400/30">
                    {activePhoto.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Photo {selectedPhotoIndex + 1} of {campusPhotos.length}
                  </span>
                </div>

                {/* Keyboard & swipe hint (desktop/tablet) */}
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                  <span>Use</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">←</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">→</kbd>
                  <span>keys or swipe</span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePhoto.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    aria-label="View original image file"
                    title="View original image file"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
                    aria-label="Close photo viewer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Center Image Stage with Floating Left & Right Navigation Arrows */}
              <div
                className="relative flex-1 min-h-[280px] sm:min-h-[420px] md:min-h-[480px] max-h-[58vh] flex items-center justify-center p-2 sm:p-4 bg-slate-950 overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Previous Button (Left Arrow) */}
                <button
                  type="button"
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-sky-600 active:scale-95 text-white border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 group"
                  aria-label="Previous photograph"
                  title="Previous photo (Left Arrow key)"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {/* High-Resolution Main Photo */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Next Button (Right Arrow) */}
                <button
                  type="button"
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-sky-600 active:scale-95 text-white border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center justify-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 group"
                  aria-label="Next photograph"
                  title="Next photo (Right Arrow key)"
                >
                  <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Interactive Thumbnail Carousel Strip */}
              <div className="px-3 sm:px-4 py-2.5 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto">
                {campusPhotos.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setSelectedPhotoIndex(idx)}
                    className={cn(
                      "relative w-12 h-9 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 transition-all border cursor-pointer",
                      idx === selectedPhotoIndex
                        ? "ring-2 ring-sky-400 border-sky-400 scale-105 opacity-100 shadow-lg"
                        : "border-slate-800 opacity-40 hover:opacity-85 hover:border-slate-600"
                    )}
                    aria-label={`Jump to ${photo.title}`}
                    title={photo.title}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.title}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Bottom Caption and Actions Bar */}
              <div className="p-4 sm:p-5 bg-slate-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800">
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {activePhoto.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center gap-1 sm:hidden">
                    <button
                      type="button"
                      onClick={goToPrevious}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition"
                    >
                      ← Prev
                    </button>
                    <button
                      type="button"
                      onClick={goToNext}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition"
                    >
                      Next →
                    </button>
                  </div>
                  <Link
                    href="/gallery"
                    className="px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Full Archive</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}


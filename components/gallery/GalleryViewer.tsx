"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { galleryCategories, schoolGallery } from "@/data/gallery";
import { Badge } from "@/components/ui/Badge";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  Check,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function GalleryViewer() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Filter photos by selected category
  const filteredPhotos = activeCategory === "all"
    ? schoolGallery
    : schoolGallery.filter((item) => item.category === activeCategory);

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! > 0 ? prev! - 1 : filteredPhotos.length - 1
    );
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const goToNext = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev! < filteredPhotos.length - 1 ? prev! + 1 : 0
    );
  }, [selectedPhotoIndex, filteredPhotos.length]);

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

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (selectedPhotoIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent background scrolling when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedPhotoIndex, closeLightbox, goToPrevious, goToNext]);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activePhoto = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;

  return (
    <div className="space-y-10">
      {/* 1. Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {galleryCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const currentCount = cat.id === "all" 
            ? schoolGallery.length 
            : schoolGallery.filter(p => p.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
                isActive
                  ? "bg-[#0f2744] text-white shadow-md shadow-[#0f2744]/15 scale-102"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/80 hover:text-slate-900"
              )}
            >
              <span>{cat.label}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded-md text-[11px] font-bold",
                  isActive
                    ? "bg-white/20 text-sky-200"
                    : "bg-slate-200/90 text-slate-600"
                )}
              >
                {currentCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Photo Grid / Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="group relative rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Gradient vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Top Badges */}
              <div className="absolute top-3 inset-x-3 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white uppercase tracking-wider border border-white/20 shadow-xs">
                  {photo.categoryLabel}
                </span>

                {photo.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-md text-[11px] font-extrabold text-white shadow-xs">
                    <Sparkles className="w-3 h-3 text-amber-200" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {/* Hover overlay hint */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="px-4 py-2 rounded-xl bg-white/90 backdrop-blur-md text-xs font-bold text-[#0f2744] shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Maximize2 className="w-3.5 h-3.5 text-[#0284c7]" />
                  <span>Click to Expand High-Res</span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-extrabold text-base text-[#0f2744] group-hover:text-[#0284c7] transition-colors leading-snug">
                  {photo.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                  {photo.caption}
                </p>
              </div>

              {/* Footer Metadata */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                  <span className="truncate">{photo.location}</span>
                </div>
                <div className="shrink-0 flex items-center gap-1 text-slate-400 font-medium">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>{photo.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Interactive Lightbox Modal */}
      {selectedPhotoIndex !== null && activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Modal Container */}
          <div
            className="relative w-full max-w-5xl max-h-[92vh] flex flex-col justify-between bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar */}
            <div className="p-3 sm:p-5 border-b border-slate-800 flex items-center justify-between gap-3 text-white z-10 bg-slate-950/80">
              <div className="flex items-center gap-2 sm:gap-3">
                <Badge variant="accent" size="sm">
                  {activePhoto.categoryLabel}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedPhotoIndex + 1} of {filteredPhotos.length}
                </span>
              </div>

              {/* Keyboard & swipe hint (desktop/tablet) */}
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
                <span>Use</span>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px] border border-slate-700">→</kbd>
                <span>or swipe</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-label="Share link"
                  title="Share link"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
                <a
                  href={activePhoto.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                  aria-label="View original image file"
                  title="View original image file"
                >
                  <Eye className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center Image Stage with Left / Right Arrows and Touch Swipe */}
            <div
              className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[60vh] flex items-center justify-center p-2 sm:p-4 bg-slate-950 overflow-hidden"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Previous Button */}
              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-sky-600 active:scale-95 text-white border border-slate-700/80 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 group cursor-pointer"
                aria-label="Previous photograph"
                title="Previous photo (Left arrow key)"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* High-Resolution Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  width={activePhoto.dimensions?.width || 1200}
                  height={activePhoto.dimensions?.height || 900}
                  priority
                  className="max-h-[56vh] w-auto max-w-full object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={goToNext}
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-sky-600 active:scale-95 text-white border border-slate-700/80 shadow-lg backdrop-blur-sm flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 group cursor-pointer"
                aria-label="Next photograph"
                title="Next photo (Right arrow key)"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Interactive Thumbnail Strip */}
            <div className="px-3 sm:px-4 py-2 bg-slate-950/95 border-t border-slate-800/80 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto">
              {filteredPhotos.map((photo, idx) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className={cn(
                    "relative w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden shrink-0 transition-all border cursor-pointer",
                    idx === selectedPhotoIndex
                      ? "ring-2 ring-sky-400 border-sky-400 scale-105 opacity-100 shadow-md"
                      : "border-slate-800 opacity-40 hover:opacity-85 hover:border-slate-600"
                  )}
                  aria-label={`Jump to ${photo.title}`}
                  title={photo.title}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Bottom Details Panel */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 text-slate-300 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {activePhoto.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-sky-400">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{activePhoto.location}</span>
                  </span>
                  <span>•</span>
                  <span>{activePhoto.date}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-4xl">
                  {activePhoto.caption}
                </p>
                <div className="flex items-center gap-2 shrink-0 sm:hidden">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

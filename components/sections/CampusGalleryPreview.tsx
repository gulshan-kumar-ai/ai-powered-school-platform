"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { ArrowRight, Camera, Sparkles, Building, Maximize2 } from "lucide-react";

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
  const [selectedPhoto, setSelectedPhoto] = useState<CampusPhoto | null>(null);

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
              Explore authentic glimpses into daily life at Government Qazi Sultan Higher Secondary School — from historic tiled arches to science laboratories and sports lawns.
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
              Full Visual Archive (11 Photos)
            </Button>
          </div>
        </div>

        {/* 6-Photo Masonry / Mosaic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campusPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
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

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[480px] w-full">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 bg-slate-950 text-white flex items-center justify-between border-t border-slate-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="text-xl font-bold mt-0.5">{selectedPhoto.title}</h3>
                  <p className="text-sm text-slate-300 mt-1">{selectedPhoto.description}</p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
                >
                  Close Viewer
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

import { HeroSection } from "@/components/sections/HeroSection";
import { HeroQuickAccess } from "@/components/sections/HeroQuickAccess";
import { IntroSection } from "@/components/sections/IntroSection";
import { PrincipalSpotlightSection } from "@/components/sections/PrincipalSpotlightSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { CampusGalleryPreview } from "@/components/sections/CampusGalleryPreview";
import { DigitalPreviewSection } from "@/components/sections/DigitalPreviewSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Cinematic Hero Section */}
      <HeroSection />

      {/* 1.5 Poster Shortcuts & Multiple User Access Strip */}
      <HeroQuickAccess />

      {/* 2. School Heritage & Character Pillars */}
      <IntroSection />

      {/* 2.5 Principal's Welcome & Leadership Spotlight */}
      <PrincipalSpotlightSection />

      {/* 3. Academic Programs & Board Preparation */}
      <ProgramsSection />

      {/* 4. Authentic Campus Architecture & Photography Showcase */}
      <CampusGalleryPreview />

      {/* 5. Official Announcements & Gazette Circulars */}
      <AnnouncementsSection />

      {/* 6. Upcoming School Events & Calendars */}
      <EventsSection />

      {/* 7. Next-Gen Smart Campus & Digital Innovation Suite */}
      <DigitalPreviewSection />

      {/* 8. Institutional Milestones & Benchmarks */}
      <StatsSection />

      {/* 9. Campus Inquiries & Admissions Office */}
      <ContactSection />
    </>
  );
}

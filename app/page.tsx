import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { AnnouncementsSection } from "@/components/sections/AnnouncementsSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { DigitalPreviewSection } from "@/components/sections/DigitalPreviewSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. School Introduction */}
      <IntroSection />

      {/* 3. Academic Programmes */}
      <ProgramsSection />

      {/* 4. Latest Notices and Announcements */}
      <AnnouncementsSection />

      {/* 5. Upcoming School Events */}
      <EventsSection />

      {/* 6. Digital Learning Preview */}
      <DigitalPreviewSection />

      {/* 7. School Benchmarks & Statistics */}
      <StatsSection />

      {/* 8. Campus Contact & Admissions Inquiries */}
      <ContactSection />
    </>
  );
}


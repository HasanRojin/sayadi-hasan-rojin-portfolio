"use client";

import Navbar from "@/components/portfolio/Navbar";
import ParticlesBackground from "@/components/portfolio/ParticlesBackground";
import HeroSection from "@/components/portfolio/HeroSection";
import GamesSection from "@/components/portfolio/GamesSection";
import ShowcaseSection from "@/components/portfolio/ShowcaseSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ContactSection from "@/components/portfolio/ContactSection";
import ScrollDots from "@/components/portfolio/ScrollDots";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* NOTE: no solid bg here — body supplies #05030a; a solid wrapper bg
          would paint OVER the -z-10 particle canvas and hide it. */}
      <ParticlesBackground />
      <Navbar />
      <ScrollDots />
      <main className="flex-1">
        <HeroSection />
        <GamesSection />
        <ShowcaseSection />
        <SkillsSection />
      </main>
      <ContactSection />
    </div>
  );
}

"use client";

import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Challenges from "@/components/sections/Challenges";
import AccentStatement from "@/components/sections/AccentStatement";
import Services from "@/components/sections/Services";
import ProjectsCarousel from "@/components/sections/ProjectsCarousel";
import About from "@/components/sections/About";
import MeetTheTeam from "@/components/sections/MeetTheTeam";
import Footer from "@/components/sections/Footer";
import ProjectModal from "@/components/ui/ProjectModal";
import ContactModal from "@/components/ui/ContactModal";
import { Project } from "@/data/projects";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#0B0B14] text-[#F4F1EA]">
      {/* Navigation */}
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* 
        CURTAIN GROUP: ONLY Hero + 2 sections directly below it
        Hero (z-0 sticky) -> Challenges (z-10 sticky) -> Accent (z-20 relative)
        Sticky works within this parent; once this group ends, normal scroll resumes.
      */}
      <div className="curtain-group relative w-full">
        {/* Landing Page (Hero) = Dark, 100svh, CoverSection z-0 */}
        <Hero onOpenContact={() => setIsContactOpen(true)} />

        {/* Section 1 below Hero = Challenges (Cream, numbered list), CoverSection z-10 */}
        <Challenges />

        {/* Section 2 below Hero = Accent statement (Full accent color, 3 columns), normal relative section z-20 */}
        <AccentStatement />
      </div>

      {/* 
        REMAINING SECTIONS: Normal scroll flow, existing layout & animations intact
      */}
      {/* Services (Disciplines, pinned horizontal scroll on desktop) */}
      <Services onOpenContact={() => setIsContactOpen(true)} />

      {/* Work (Curated project archive & physics carousel) */}
      <ProjectsCarousel
        onSelectProject={(project) => setSelectedProject(project)}
      />

      {/* About & Philosophy */}
      <About />

      {/* Team */}
      <MeetTheTeam />

      {/* CTA & Footer */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </main>
  );
}

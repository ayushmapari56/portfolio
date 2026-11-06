"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import { projectsData, Project } from "@/data/projects";
import ContactModal from "@/components/ui/ContactModal";
import ProjectModal from "@/components/ui/ProjectModal";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/data/config";

export default function WorkPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Featured Projects:
  // 1. Dentora (Dentist Web Flagship with real doctor/clinic photo)
  // 2. Capello (Luxury Salon, Trichology & Bridal Atelier)
  // 3. Velvet & Stone (Specialty Coffee & Bakehouse)
  // 4. AURA (Culinary Atelier & Cafe with kinetic food choreography)
  // 5. Autonomous Lead Routing Hub (AI & n8n Automation)
  const dentora = projectsData.find((p) => p.id === "dentora-dental-clinic") || projectsData[0];
  const capelloSalon = projectsData.find((p) => p.id === "capello-luxury-salon");
  const velvetCafe = projectsData.find((p) => p.id === "velvet-stone-cafe");
  const auraCafe = projectsData.find((p) => p.id === "aura-culinary-cafe");
  const aiAutomation = projectsData.find((p) => p.category === "AI Automation");

  const featuredProjects = [dentora, capelloSalon, velvetCafe, auraCafe, aiAutomation].filter(Boolean) as Project[];

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0B0B14]">
      {/* ── Top Navigation Bar ── */}
      <header className="sticky top-0 z-50 px-[5vw] py-4 bg-[#F4F1EA]/85 backdrop-blur-[12px] border-b border-[#DDD7C8]/70">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#DDD7C8] bg-white/70 hover:bg-white text-nav font-medium text-[#0B0B14] transition-all hover:-translate-x-0.5"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>

          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles size={14} />
            </div>
            <span className="font-bold tracking-tight text-sm text-[#0B0B14] group-hover:text-orange-600 transition-colors hidden sm:inline">
              {siteConfig.duoName}
            </span>
          </Link>

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-6 py-2.5 rounded-full bg-[#0B0B14] text-white hover:bg-orange-600 text-nav font-medium tracking-[-0.01em] transition-colors shadow-sm"
          >
            Start a Project
          </button>
        </div>
      </header>

      {/* ── Page Header: "What work we have done" ── */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 px-[5vw]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3.5 py-1 rounded-full text-mono-label font-mono font-medium tracking-[0.12em] uppercase bg-orange-100 border border-orange-200 text-orange-700">
              Selected Works
            </span>
            <span className="h-px w-16 bg-[#DDD7C8]" />
            <span className="text-mono-label font-mono font-medium tracking-[0.12em] text-[#8C887E]">
              01 / 05
            </span>
          </div>

          <h1 className="text-section font-medium tracking-[-0.035em] leading-[1.02] text-[#0B0B14] max-w-4xl">
            What work we have done.
          </h1>

          <p className="mt-6 max-w-[65ch] text-body text-[#6b6050] font-normal leading-[1.6]">
            Every system we engineer is tied to tangible business momentum. Explore our live client websites and autonomous AI workflow engines below.
          </p>
        </div>
      </section>

      {/* ── Featured Projects: Left Image, Right Description ── */}
      <section className="pb-28 md:pb-40 px-[5vw]">
        <div className="max-w-[1400px] mx-auto space-y-24 md:space-y-36">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-10 first:pt-0 border-t first:border-t-0 border-[#DDD7C8]/80"
            >
              {/* ── Left Side: Large Project Image ── */}
              <div className="lg:col-span-7">
                <div className="group relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-white border border-[#DDD7C8] shadow-xl hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={idx === 0}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />

                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top-left category tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3.5 py-1.5 rounded-full text-mono-label font-mono font-medium uppercase tracking-[0.12em] bg-white/95 backdrop-blur-md text-[#0B0B14] shadow-sm">
                      {project.category}
                    </span>
                  </div>

                  {/* Top-right live badge if available */}
                  {project.liveUrl && (
                    <div className="absolute top-4 right-4 z-10">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white font-mono text-mono-label uppercase tracking-wider shadow-md hover:bg-emerald-500 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span>Live Site</span>
                        <ArrowUpRight size={13} />
                      </a>
                    </div>
                  )}

                  {/* Bottom metric badge */}
                  {project.metrics && (
                    <div className="absolute bottom-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md text-mono-label font-mono shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold tabular-nums text-emerald-700">
                          {project.metrics.value}
                        </span>
                        <span className="text-[#8a8070] hidden sm:inline">
                          • {project.metrics.label}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Right Side: Project Description & Actions ── */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3 text-mono-label font-mono text-[#8C887E] uppercase tracking-[0.12em]">
                  <span className="font-semibold text-orange-600">
                    {project.client}
                  </span>
                  <span>•</span>
                  <span>{project.year}</span>
                </div>

                <h2 className="text-card font-medium tracking-[-0.02em] leading-[1.12] text-[#0B0B14]">
                  {project.title}
                </h2>

                <p className="text-card-desc text-[#44423C] font-normal leading-[1.6]">
                  {project.subtitle}
                </p>

                <p className="text-body text-[#6b6050] font-normal leading-[1.6]">
                  {project.description}
                </p>

                {/* Key results bullets */}
                <div className="space-y-2.5 pt-2">
                  {project.results.slice(0, 3).map((res, rIdx) => (
                    <div key={rIdx} className="flex items-start gap-2.5 text-card-desc text-[#44423C]">
                      <CheckCircle2 size={16} className="text-orange-500 shrink-0 mt-1" />
                      <span>{res}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-mono-label font-mono font-medium tracking-[0.1em] uppercase bg-white border border-[#DDD7C8] text-[#55524B]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-nav font-medium uppercase tracking-[-0.01em] shadow-md shadow-emerald-600/20 transition-all group"
                    >
                      <span>Visit Live Website</span>
                      <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-600 hover:bg-orange-700 text-white text-nav font-medium uppercase tracking-[-0.01em] shadow-md shadow-orange-600/20 transition-all"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer & CTA */}
      <Footer onOpenContact={() => setIsContactOpen(true)} />

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}


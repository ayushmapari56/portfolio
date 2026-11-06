"use client";

import Image from "next/image";
import { siteConfig } from "@/data/config";
import { teamData } from "@/data/team";
import { servicesList } from "@/data/services";
import { ArrowUpRight, Sparkles, Mail, MessageCircle } from "lucide-react";

interface FooterProps {
  onOpenContact: () => void;
}

export default function Footer({ onOpenContact }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#07070D] text-white pt-20 md:pt-[140px] pb-12 px-[5vw] border-t border-white/10 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-orange-500/10 via-amber-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* ── Above Footer: Centered Prominent CTA ───────────────── */}
        <div className="text-center py-16 md:py-24 border-b border-white/10 mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-mono-label font-mono font-medium tracking-[0.12em] text-orange-400 uppercase mb-6">
            <Sparkles size={13} />
            <span>Ready To Scale Your Operations?</span>
          </span>

          <h2 className="text-section font-medium tracking-[-0.03em] leading-[1.05] text-white max-w-3xl mx-auto">
            Let&apos;s build something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 font-medium">
              permanent.
            </span>
          </h2>

          <p className="mt-5 text-body text-neutral-400 max-w-[60ch] mx-auto leading-[1.6]">
            From sensory frontend flagships to self-healing AI workflows. Book an exploration call with Ayush &amp; Kishori.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-orange-500/60 bg-orange-500/10 hover:bg-orange-500 text-white text-nav font-medium uppercase tracking-[-0.01em] transition-all duration-300 shadow-lg shadow-orange-500/10 hover:shadow-orange-500/30"
            >
              <span>Start a project</span>
              <ArrowUpRight size={15} />
            </button>

            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white text-nav font-medium tracking-[-0.01em] uppercase transition-all"
            >
              <MessageCircle size={15} className="text-emerald-400" />
              <span>WhatsApp Us Directly</span>
            </a>
          </div>
        </div>

        {/* ── 4-Column Footer Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 items-start">
          {/* Column 1: Brand Blurb + Direct Contact (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg flex items-center justify-center bg-black/60 border border-white/15 p-1">
                <Image
                  src="/logo.png"
                  alt="AK Logo"
                  width={40}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
              <span className="font-bold tracking-tight text-white text-base">
                {siteConfig.duoName}
              </span>
            </div>

            <p className="text-body text-neutral-400 leading-relaxed max-w-sm pt-1">
              Engineering duo specializing in Next.js web platforms, autonomous n8n workflows, and conversational WhatsApp systems.
            </p>

            <div className="pt-2 space-y-2 text-mono-label font-mono text-neutral-400">
              <a
                href={siteConfig.socials.email}
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <Mail size={14} className="text-orange-400" />
                <span>{siteConfig.contactEmail}</span>
              </a>
              <div className="text-neutral-500">
                HQ: Maharashtra, India • Available Worldwide
              </div>
            </div>
          </div>

          {/* Column 2: Work (span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-orange-400 mb-4">
              WORK
            </h4>
            <ul className="space-y-3 text-mono-label font-mono text-neutral-400">
              <li>
                <a href="#archive" className="hover:text-white transition-colors inline-block">
                  Curated Archive
                </a>
              </li>
              <li>
                <a href="#archive" className="hover:text-white transition-colors inline-block">
                  Websites
                </a>
              </li>
              <li>
                <a href="#archive" className="hover:text-white transition-colors inline-block">
                  AI Automations
                </a>
              </li>
              <li>
                <a href="#archive" className="hover:text-white transition-colors inline-block">
                  WhatsApp Bots
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (span 4 - 2 sub-columns) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-orange-400 mb-4">
              SERVICES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-mono-label font-mono text-neutral-400">
              {servicesList.map((svc) => (
                <a
                  key={svc.title}
                  href={svc.href}
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-neutral-600 group-hover:text-orange-400 transition-colors tabular-nums">
                    {svc.number}
                  </span>
                  <span className="line-clamp-1">{svc.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Team (span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-orange-400 mb-4">
              TEAM
            </h4>
            <ul className="space-y-3 text-mono-label font-mono text-neutral-400">
              <li>
                <a href="#team" className="hover:text-white transition-colors inline-block">
                  {teamData[0].name}
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors inline-block">
                  {teamData[1].name}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors inline-block">
                  Our Philosophy
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Book Discovery Call
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Socials Row + Legal Links ────────────────────────── */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-6 text-mono-label font-mono text-neutral-400">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href={siteConfig.socials.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* Legal */}
          <div className="flex items-center gap-6 text-mono-label font-mono text-neutral-500">
            <span>Confidentiality &bull; NDA Ready</span>
            <span>Security SLA</span>
            <span>Zero Vendor Lock-in</span>
          </div>
        </div>

        {/* Giant faint watermark outline */}
        <div className="relative w-full text-center select-none pointer-events-none py-8 overflow-hidden">
          <span className="text-[clamp(40px,11vw,160px)] font-black uppercase text-stroke-outline-dark opacity-15 tracking-tight whitespace-nowrap block">
            Ayush &amp; Kishori
          </span>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-mono-label font-mono text-neutral-500">
          <div>
            © {currentYear} {siteConfig.duoName}. All Rights Reserved.
          </div>
          <div>
            Engineered with Next.js 15 &bull; Framer Motion &bull; GSAP
          </div>
        </div>
      </div>
    </footer>
  );
}

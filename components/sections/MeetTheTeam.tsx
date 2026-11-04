"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { teamData } from "@/data/team";
import { Linkedin, MessageCircle, Github, Sparkles, Instagram } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";

export default function MeetTheTeam() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="team"
      ref={ref}
      className="relative bg-[#ECE8DF] text-[#0B0B14] py-20 md:py-[140px] px-[5vw] border-t border-[#DDD7C8] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="px-4 py-1.5 rounded-full text-mono-label font-mono font-medium tracking-[0.1em] uppercase bg-white/80 border border-[#DDD7C8] text-[#44423C] shadow-sm">
                Meet The Duo
              </span>
              <span className="h-[1px] w-20 bg-[#DDD7C8]" />
              <span className="text-mono-label font-mono font-medium tracking-[0.1em] text-[#8C887E]">02 / 04</span>
            </div>
            <SplitReveal
              as="h2"
              className="text-section font-medium tracking-[-0.035em] leading-[1.02] text-[#0B0B14]"
            >
              {"Two Minds, One Integrated\nDigital Engine."}
            </SplitReveal>
          </div>

          <p className="max-w-[60ch] text-body text-[#55524B] font-normal leading-[1.6]">
            No bloated agency overhead. You work directly with the architects who build your web flagships and engineer your autonomous business operations.
          </p>
        </div>

        {/* Two Large Realistic Photo Cards with Balanced Portrait Framing */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* Card 1: Ayush Mapari */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl bg-white p-8 sm:p-10 lg:p-12 shadow-md border border-[#DDD7C8] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 will-change-transform"
          >
            <div>
              {/* Balanced, Natural Portrait Container with clip-path reveal */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] mx-auto rounded-2xl overflow-hidden bg-neutral-950 mb-8 shadow-md border border-[#E5E1D8] will-change-transform"
              >
                <Image
                  src={teamData[0].photo}
                  alt={teamData[0].name}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-mono-label font-mono text-orange-400 border border-white/10 flex items-center gap-1.5 shadow-sm uppercase tracking-[0.1em]">
                  <Sparkles size={12} />
                  <span>AI &amp; Automation Lead</span>
                </div>
              </motion.div>

              {/* Bio & Specialty */}
              <div className="space-y-3">
                <span className="text-mono-label font-mono tracking-[0.1em] uppercase text-orange-600 font-medium">
                  Co-Founder &amp; Automation Lead
                </span>
                <h3 className="text-card font-medium text-[#0B0B14] tracking-[-0.02em] leading-[1.15]">
                  {teamData[0].name}
                </h3>
                <p className="text-xs font-mono text-[#77736A] tracking-wider uppercase">
                  {teamData[0].specialty}
                </p>
                <p className="text-card-desc text-[#44423C] leading-[1.55] pt-2 max-w-[60ch]">
                  {teamData[0].bio}
                </p>
              </div>

              {/* Verified Metrics (JetBrains Mono, muted color, tabular-nums) */}
              <div className="grid grid-cols-2 gap-4 my-8 pt-6 border-t border-[#EAE5D9]">
                {teamData[0].metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F6F0]">
                    <div className="text-2xl sm:text-3xl font-mono font-medium tabular-nums text-[#0B0B14]">{m.value}</div>
                    <div className="text-mono-label font-mono text-[#77736A] uppercase tracking-[0.1em] mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials & Direct WhatsApp */}
            <div className="pt-6 border-t border-[#EAE5D9] flex items-center justify-between">
              <span className="text-mono-label font-mono uppercase tracking-[0.1em] text-[#8C887E]">
                Connect Directly
              </span>
              <div className="flex items-center gap-2">
                {teamData[0].socials.whatsapp && (
                  <a
                    href={teamData[0].socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-nav font-medium tracking-[-0.01em] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                )}
                {teamData[0].socials.linkedin && (
                  <a
                    href={teamData[0].socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#F4F1EA] hover:bg-blue-600 hover:text-white text-[#44423C] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                )}
                {teamData[0].socials.github && (
                  <a
                    href={teamData[0].socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#F4F1EA] hover:bg-black hover:text-white text-[#44423C] transition-colors"
                    aria-label="GitHub"
                  >
                    <Github size={17} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Kishori Charpe */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="group relative rounded-3xl bg-white p-8 sm:p-10 lg:p-12 shadow-md border border-[#DDD7C8] flex flex-col justify-between hover:shadow-2xl transition-all duration-300 will-change-transform"
          >
            <div>
              {/* Balanced, Natural Portrait Container with clip-path reveal */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                whileInView={{ clipPath: "inset(0% 0 0 0)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-[290px] sm:max-w-[320px] aspect-[3/4] mx-auto rounded-2xl overflow-hidden bg-neutral-950 mb-8 shadow-md border border-[#E5E1D8] will-change-transform"
              >
                <Image
                  src={teamData[1].photo}
                  alt={teamData[1].name}
                  fill
                  priority
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md text-mono-label font-mono text-sky-400 border border-white/10 flex items-center gap-1.5 shadow-sm uppercase tracking-[0.1em]">
                  <Sparkles size={12} />
                  <span>Website &amp; Product Architect</span>
                </div>
              </motion.div>

              {/* Bio & Specialty */}
              <div className="space-y-3">
                <span className="text-mono-label font-mono tracking-[0.1em] uppercase text-sky-600 font-medium">
                  Co-Founder &amp; Website Architect
                </span>
                <h3 className="text-card font-medium text-[#0B0B14] tracking-[-0.02em] leading-[1.15]">
                  {teamData[1].name}
                </h3>
                <p className="text-xs font-mono text-[#77736A] tracking-wider uppercase">
                  {teamData[1].specialty}
                </p>
                <p className="text-card-desc text-[#44423C] leading-[1.55] pt-2 max-w-[60ch]">
                  {teamData[1].bio}
                </p>
              </div>

              {/* Verified Metrics (JetBrains Mono, muted color, tabular-nums) */}
              <div className="grid grid-cols-2 gap-4 my-8 pt-6 border-t border-[#EAE5D9]">
                {teamData[1].metrics.map((m, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#F8F6F0]">
                    <div className="text-2xl sm:text-3xl font-mono font-medium tabular-nums text-[#0B0B14]">{m.value}</div>
                    <div className="text-mono-label font-mono text-[#77736A] uppercase tracking-[0.1em] mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Socials & Direct WhatsApp */}
            <div className="pt-6 border-t border-[#EAE5D9] flex items-center justify-between">
              <span className="text-mono-label font-mono uppercase tracking-[0.1em] text-[#8C887E]">
                Connect Directly
              </span>
              <div className="flex items-center gap-2">
                {teamData[1].socials.whatsapp && (
                  <a
                    href={teamData[1].socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 text-nav font-medium tracking-[-0.01em] transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={15} />
                    <span>WhatsApp</span>
                  </a>
                )}
                {teamData[1].socials.linkedin && (
                  <a
                    href={teamData[1].socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#F4F1EA] hover:bg-sky-600 hover:text-white text-[#44423C] transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={17} />
                  </a>
                )}
                {teamData[1].socials.instagram && (
                  <a
                    href={teamData[1].socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#F4F1EA] hover:bg-rose-500 hover:text-white text-[#44423C] transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={17} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

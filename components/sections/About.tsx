"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue, useReducedMotion } from "framer-motion";
import { teamData } from "@/data/team";
import { ArrowDown, Code2, Bot } from "lucide-react";
import SplitReveal from "@/components/ui/SplitReveal";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 6. Subtle scrubbed parallax (+/-50px)
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -60]);

  const statement =
    "We are a creative engineering duo crafting digital flagships and autonomous workflows. We don't just build websites that turn heads—we engineer AI infrastructure that operates without friction, so your brand grows on autopilot.";

  const words = statement.split(" ");

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative bg-[#F4F1EA] text-[#0B0B14] py-20 md:py-[140px] px-[5vw] transition-colors duration-700 overflow-hidden"
    >
      {/* Decorative subtle texture/gradient */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-amber-200/30 to-sky-200/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto">
        {/* Section Pill Label */}
        <div className="flex items-center gap-3 mb-12">
          <span className="px-4 py-1.5 rounded-full text-mono-label font-mono font-medium tracking-[0.1em] uppercase bg-[#EAE5D9] border border-[#DDD7C8] text-[#44423C]">
            About Our Duo
          </span>
          <span className="h-[1px] w-20 bg-[#DDD7C8]" />
          <span className="text-mono-label font-mono font-medium tracking-[0.1em] text-[#8C887E]">01 / 04</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left Column: Headline & Word-by-Word Reveal */}
          <div className="lg:col-span-7 space-y-10">
            <div>
              <SplitReveal
                as="h2"
                className="text-section font-medium tracking-[-0.035em] leading-[1.02] text-[#0B0B14]"
              >
                {"Creative mindset,\ndigital skillset."}
              </SplitReveal>
            </div>

            {/* Word-by-word reveal (Space Grotesk, body size 18px / 1.125rem, line-height 1.6) */}
            <p className="text-body md:text-2xl font-normal leading-[1.6] text-[#2C2B27] flex flex-wrap gap-x-2 gap-y-1 max-w-[60ch]">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start * 0.7, end * 0.7]}>
                    {word}
                  </Word>
                );
              })}
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="#team"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0B0B14] hover:bg-orange-600 text-[#F4F1EA] font-medium text-nav tracking-[-0.01em] uppercase transition-colors shadow-md"
              >
                <span>More About Us</span>
                <ArrowDown size={15} />
              </a>

              <a
                href="#services"
                className="px-7 py-3.5 rounded-full border border-[#DDD7C8] bg-white/70 hover:bg-white text-nav font-medium uppercase tracking-[-0.01em] text-[#0B0B14] transition-colors shadow-sm"
              >
                Explore Capabilities
              </a>
            </div>
          </div>

          {/* Right Column: Two Portraits with Parallax & Clip-path Reveal */}
          <div className="lg:col-span-5 relative min-h-[500px] sm:min-h-[560px] flex items-center justify-center">
            {/* Glow backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 via-sky-300/20 to-amber-200/30 rounded-3xl blur-2xl pointer-events-none" />

            {/* Portrait 1 - Ayush (Automation Lead) - Higher & Left */}
            <motion.div
              style={{ y: prefersReduced ? 0 : y1 }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, rotate: -1 }}
              className="absolute left-2 sm:left-4 top-2 sm:top-4 z-10 w-[220px] sm:w-[260px] md:w-[280px] aspect-[4/5] rounded-3xl overflow-hidden bg-white p-3 shadow-xl border border-[#DDD7C8] group cursor-pointer will-change-transform"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#181829]">
                <Image
                  src={teamData[0].photo}
                  alt={`${teamData[0].name} - ${teamData[0].role}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover label with name + role */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 text-mono-label font-mono text-orange-400 uppercase tracking-[0.1em]">
                    <Bot size={13} />
                    <span>{teamData[0].name}</span>
                  </div>
                  <div className="text-sm font-medium leading-tight mt-0.5">
                    {teamData[0].role}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Portrait 2 - Kishori (Website Architect) - Lower & Right */}
            <motion.div
              style={{ y: prefersReduced ? 0 : y2 }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.03, rotate: 1.5 }}
              className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 z-20 w-[210px] sm:w-[250px] md:w-[270px] aspect-[4/5] rounded-3xl overflow-hidden bg-white p-3 shadow-2xl border border-[#DDD7C8] group cursor-pointer will-change-transform"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#181829]">
                <Image
                  src={teamData[1].photo}
                  alt={`${teamData[1].name} - ${teamData[1].role}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Hover label with name + role */}
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 text-mono-label font-mono text-sky-400 uppercase tracking-[0.1em]">
                    <Code2 size={13} />
                    <span>{teamData[1].name}</span>
                  </div>
                  <div className="text-sm font-medium leading-tight mt-0.5">
                    {teamData[1].role}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Word reveal component with scroll-progress opacity mapping
function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-opacity inline-block font-normal will-change-transform">
      {children}
    </motion.span>
  );
}

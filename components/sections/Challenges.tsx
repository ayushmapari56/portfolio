"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { challengesData } from "@/data/challenges";
import SplitReveal from "@/components/ui/SplitReveal";
import CoverSection from "@/components/ui/CoverSection";

const marqueeItems = [
  "WEBSITES",
  "WHATSAPP BOTS",
  "AUTOMATION",
  "BOOKING",
  "DESIGN",
  "SUPPORT",
];

export default function Challenges() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "0px 0px -15% 0px" });
  const prefersReduced = useReducedMotion();

  return (
    <CoverSection
      id="challenges"
      zIndex={10}
      className="rounded-t-[24px] md:rounded-t-[32px] bg-[#F4F1EA] text-[#0B0B14] shadow-[0_-24px_60px_rgba(0,0,0,0.12)] overflow-hidden"
      style={{ backgroundColor: "#F4F1EA" }}
    >
      {/* Top marquee strip: slow infinite loop, 13px mono, muted, thin bottom border */}
      <div className="w-full border-b border-[#DDD7C8] overflow-hidden py-3.5 bg-[#F4F1EA]">
        <div className="flex whitespace-nowrap overflow-hidden select-none">
          <motion.div
            animate={{ x: prefersReduced ? 0 : ["0%", "-50%"] }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "linear",
            }}
            className="flex items-center gap-6 text-mono-label font-mono uppercase tracking-[0.12em] text-[#8C887E] shrink-0"
          >
            {[...Array(4)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6">
                {marqueeItems.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-6">
                    <span>{item}</span>
                    <span className="text-orange-500">·</span>
                  </span>
                ))}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      <div
        ref={contentRef}
        className="max-w-[1400px] mx-auto py-20 md:py-[140px] px-[5vw]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          {/* Left — mono label + big H2 (takes 5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 lg:self-start">
            <span className="block text-mono-label font-mono font-medium uppercase tracking-[0.1em] text-[#8C887E] mb-6">
              The Challenges
            </span>
            <SplitReveal
              as="h2"
              className="text-section font-medium tracking-[-0.035em] leading-[1.02] text-[#0B0B14]"
            >
              {"What's holding\nbusinesses back"}
            </SplitReveal>
            <motion.p
              initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-[60ch] text-body text-[#6b6050] font-normal leading-[1.6]"
            >
              Most businesses know they need better systems. The hard part is
              knowing which bottlenecks destroy the most profit.
            </motion.p>
          </div>

          {/* Right — 3 numbered rows (01, 02, 03) with thin dividers */}
          <div className="lg:col-span-7 space-y-0">
            {challengesData.map((item, i) => (
              <motion.div
                key={item.number}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group py-10 first:pt-0"
              >
                {/* Thin divider line that draws left to right */}
                {i > 0 && (
                  <motion.div
                    className="h-px bg-[#DDD7C8] mb-10 origin-left will-change-transform"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                )}

                <div className="flex gap-8 sm:gap-10 items-start">
                  <span className="text-2xl sm:text-3xl md:text-4xl font-mono font-medium text-[#D8CEBE] tabular-nums shrink-0 leading-none mt-1 group-hover:text-orange-500 transition-colors duration-300">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="text-card font-medium tracking-[-0.02em] leading-[1.15] text-[#1a1510] group-hover:text-orange-600 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-body text-[#6b6050] leading-[1.6] max-w-[60ch]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </CoverSection>
  );
}

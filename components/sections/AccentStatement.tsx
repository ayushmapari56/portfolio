"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { accentHeadline, accentColumns } from "@/data/accent";

export default function AccentStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  // Scroll reveal: Map scrollYProgress to opacity 0.2 -> 1 and translateY 40px -> 0 for heading
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 35%"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1.0]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // Column reveals with slight stagger
  const col1Opacity = useTransform(scrollYProgress, [0.2, 0.75], [0.2, 1.0]);
  const col1Y = useTransform(scrollYProgress, [0.2, 0.75], [30, 0]);

  const col2Opacity = useTransform(scrollYProgress, [0.3, 0.85], [0.2, 1.0]);
  const col2Y = useTransform(scrollYProgress, [0.3, 0.85], [30, 0]);

  const col3Opacity = useTransform(scrollYProgress, [0.4, 0.95], [0.2, 1.0]);
  const col3Y = useTransform(scrollYProgress, [0.4, 0.95], [30, 0]);

  const colTransforms = [
    { opacity: col1Opacity, y: col1Y },
    { opacity: col2Opacity, y: col2Y },
    { opacity: col3Opacity, y: col3Y },
  ];

  return (
    <section
      ref={sectionRef}
      id="statement"
      className="relative z-20 rounded-t-[24px] md:rounded-t-[32px] text-white py-20 md:py-[140px] px-[5vw] shadow-[0_-24px_60px_rgba(0,0,0,0.12)] overflow-hidden"
      style={{
        backgroundColor: "#FF6E10",
        backgroundImage:
          "linear-gradient(135deg, #FF8A00 0%, #FF6E10 50%, #F97316 100%)",
      }}
    >
      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')",
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Big headline with scroll reveal */}
        <div className="max-w-5xl">
          <motion.span
            style={{
              opacity: prefersReduced ? 1 : headingOpacity,
            }}
            className="inline-block text-mono-label font-mono font-medium text-white/70 tracking-[0.12em] uppercase mb-6"
          >
            CORE PHILOSOPHY
          </motion.span>
          <motion.h2
            style={{
              opacity: prefersReduced ? 1 : headingOpacity,
              y: prefersReduced ? 0 : headingY,
            }}
            className="text-statement font-medium tracking-[-0.035em] leading-[1.05] text-white will-change-[transform,opacity]"
          >
            {accentHeadline}
          </motion.h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 mt-16 md:mt-24">
          {accentColumns.map((col, i) => {
            const transform = colTransforms[i] || colTransforms[0];
            return (
              <motion.div
                key={col.number}
                style={{
                  opacity: prefersReduced ? 1 : transform.opacity,
                  y: prefersReduced ? 0 : transform.y,
                }}
                className="relative pt-6 border-t border-white/25 will-change-[transform,opacity]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-mono-label font-mono font-medium text-white/70 tracking-[0.12em] uppercase tabular-nums">
                    {col.number}
                  </span>
                  <span className="h-px w-8 bg-white/30" />
                </div>
                <h3 className="text-card font-medium tracking-[-0.02em] leading-[1.15] text-white">
                  {col.title}
                </h3>
                <p className="mt-3 text-body text-white/85 leading-[1.6] max-w-[60ch]">
                  {col.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

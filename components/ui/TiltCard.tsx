"use client";

import Image from "next/image";
import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

/* ── Tuning knobs (importable by carousel) ───────────────── */
export const CARD_DEFAULTS = {
  cardSpacing: 360,
  cardSpacingTablet: 300,
  cardSpacingMobile: 260,
  maxRotateZ: 6,
  maxRotateY: 8,
  clampRotateZ: 14,
  arcHeight: 14,
  blurAmount: 6,
};

interface TiltCardProps {
  project: Project;
  index: number;
  /** Continuous scroll position (float) */
  scrollPos: MotionValue<number>;
  /** Total number of items (needed for wrapping) */
  totalItems: number;
  cardSpacing: number;
  maxRotateZ: number;
  maxRotateY: number;
  clampRotateZ: number;
  arcHeight: number;
  blurAmount: number;
  isExpanded: boolean;
  isCentered: boolean;
  onCardClick: (index: number) => void;
}

export default function TiltCard({
  project,
  index,
  scrollPos,
  totalItems,
  cardSpacing,
  maxRotateZ,
  maxRotateY,
  clampRotateZ,
  arcHeight,
  blurAmount,
  isExpanded,
  isCentered,
  onCardClick,
}: TiltCardProps) {
  const prefersReduced = useReducedMotion();

  // d = distance from center (float) — wraps around for infinite loop
  const d = useTransform(scrollPos, (pos) => {
    let diff = index - pos;
    // wrap for infinite loop
    const half = totalItems / 2;
    if (diff > half) diff -= totalItems;
    if (diff < -half) diff += totalItems;
    return diff;
  });

  // Per-card transforms derived from d
  const x = useTransform(d, (v) => v * cardSpacing);
  const y = useTransform(d, (v) => v * v * arcHeight);
  const rotateZ = useTransform(d, (v) =>
    Math.max(-clampRotateZ, Math.min(clampRotateZ, v * maxRotateZ))
  );
  const rotateY = useTransform(d, (v) => v * -maxRotateY);
  const scale = useTransform(d, (v) => {
    const absD = Math.abs(v);
    if (absD <= 0.5) return 1;
    if (absD <= 1.5) return 1 - (absD - 0.5) * 0.18;
    return 0.7;
  });
  const opacity = useTransform(d, (v) => {
    const absD = Math.abs(v);
    if (absD <= 0.5) return 1;
    if (absD <= 1) return 0.92;
    if (absD < 2.2) return 1 - (absD - 1) * 0.75;
    return 0;
  });
  const blur = useTransform(d, (v) => {
    if (prefersReduced) return 0;
    const absD = Math.abs(v);
    if (absD <= 1.0) return 0;
    if (absD <= 1.6) return (absD - 1.0) * (blurAmount / 0.6);
    return blurAmount;
  });
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));

  // CSS filter string from blur value
  const filterStr = useTransform(blur, (b) =>
    b > 0 ? `blur(${b}px)` : "none"
  );

  // Content opacity: cards further from center have dimmed text
  const contentOpacity = useTransform(d, (v) => {
    const absD = Math.abs(v);
    if (absD <= 0.3) return 1;
    if (absD <= 1.2) return 0.7;
    return 0.4;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-0 will-change-transform"
      style={{
        x,
        y,
        rotateZ: prefersReduced ? 0 : rotateZ,
        rotateY: prefersReduced ? 0 : rotateY,
        scale,
        opacity,
        zIndex,
        marginLeft: -160, // half of card width
        filter: filterStr,
      }}
    >
      <motion.button
        onClick={() => onCardClick(index)}
        className={`group relative w-[320px] rounded-2xl overflow-hidden bg-white border text-left transition-shadow duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
          isCentered
            ? "border-orange-300/50 shadow-xl hover:shadow-2xl hover:-translate-y-1.5"
            : "border-[#E5DDD0]/70 shadow-md"
        }`}
        style={{ transition: "box-shadow 0.3s, translate 0.3s" }}
        aria-label={`Project: ${project.title}`}
        tabIndex={isCentered ? 0 : -1}
      >
        {/* Image */}
        <div className="relative w-full aspect-[16/11] overflow-hidden bg-neutral-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            priority={index < 4}
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category tag */}
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-1 rounded-full text-mono-label font-mono font-medium uppercase tracking-[0.12em] bg-white/90 backdrop-blur-sm text-[#5a5040] shadow-sm">
              {project.category}
            </span>
          </div>

          {/* Live site indicator / Arrow icon */}
          {project.liveUrl ? (
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/95 text-white backdrop-blur-sm text-mono-label font-mono uppercase tracking-[0.1em] shadow-md group-hover:scale-105 transition-transform">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>Live Site</span>
              <ArrowUpRight size={13} />
            </div>
          ) : (
            <div className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#5a5040] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
              <ArrowUpRight size={14} />
            </div>
          )}

          {/* Metric badge */}
          {project.metrics && (
            <motion.div
              className="absolute bottom-3 right-3 z-10"
              style={{ opacity: contentOpacity }}
            >
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-mono-label font-mono shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-medium tabular-nums text-emerald-700">
                  {project.metrics.value}
                </span>
                <span className="text-[#8a8070] hidden sm:inline">
                  • {project.metrics.label}
                </span>
              </span>
            </motion.div>
          )}
        </div>

        {/* Card body */}
        <motion.div className="p-6" style={{ opacity: contentOpacity }}>
          <div className="flex items-center justify-between text-mono-label font-mono text-[#9a9080] mb-2 uppercase tracking-[0.12em]">
            <span className="font-medium text-orange-600">
              {project.category}
            </span>
            <span className="tabular-nums">{project.year}</span>
          </div>

          <h3 className="text-card font-medium tracking-[-0.02em] leading-[1.15] text-[#1a1510] line-clamp-1 group-hover:text-orange-600 transition-colors">
            {project.title}
          </h3>

          <p className="text-card-desc text-[#6b6050] mt-2 line-clamp-2 leading-[1.6]">
            {project.subtitle}
          </p>

          {project.liveUrl && (
            <div className="mt-3.5 flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-600 uppercase tracking-wider group-hover:text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Click to open live website</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
}

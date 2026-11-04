"use client";

import { useRef, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface SplitRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  /** delay before the first line starts (seconds) */
  delay?: number;
  /** stagger between lines (seconds) */
  stagger?: number;
  /** once = animate only on first enter */
  once?: boolean;
}

/**
 * 3. Headings: line-by-line mask reveal
 * Each line slides up from behind an overflow-hidden wrapper:
 * 110% -> 0, 1s, ease cubic-bezier(0.22, 1, 0.36, 1), stagger 0.09s
 * Triggered when 85% into the viewport (margin: 0px 0px -15% 0px)
 */
export default function SplitReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  stagger = 0.09,
  once = true,
}: SplitRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Triggered when 85% into viewport: bottom margin -15%
  const isInView = useInView(ref, { once, margin: "0px 0px -15% 0px" });
  const prefersReduced = useReducedMotion();

  // Split by newline
  const lines = useMemo(() => {
    return children.split("\n").filter((l) => l.trim().length > 0);
  }, [children]);

  if (prefersReduced) {
    return <Tag className={className}>{children.replace(/\n/g, " ")}</Tag>;
  }

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`${className} font-medium`}
      aria-label={children.replace(/\n/g, " ")}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%" }}
            animate={isInView ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 1.0,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

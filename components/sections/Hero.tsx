"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import CoverSection from "@/components/ui/CoverSection";
import { Sparkles, ArrowDown } from "lucide-react";
import { siteConfig } from "@/data/config";

interface HeroProps {
  onSelectProject?: (p: unknown) => void;
  onOpenContact: () => void;
}

const PILL_TAGS = [
  { label: "Websites", href: "#archive" },
  { label: "WhatsApp Bots", href: "#services" },
  { label: "AI Automation", href: "#services" },
];

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "#contact", isContact: true },
];

export default function Hero({ onOpenContact }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // Mouse Parallax for Ghost Image (+/- 12px)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(0, { stiffness: 60, damping: 20 });
  const springY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (prefersReduced) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = ((e.clientX / innerWidth) - 0.5) * 24; // +/-12px
      const y = ((e.clientY / innerHeight) - 0.5) * 24;
      springX.set(x);
      springY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY, prefersReduced]);

  // Scroll Behavior:
  // Title & signature move up slightly (translateY up to -60px) and fade to 0.5 opacity
  // Pill tags create a soft echo (a second faded copy offset by 8px below)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.5]);
  const echoOpacity = useTransform(scrollYProgress, [0, 0.35, 0.7], [0, 0.45, 0]);
  const echoY = useTransform(scrollYProgress, [0, 0.7], [0, 8]);

  const portfolioWord = "PORTFOLIO".split("");

  return (
    <CoverSection
      zIndex={0}
      className="min-h-[100svh] h-[100svh] w-full overflow-hidden relative flex flex-col justify-between select-none"
      style={{
        background: "linear-gradient(135deg, #FF8A1F 0%, #F26A14 100%)",
      }}
    >
      <div ref={heroRef} className="absolute inset-0 pointer-events-none" />

      {/* ── 1. Ghost Image with Ken Burns & Mouse Parallax ── */}
      <motion.div
        style={{
          x: prefersReduced ? 0 : springX,
          y: prefersReduced ? 0 : springY,
        }}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      >
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-full h-full"
        >
          <Image
            src="/hero/ghost.jpg"
            alt="Skyline watermark"
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover filter grayscale mix-blend-soft-light opacity-25"
          />
        </motion.div>
      </motion.div>

      {/* Subtle vignette for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10 pointer-events-none z-0" />

      {/* ── 2. Top Header (Logo Left, Simple White Links Right) ── */}
      <header className="relative z-20 w-full px-[5vw] py-7 flex items-center justify-between">
        {/* Top-left: Small logo / name mark in white */}
        <motion.a
          href="#"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 group text-white pointer-events-auto"
        >
          <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform flex items-center justify-center bg-black/40 border border-white/20 backdrop-blur-md p-1">
            <Image
              src="/logo.png"
              alt="AK - Ayush & Kishori"
              width={40}
              height={40}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium tracking-tight text-sm text-white group-hover:text-white/80 transition-colors">
              {siteConfig.duoName}
            </span>
            <span className="text-[10px] font-mono -mt-0.5 text-white/70">
              {siteConfig.duoHandle}
            </span>
          </div>
        </motion.a>

        {/* Top-right: Simple nav links in white (About, Work, Services, Contact) */}
        <nav className="hidden sm:flex items-center gap-6 sm:gap-8">
          {NAV_LINKS.map((link, idx) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.45 + idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {link.isContact ? (
                <button
                  onClick={onOpenContact}
                  className="group relative text-base font-medium text-white transition-opacity hover:opacity-90 tracking-[-0.01em]"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                </button>
              ) : (
                <a
                  href={link.href}
                  className="group relative text-base font-medium text-white transition-opacity hover:opacity-90 tracking-[-0.01em]"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-[-2px] left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              )}
            </motion.div>
          ))}
        </nav>

        {/* Mobile quick action */}
        <div className="sm:hidden">
          <button
            onClick={onOpenContact}
            className="px-4 py-1.5 rounded-full border border-white/80 text-white text-xs font-medium tracking-wide uppercase hover:bg-white hover:text-[#F26A14] transition-colors"
          >
            Contact
          </button>
        </div>
      </header>

      {/* ── 3. Center-Bottom Main Area (Around 55-60% of height) ── */}
      <div className="relative z-10 w-full px-[5vw] flex flex-col items-center justify-center my-auto pt-6 pb-2">
        <motion.div
          style={{
            y: prefersReduced ? 0 : titleY,
            opacity: prefersReduced ? 1 : titleOpacity,
          }}
          className="relative flex flex-col items-center will-change-[transform,opacity]"
        >
          {/* Main Display: "PORTFOLIO" */}
          <div className="relative inline-block leading-none">
            <h1
              className="font-display font-black text-white uppercase text-center tracking-[-0.04em] leading-[0.9] text-[clamp(4.5rem,14vw,12.5rem)]"
              style={{
                textShadow:
                  "0 2px 0 rgba(0,0,0,0.06), 0 10px 30px rgba(120,50,0,0.25)",
              }}
            >
              {portfolioWord.map((letter, i) => (
                <span
                  key={i}
                  className="inline-block overflow-hidden align-top"
                >
                  <motion.span
                    initial={prefersReduced ? { opacity: 0 } : { y: "110%" }}
                    animate={prefersReduced ? { opacity: 1 } : { y: "0%" }}
                    transition={{
                      duration: 0.85,
                      delay: 0.15 + i * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block will-change-transform"
                  >
                    {letter}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Overlapping Handwritten Script Signature: "Ayush & Kishori" */}
            <motion.div
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { clipPath: "inset(0 100% 0 0)" }
              }
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : { clipPath: "inset(0 0% 0 0)" }
              }
              transition={{
                duration: 1.6,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -bottom-4 sm:-bottom-7 md:-bottom-10 -left-2 sm:left-2 md:left-6 z-20 pointer-events-none select-none -rotate-6 will-change-[clip-path]"
            >
              <span
                className="font-script block whitespace-nowrap text-[#1F2A14] text-[clamp(3.2rem,9.5vw,9.5rem)] leading-none filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
                style={{
                  fontFamily: "var(--font-script), cursive",
                }}
              >
                Ayush &amp; Kishori
              </span>
            </motion.div>
          </div>

          {/* ── 4. Outlined Pill Tags (3 in a row, centered) ── */}
          <div className="relative mt-8 sm:mt-12 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 z-10">
            {PILL_TAGS.map((pill, idx) => (
              <motion.div
                key={pill.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Scroll "Echo" - soft second faded copy below each pill */}
                <motion.div
                  style={{
                    y: prefersReduced ? 0 : echoY,
                    opacity: prefersReduced ? 0 : echoOpacity,
                  }}
                  className="absolute inset-0 rounded-full border border-white/40 pointer-events-none select-none blur-[0.5px]"
                  aria-hidden="true"
                />

                <a
                  href={pill.href}
                  className="relative z-10 inline-block px-[22px] py-[10px] rounded-full border border-white text-white text-[16px] font-medium tracking-[-0.01em] transition-all duration-300 hover:bg-white hover:text-[#F26A14] hover:shadow-lg hover:shadow-black/10 active:scale-95"
                >
                  {pill.label}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── 5. Bottom Center: Tiny "Scroll" mono label with thin animated bounce line ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="relative z-20 pb-7 flex flex-col items-center justify-center gap-2 pointer-events-none"
      >
        <span className="text-mono-label font-mono font-medium uppercase tracking-[0.2em] text-white/80 text-[11px]">
          Scroll
        </span>
        <motion.div
          animate={
            prefersReduced
              ? {}
              : {
                  y: [0, 6, 0],
                }
          }
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-[1.5px] h-6 bg-white/70 rounded-full"
        />
      </motion.div>
    </CoverSection>
  );
}

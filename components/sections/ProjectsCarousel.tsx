"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { projectsData, Project } from "@/data/projects";
import TiltCard, { CARD_DEFAULTS } from "@/components/ui/TiltCard";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  ExternalLink,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   TUNING KNOBS – adjust these at the top of the file
   ═══════════════════════════════════════════════════════════ */
const SPRING_STIFFNESS = 120;
const SPRING_DAMPING = 22;
const SPRING_MASS = 0.8;
const AUTOPLAY_INTERVAL = 5000; // ms, 0 = off
const DRAG_SENSITIVITY = 0.003; // px → scroll units
const WHEEL_SENSITIVITY = 0.002;
const MOMENTUM_DECAY = 0.94; // 0–1, higher = more coast
const SETTLE_THRESHOLD = 0.08; // how close before snapping

interface ProjectsCarouselProps {
  onSelectProject: (p: Project) => void;
}

export default function ProjectsCarousel({
  onSelectProject,
}: ProjectsCarouselProps) {
  const prefersReduced = useReducedMotion();

  /* ── State ─────────────────────────────────────────────── */
  const [filter, setFilter] = useState<string>("All");
  const [expandedProject, setExpandedProject] = useState<Project | null>(null);

  const categories = ["All", "Websites", "AI Automation", "WhatsApp Bots"];

  const filteredProjects = useMemo(
    () =>
      filter === "All"
        ? projectsData
        : projectsData.filter((p) => p.category === filter),
    [filter]
  );

  const count = filteredProjects.length;
  const shouldLoop = count >= 4;

  /* ── Responsive card spacing ───────────────────────────── */
  const [cardSpacing, setCardSpacing] = useState(CARD_DEFAULTS.cardSpacing);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardSpacing(CARD_DEFAULTS.cardSpacingMobile);
      else if (w < 1024) setCardSpacing(CARD_DEFAULTS.cardSpacingTablet);
      else setCardSpacing(CARD_DEFAULTS.cardSpacing);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ── Core scroll motion value + spring ─────────────────── */
  const rawScroll = useMotionValue(0);
  const scrollPos = useSpring(rawScroll, {
    stiffness: SPRING_STIFFNESS,
    damping: SPRING_DAMPING,
    mass: SPRING_MASS,
  });

  /* ── Derived "nearest index" (for highlighting center) ── */
  const [centeredIndex, setCenteredIndex] = useState(0);
  useEffect(() => {
    const unsub = scrollPos.on("change", (v) => {
      let idx = Math.round(v);
      if (shouldLoop) {
        idx = ((idx % count) + count) % count;
      } else {
        idx = Math.max(0, Math.min(count - 1, idx));
      }
      setCenteredIndex(idx);
    });
    return unsub;
  }, [scrollPos, count, shouldLoop]);

  /* ── Pointer drag ──────────────────────────────────────── */
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const velocity = useRef(0);
  const lastPointerX = useRef(0);
  const lastPointerTime = useRef(0);
  const momentumRaf = useRef(0);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (expandedProject) return;
    isDragging.current = true;
    dragStartX.current = e.clientX;
    dragStartScroll.current = rawScroll.get();
    lastPointerX.current = e.clientX;
    lastPointerTime.current = performance.now();
    velocity.current = 0;
    cancelAnimationFrame(momentumRaf.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dt = now - lastPointerTime.current;
    const dx = e.clientX - lastPointerX.current;
    if (dt > 0) velocity.current = dx / dt;
    lastPointerX.current = e.clientX;
    lastPointerTime.current = now;

    const totalDx = e.clientX - dragStartX.current;
    const newVal = dragStartScroll.current - totalDx * DRAG_SENSITIVITY * (cardSpacing / 360);
    rawScroll.set(shouldLoop ? newVal : Math.max(-0.5, Math.min(count - 0.5, newVal)));
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Momentum / inertia
    let vel = -velocity.current * DRAG_SENSITIVITY * (cardSpacing / 360) * 16; // per-frame velocity
    const coast = () => {
      vel *= MOMENTUM_DECAY;
      if (Math.abs(vel) > 0.001) {
        const curr = rawScroll.get();
        const next = shouldLoop ? curr + vel : Math.max(-0.3, Math.min(count - 0.7, curr + vel));
        rawScroll.set(next);
        momentumRaf.current = requestAnimationFrame(coast);
      } else {
        // Soft settle to nearest
        settleToNearest();
      }
    };
    if (Math.abs(vel) > 0.01) {
      momentumRaf.current = requestAnimationFrame(coast);
    } else {
      settleToNearest();
    }
  };

  const settleToNearest = useCallback(() => {
    const current = rawScroll.get();
    let nearest = Math.round(current);
    if (!shouldLoop) nearest = Math.max(0, Math.min(count - 1, nearest));
    if (Math.abs(current - nearest) > SETTLE_THRESHOLD) {
      rawScroll.set(nearest);
    } else {
      rawScroll.set(nearest);
    }
  }, [rawScroll, count, shouldLoop]);

  /* ── Mouse wheel / trackpad ────────────────────────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (expandedProject) return;
      // Only capture if the carousel is roughly in view
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      e.preventDefault();
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY);
      const curr = rawScroll.get();
      const next = curr + delta * WHEEL_SENSITIVITY * (cardSpacing / 360);
      rawScroll.set(shouldLoop ? next : Math.max(-0.3, Math.min(count - 0.7, next)));
      // Debounced settle
      cancelAnimationFrame(momentumRaf.current);
      momentumRaf.current = requestAnimationFrame(() => {
        setTimeout(() => settleToNearest(), 200);
      });
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [rawScroll, cardSpacing, count, shouldLoop, expandedProject, settleToNearest]);

  /* ── Arrow keys ────────────────────────────────────────── */
  const goNext = useCallback(() => {
    const curr = Math.round(rawScroll.get());
    const next = shouldLoop ? curr + 1 : Math.min(count - 1, curr + 1);
    rawScroll.set(next);
  }, [rawScroll, count, shouldLoop]);

  const goPrev = useCallback(() => {
    const curr = Math.round(rawScroll.get());
    const next = shouldLoop ? curr - 1 : Math.max(0, curr - 1);
    rawScroll.set(next);
  }, [rawScroll, count, shouldLoop]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (expandedProject) return;
    if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
  };

  /* ── Autoplay ──────────────────────────────────────────── */
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (
      !AUTOPLAY_INTERVAL ||
      prefersReduced ||
      isHovered ||
      isDragging.current ||
      expandedProject
    )
      return;
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, expandedProject, goNext, prefersReduced]);

  /* ── Card click logic ──────────────────────────────────── */
  const handleCardClick = useCallback(
    (idx: number) => {
      if (expandedProject) return;
      const targetProject = filteredProjects[idx];

      // Direct open if project has a live website URL (e.g. Dentora)
      if (targetProject?.liveUrl) {
        window.open(targetProject.liveUrl, "_blank", "noopener,noreferrer");
        return;
      }

      // Compute the wrapped centered index
      const current = Math.round(rawScroll.get());
      const wrappedCenter = shouldLoop
        ? ((current % count) + count) % count
        : current;

      if (idx === wrappedCenter) {
        // Already centered → expand
        setExpandedProject(targetProject);
      } else {
        // Move it to center
        if (shouldLoop) {
          // Find the shortest path
          let diff = idx - current;
          const half = count / 2;
          if (diff > half) diff -= count;
          if (diff < -half) diff += count;
          rawScroll.set(current + diff);
        } else {
          rawScroll.set(idx);
        }
      }
    },
    [rawScroll, count, shouldLoop, expandedProject, filteredProjects]
  );

  /* ── Close expanded ────────────────────────────────────── */
  const closeExpanded = useCallback(() => setExpandedProject(null), []);

  useEffect(() => {
    if (!expandedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeExpanded();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [expandedProject, closeExpanded]);

  /* ── Reset scroll when filter changes ──────────────────── */
  useEffect(() => {
    rawScroll.set(0);
    setCenteredIndex(0);
  }, [filter, rawScroll]);

  /* ═══════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════ */
  return (
    <section
      id="archive"
      className="relative py-20 md:py-[140px] px-[5vw] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FFFBF5 0%, #FFF5EB 100%)",
      }}
    >
      {/* Decorative accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-300/30 to-transparent" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-amber-200/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3.5 py-1 rounded-full text-mono-label font-mono font-medium tracking-[0.12em] uppercase bg-orange-100 border border-orange-200/60 text-orange-700">
                Curated Works
              </span>
              <span className="h-[1px] w-16 bg-orange-200" />
              <span className="text-mono-label font-mono font-medium tracking-[0.12em] text-orange-400/70">
                04 / 04
              </span>
            </div>
            <h2 className="text-section font-medium tracking-[-0.03em] leading-[1.05] text-[#1a1510]">
              Proof in Production,
              <br />
              <span className="text-orange-600 font-medium">
                not in promises.
              </span>
            </h2>
          </div>

          <p className="max-w-[60ch] text-body text-[#7a7060] font-normal leading-[1.6]">
            Explore our portfolio of live projects — from high-performance
            websites to autonomous automation pipelines. Drag, scroll or use
            arrow keys to explore.
          </p>
        </div>

        {/* ── Filter pills + nav arrows ──────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded-full text-nav font-medium tracking-[-0.01em] transition-all duration-300 ${
                  filter === cat
                    ? "bg-orange-600 text-white shadow-md shadow-orange-500/20"
                    : "bg-white/80 hover:bg-white text-[#6b6050] border border-orange-200/40 hover:border-orange-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              aria-label="Previous project"
              className="p-3 rounded-full bg-white/80 border border-orange-200/40 text-[#6b6050] hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              aria-label="Next project"
              className="p-3 rounded-full bg-white/80 border border-orange-200/40 text-[#6b6050] hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-sm"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Carousel viewport ──────────────────────────── */}
        <div
          ref={containerRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Project showcase"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            if (isDragging.current) handlePointerUp();
          }}
          className="relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-4 rounded-xl"
          style={{
            height: 420,
            perspective: "1200px",
            cursor: isDragging.current ? "grabbing" : "grab",
            touchAction: "pan-y",
            // Edge fade mask
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
              >
                <TiltCard
                  project={project}
                  index={idx}
                  scrollPos={scrollPos}
                  totalItems={count}
                  cardSpacing={cardSpacing}
                  maxRotateZ={CARD_DEFAULTS.maxRotateZ}
                  maxRotateY={CARD_DEFAULTS.maxRotateY}
                  clampRotateZ={CARD_DEFAULTS.clampRotateZ}
                  arcHeight={CARD_DEFAULTS.arcHeight}
                  blurAmount={CARD_DEFAULTS.blurAmount}
                  isExpanded={expandedProject?.id === project.id}
                  isCentered={idx === centeredIndex}
                  onCardClick={handleCardClick}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── Dot indicators ─────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {filteredProjects.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to project ${i + 1}`}
              onClick={() => rawScroll.set(i)}
              className="transition-all duration-300"
              style={{
                width: i === centeredIndex ? 28 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor:
                  i === centeredIndex
                    ? "#ea580c"
                    : "rgba(200,180,160,0.4)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══ Expanded card overlay ═══════════════════════════ */}
      <AnimatePresence>
        {expandedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeExpanded}
              className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
            />

            {/* Expanded card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
                mass: 0.8,
              }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            >
              <div
                className="relative w-full max-w-[720px] rounded-3xl overflow-hidden bg-white border border-orange-200/50 shadow-2xl pointer-events-auto"
                data-lenis-prevent
              >
                {/* Close button */}
                <button
                  onClick={closeExpanded}
                  className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 border border-neutral-200 text-neutral-600 hover:bg-orange-600 hover:text-white hover:border-orange-600 transition-all shadow-md"
                  aria-label="Close preview"
                >
                  <X size={18} />
                </button>

                {/* Big landscape image */}
                <div className="relative w-full aspect-[16/9] bg-neutral-100">
                  <Image
                    src={expandedProject.image}
                    alt={expandedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 720px"
                  />
                  {/* Category badge on image */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-orange-700 shadow-sm">
                      {expandedProject.category}
                    </span>
                  </div>
                  {/* Metric badge */}
                  {expandedProject.metrics && (
                    <div className="absolute bottom-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm text-xs font-mono shadow-md">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-bold text-emerald-700">
                          {expandedProject.metrics.value}
                        </span>
                        <span className="text-[#8a8070]">
                          • {expandedProject.metrics.label}
                        </span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption area */}
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 text-[10px] font-mono text-[#9a9080] mb-2 uppercase tracking-wider">
                    <span className="font-semibold text-orange-600">
                      {expandedProject.category}
                    </span>
                    <span>•</span>
                    <span>{expandedProject.client}</span>
                    <span>•</span>
                    <span>{expandedProject.year}</span>
                  </div>

                  <h3 className="text-card font-medium tracking-[-0.02em] text-[#1a1510] leading-[1.15]">
                    {expandedProject.title}
                  </h3>
                  <p className="text-body text-[#6b6050] mt-2 leading-[1.6]">
                    {expandedProject.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {expandedProject.tags.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 rounded-full text-mono-label font-mono font-medium tracking-[0.12em] uppercase bg-orange-50 text-orange-700 border border-orange-200/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-orange-100/60">
                    {expandedProject.liveUrl && (
                      <a
                        href={expandedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-nav font-medium tracking-[-0.01em] uppercase shadow-lg transition-colors"
                      >
                        <ExternalLink size={15} />
                        Visit Live Site
                      </a>
                    )}
                    <button
                      onClick={() => {
                        closeExpanded();
                        onSelectProject(expandedProject);
                      }}
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-orange-600 text-white text-nav font-medium tracking-[-0.01em] uppercase shadow-lg hover:bg-orange-700 transition-colors"
                    >
                      <ArrowUpRight size={15} />
                      View Case Study
                    </button>
                    <button
                      onClick={closeExpanded}
                      className="px-6 py-3.5 rounded-full text-nav font-mono font-medium tracking-[0.12em] uppercase text-[#8a8070] hover:text-[#1a1510] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}


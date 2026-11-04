"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData, Service } from "@/data/services";
import SplitReveal from "@/components/ui/SplitReveal";
import { ArrowUpRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface ServicesProps {
  onOpenContact?: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Exact scroll distance calculation
  const getScrollDistance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // Exactly scroll to the end with comfortable right padding
    const distance = track.scrollWidth - window.innerWidth + (window.innerWidth * 0.08);
    return Math.max(0, distance);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop (1024px+): Smooth pinned horizontal flow with zero dead-zone
    mm.add("(min-width: 1024px)", () => {
      const distance = getScrollDistance();

      const tween = gsap.to(track, {
        x: () => -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            setCanScrollPrev(self.progress > 0.03);
            setCanScrollNext(self.progress < 0.97);
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [getScrollDistance]);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) {
      const progress = el.scrollLeft / max;
      setScrollProgress(progress);
      setCanScrollPrev(progress > 0.03);
      setCanScrollNext(progress < 0.97);
    }
  };

  const scrollByCard = (direction: "prev" | "next") => {
    const isDesktop = window.innerWidth >= 1024;
    if (isDesktop && sectionRef.current) {
      const distance = getScrollDistance();
      const step = distance / 5;
      const targetScroll = window.scrollY + (direction === "next" ? step : -step);
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else if (scrollContainerRef.current) {
      const cardWidth = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "next" ? cardWidth : -cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#F4F1EA] text-[#0B0B14] min-h-screen lg:h-screen lg:max-h-[920px] flex flex-col justify-between py-10 lg:py-14 px-[5vw] overflow-hidden"
    >
      {/* ── Compact Header ── */}
      <div className="max-w-[1400px] w-full mx-auto mb-6 lg:mb-8 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-[#8C887E]">
                WHAT WE BUILD
              </span>
            </div>
            <SplitReveal
              as="h2"
              className="text-section font-medium tracking-[-0.035em] leading-[1.05] text-[#1a1510]"
            >
              {"Six disciplines,\none standard."}
            </SplitReveal>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 md:gap-10">
            <p className="max-w-[46ch] text-body text-[#6b6050] font-normal leading-[1.55]">
              Every capability is engineered to accelerate revenue, streamline operations, and elevate digital presence. Click any service to view full technical scope.
            </p>

            {/* Quick Navigation Arrow Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollByCard("prev")}
                disabled={!canScrollPrev}
                aria-label="Previous discipline"
                className={`w-10 h-10 rounded-full border border-[#D5CDC0] flex items-center justify-center transition-all duration-200 ${
                  canScrollPrev
                    ? "bg-white text-[#1a1510] hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-sm"
                    : "bg-[#EAE4D8]/50 text-[#A89F90] cursor-not-allowed border-transparent"
                }`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scrollByCard("next")}
                disabled={!canScrollNext}
                aria-label="Next discipline"
                className={`w-10 h-10 rounded-full border border-[#D5CDC0] flex items-center justify-center transition-all duration-200 ${
                  canScrollNext
                    ? "bg-white text-[#1a1510] hover:bg-orange-600 hover:text-white hover:border-orange-600 shadow-sm"
                    : "bg-[#EAE4D8]/50 text-[#A89F90] cursor-not-allowed border-transparent"
                }`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Short, Clean, Punchy Cards (Click opens dedicated page) ── */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto lg:overflow-hidden scrollbar-none px-[5vw] -mx-[5vw] my-auto py-4"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 w-max items-stretch will-change-transform"
        >
          {servicesData.map((service, index) => (
            <ServiceCardCompact
              key={service.id}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* ── Progress Bar & Interactive Footer Counter ── */}
      <div className="max-w-[1400px] w-full mx-auto mt-6 lg:mt-8 shrink-0">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-mono-label font-mono text-[#8C887E] tracking-[0.1em] uppercase">
            Discipline {Math.min(6, Math.max(1, Math.round(scrollProgress * 5) + 1))} of 06
          </span>
          <span className="text-mono-label font-mono text-orange-600 font-medium">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#E0D8CB] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-[#FF6E10] transition-all duration-150 ease-out rounded-full will-change-transform"
            style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}

/** Short, concise, ultra-aesthetic service card */
function ServiceCardCompact({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  return (
    <Link
      href={`/services/${service.id}`}
      className="group relative w-[310px] sm:w-[350px] lg:w-[370px] rounded-[24px] bg-white border border-[#E5DDD0] shadow-[0_6px_24px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_45px_rgba(255,110,16,0.12)] hover:border-orange-500/80 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 select-none will-change-transform"
    >
      <div>
        {/* Top Header: Big clean number & category tag */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-2xl sm:text-3xl font-mono font-medium tabular-nums text-[#D8CEBE] group-hover:text-orange-500 transition-colors">
            {service.number}
          </span>
          <span className="text-mono-label font-mono font-medium tracking-[0.12em] uppercase px-3 py-1 rounded-full bg-[#FAF8F5] text-[#7A7264] border border-[#E8E2D6] group-hover:border-orange-200 group-hover:text-orange-700 transition-colors">
            CAPABILITY
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-medium tracking-[-0.025em] leading-[1.15] text-[#1a1510] group-hover:text-orange-600 transition-colors">
          {service.title}
        </h3>

        {/* Tagline: 1-line crisp sentence */}
        <p className="text-xs font-mono text-[#8C887E] tracking-[0.08em] uppercase mt-2 mb-4 line-clamp-1">
          {service.tagline}
        </p>

        {/* Short clean summary */}
        <p className="text-sm text-[#554E42] leading-[1.6] line-clamp-3">
          {service.shortDescription}
        </p>
      </div>

      {/* Bottom Action: "Explore Capability →" */}
      <div className="pt-6 mt-6 border-t border-[#F0EBE0] flex items-center justify-between text-[#1a1510] group-hover:text-orange-600 font-medium text-xs uppercase tracking-[0.06em] transition-colors">
        <span>Explore Capability</span>
        <div className="w-8 h-8 rounded-full bg-[#FAF8F5] border border-[#E8E2D6] group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm">
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}

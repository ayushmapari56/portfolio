"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData, Service } from "@/data/services";
import SplitReveal from "@/components/ui/SplitReveal";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface ServicesProps {
  onOpenContact: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  // Precise scroll calculation
  const getScrollDistance = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    // Scroll until the last card is fully visible with comfortable end margin
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

    // Desktop (1024px+): Smooth pinned horizontal flow with NO dead zones
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
      className="relative bg-[#F4F1EA] text-[#0B0B14] min-h-screen lg:h-screen lg:max-h-[960px] flex flex-col justify-between py-10 lg:py-12 px-[5vw] overflow-hidden"
    >
      {/* ── Compact Header Bar ── */}
      <div className="max-w-[1400px] w-full mx-auto mb-6 lg:mb-8 shrink-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="block text-mono-label font-mono font-medium uppercase tracking-[0.1em] text-[#8C887E] mb-3">
              WHAT WE BUILD
            </span>
            <SplitReveal
              as="h2"
              className="text-section font-medium tracking-[-0.035em] leading-[1.05] text-[#1a1510]"
            >
              {"Six disciplines,\none standard."}
            </SplitReveal>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 md:gap-10">
            <p className="max-w-[48ch] text-body text-[#6b6050] font-normal leading-[1.55]">
              From high-conversion web platforms to autonomous AI operations.
              Engineered with zero fluff and built to scale your business.
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

      {/* ── Horizontal Cards Viewport: Compact & 100% visible in one view ── */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto lg:overflow-hidden scrollbar-none px-[5vw] -mx-[5vw] my-auto py-2"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex gap-6 lg:gap-8 w-max items-stretch will-change-transform"
        >
          {servicesData.map((service, index) => (
            <ServiceCardItem
              key={service.id}
              service={service}
              index={index}
              onOpenContact={onOpenContact}
            />
          ))}
        </div>
      </div>

      {/* ── Progress Bar & Counter ── */}
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

function ServiceCardItem({
  service,
  onOpenContact,
}: {
  service: Service;
  index: number;
  onOpenContact: () => void;
}) {
  return (
    <div className="group relative w-[310px] sm:w-[350px] lg:w-[380px] rounded-[22px] bg-white border border-[#E5DDD0] shadow-[0_6px_24px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(255,110,16,0.12)] hover:border-orange-500/80 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 select-none will-change-transform">
      <div>
        {/* Top Header: Number & Tag */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xl sm:text-2xl font-mono font-medium tabular-nums text-[#D8CEBE] group-hover:text-orange-500 transition-colors">
            {service.number}
          </span>
          <span className="text-mono-label font-mono font-medium tracking-[0.1em] uppercase px-3 py-1 rounded-full bg-[#F5F2EB] text-[#7A7264] border border-[#E8E2D6]">
            CAPABILITY
          </span>
        </div>

        {/* Compact Illustration */}
        <div className="w-full h-28 sm:h-32 rounded-xl bg-[#FAF8F5] border border-[#ECE6DB] mb-5 p-3 flex items-center justify-center relative overflow-hidden group-hover:border-orange-200 transition-colors">
          <ServiceIllustration type={service.iconType} />
        </div>

        {/* Title & Tagline */}
        <h3 className="text-lg sm:text-xl font-medium tracking-[-0.02em] leading-[1.2] text-[#1a1510] group-hover:text-orange-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-xs font-mono text-[#7A7264] tracking-[0.08em] uppercase mt-1 mb-3 line-clamp-1">
          {service.tagline}
        </p>

        {/* Description: clean 2-line clamp */}
        <p className="text-sm text-[#554E42] leading-[1.5] mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Deliverables List */}
        <div className="space-y-2 pt-3.5 border-t border-[#F0EBE0]">
          {service.deliverables.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#6B6254] font-normal">
              <Check size={13} className="text-orange-600 shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-4 mt-5 border-t border-[#F0EBE0]">
        <button
          onClick={onOpenContact}
          className="w-full flex items-center justify-between py-2.5 px-5 rounded-lg bg-[#FAF8F5] hover:bg-orange-600 hover:text-white text-[#1a1510] text-xs font-medium uppercase tracking-[-0.01em] transition-all duration-200 border border-[#E5DDD0] hover:border-orange-600 shadow-sm"
        >
          <span>Request Scope</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function ServiceIllustration({ type }: { type: Service["iconType"] }) {
  switch (type) {
    case "code":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center gap-1.5 pb-2 border-b border-[#E8E2D6]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="ml-2 text-mono-label font-mono text-[#A89F90] tracking-[0.1em]">nextjs-app.ts</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5 my-auto">
            <div className="h-7 rounded-lg bg-orange-100/80 border border-orange-200" />
            <div className="h-7 rounded-lg bg-white border border-[#E8E2D6]" />
            <div className="h-7 rounded-lg bg-white border border-[#E8E2D6]" />
          </div>
          <div className="flex justify-between items-center text-mono-label font-mono text-emerald-600 tracking-[0.1em]">
            <span>Core Web Vitals</span>
            <span className="font-medium tabular-nums">99/100</span>
          </div>
        </div>
      );

    case "cpu":
      return (
        <div className="w-full h-full flex items-center justify-between px-3 relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
          </svg>
          <div className="relative z-10 w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <span className="text-[8px] font-mono font-medium text-sky-600 tracking-[0.1em]">INBOUND</span>
            <span className="text-xs">⚡</span>
          </div>
          <div className="relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md flex flex-col items-center justify-center">
            <span className="text-[8px] font-mono font-medium tracking-[0.1em]">LLM</span>
            <span className="text-xs">🤖</span>
          </div>
          <div className="relative z-10 w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <span className="text-[8px] font-mono font-medium text-orange-600 tracking-[0.1em]">CRM</span>
            <span className="text-xs">✓</span>
          </div>
        </div>
      );

    case "message-circle":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-1.5 border-b border-[#E8E2D6]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-mono-label font-mono font-medium text-[#1a1510] tracking-[0.1em] uppercase">WhatsApp Cloud API</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <div className="max-w-[80%] rounded-xl rounded-tl-none bg-white p-2 border border-[#E8E2D6] text-[11px] text-[#444]">
              How can I book a project review?
            </div>
            <div className="max-w-[80%] ml-auto rounded-xl rounded-tr-none bg-emerald-600 text-white p-2 text-[11px]">
              Slot reserved for Thursday at 3PM ✓✓
            </div>
          </div>
        </div>
      );

    case "calendar":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-center text-mono-label font-mono text-[#7A7264] tracking-[0.1em]">
            <span className="font-medium text-[#1a1510]">DISCOVERY SESSION</span>
            <span className="text-violet-600 font-medium">30 MIN</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 my-auto text-center">
            {["10:00", "11:30", "14:00", "16:00"].map((time, i) => (
              <span
                key={time}
                className={`py-1 rounded-md text-mono-label font-mono font-medium tabular-nums ${
                  i === 1 ? "bg-violet-600 text-white shadow-sm" : "bg-white border border-[#E8E2D6] text-[#666]"
                }`}
              >
                {time}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-mono-label font-mono text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200 tracking-[0.1em]">
            <span>Google Calendar Sync</span>
            <span className="font-medium">Active</span>
          </div>
        </div>
      );

    case "sparkles":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-center text-mono-label font-mono text-[#8C887E] tracking-[0.1em]">
            <span>DESIGN SYSTEM</span>
            <span className="text-rose-500 font-medium">FIGMA</span>
          </div>
          <div className="relative h-12 bg-white rounded-xl border border-[#E8E2D6] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-around opacity-40">
              <span className="w-4 h-4 rounded-full border border-rose-400" />
              <span className="w-5 h-5 rounded-md border border-orange-400" />
              <span className="w-4 h-4 rounded-full bg-rose-500" />
            </div>
            <span className="text-xs font-medium text-[#1a1510] relative z-10">Sensory Typography</span>
          </div>
          <div className="flex gap-2 justify-center">
            {["#FF6E10", "#F43F5E", "#10B981", "#38BDF8"].map((c) => (
              <span key={c} className="w-3.5 h-3.5 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      );

    case "wrench":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex justify-between items-center text-mono-label font-mono text-[#8C887E] tracking-[0.1em]">
            <span>INFRASTRUCTURE SLA</span>
            <span className="text-cyan-600 font-medium">24/7/365</span>
          </div>
          <div className="flex items-center justify-center gap-3 my-auto">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-3 border-cyan-100" />
              <span className="absolute inset-0 rounded-full border-3 border-cyan-500 border-t-transparent animate-spin" style={{ animationDuration: "6s" }} />
              <span className="text-xs font-mono font-medium text-cyan-700 tabular-nums">99.9%</span>
            </div>
            <div className="text-xs space-y-0.5">
              <div className="font-medium text-[#1a1510]">Uptime Guard</div>
              <div className="text-emerald-600 font-mono text-mono-label tracking-[0.1em]">● Normal</div>
            </div>
          </div>
          <div className="text-mono-label font-mono text-[#8C887E] text-center tracking-[0.1em]">
            Automated security & dependency updates
          </div>
        </div>
      );

    default:
      return null;
  }
}

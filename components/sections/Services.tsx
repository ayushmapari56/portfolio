"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { servicesData, Service } from "@/data/services";
import SplitReveal from "@/components/ui/SplitReveal";
import { ArrowUpRight, Check } from "lucide-react";

interface ServicesProps {
  onOpenContact: () => void;
}

export default function Services({ onOpenContact }: ServicesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop: Pinned horizontal scroll (scrub: 0.6)
    mm.add("(min-width: 1024px)", () => {
      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 140;
      };

      const tween = gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * 1.15}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
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
  }, []);

  const handleMobileScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    if (max > 0) {
      setScrollProgress(el.scrollLeft / max);
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-[#F4F1EA] text-[#0B0B14] py-20 lg:py-[140px] px-[5vw] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto mb-16 lg:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="block text-mono-label font-mono font-medium uppercase tracking-[0.1em] text-[#8C887E] mb-5">
              WHAT WE BUILD
            </span>
            <SplitReveal
              as="h2"
              className="text-section font-medium tracking-[-0.035em] leading-[1.02] text-[#1a1510]"
            >
              {"Six disciplines,\none standard."}
            </SplitReveal>
          </div>

          <p className="max-w-[60ch] text-body text-[#6b6050] font-normal leading-[1.6]">
            From high-conversion web platforms to autonomous AI operations.
            Engineered with zero fluff and built to scale your business.
          </p>
        </div>
      </div>

      {/* 5. Horizontal Cards Viewport */}
      <div
        className="w-full overflow-x-auto lg:overflow-hidden scrollbar-none px-[5vw] -mx-[5vw]"
        onScroll={handleMobileScroll}
      >
        <div
          ref={trackRef}
          className="flex gap-8 lg:gap-10 w-max items-stretch pb-8 will-change-transform"
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

      {/* Thin Horizontal Scroll Progress Bar */}
      <div className="max-w-[1400px] mx-auto mt-8 lg:mt-12">
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
    <div className="group relative w-[330px] sm:w-[380px] lg:w-[420px] rounded-[24px] bg-white border border-[#E5DDD0] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_24px_50px_rgba(255,110,16,0.12)] hover:border-orange-500/80 p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 select-none will-change-transform">
      <div>
        {/* Top Header: Big muted number & mono tag */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl lg:text-3xl font-mono font-medium tabular-nums text-[#D8CEBE] group-hover:text-orange-500 transition-colors">
            {service.number}
          </span>
          <span className="text-mono-label font-mono font-medium tracking-[0.1em] uppercase px-3.5 py-1.5 rounded-full bg-[#F5F2EB] text-[#7A7264] border border-[#E8E2D6]">
            CAPABILITY
          </span>
        </div>

        {/* Small Illustration Area on top */}
        <div className="w-full h-40 rounded-2xl bg-[#FAF8F5] border border-[#ECE6DB] mb-7 p-4 flex items-center justify-center relative overflow-hidden group-hover:border-orange-200 transition-colors">
          <ServiceIllustration type={service.iconType} />
        </div>

        {/* Title & Tagline */}
        <h3 className="text-card font-medium tracking-[-0.02em] leading-[1.15] text-[#1a1510] group-hover:text-orange-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-mono-label font-mono text-[#7A7264] tracking-[0.1em] uppercase mt-1.5 mb-4">
          {service.tagline}
        </p>

        {/* Description: 16-17px */}
        <p className="text-card-desc text-[#554E42] leading-[1.55] mb-6 max-w-[60ch]">
          {service.description}
        </p>

        {/* Deliverables List */}
        <div className="space-y-2.5 pt-5 border-t border-[#F0EBE0]">
          {service.deliverables.slice(0, 3).map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-[#6B6254] font-normal">
              <Check size={14} className="text-orange-600 shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA with taller padding (14px 28px) */}
      <div className="pt-7 mt-7 border-t border-[#F0EBE0]">
        <button
          onClick={onOpenContact}
          className="w-full flex items-center justify-between py-3.5 px-7 rounded-xl bg-[#FAF8F5] hover:bg-orange-600 hover:text-white text-[#1a1510] text-nav font-medium uppercase tracking-[-0.01em] transition-all duration-200 border border-[#E5DDD0] hover:border-orange-600 shadow-sm"
        >
          <span>Request Scope</span>
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            <div className="h-9 rounded-lg bg-orange-100/80 border border-orange-200" />
            <div className="h-9 rounded-lg bg-white border border-[#E8E2D6]" />
            <div className="h-9 rounded-lg bg-white border border-[#E8E2D6]" />
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
          <div className="relative z-10 w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <span className="text-[9px] font-mono font-medium text-sky-600 tracking-[0.1em]">INBOUND</span>
            <span className="text-xs">⚡</span>
          </div>
          <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-md flex flex-col items-center justify-center">
            <span className="text-[9px] font-mono font-medium tracking-[0.1em]">LLM</span>
            <span className="text-sm">🤖</span>
          </div>
          <div className="relative z-10 w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center">
            <span className="text-[9px] font-mono font-medium text-orange-600 tracking-[0.1em]">CRM</span>
            <span className="text-xs">✓</span>
          </div>
        </div>
      );

    case "message-circle":
      return (
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E8E2D6]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-mono-label font-mono font-medium text-[#1a1510] tracking-[0.1em] uppercase">WhatsApp Business API</span>
          </div>
          <div className="space-y-2 my-auto">
            <div className="max-w-[75%] rounded-xl rounded-tl-none bg-white p-2.5 border border-[#E8E2D6] text-xs text-[#444]">
              How can I book a project review?
            </div>
            <div className="max-w-[75%] ml-auto rounded-xl rounded-tr-none bg-emerald-600 text-white p-2.5 text-xs">
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
          <div className="grid grid-cols-4 gap-2 my-auto text-center">
            {["10:00", "11:30", "14:00", "16:00"].map((time, i) => (
              <span
                key={time}
                className={`py-1.5 rounded-lg text-mono-label font-mono font-medium tabular-nums ${
                  i === 1 ? "bg-violet-600 text-white shadow-sm" : "bg-white border border-[#E8E2D6] text-[#666]"
                }`}
              >
                {time}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-mono-label font-mono text-emerald-600 bg-emerald-50 p-1.5 rounded-lg border border-emerald-200 tracking-[0.1em]">
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
          <div className="relative h-16 bg-white rounded-xl border border-[#E8E2D6] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-around opacity-40">
              <span className="w-5 h-5 rounded-full border border-rose-400" />
              <span className="w-6 h-6 rounded-md border border-orange-400" />
              <span className="w-5 h-5 rounded-full bg-rose-500" />
            </div>
            <span className="text-xs font-medium text-[#1a1510] relative z-10">Sensory Typography</span>
          </div>
          <div className="flex gap-2 justify-center">
            {["#FF6E10", "#F43F5E", "#10B981", "#38BDF8"].map((c) => (
              <span key={c} className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: c }} />
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
          <div className="flex items-center justify-center gap-4 my-auto">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border-4 border-cyan-100" />
              <span className="absolute inset-0 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin" style={{ animationDuration: "6s" }} />
              <span className="text-xs font-mono font-medium text-cyan-700 tabular-nums">99.9%</span>
            </div>
            <div className="text-xs space-y-1">
              <div className="font-medium text-[#1a1510]">Uptime Guard</div>
              <div className="text-emerald-600 font-mono text-mono-label tracking-[0.1em]">● All Systems Normal</div>
            </div>
          </div>
          <div className="text-mono-label font-mono text-[#8C887E] text-center tracking-[0.1em]">
            Automated dependency & security updates
          </div>
        </div>
      );

    default:
      return null;
  }
}

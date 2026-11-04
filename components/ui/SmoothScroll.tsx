"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", (e: { progress: number }) => {
      ScrollTrigger.update();
      setScrollProgress(e.progress || 0);
    });

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh after fonts & assets load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const handleLoad = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
      gsap.ticker.remove(updateTicker);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 8. Thin scroll progress bar at the very top in accent color */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[9999] pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-[#FF6E10] origin-left will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})`, transformOrigin: "0% 50%" }}
        />
      </div>
      {children}
    </>
  );
}

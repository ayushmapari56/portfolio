"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/config";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 0.8s total duration
    const startTime = performance.now();
    const duration = 800; // ms

    const frame = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(frame);
      } else {
        setTimeout(() => setLoading(false), 80);
      }
    };

    const rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#0B0B14] p-8 md:p-14 text-white"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-mono-label tracking-[0.1em] text-neutral-400 uppercase">
              {siteConfig.duoHandle}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3.5 py-1 text-mono-label font-mono text-orange-400 tracking-[0.1em] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping" />
              Creative Engineering Studio
            </span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20 relative mb-4 filter drop-shadow-[0_0_30px_rgba(255,180,0,0.4)]"
            >
              <Image
                src="/logo.png"
                alt="AK Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-mono-label font-mono uppercase tracking-[0.15em] text-neutral-400 mb-2"
            >
              Ayush &amp; Kishori
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-4xl sm:text-6xl md:text-7xl font-medium tracking-[-0.035em] text-white"
            >
              {siteConfig.heroHeadline}
            </motion.h1>
          </div>

          <div className="flex items-end justify-between font-mono text-mono-label text-neutral-400 uppercase tracking-[0.1em]">
            <span>LOADING SYSTEMS</span>
            <div className="flex items-center gap-3">
              <div className="w-24 md:w-44 h-[2px] bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-amber-400 will-change-transform"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white font-medium tabular-nums">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

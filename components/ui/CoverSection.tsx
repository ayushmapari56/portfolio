"use client";

import React, { useRef, useEffect, useLayoutEffect } from "react";

interface CoverSectionProps {
  children: React.ReactNode;
  zIndex?: number;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function CoverSection({
  children,
  zIndex = 0,
  className = "",
  id,
  style = {},
}: CoverSectionProps) {
  const elRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const updateTop = () => {
      const offset = Math.min(0, window.innerHeight - el.offsetHeight);
      el.style.top = `${offset}px`;
    };

    updateTop();

    window.addEventListener("resize", updateTop, { passive: true });
    const ro = new ResizeObserver(updateTop);
    ro.observe(el);

    return () => {
      window.removeEventListener("resize", updateTop);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      ref={elRef}
      id={id}
      className={className}
      style={{
        position: "sticky",
        zIndex,
        ...style,
      }}
    >
      {children}
    </section>
  );
}


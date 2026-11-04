"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover" | "view" | "hidden">("default");
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check for touch device or reduced motion
    if (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest("a, button, [data-cursor], input, textarea");
      const viewElement = target.closest("[data-cursor-view]");

      if (viewElement) {
        setCursorVariant("view");
        setCursorText(viewElement.getAttribute("data-cursor-view") || "VIEW");
      } else if (interactiveElement) {
        setCursorVariant("hover");
        setCursorText("");
      } else {
        setCursorVariant("default");
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setCursorVariant("hidden");
    const handleMouseEnter = () => setCursorVariant("default");

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (isTouchDevice) return null;

  const variants: Variants = {
    default: {
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      width: 12,
      height: 12,
      backgroundColor: "#FF6E10",
      mixBlendMode: "difference",
      transition: { type: "spring", mass: 0.1, stiffness: 800, damping: 40 },
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 110, 16, 0.25)",
      border: "1px solid rgba(255, 110, 16, 0.8)",
      backdropFilter: "blur(2px)",
      transition: { type: "spring", mass: 0.2, stiffness: 500, damping: 30 },
    },
    view: {
      x: mousePosition.x - 42,
      y: mousePosition.y - 42,
      width: 84,
      height: 84,
      backgroundColor: "#FF6E10",
      color: "#FFFFFF",
      border: "none",
      transition: { type: "spring", mass: 0.2, stiffness: 450, damping: 28 },
    },
    hidden: {
      opacity: 0,
      width: 0,
      height: 0,
    },
  };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:flex items-center justify-center font-bold text-[10px] tracking-wider uppercase select-none text-white shadow-lg"
        animate={cursorVariant}
        variants={variants}
      >
        {cursorVariant === "view" && cursorText}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-2 h-2 rounded-full bg-white hidden md:block"
        animate={{
          x: mousePosition.x - 1,
          y: mousePosition.y - 1,
          opacity: cursorVariant === "hidden" ? 0 : 0.8,
        }}
        transition={{ type: "spring", mass: 0.05, stiffness: 1000, damping: 50 }}
      />
    </>
  );
}

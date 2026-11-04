"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/config";
import { servicesList } from "@/data/services";
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [pastHero, setPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTriggerRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/#services", hasDropdown: true },
    { label: "About", href: "/#about" },
    { label: "Blog", href: "#" },
  ];

  // Detect scroll past 70% of hero height
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = window.innerHeight * 0.7;
      setPastHero(window.scrollY > heroThreshold);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownTriggerRef.current &&
        !dropdownTriggerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [servicesOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobile = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      {/* Fixed Full-width Navbar: Slides in past ~70% hero height (translateY -100% -> 0, 0.5s ease) */}
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: pastHero || mobileMenuOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-[5vw] py-3.5 bg-[#F4F1EA]/85 backdrop-blur-[12px] border-b border-[#DDD7C8]/70 shadow-sm"
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo Left */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white text-xs font-black shadow-md group-hover:scale-105 transition-transform">
              <Sparkles size={14} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-sm text-[#0B0B14] group-hover:text-orange-600 transition-colors">
                {siteConfig.duoName.split(" & ")[0]}
              </span>
              <span className="text-[10px] font-mono -mt-0.5 text-[#8C887E]">
                {siteConfig.duoHandle}
              </span>
            </div>
          </a>

          {/* Links Centered (Home, Work, Services dropdown, About, Blog) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative">
                  <button
                    ref={dropdownTriggerRef}
                    onMouseEnter={() => setServicesOpen(true)}
                    onFocus={() => setServicesOpen(true)}
                    onClick={() => setServicesOpen(!servicesOpen)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    className="flex items-center gap-1 px-4 py-2 rounded-full text-nav font-medium tracking-[-0.01em] text-[#44423C] hover:text-orange-600 hover:bg-orange-50/80 transition-all duration-200"
                  >
                    {link.label}
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Desktop Dropdown */}
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        ref={dropdownRef}
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{
                          duration: 0.2,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        onMouseLeave={() => setServicesOpen(false)}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#E5DDD0]/80 shadow-xl shadow-black/[0.06] p-2 z-[60]"
                        role="menu"
                      >
                        {servicesList.map((svc) => (
                          <a
                            key={svc.title}
                            href={svc.href}
                            role="menuitem"
                            onClick={() => setServicesOpen(false)}
                            className="group/item flex items-center gap-3 px-4 py-3 rounded-xl text-nav text-[#1a1510] hover:bg-orange-50 transition-all duration-200"
                          >
                            <span className="text-mono-label font-mono font-medium text-[#C4B8A6] tabular-nums w-5">
                              {svc.number}
                            </span>
                            <span className="font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                              {svc.title}
                            </span>
                            <ArrowRight
                              size={13}
                              className="ml-auto opacity-0 group-hover/item:opacity-100 text-orange-500 transition-opacity duration-200"
                            />
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 rounded-full text-nav font-medium tracking-[-0.01em] text-[#44423C] hover:text-orange-600 hover:bg-orange-50/80 transition-all duration-200"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Right: Contact Outlined Pill */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenContact}
              className="hidden md:inline-flex items-center gap-2 px-7 py-3 rounded-full text-nav font-medium tracking-[-0.01em] transition-all duration-300 border border-[#0B0B14] text-[#0B0B14] hover:bg-[#0B0B14] hover:text-white"
            >
              Contact
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#0B0B14] hover:bg-orange-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#F4F1EA] pt-24 px-6 pb-8 flex flex-col md:hidden overflow-y-auto"
          >
            <nav className="space-y-2 mt-4">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.label} className="border-b border-[#DDD7C8] pb-2">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="flex items-center justify-between w-full py-3 text-xl font-medium text-[#0B0B14]"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-200 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-4 py-2 space-y-2">
                        {servicesList.map((svc) => (
                          <a
                            key={svc.title}
                            href={svc.href}
                            onClick={closeMobile}
                            className="flex items-center gap-2 py-2 text-base text-[#6b6050] hover:text-orange-600"
                          >
                            <span className="text-xs font-mono text-orange-500">
                              {svc.number}
                            </span>
                            <span>{svc.title}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMobile}
                    className="block py-3 text-xl font-medium text-[#0B0B14] border-b border-[#DDD7C8]"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            <div className="mt-auto pt-8">
              <button
                onClick={() => {
                  closeMobile();
                  onOpenContact();
                }}
                className="w-full py-4 rounded-full bg-orange-600 text-white font-medium text-base shadow-lg hover:bg-orange-700 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, ArrowRight, CheckCircle2 } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function ProjectModal({ project, onClose, onOpenContact }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0F0F1B] border border-white/10 text-white shadow-2xl p-6 md:p-10"
            data-lenis-prevent
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {/* Header info */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-mono-label font-mono font-medium tracking-[0.12em] uppercase bg-orange-500/20 text-orange-400 border border-orange-500/30">
                {project.category}
              </span>
              <span className="text-mono-label font-mono font-medium tracking-[0.12em] text-neutral-400 uppercase">
                {project.client} • {project.year}
              </span>
            </div>

            <h2 className="text-card font-medium tracking-[-0.02em] leading-[1.15] mb-2">
              {project.title}
            </h2>
            <p className="text-body text-neutral-400 font-normal leading-[1.6] mb-6 max-w-[60ch]">
              {project.subtitle}
            </p>

            {/* Live project button if available */}
            {project.liveUrl && (
              <div className="mb-6">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-medium text-nav tracking-[-0.01em] transition-all shadow-lg shadow-orange-600/20 group"
                >
                  <span>{project.linkText || "Visit Live Website"}</span>
                  <ExternalLink size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}

            {/* Metrics highlight if available */}
            {project.metrics && (
              <div className="mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-mono-label font-mono font-medium uppercase tracking-[0.12em] text-neutral-400">Key Outcome</div>
                  <div className="text-2xl md:text-3xl font-mono font-medium tabular-nums text-orange-400">{project.metrics.value}</div>
                </div>
                <div className="text-sm text-neutral-300 font-medium">{project.metrics.label}</div>
              </div>
            )}

            {/* Overview / Problem / Solution */}
            <div className="space-y-6 text-sm md:text-base text-neutral-300">
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2">Overview</h3>
                <p className="leading-relaxed">{project.fullOverview}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-2">
                <div className="p-5 rounded-2xl bg-red-500/[0.05] border border-red-500/20">
                  <h4 className="font-semibold text-red-300 text-sm mb-2">The Challenge</h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">{project.problem}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-500/[0.05] border border-emerald-500/20">
                  <h4 className="font-semibold text-emerald-300 text-sm mb-2">Our Solution</h4>
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">{project.solution}</p>
                </div>
              </div>

              {/* Results bullet list */}
              <div>
                <h3 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-3">Key Results</h3>
                <ul className="space-y-2">
                  {project.results.map((res, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-neutral-200">
                      <CheckCircle2 size={16} className="text-orange-400 shrink-0 mt-0.5" />
                      <span>{res}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-neutral-300 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer action */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={onClose}
                className="text-nav uppercase font-mono tracking-wider text-neutral-400 hover:text-white"
              >
                Back to Archive
              </button>
              <div className="flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-nav transition-all"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink size={14} />
                  </a>
                )}
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 font-medium text-nav uppercase text-white shadow-lg hover:brightness-110 transition-all"
                >
                  Build Similar System
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/config";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Websites",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");
      setStatus("success");
      setFeedback("Thank you! We've received your request and will get back to you within 24 hours.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setFeedback(message);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative z-10 w-full max-w-xl rounded-3xl bg-[#0F0F1D] border border-white/10 text-white shadow-2xl p-6 md:p-8"
            data-lenis-prevent
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white"
            >
              <X size={20} />
            </button>

            <div className="mb-6 flex items-start gap-4">
              <div className="w-12 h-12 relative rounded-2xl overflow-hidden shadow-lg shrink-0 bg-black/60 border border-white/15 p-1">
                <Image
                  src="/logo.png"
                  alt="AK Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-mono-label uppercase font-mono tracking-[0.12em] text-orange-400">
                  Let&apos;s Build Together
                </span>
                <h3 className="text-card font-medium tracking-[-0.02em] leading-[1.15] mt-1">
                  Start a Conversation
                </h3>
                <p className="text-body text-neutral-400 mt-1 leading-[1.6]">
                  Tell us about your project, website goals, or AI automation ideas.
                </p>
              </div>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>
                <h4 className="text-xl font-bold">Message Delivered</h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">{feedback}</p>
                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold uppercase tracking-wider text-white"
                  >
                    <MessageSquare size={14} />
                    Chat on WhatsApp Now
                  </a>
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider text-neutral-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-mono-label uppercase font-mono tracking-[0.12em] text-neutral-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-body text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-mono-label uppercase font-mono tracking-[0.12em] text-neutral-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-body text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-mono-label uppercase font-mono tracking-[0.12em] text-neutral-400 mb-2">
                    What can we help you with?
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full rounded-xl bg-[#171728] border border-white/10 px-4 py-3 text-body text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="Websites">High-Performance Website</option>
                    <option value="AI Automation">AI &amp; n8n Automation</option>
                    <option value="WhatsApp Bots">WhatsApp Business Cloud Bot</option>
                    <option value="Full Suite">Full Suite (Web + Automation)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-mono-label uppercase font-mono tracking-[0.12em] text-neutral-400 mb-2">
                    Project Brief &amp; Goals
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your brand, workflow hurdles, or timelines..."
                    className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-body text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl">
                    {feedback}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300"
                  >
                    <MessageSquare size={13} />
                    Prefer WhatsApp?
                    <ArrowUpRight size={12} />
                  </a>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 font-medium text-nav tracking-[-0.01em] uppercase text-white shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
                  >
                    {status === "loading" ? "Transmitting..." : "Send Request"}
                    <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


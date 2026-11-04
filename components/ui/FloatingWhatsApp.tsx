"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/config";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={siteConfig.socials.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium text-nav tracking-[-0.01em] uppercase shadow-2xl transition-all group"
    >
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
      </span>
      <MessageCircle size={18} className="fill-white" />
      <span className="hidden sm:inline font-sans font-medium text-nav tracking-[-0.01em]">Chat on WhatsApp</span>
    </motion.a>
  );
}


export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  gradient: string;
  accentColor: string;
  ringColor: string;
  iconType: "code" | "cpu" | "message-circle" | "sparkles" | "calendar" | "wrench";
}

export const servicesData: Service[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Development",
    tagline: "High-performance digital flagships built to convert.",
    description: "Ultra-fast Next.js architectures with bespoke motion, responsive typography, and 95+ Core Web Vitals.",
    deliverables: ["Next.js App Router & TypeScript", "Smooth Lenis Scrolling & GSAP", "Headless CMS & E-commerce", "SEO & Speed Optimization"],
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    accentColor: "#38BDF8",
    ringColor: "rgba(56, 189, 248, 0.4)",
    iconType: "code",
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI Automation",
    tagline: "Autonomous workflows eliminating repetitive human bottlenecks.",
    description: "Self-healing n8n orchestrations, OpenAI / Claude agent workflows, and seamless multi-app data pipelines.",
    deliverables: ["Custom n8n Workflow Architecture", "LLM Data Extraction & Triage", "CRM, Notion & Slack Sync", "Error-tolerant Webhook Hubs"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10B981",
    ringColor: "rgba(16, 185, 129, 0.4)",
    iconType: "cpu",
  },
  {
    id: "whatsapp-bots",
    number: "03",
    title: "WhatsApp Bots",
    tagline: "Turn chat windows into 24/7 revenue & operational engines.",
    description: "Official Meta Cloud API solutions: payment links, automated catalog querying, CRM sync, and lead capture.",
    deliverables: ["Official WhatsApp Business Cloud API", "Payment Gateway Links (Razorpay/Stripe)", "ERP & Database Read/Write", "Bilingual Conversational UX"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#FF8A00",
    ringColor: "rgba(255, 138, 0, 0.4)",
    iconType: "message-circle",
  },
  {
    id: "booking-lead",
    number: "04",
    title: "Booking & Lead Systems",
    tagline: "Capture, qualify and route every lead automatically.",
    description: "Custom booking flows, calendar integrations, lead scoring pipelines and automated follow-ups that never sleep.",
    deliverables: ["Automated Booking Calendars", "Lead Scoring & Routing", "CRM Auto-Enrichment", "Multi-Channel Follow-Ups"],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "#8B5CF6",
    ringColor: "rgba(139, 92, 246, 0.4)",
    iconType: "calendar",
  },
  {
    id: "ui-ux",
    number: "05",
    title: "UI/UX Design",
    tagline: "Art-directed visuals that evoke prestige and trust.",
    description: "Bold geometric typography, fluid motion principles, and distinctive 3D-inspired aesthetics.",
    deliverables: ["Design Systems & Component Kits", "Interactive Prototypes in Figma", "Tactile Micro-interactions", "Responsive Mobile-First Wireframes"],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accentColor: "#F43F5E",
    ringColor: "rgba(244, 63, 94, 0.4)",
    iconType: "sparkles",
  },
  {
    id: "maintenance",
    number: "06",
    title: "Maintenance & Support",
    tagline: "We maintain what we create — your site never falls behind.",
    description: "Proactive monitoring, performance tuning, dependency updates, and priority bug-fix SLAs.",
    deliverables: ["Monthly Performance Audits", "Dependency & Security Updates", "Uptime Monitoring & Alerts", "Priority Bug-Fix SLA"],
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accentColor: "#06B6D4",
    ringColor: "rgba(6, 182, 212, 0.4)",
    iconType: "wrench",
  },
];

/** Simple flat list for nav dropdown and footer */
export const servicesList = servicesData.map((s) => ({
  number: s.number,
  title: s.title,
  href: "#services",
}));

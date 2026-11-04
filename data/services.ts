export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  tagline: string;
  shortDescription: string;
  fullOverview: string;
  problemSolved: string;
  deliverables: string[];
  technologies: string[];
  metrics: { label: string; value: string }[];
  process: ServiceProcessStep[];
  faq: ServiceFAQ[];
  gradient: string;
  accentColor: string;
  ringColor: string;
  relatedProjectId?: string;
}

export const servicesData: Service[] = [
  {
    id: "web-dev",
    number: "01",
    title: "Website Development",
    tagline: "High-performance digital flagships built to convert.",
    shortDescription: "Ultra-fast Next.js architectures with bespoke motion, responsive typography, and 95+ Core Web Vitals.",
    fullOverview: "We engineer bespoke web applications and digital flagships that command market authority. Every build is built on Next.js 15 App Router with server-side rendering, sub-second global edge response, and fluid 60fps micro-interactions tailored for high conversion rates.",
    problemSolved: "Off-the-shelf templates and bloated page builders load slowly (>4s LCP), suffer from high bounce rates, and fail to evoke brand trust. We replace generic code with custom, zero-dependency architectures built for speed and sales.",
    deliverables: [
      "Custom Next.js 15 App Router & TypeScript codebase",
      "Silky-smooth kinetic motion with GSAP & Framer Motion",
      "Fluid typography scales and tactile mobile UX",
      "Full SEO metadata, OpenGraph cards & sitemap automation",
      "Headless CMS integration (Sanity, Strapi, or Markdown)",
      "95+ Google PageSpeed & Core Web Vitals scores guaranteed",
    ],
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis", "Vercel Edge"],
    metrics: [
      { label: "Avg Lighthouse Score", value: "99/100" },
      { label: "Sub-second Page Load", value: "< 700ms" },
      { label: "Conversion Lift", value: "+180%" },
    ],
    process: [
      { step: "01", title: "Information Architecture", description: "Mapping user journeys, conversion funnels, and performance constraints." },
      { step: "02", title: "Art Direction & Kinetic Design", description: "Crafting bespoke layouts with custom typography and motion choreography." },
      { step: "03", title: "Full-Stack Engineering", description: "Building with type-safe TypeScript, Next.js App Router, and server actions." },
      { step: "04", title: "Edge Deployment & Audit", description: "Deploying to global CDN, stress testing, and optimizing Core Web Vitals." },
    ],
    faq: [
      {
        question: "How long does a custom website build take?",
        answer: "Most production digital flagships launch within 2 to 4 weeks depending on scope, custom interactions, and CMS requirements.",
      },
      {
        question: "Will our team be able to update content easily?",
        answer: "Yes, we integrate modern headless CMS platforms or intuitive config schemas allowing non-technical teammates to update text, photos, and project details in seconds.",
      },
      {
        question: "Do you handle hosting and domain configuration?",
        answer: "Yes, we deploy directly to Vercel or your preferred cloud infrastructure with automated SSL certificates, global edge caching, and preview deployment pipelines.",
      },
    ],
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    accentColor: "#38BDF8",
    ringColor: "rgba(56, 189, 248, 0.4)",
    relatedProjectId: "dentora-dental-clinic",
  },
  {
    id: "ai-automation",
    number: "02",
    title: "AI Automation",
    tagline: "Autonomous workflows eliminating repetitive human bottlenecks.",
    shortDescription: "Self-healing n8n orchestrations, OpenAI / Claude agent workflows, and seamless multi-app data pipelines.",
    fullOverview: "We architect enterprise-grade AI automation pipelines that eliminate hundreds of hours of manual operational grind. From real-time inbound lead qualification to CRM enrichment and self-healing data syncs, our automated agents work 24/7 with zero human intervention.",
    problemSolved: "Manual data entry, delayed sales follow-ups (>4 hours), and disconnected software tools lead to dropped leads and wasted employee salaries. We automate your entire back-office workflow into seamless event-driven pipelines.",
    deliverables: [
      "Custom self-hosted or cloud n8n pipeline orchestration",
      "Multi-model LLM reasoning agents (Claude 3.5, OpenAI GPT-4o)",
      "Automated lead scoring, triage, and Slack/WhatsApp alerts",
      "Bidirectional sync across HubSpot, Salesforce, Notion & Sheets",
      "Automated contract generation & digital invoice routing",
      "Error-tolerant retry queues with instant Discord/Slack monitoring",
    ],
    technologies: ["n8n", "OpenAI API", "Claude 3.5 Sonnet", "PostgreSQL", "Webhooks", "HubSpot", "Slack API"],
    metrics: [
      { label: "Hours Saved / Month", value: "2,400+" },
      { label: "Lead Triage Response", value: "< 90 sec" },
      { label: "Sync Accuracy", value: "99.9%" },
    ],
    process: [
      { step: "01", title: "Workflow Audit", description: "Analyzing your team's manual repetitive tasks and friction points." },
      { step: "02", title: "Logic & Prompt Architecture", description: "Designing resilient state-machines, fallback logic, and strict prompt schemas." },
      { step: "03", title: "Integration & Sandbox Testing", description: "Connecting APIs with webhook listeners and testing edge cases with synthetic data." },
      { step: "04", title: "Live Deployment & Alerting", description: "Releasing into production with real-time error reporting and SLA monitoring." },
    ],
    faq: [
      {
        question: "Can these automations connect to our existing CRM and software?",
        answer: "Yes, we connect with all modern APIs including HubSpot, Salesforce, Google Workspace, Slack, Notion, Airtable, Stripe, and custom internal databases.",
      },
      {
        question: "What happens if an external third-party API goes down?",
        answer: "We engineer self-healing pipelines with persistent retry queues, fallback routes, and instant alert notifications so no data or lead is ever lost.",
      },
    ],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "#10B981",
    ringColor: "rgba(16, 185, 129, 0.4)",
    relatedProjectId: "omni-lead-automation",
  },
  {
    id: "whatsapp-bots",
    number: "03",
    title: "WhatsApp Bots",
    tagline: "Turn chat windows into 24/7 revenue & operational engines.",
    shortDescription: "Official Meta Cloud API solutions: payment links, automated catalog querying, CRM sync, and lead capture.",
    fullOverview: "Transform the world's most popular messaging app into your highest-converting sales representative and customer support desk. We build verified Meta Cloud API bots capable of taking orders, generating instant payment links, sharing brochures, and updating databases instantly.",
    problemSolved: "Customers expect immediate responses on WhatsApp. When inquiries sit unaddressed for hours or staff gets buried in repetitive FAQs, customer drop-off exceeds 60%. We deliver instant, human-like conversational resolution within seconds.",
    deliverables: [
      "Official Meta WhatsApp Business Cloud API verification & setup",
      "Dynamic Razorpay & Stripe 1-click in-chat payment links",
      "Real-time product catalog & PDF brochure generation",
      "Natural language conversational understanding in multiple languages",
      "Instant CRM lead creation & live human agent handover buttons",
      "Automated order confirmations, reminders & status tracking",
    ],
    technologies: ["Meta Cloud API", "Node.js", "n8n", "Razorpay", "Supabase", "Vector DB"],
    metrics: [
      { label: "Messages Handled", value: "1.2M+" },
      { label: "Response Latency", value: "< 2 sec" },
      { label: "Checkout Completion", value: "94%" },
    ],
    process: [
      { step: "01", title: "Meta API Provisioning", description: "Configuring WhatsApp Cloud API account, phone numbers, and display templates." },
      { step: "02", title: "Conversational Flow Design", description: "Mapping decision trees, dynamic menu buttons, and context retention." },
      { step: "03", title: "Payment & Database Hooks", description: "Integrating webhooks for live transactional payment verification and ERP sync." },
      { step: "04", title: "Load Testing & Go-Live", description: "Benchmarking simultaneous concurrent chats to ensure zero message drop." },
    ],
    faq: [
      {
        question: "Is this built with official Meta APIs or unofficial scrapers?",
        answer: "We build 100% on the official Meta WhatsApp Business Cloud API, guaranteeing green tick compatibility, zero ban risk, and enterprise stability.",
      },
      {
        question: "Can human agents take over the conversation when needed?",
        answer: "Yes, our bots include intelligent fallback triggers that seamlessly transfer chats to a human team member with full previous chat history.",
      },
    ],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "#FF8A00",
    ringColor: "rgba(255, 138, 0, 0.4)",
    relatedProjectId: "whatsapp-campus-pay",
  },
  {
    id: "booking-lead",
    number: "04",
    title: "Booking & Lead Systems",
    tagline: "Capture, qualify and route every lead automatically.",
    shortDescription: "Custom booking flows, calendar integrations, lead scoring pipelines and automated follow-ups that never sleep.",
    fullOverview: "A seamless booking and consultation engine that connects high-intent prospects straight into your calendar with zero back-and-forth email tag. Includes pre-qualification questions, automatic timezone conversion, and SMS/WhatsApp appointment reminders that crush no-shows.",
    problemSolved: "Back-and-forth scheduling over email takes days, causes 40% lead drop-off, and results in empty calendar slots when clients forget appointments. Our automated scheduling flow locks in confirmed meetings in 45 seconds.",
    deliverables: [
      "Frictionless multi-step booking widget with zero layout shift",
      "Real-time Google Calendar, Outlook, and Apple Calendar synchronization",
      "Custom pre-qualification logic to filter low-intent inquiries",
      "Automated WhatsApp & Email confirmation with calendar invite attachment",
      "Automated 24h & 1h reminder cadences cutting no-shows by 75%",
      "Direct CRM contact creation and revenue pipeline tagging",
    ],
    technologies: ["Next.js", "Google Calendar API", "Twilio / Meta SMS", "n8n", "PostgreSQL"],
    metrics: [
      { label: "No-Show Reduction", value: "75%" },
      { label: "Booking Time", value: "< 45 sec" },
      { label: "Pipeline Acceleration", value: "2.8x" },
    ],
    process: [
      { step: "01", title: "Funnel Analysis", description: "Determining ideal qualification questions and calendar availability rules." },
      { step: "02", title: "Custom UI Engineering", description: "Crafting a lightning-fast calendar selector tailored to your brand identity." },
      { step: "03", title: "Two-Way Calendar Sync", description: "Configuring real-time conflict prevention across all staff calendars." },
      { step: "04", title: "Reminder Sequences", description: "Writing high-engagement WhatsApp/SMS alerts that keep clients excited to attend." },
    ],
    faq: [
      {
        question: "Can it accept payments during booking?",
        answer: "Yes, we can require upfront deposits or full consultation fee payments via Stripe or Razorpay before a calendar slot is reserved.",
      },
      {
        question: "Can different services have different durations and staff assignments?",
        answer: "Absolutely. You can define custom durations, buffer times, and assign specific team members automatically based on service type or client location.",
      },
    ],
    gradient: "from-violet-500/20 via-purple-500/10 to-transparent",
    accentColor: "#8B5CF6",
    ringColor: "rgba(139, 92, 246, 0.4)",
    relatedProjectId: "dentora-dental-clinic",
  },
  {
    id: "ui-ux",
    number: "05",
    title: "UI/UX & Motion Design",
    tagline: "Art-directed visuals that evoke prestige and trust.",
    shortDescription: "Bold geometric typography, fluid motion principles, and distinctive sensory aesthetics.",
    fullOverview: "We design digital experiences that leave a lasting imprint. Blending high-fashion editorial aesthetics, tactile micro-interactions, and balanced typography scales, we turn ordinary websites into immersive brand journeys that convert visitors into loyal advocates.",
    problemSolved: "Generic templates with cookie-cutter layouts dilute your company's value, making your offerings look identical to cheaper competitors. We create bespoke, prestigious visual identities that justify premium pricing.",
    deliverables: [
      "Complete Figma design system with tokens, variables & typography scale",
      "Interactive 60fps prototypes modeling real user behavior",
      "Custom iconography, badges, textures, and bespoke visual assets",
      "Comprehensive mobile, tablet, and widescreen responsive viewports",
      "Production-ready design handoff specs for engineering teams",
      "Accessibility compliance (WCAG AA) with high-contrast color systems",
    ],
    technologies: ["Figma", "Framer", "Design Systems", "Kinetic Motion", "Visual Direction"],
    metrics: [
      { label: "Avg Session Duration", value: "+140%" },
      { label: "Brand Recall Lift", value: "3.2x" },
      { label: "Design System Adoption", value: "100%" },
    ],
    process: [
      { step: "01", title: "Moodboard & Creative Direction", description: "Establishing typographic hierarchy, palette contrast, and emotional tone." },
      { step: "02", title: "Wireframing & Content Flow", description: "Structuring information for effortless reading and clear conversion intent." },
      { step: "03", title: "High-Fidelity Visual Design", description: "Refining typography, glassmorphism layers, and spatial layout balance." },
      { step: "04", title: "Motion Specification", description: "Defining exact cubic-bezier easing curves and tactile interactive states." },
    ],
    faq: [
      {
        question: "Do you design for mobile first?",
        answer: "Always. Every screen is designed and tested across modern iOS and Android viewport sizes before desktop scaling to ensure seamless ergonomics.",
      },
      {
        question: "Do we get full access to the source Figma files?",
        answer: "Yes, you receive full ownership of the organized Figma file including reusable component libraries, design tokens, and typography styles.",
      },
    ],
    gradient: "from-rose-500/20 via-pink-500/10 to-transparent",
    accentColor: "#F43F5E",
    ringColor: "rgba(244, 63, 94, 0.4)",
    relatedProjectId: "aura-culinary-cafe",
  },
  {
    id: "maintenance",
    number: "06",
    title: "Maintenance & Scaled SLAs",
    tagline: "We maintain what we create — your site never falls behind.",
    shortDescription: "Proactive monitoring, performance tuning, dependency updates, and priority bug-fix SLAs.",
    fullOverview: "A dedicated operational partnership protecting your digital investment. We monitor uptime 24/7, audit Core Web Vitals continuously, patch software dependencies, and provide guaranteed turnaround times for feature requests and fixes.",
    problemSolved: "Websites and automated systems left unattended suffer from bit rot, broken external API changes, security vulnerabilities, and sluggish performance degrades. We keep your systems operating at peak performance year-round.",
    deliverables: [
      "24/7/365 real-time uptime monitoring with automated incident alerts",
      "Monthly performance benchmarking and Core Web Vitals maintenance",
      "Safe dependency updates, security patches, and framework upgrades",
      "Guaranteed priority response times for critical bug fixes",
      "Continuous SEO audits, broken link repair, and sitemap verification",
      "Dedicated developer hours every month for content updates & feature additions",
    ],
    technologies: ["Datadog / BetterStack", "Vercel Analytics", "GitHub Actions", "Sentry", "TypeScript"],
    metrics: [
      { label: "Uptime Maintained", value: "99.98%" },
      { label: "SLA Response Time", value: "< 2 hours" },
      { label: "Security Incidents", value: "0" },
    ],
    process: [
      { step: "01", title: "Baseline Telemetry", description: "Setting up real-time error logging, uptime pings, and performance telemetry." },
      { step: "02", title: "Automated Regression Tests", description: "Running automated test suites on every pull request to prevent breaking changes." },
      { step: "03", title: "Proactive Upgrades", description: "Reviewing package advisories and updating frameworks on staging first." },
      { step: "04", title: "Monthly Health Reports", description: "Delivering transparent monthly metrics on traffic, speed, and resolved tickets." },
    ],
    faq: [
      {
        question: "What is your typical turnaround time for critical issues?",
        answer: "Critical production issues receive immediate triage with a guaranteed response time of under 2 hours, 24/7.",
      },
      {
        question: "Can we roll unused monthly hours over to the next month?",
        answer: "Yes, retainer clients can bank up to 50% of unused developer hours for upcoming seasonal launches or major feature releases.",
      },
    ],
    gradient: "from-cyan-500/20 via-teal-500/10 to-transparent",
    accentColor: "#06B6D4",
    ringColor: "rgba(6, 182, 212, 0.4)",
    relatedProjectId: "velvet-stone-cafe",
  },
];

/** Simple flat list for nav dropdown and footer */
export const servicesList = servicesData.map((s) => ({
  number: s.number,
  title: s.title,
  href: `/services/${s.id}`,
}));

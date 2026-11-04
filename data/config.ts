export interface SiteConfig {
  duoName: string;
  duoHandle: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  pillTags: string[];
  contactEmail: string;
  whatsappNumber: string;
  socials: {
    instagram: string;
    linkedin: string;
    whatsapp: string;
    github: string;
    email: string;
  };
}

export const siteConfig: SiteConfig = {
  duoName: "Ayush Mapari & Kishori Charpe",
  duoHandle: "@ayush_kishori",
  tagline: "Websites & AI automations that actually grow your business",
  heroHeadline: "Beyond the Visuals",
  heroSubheadline: "Two specialists bridging high-converting engineering with autonomous AI workflows.",
  pillTags: [
    "Websites",
    "AI Automation",
    "WhatsApp Bots",
    "n8n Workflows",
    "Conversion Architecture",
    "Custom Integrations",
  ],
  contactEmail: "hello@ayushandkishori.com",
  whatsappNumber: "+91 8605081006",
  socials: {
    instagram: "https://instagram.com",
    linkedin: "https://www.linkedin.com/in/ayush-mapari-6ba975320/",
    whatsapp: "https://wa.me/918605081006?text=Hi%20Ayush%20%26%20Kishori%2C%20I%20would%20like%20to%20inquire%20about%20a%20project.",
    github: "https://github.com",
    email: "mailto:hello@ayushandkishori.com",
  },
};

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  photo: string;
  socials: {
    instagram?: string;
    linkedin?: string;
    whatsapp?: string;
    github?: string;
  };
  metrics: {
    label: string;
    value: string;
  }[];
}

export const teamData: TeamMember[] = [
  {
    id: "ayush",
    name: "Ayush Mapari",
    role: "Automation Lead & AI Engineer",
    specialty: "n8n • WhatsApp APIs • Autonomous LLM Agents",
    bio: "Designs bulletproof operational pipelines, autonomous WhatsApp chatbots, and CRM syncs that reclaim hundreds of manual hours.",
    photo: "/team/person1.jpg",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://www.linkedin.com/in/ayush-mapari-6ba975320/",
      whatsapp: "https://wa.me/918605081006?text=Hi%20Ayush%2C%20I%20would%20like%20to%20discuss%20AI%20automation%20or%20WhatsApp%20bots.",
      github: "https://github.com",
    },
    metrics: [
      { label: "Hours Automated / Mo", value: "2,400+" },
      { label: "Bot Messages Handled", value: "1.2M+" },
    ],
  },
  {
    id: "kishori",
    name: "Kishori Charpe",
    role: "Website & Product Architect",
    specialty: "Next.js • High-Performance Web • 3D Interactivity",
    bio: "Obsessed with creating silky-smooth, 60fps digital experiences and high-conversion landing pages that command attention.",
    photo: "/team/person2.jpg",
    socials: {
      instagram: "https://instagram.com",
      linkedin: "https://www.linkedin.com/in/kishori-charpe-00b284280/",
      whatsapp: "https://wa.me/918605081006?text=Hi%20Kishori%2C%20I%20would%20like%20to%20discuss%20a%20website%20or%20frontend%20project.",
      github: "https://github.com",
    },
    metrics: [
      { label: "Websites Shipped", value: "35+" },
      { label: "Avg Lighthouse Score", value: "99" },
    ],
  },
];

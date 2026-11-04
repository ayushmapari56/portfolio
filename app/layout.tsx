import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Montserrat, Mr_Dafoe } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Preloader from "@/components/ui/Preloader";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";
import { siteConfig } from "@/data/config";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["900"],
  variable: "--font-montserrat",
  display: "swap",
});

const mrDafoe = Mr_Dafoe({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.duoName} | Websites & AI Automations Duo`,
  description: siteConfig.tagline,
  keywords: [
    "Websites",
    "Next.js Development",
    "AI Automation",
    "WhatsApp Bots",
    "n8n Workflows",
    "Frontend Engineering",
    "Conversion Rate Optimization",
  ],
  authors: [{ name: siteConfig.duoName }],
  openGraph: {
    title: `${siteConfig.duoName} | Beyond the Visuals`,
    description: siteConfig.tagline,
    url: "https://portfolio.local",
    siteName: siteConfig.duoName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.duoName} | Websites & AI Automation`,
    description: siteConfig.tagline,
    creator: siteConfig.duoHandle,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${montserrat.variable} ${mrDafoe.variable}`}>
      <body className="font-sans bg-[#0B0B14] text-[#F4F1EA] antialiased selection:bg-orange-500 selection:text-white">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <FloatingWhatsApp />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0B0B14",
          card: "#121222",
          border: "#1E1E34",
          muted: "#8A8AA0",
        },
        light: {
          bg: "#F4F1EA",
          card: "#FFFFFF",
          border: "#E5E1D8",
          muted: "#66645E",
          subtle: "#ECE8DF",
        },
        accent: {
          start: "#FF8A00",
          end: "#FF5A1F",
          DEFAULT: "#FF6E10",
        },
        sky: {
          soft: "#D9EDF8",
          glow: "#38BDF8",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-space-grotesk)",
          "Space Grotesk",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          "var(--font-jetbrains-mono)",
          "JetBrains Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        display: [
          "var(--font-montserrat)",
          "Montserrat",
          "sans-serif",
        ],
        script: [
          "var(--font-script)",
          "cursive",
        ],
      },
      fontSize: {
        // Balanced Medium Typography Scale
        "hero": ["clamp(2.5rem, 5.5vw, 4.75rem)", { lineHeight: "1.05", letterSpacing: "-0.035em", fontWeight: "500" }],
        "section": ["clamp(1.85rem, 3.2vw, 2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.03em", fontWeight: "500" }],
        "card": ["clamp(1.2rem, 1.6vw, 1.5rem)", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "500" }],
        "statement": ["clamp(1.6rem, 2.8vw, 2.5rem)", { lineHeight: "1.18", letterSpacing: "-0.025em", fontWeight: "500" }],
        "body": ["clamp(0.9375rem, 1vw, 1.0625rem)", { lineHeight: "1.6", fontWeight: "400" }],
        "card-desc": ["clamp(0.875rem, 0.95vw, 0.9375rem)", { lineHeight: "1.55", fontWeight: "400" }],
        "mono-label": ["clamp(0.75rem, 0.8vw, 0.8125rem)", { letterSpacing: "0.1em", fontWeight: "500" }],
        "nav": ["clamp(0.875rem, 0.95vw, 0.9375rem)", { letterSpacing: "-0.01em", fontWeight: "500" }],
      },
      boxShadow: {
        "3d-glow": "0 20px 50px rgba(255, 110, 16, 0.25)",
        "card-hover": "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
        "neon-dark": "0 0 35px rgba(255, 110, 16, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;

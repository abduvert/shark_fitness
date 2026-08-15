import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        base: "rgb(var(--base) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        "line-strong": "rgb(var(--line-strong) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        "gold-soft": "rgb(var(--gold-soft) / <alpha-value>)",
        beige: "rgb(var(--beige) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-sora)", "system-ui", "sans-serif"],
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
      },
      letterSpacing: {
        label: "0.18em",
techy: "0.08em",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--gold) / 0.16), 0 12px 40px -12px rgb(var(--gold) / 0.30)",
        lift: "0 24px 60px -24px rgb(0 0 0 / 0.65)",
        "lift-light": "0 24px 60px -28px rgb(40 30 10 / 0.28)",
        inset: "inset 0 1px 0 0 rgb(255 255 255 / 0.05)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgb(var(--base)) 85%)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.85)", opacity: "0.55" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "pulse-ring": "pulse-ring 2.8s cubic-bezier(0.4,0,0.2,1) infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

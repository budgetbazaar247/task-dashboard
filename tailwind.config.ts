import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#fbf7ee",
          100: "#f5ecd4",
          200: "#ead6a8",
          300: "#dfbd77",
          400: "#d4a54d",
          500: "#c48f34",
          600: "#a5722a",
          700: "#835827",
          800: "#6c4826",
          900: "#5c3d24",
        },
        ink: {
          950: "#07070a",
          900: "#0c0c11",
          800: "#131319",
          700: "#1b1b23",
          600: "#26262f",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 20px 60px -15px rgba(0,0,0,0.35)",
        gold: "0 10px 40px -10px rgba(196,143,52,0.45)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #f5ecd4 0%, #d4a54d 50%, #a5722a 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "scale-in": "scale-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;

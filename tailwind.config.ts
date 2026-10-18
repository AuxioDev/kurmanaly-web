import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          deep: "#5C0A1A",
          glow: "#8B1538",
          bright: "#C41E3A",
        },
        violet: {
          deep: "#2D1B4E",
          glow: "#5B2C8F",
          soft: "#7B4BA8",
        },
        magenta: {
          dark: "#4A0E3D",
          glow: "#8B2E6B",
          wine: "#6B1E4A",
        },
        wine: {
          subtle: "#3D1528",
          accent: "#9E4A6A",
        },
        surface: {
          DEFAULT: "#0A0612",
          raised: "#120A1A",
          overlay: "#1A0F24",
        },
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(196, 30, 58, 0.35)",
        "glow-violet": "0 0 50px -10px rgba(91, 44, 143, 0.4)",
      },
      backgroundImage: {
        "ambient-radial":
          "radial-gradient(ellipse 80% 60% at 50% -20%, rgba(139, 46, 107, 0.25), transparent 70%)",
        "ambient-corner":
          "radial-gradient(circle at 100% 0%, rgba(91, 44, 143, 0.2), transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;

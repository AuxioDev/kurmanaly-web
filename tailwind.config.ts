import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // hover-стили применяются только на устройствах с мышью, на тачскринах не «залипают»
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      colors: {
        canvas: "#0B0908",
        surface: "#171210",
        sunken: "#110D0B",
        fg: {
          DEFAULT: "#F5EFE9",
          soft: "#D4CAC1",
          muted: "#A39789",
        },
        line: {
          DEFAULT: "#2E2623",
          strong: "#4A3F3A",
        },
        // красный: цвет действия (кнопки, активные состояния)
        red: {
          DEFAULT: "#E5392B",
          deep: "#D7301F",
          dark: "#9E1F14",
        },
        // оранжевый: акцент и сигнал (метки, цифры, наведение, фокус)
        orange: {
          DEFAULT: "#FF7A1A",
          soft: "#FF9A4D",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "float-a": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(6%, 8%, 0) scale(1.12)" },
        },
        "float-b": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1.05)" },
          "50%": { transform: "translate3d(-8%, 6%, 0) scale(0.95)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        gradient: "gradient-x 9s ease-in-out infinite",
        "float-a": "float-a 20s ease-in-out infinite",
        "float-b": "float-b 26s ease-in-out infinite",
        "page-in": "page-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards",
      },
    },
  },
  plugins: [],
};

export default config;

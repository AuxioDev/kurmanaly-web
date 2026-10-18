import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    },
  },
  plugins: [],
};

export default config;

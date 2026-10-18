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
        paper: {
          DEFAULT: "#F6F4EF",
          raised: "#FFFFFF",
          sunken: "#EDEAE2",
        },
        ink: {
          DEFAULT: "#151515",
          soft: "#3A3833",
          muted: "#6B675F",
        },
        line: {
          DEFAULT: "#D9D5CC",
          strong: "#151515",
        },
        olive: {
          DEFAULT: "#6F7352",
          deep: "#4F533A",
          soft: "#E4E5D8",
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

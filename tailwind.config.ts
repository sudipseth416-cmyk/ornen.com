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
        background: "#0a0a0a",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#0d1f0d", // Dark Green
        },
        accent: {
          DEFAULT: "#c9a84c", // Gold Accent
        },
        muted: {
          DEFAULT: "#a0a0a0", // Muted text
        }
      },
      fontFamily: {
        playfair: ['var(--font-playfair-display)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#F3F0FF",
          100: "#E9E4FF",
          200: "#D4CCFF",
          300: "#B3A4FF",
          400: "#9180FF",
          500: "#6C5CE7",
          600: "#5A4BD1",
          700: "#4A3DB0",
          800: "#3D3290",
          900: "#2D2570",
          950: "#1A1545",
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
    },
  },
  plugins: [],
};
export default config;

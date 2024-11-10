import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        primary: {
          100: "#dddddc",
          200: "#bcbbb9",
          300: "#9a9897",
          400: "#797674",
          500: "#575451",
          600: "#464341",
          700: "#343231",
          800: "#232220",
          900: "#111110",
        },
        accent: {
          100: "#f6f2e7",
          200: "#ede6cf",
          300: "#e4d9b7",
          400: "#dbcd9f",
          500: "#d2c087",
          600: "#a89a6c",
          700: "#7e7351",
          800: "#544d36",
          900: "#2a261b",
        },
        secondary: {
          100: "#d6d6d6",
          200: "#adadad",
          300: "#858585",
          400: "#5c5c5c",
          500: "#333333",
          600: "#292929",
          700: "#1f1f1f",
          800: "#141414",
          900: "#0a0a0a",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

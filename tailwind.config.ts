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
        dark: {
          primary: "#111231",
          secondary: "#151738",
          accent: "#3B3961",
          text: "#FFFFFF",
          des_color: "#9899AB",
          hover: "#B4B9CB",
        },
        light: {
          primary: "#ffffff",
          secondary: "#f7f8fc",
          accent: "#e4e7eb",
          text: "#111231",
          des_color: "#9899AB",
          hover: "#4a4a4a",
        },
      },
    },
  },
  plugins: [],
};

export default config;

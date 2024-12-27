import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "orange-color": "#D45B2B",
        "magenta-color": "#6625BF",
        "magenta-hover": "#7e4cc2",
        "black-color": "#1E1E1E",
      },
    },
  },
  plugins: [],
  darkMode: "media",
} satisfies Config;

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
        "orange-hover": "#B43D1A",
        "magenta-color": "#6625BF",
        "magenta-hover": "#521f9b",
      },
    },
  },
  plugins: [],
  // darkMode: "class",
} satisfies Config;

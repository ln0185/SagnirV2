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
        background: "var(--background)",
        foreground: "var(--foreground)",
        sagnir: {
          100: "#1A1616",
          200: "#F0ECDD",
          300: "#3B332B",
        },
      },
    },
    fontFamily: {
      glare: ["PPFragment-GlareRegular", "sans-serif"],
      serifExtra: ["PPFragment-SerifExtrabold", "serif"],
    },
  },
  plugins: [],
} satisfies Config;

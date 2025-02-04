module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sagnir: {
          100: "#1A1616",
          200: "#F0ECDD",
          300: "#3B332B",
        },
      },
      fontFamily: {
        glare: ["PPFragment-GlareRegular", "sans-serif"],
        serifExtra: ["PPFragment-SerifExtraBold", "serif"],
      },
    },
  },
  plugins: [],
};

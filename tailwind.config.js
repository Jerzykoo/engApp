module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        black: "#000000",
        white: "#FFFFFF",
        dark: "#2F2F2F",
        red: {
          500: "#CC1818",
        },
        grey: {
          // 100: "#D8D8D8",
          100: "#E8E8E8",
          200: "#D0D0D0",
          300: "#C0C0C0",
          400: "#B0B0B0",
          500: "#A0A0A0",
          600: "#888888",
          700: "#707070",
        },
      },
    },
  },
  plugins: [],
};

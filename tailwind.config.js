/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      main: colors.zinc,
      gray: colors.gray,
      neutral: colors.neutral,
    },
  },
};

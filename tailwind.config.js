/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0c56d0",
        "primary-dim": "#004aba",
        background: "#f8f9fa",
        surface: "#f8f9fa",
        "on-surface": "#2b3437",
        "on-surface-variant": "#586064",
      },
      fontFamily: {
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      }
    },
  },
  plugins: [],
}
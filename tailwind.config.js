/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '485px',
      },
      fontFamily: {
        spartan: ["'League Spartan'", "sans-serif"],
      },
    },
  },
  plugins: [],
}
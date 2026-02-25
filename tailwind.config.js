/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#var(--primary)",
        secondary: "#var(--secondary)",
      },
      fontFamily: {
        sans: ["Epilogue", 'sans-serif'], // your custom font
        manrope: ["Manrope", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
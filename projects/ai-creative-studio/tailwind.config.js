/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark': { 900: '#0a0a0f', 800: '#12121a', 700: '#1a1a25', 600: '#252532', 500: '#32324a' },
        'accent': { primary: '#8b5cf6', secondary: '#06b6d4', tertiary: '#f59e0b' }
      }
    }
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#f8fafc',
          card: '#ffffff',
          main: '#0f172a',
          muted: '#64748b',
          accent: '#3b82f6',
          hover: '#2563eb',
          border: '#e2e8f0',
        }
      }
    },
  },
  plugins: [],
}
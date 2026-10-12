/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sports: {
          dark: '#080C14',
          cardDark: '#101623',
          borderDark: '#1E293B',
          cardLight: '#FFFFFF',
          borderLight: '#E2E8F0',
          lime: '#84CC16',
          limeGlow: '#A3E635',
          orange: '#FF5722',
          orangeHover: '#F4511E',
          red: '#EF4444',
          green: '#10B981',
          accent: '#06B6D4',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Teko', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

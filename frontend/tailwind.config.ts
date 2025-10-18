/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        darkbg: '#121212',   // deep black background
        primary: {
          50: '#dafbe7',
          100: '#aceadd',
          300: '#41d88a',
          500: '#22c55e',   // bright green
          700: '#15803d'
        },
        textBase: '#e0e0e0',
        textSecondary: '#a0a0a0'
      },fontFamily: {
        Inter: ['var(--font-inter)', 'sans-serif'],
      }
    }
  },
  plugins: []
}

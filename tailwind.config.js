/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060606',
        soft: '#0f0f0f',
        purple: '#7c3aed',
        blue: '#2563eb',
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Geist Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

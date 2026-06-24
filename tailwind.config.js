/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        soft: '#0d0d0c',
        accent: {
          DEFAULT: '#2563eb',
          bright: '#3b82f6',
          deep: '#1d4ed8',
        },
      },
      fontFamily: {
        display: ['Clash Display', 'sans-serif'],
        body: ['Geist Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

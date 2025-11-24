/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          50: '#fef5ef',
          100: '#fde8d9',
          200: '#facdb3',
          300: '#f6a882',
          400: '#f18e48',
          500: '#ee7324',
          600: '#df5819',
          700: '#ba4317',
          800: '#95371a',
          900: '#793018',
        },
      },
    },
  },
  plugins: [],
}


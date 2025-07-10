/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // domyślna czcionka
        serif: ['Petrona', 'serif'], // np. do nagłówków
      },
    },
  },
  plugins: [],
}

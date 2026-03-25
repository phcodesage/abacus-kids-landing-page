/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Montserrat', 'Inter', 'sans-serif'],
        heading: ['Montserrat', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

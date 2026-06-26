/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: '#0A0A0A',
        offwhite: '#F5F5F2',
        purple: '#5B1F6E',
        'purple-light': '#7B2D8E',
      },
      fontFamily: {
        heading: ['Archivo Black', 'Anton', 'Bebas Neue', 'sans-serif'],
        body: ['Inter', 'General Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
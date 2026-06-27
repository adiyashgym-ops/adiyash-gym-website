/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: '#FAFAF8',
        ink: '#141414',
        purple: '#5B1F6E',
        'purple-light': '#7B2D8E',
      },
      fontFamily: {
        heading: ['"General Sans"', '"Inter"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
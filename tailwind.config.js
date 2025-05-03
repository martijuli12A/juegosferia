/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mexican-red': '#e53e3e',
        'mexican-yellow': '#f6ad55',
        'mexican-green': '#48bb78',
      },
      fontFamily: {
        'mexican': ['"Baloo 2"', 'cursive'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
} 
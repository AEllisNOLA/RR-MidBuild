/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'navy': '#131921',
        'gold': '#9c7945'
      },
      fontFamily: {
        bodyFont: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}




/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: 'rgb(123, 45, 67)',
        customHoverColor: '#FFC700',
      },
    },
  },
  plugins: [],
}


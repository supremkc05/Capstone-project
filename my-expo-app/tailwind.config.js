/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        main: '#021F61',
        buttons: "#FE2C55",
        grey: "#BCBCBC"
      },
    },
  },
  plugins: [],
};

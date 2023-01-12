/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#F28705',
        'grey': '#808080',
        'darkgrey': '#292929',
        'lgrey': '#353535',
        'darkorange': '#cc7000',
        'brown': '#8C4E03',
        'darkbrown': '#402401',
        'golden-yellow': '#FFC000',
      },
    },
  },
  plugins: [],
}

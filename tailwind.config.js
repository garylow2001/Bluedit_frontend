/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '	#efa332',
        'grey': '#939394',
        'cream': '#d4d0c4',
        'lred': '#e6594a',
      },
      fontFamily: {
        coolvetica: ["coolvetica"]
      }
    },
  },
  plugins: [],
}

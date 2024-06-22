/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'picture-me': "url('assets/pictures/picture-me.png')",
      }
    },
  },
  plugins: [],
}
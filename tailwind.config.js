/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
<<<<<<< Updated upstream
        poppins: ["Poppins", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"],
=======
        // font 'serifGaya' gunakan Playfair Display + fallback serif
        playfair: ['Playfair Display', 'serif'],
        // font untuk judul (Anton, Impact, sans-serif) bisa tetap 'thrift'
        anton: ['Anton', 'sans-serif'],
        impact: ['Impact', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        roboto: ['Roboto', 'sans-serif'],
>>>>>>> Stashed changes
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Anda mendefinisikan 'playfair' dua kali. Cukup satu kali.
        // Jika ingin nama alias yang berbeda, gunakan nama alias yang berbeda.
        poppins: ["Poppins", "sans-serif"],
        playfair: ['"Playfair Display"', "serif"], // Sebaiknya gunakan kutip ganda untuk nama font yang mengandung spasi
        // serifGaya: ['"Playfair Display"', "serif"], // Contoh jika Anda ingin alias 'serifGaya'
        anton: ["Anton", "sans-serif"],
        impact: ["Impact", "sans-serif"], // Jika Anda punya font Impact, jika tidak, mungkin tidak perlu
        georgia: ["Georgia", "serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      // Tambahkan di sini jika Anda ingin memperluas konfigurasi tema lainnya
      // seperti colors, borderRadius, dll., yang dibutuhkan oleh Shadcn UI
      colors: {
      background: 'rgb(var(--background))', // Menggunakan rgb() karena variabel kita sekarang RGB
      foreground: 'rgb(var(--foreground))',
      card: 'rgb(var(--card))',
      cardForeground: 'rgb(var(--card-foreground))', // Perhatikan camelCase jika komponen Shadcn menggunakan itu
      popover: 'rgb(var(--popover))',
      popoverForeground: 'rgb(var(--popover-foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))', // Ini tetap HSL
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
    },
    borderRadius: { // Pastikan ini juga ada
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
      keyframes: { // Jika Anda menggunakan komponen Shadcn UI yang memerlukan animasi
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: { // Jika Anda menggunakan komponen Shadcn UI yang memerlukan animasi
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate") // Plugin ini penting untuk animasi Shadcn UI
  ],
};
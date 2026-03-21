/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aurenGraphite: "#121212",
        aurenGold: "#D4AF37",
        aurenCard: "#1A1A1A",
        aurenStroke: "#262626",
        aurenMuted: "#9A9A9A",
      },
      boxShadow: {
        soft: "0 14px 28px rgba(0,0,0,.35)",
      },
      borderRadius: {
        panel: "1.2rem",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

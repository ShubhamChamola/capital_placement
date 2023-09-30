/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        custom_grey: "#D0F7FA",
      },
      maxWidth: {
        400: "400px",
        450: "450px",
        500: "500px",
      },
    },
  },
  plugins: [],
};

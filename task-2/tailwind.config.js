/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        400: "400px",
      },
      backgroundColor: {
        light_white: "#F9FAFF",
        light_pink: "#E9EFFF",
        custom_blue: "#1D5ECD",
      },
      colors: {
        custom_blue: "#1D4ED8",
        light_custom_blue: "#D0E1FF",
      },
    },
  },
  plugins: [],
};

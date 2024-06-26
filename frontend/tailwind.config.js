/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      xs: "350px",
      sm: "550px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
};

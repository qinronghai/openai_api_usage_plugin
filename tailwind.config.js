/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      width: {
        "625px": "625px",
        "785px": "785px",
        "885px": "885px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1480px",
      "2xl": "1920px",
    },
  },
  plugins: [],
};

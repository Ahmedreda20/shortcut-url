/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*{.ejs,.html}", "./src/public/**/*{.ejs,.html}", "./dist/views/**/*{.ejs,.html}", "./dist/public/**/*{.ejs,.html}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};

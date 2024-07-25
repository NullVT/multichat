/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        twitch: "#9146FF",
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};

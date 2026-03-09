/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        surface: {
          500: "#3f4553",
          600: "#2d3343",
          700: "#1e2433",
          800: "#151b28",
          900: "#0d1117",
        },
        linkedin: {
          blue: "#0a66c2",
          hover: "#004182",
          light: "#e8f3ff",
          bg: "#eef1f6",
        },
      },
    },
  },
  plugins: [],
};

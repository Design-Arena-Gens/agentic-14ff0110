/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: "#f2fdfa",
          100: "#dffff0",
          200: "#b8f8dc",
          300: "#89eec4",
          400: "#5edcab",
          500: "#36c490",
          600: "#28a379",
          700: "#1f8160",
          800: "#1b674f",
          900: "#14533f"
        },
        butter: {
          50: "#fffdea",
          100: "#fff5c2",
          200: "#ffe890",
          300: "#ffd657",
          400: "#ffc12c",
          500: "#ffa404",
          600: "#d67702",
          700: "#b05604",
          800: "#8c400a",
          900: "#70320c"
        },
        cream: {
          50: "#faf9f4",
          100: "#f5f0e2",
          200: "#eee1c2",
          300: "#e1cc95",
          400: "#d3b065",
          500: "#c5943d",
          600: "#ac7c2f",
          700: "#8d6125",
          800: "#704b20",
          900: "#5b3f1b"
        }
      },
      fontFamily: {
        sans: ["'Open Sans'", "Lato", "sans-serif"],
        display: ["'Lato'", "Open Sans", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(38, 132, 117, 0.08)"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        gentlePulse: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.03)" }
        }
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out forwards",
        gentlePulse: "gentlePulse 3s ease-in-out infinite"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio")
  ]
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      borderRadius: {
        sm: 3, // 3px
      },
      boxShadow: {
        default: "rgba(9, 30, 66, 0.25) 0px 1px 0px",
        inner: "rgb(0, 121, 191) 0px 0px 0px 2px inset"
      },
      colors: {
        navbg: "#111111",
        green: {
          100: "#5aac44",
          200: "#61bd4f"
        },
        gray: {
          100: "#ebecf0", 
          200: "#f4f5f7", 
          300: "#838c91",
          400: "#919191",
          500: "#616161",
          600: "#313131"
        },
        darkblue: {
          200: "#091e42"
        }
      }
    },
  },
  plugins: [],
}
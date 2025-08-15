/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'xl:container': "1920px"
    },
    extend: {
      fontFamily: {
        helvetica: ['"Helvetica Black"', 'sans-serif'],
      },

      colors: {
        grayColor100: "#424243",
        grayColor200: "#7b7778",
        black: "#000000",
        white: "#ffffff",
        textColor: "#414142",
        hoverBlue: "#ecf5f8",
        linkColor: "#275ba9",
        cardTextColor: "#020817",
        lightBlue: "#acd9ea",
        darkBlue: "#2559a9",
        darkOrange: "#f05624",
        yellow: "#ffcc00",
        lightGray: "#f6f6f6",
        muted: "#f1f5f9"
      }
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        xl: '1400px', // Set custom container width for xl
      },
    },
    plugins: [],
  }
}
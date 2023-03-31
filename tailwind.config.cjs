/** @type {import("tailwindcss").Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Figtree", "sans-serif"],
      },
      colors: {
        danger: "#d14f4f",
        success: "#03b54a",
        warning: "#f1c40f",
        "primary": "#2472fc",
        "title-color": "#444444",
        "desc-color": "#848484",
        "success-bg": "#EBFBF6",
        "error-bg": "#FDEDEE",
        "warning-bg": "#FFF9E9",

        dark: {
          100: "#E6E6E6", //Border or Background color
          200: "#E8EAED",
          300: "#BDC1C6",
          400: "#80868B",
          500: "#5F6368",
          600: "#2E3134",
          700: "#282A2D",
          800: "#17181B",
          900: "#0E1013",
        },
        theme: {
          DEFAULT: "#2472fc", //Default theme color
          100: "#219EBC",
          200: "#219EBC",
          300: "#219EBC",
          400: "#219EBC",
          500: "#219EBC",
          600: "#219EBC",
          700: "#219EBC",
          800: "#219EBC",
          900: "#219EBC",
        },
      },
      fontWeight: {
        normal: 400,
        medium: 500,
        semiBold: 600,
        bold: 700,
      },
      boxShadow: {
        light: "0px 0px 29px rgba(0, 0, 0, 0.09)",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
    screens: {
      xxs: "370px",
      xs: "480px",
      sm: "576px",
      md: "767px",
      lg: "992px",
      xlg: "1024px",
      xl: "1200px",
      xxl: "1440px",
      "3xl": "1536px",
      "4xl": "1600px",
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ addBase, theme, addComponents }) {
      addBase({
        h1: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.3xl"),
          lineHeight: theme("leading.normal"),
        },
        h2: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.2xl"),
          lineHeight: theme("leading.normal"),
        },
        h3: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.xl"),
          lineHeight: theme("leading.normal"),
        },
        h4: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.lg"),
          lineHeight: theme("leading.normal"),
        },
        h5: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.md"),
          lineHeight: theme("leading.normal"),
        },
        h6: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.medium"),
          fontSize: theme("fontSize.sm"),
          lineHeight: theme("leading.normal"),
        },
        p: {
          fontFamily: theme("fontFamily.sans"),
          fontWeight: theme("fontWeight.normal"),
          fontSize: theme("fontSize.sm"),
        },
      });
      addComponents({
        ".container": {
          maxWidth: "100%",
        },
      });
    }),
  ],
};
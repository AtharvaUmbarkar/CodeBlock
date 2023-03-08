/** @type {import('tailwindcss').Config} */

const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  corePlugins: {
    preflight: false,
 },
  prefix: "tw-",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        navbar: "calc(100vh - 100%)",
      },
      colors: {
        black: "#051923",
        white: "#ffffff",
        primary: "#0582ca",
        secondary: "#006494",
        "secondary-dark": "#004f7e",
        "secondary-darker": "#003554",
        accent: "#009dee",
        "accent-dark": "#0095e1",
        "accent-op-200": "rgba(0, 157, 238, 0.2)",

        "primary-main": "#203783",
        "primary-light": "#3053C5",
        "primary-dark": "#2845A4",
        "primary-darker": "#182963",

        "secondary-main": "#00BCF5",
        "secondary-light": "#1FCBFF",
        "secondary-dark": "#009CCC",

        "gray-main": "#C9CFCF",
        "gray-light": "#DFE2E2",
        "gray-dark": "#B3BCBC",

        "white-main": "#F5F5F5",
        "white-light": "#FFFFFF",
        "white-dark": "#EBEBEB",

        "black-main": "#191716",
        "black-light": "#2B2826",
        "black-dark": "#0B0A0A",

        "code-pink": "#de6289",
        "code-green": "#9fcb49",
        "code-blue": "#5cafb9",
        "code-yellow": "#dbd77c",

        "blue-50-op-700": "rgba(239, 246, 255, 0.7)",
        "blue-100-op-500": "rgba(219, 234, 254, 0.5)",
        "blue-500-op-500": "rgba(59, 130, 246, 0.5)",
        "blue-500-op-900": "rgba(59, 130, 246, 0.9)",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

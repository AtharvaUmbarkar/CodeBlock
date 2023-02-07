/** @type {import('tailwindcss').Config} */

const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/daisyui/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        navbar: 'calc(100vh - 100%)',
      },
      colors: {
        'code-pink': '#de6289',
        'code-green': '#9fcb49',
        'code-blue': '#5cafb9',
        'code-yellow': '#dbd77c',

        "blue-50-op-700": 'rgba(239, 246, 255, 0.7)',
        "blue-100-op-500": 'rgba(219, 234, 254, 0.5)',
        "blue-500-op-500": 'rgba(59, 130, 246, 0.5)'
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", ...fontFamily.sans],
        montserrat: ["var(--font-montserrat)", ...fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: false,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
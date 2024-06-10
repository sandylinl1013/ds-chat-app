/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        'hbp-1': '#e7e6ec',
        'hbp-2': '#b4b1c2',
        'hbp-3': 'a3a0b9',
        'bp-1': '#faf9ff',
        'bp-2': '#c6c1e3',
        'bp-3': '#8177bb',
        'bp-4': '#584e90'
      }
    },
  },
  plugins: [],
}


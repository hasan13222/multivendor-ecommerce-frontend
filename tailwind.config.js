import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#622ce0',
        secondary: '#ed848a',
        bgColor: '#f2eefc',
        accentColor: '#e6a356',
        txtColor: '#060311'
      }
    },
  },
  plugins: [daisyui,],
}
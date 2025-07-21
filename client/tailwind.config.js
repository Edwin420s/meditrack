/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lexend', '"Noto Sans"', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#4fdf1f',
          dark: '#3fb11a',
        },
        secondary: '#eaf3e8',
        background: '#f9fbf8',
        border: '#d6e6d1',
        text: {
          primary: '#111b0e',
          secondary: '#629550',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

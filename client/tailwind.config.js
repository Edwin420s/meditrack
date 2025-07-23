// tailwind.config.js
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
          DEFAULT: '#4CAF50',
          dark: '#388E3C',
          light: '#C8E6C9',
        },
        secondary: {
          DEFAULT: '#8BC34A',
          dark: '#689F38',
        },
        background: '#F1F8E9',
        border: '#C5E1A5',
        text: {
          primary: '#1B5E20',
          secondary: '#33691E',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

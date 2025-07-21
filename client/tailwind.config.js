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
          DEFAULT: '#4CAF50',   // Green primary color
          dark: '#388E3C',      // Darker green
          light: '#C8E6C9',     // Light green
        },
        secondary: {
          DEFAULT: '#8BC34A',   // Light green secondary
          dark: '#689F38',      // Darker variant
        },
        background: '#F1F8E9',  // Very light green background
        border: '#C5E1A5',      // Soft green border
        text: {
          primary: '#1B5E20',   // Dark green text
          secondary: '#33691E', // Slightly lighter green
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};

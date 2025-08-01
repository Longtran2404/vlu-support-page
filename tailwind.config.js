/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C8102E',      // Van Lang đỏ
        secondary: '#0A2240',    // Navy
        accent: '#00A896',       // Xanh lá điểm nhấn
        'bg-light': '#F9FAFB',   // nền sáng
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
};

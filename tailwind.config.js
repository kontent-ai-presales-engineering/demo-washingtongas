/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        manufacturing: {
          light: '#d1dded',
          DEFAULT: '#1C59A8',
          dark: '#0b2343',
        },
        kontentai: '#3dcca8',
        elitebuild: '#0078d2',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

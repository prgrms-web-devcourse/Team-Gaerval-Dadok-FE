/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/stories/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lineseed: ['var(--font-lineseed)'],
      },
    },
  },
  plugins: [],
};

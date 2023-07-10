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
    fontSize: {
      '2xs': '1.0rem',
      xs: '1.2rem',
      sm: '1.4rem',
      md: '1.6rem',
      lg: '1.8rem',
      xl: '2.0rem',
      '2xl': '2.2rem',
    },
    fontFamily: {
      lineseed: ['var(--font-lineseed)'],
    },
  },
  plugins: [],
};

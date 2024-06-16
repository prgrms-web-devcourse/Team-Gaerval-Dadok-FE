/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/stories/**/*.{ts,tsx}',
    './src/v1/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    './src/v1/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        desktop: '430px',
      },
      fontSize: {
        '2xs': '1.0rem',
        xs: '1.2rem',
        sm: '1.4rem',
        md: '1.6rem',
        lg: '1.8rem',
        xl: '2.0rem',
        '2xl': '2.2rem',
      },
      fontWeight: {
        thin: 100,
        normal: 400,
        bold: 700,
      },
      colors: {
        main: {
          300: '#F5F4EE',
          400: '#FAF0DD',
          500: '#FFDEB6',
          600: '#FFD480', // use with opacity 18%
          700: '#FFC073',
          800: '#F6AD55',
          900: '#FFA436',
          brighter: '#FF8B00',
        },
        success: {
          500: '#F2FDF5',
          800: '#8FDEA3',
          900: '#70B681',
        },
        warning: {
          500: '#FCF2F2',
          600: '#FFA0A0',
          700: '#FF8282',
          800: '#F56565',
          900: '#FF0000',
        },
        kakao: {
          DEFAULT: '#FEE102',
          dark: '#191600',
        },
        black: {
          100: '#F4F4F4',
          200: '#E9E9E9',
          300: '#ECECEC',
          400: '#D9D9D9',
          500: '#8D8D8D',
          600: '#4A4A4A',
          700: '#2D2D2D', // MainText Color
          800: '#191600',
          900: '#000000',
          DEFAULT: '#000000',
        },
        white: '#FFFFFF',
        background: '#FCFCFC',
        shadow: '#CFCFCF',
        placeholder: '#AFAFAF', // ( = description)
        overlay: '#494949', // use with opacity 60%
      },
      fontFamily: {
        lineseed: ['var(--font-lineseed)'],
      },
      boxShadow: {
        bookcover:
          '0px 0px 2px rgba(0, 0, 0, 0.2), 2px 2px 6px rgba(0, 0, 0, 0.1)',
        bookcard: '0px 0px 7px 0px rgba(207, 207, 207, 0.5)',
        'bottom-navigation': 'rgba(0, 0, 0, 0.05) 0px 0px 10px 1px',
        'floating-button':
          '0px 0px 2px rgba(0, 0, 0, 0.2), 2px 2px 6px rgba(0, 0, 0, 0.1)',
        'bookgroup-card': '0 0 6px rgba(180,180,180,0.25)',
      },
      keyframes: {
        'opacity-show': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'slide-in': {
          from: { transform: 'translateY(300%)' },
          to: { transform: 'translateY(0%)' },
        },
        'slide-out': {
          from: { transform: 'translateY(0%)' },
          to: { transform: 'translateY(300%)' },
        },
        'slide-init': {
          from: { transform: 'translateY(300%)' },
          to: { transform: 'translateY(300%)' },
        },
        'dot-flash': {
          '0%,33%,100%': {
            opacity: 0.2,
            transform: 'translateY(5px)',
          },
          '16%': {
            opacity: 1,
            transform: 'translateY(0px)',
          },
        },
      },
      animation: {
        'page-transition': 'opacity-show 0.2s forwards ease-in-out',
        'slide-in': '0.3s forwards slide-in ease-in-out',
        'slide-out': '0.3s forwards slide-out ease-in-out',
        'slide-init': '0.3s forwards slide-init ease-in-out',
        'dot-flash': '2s infinite dot-flash linear',
        'dot-flash-delay-0.5': '2s 0.5s infinite dot-flash linear',
        'dot-flash-delay-1': '2s 1s infinite dot-flash linear',
        'stepper-transition': 'opacity-show 0.2s 0.1s forwards',
      },
      content: {
        search: 'url("/icons/search.svg")',
        check: 'url("/icons/check.svg")',
      },
    },
  },
  plugins: [
    ({ addUtilities }) => {
      addUtilities({
        '.font-heading-bold': {
          fontSize: '2.1rem',
          lineHeight: '1.5',
          fontWeight: 700,
        },
        '.font-heading-regular': {
          fontSize: '2.1rem',
          lineHeight: '1.5',
          fontWeight: 400,
        },
        '.font-subheading-bold': {
          fontSize: '1.8rem',
          lineHeight: '1.5',
          fontWeight: 700,
        },
        '.font-subheading-regular': {
          fontSize: '1.8rem',
          lineHeight: '1.5',
          fontWeight: 400,
        },
        '.font-body1-bold': {
          fontSize: '1.6rem',
          lineHeight: '2.1rem',
          fontWeight: 700,
        },
        '.font-body1-regular': {
          fontSize: '1.6rem',
          lineHeight: '2.1rem',
          fontWeight: 400,
        },
        '.font-body2-bold': {
          fontSize: '1.4rem',
          lineHeight: '1.9rem',
          fontWeight: 700,
        },
        '.font-body2-regular': {
          fontSize: '1.4rem',
          lineHeight: '1.9rem',
          fontWeight: 400,
        },
        '.font-caption1-bold': {
          fontSize: '1.2rem',
          lineHeight: '1.6rem',
          fontWeight: 700,
        },
        '.font-caption1-regular': {
          fontSize: '1.2rem',
          lineHeight: '1.6rem',
          fontWeight: 400,
        },
        '.font-caption2-bold': {
          fontSize: '1.1rem',
          lineHeight: '1.3rem',
          fontWeight: 700,
        },
        '.font-caption2-regular': {
          fontSize: '1.1rem',
          lineHeight: '1.3rem',
          fontWeight: 400,
        },
      });
    },
  ],
};

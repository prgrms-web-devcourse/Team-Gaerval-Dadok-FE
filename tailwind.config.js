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
          400: '#F5F4EE',
          500: '#FAF0DD',
          600: '#FFD480', // use with opacity 18%
          700: '#FFC073',
          800: '#F6AD55',
          900: '#FFA436',
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
        kakao: '#FEE102',
        kakaotext: '#191600',
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
        },
        orange: {
          100: '#F5F4EE',
        },
        white: '#FFFFFF',
        background: '#FCFCFC',
        cancel: '#CFCFCF',
        shadow: '#CECECE',
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
        searchResultItem: '0px 0px 6px 1px rgba(114, 114, 114, 0.10);',
      },
      keyframes: {
        'page-transition': {
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
        'page-transition': 'page-transition 0.2s forwards ease-in-out',
        'slide-in': '0.3s forwards slide-in ease-in-out',
        'slide-out': '0.3s forwards slide-out ease-in-out',
        'slide-init': '0.3s forwards slide-init ease-in-out',
        'dot-flash': '2s infinite dot-flash linear',
        'dot-flash-delay-0.5': '2s 0.5s infinite dot-flash linear',
        'dot-flash-delay-1': '2s 1s infinite dot-flash linear',
      },
    },
  },
  plugins: [],
};

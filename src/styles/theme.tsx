'use client';

import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const fontSizes = {
  xs: '1.2rem',
  sm: '1.4rem',
  md: '1.6rem',
  lg: '1.8rem',
  xl: '2rem',
  '2xl': '2.2rem',
};

const colors = {
  main: '#F6AD55', // Main Theme
  red: {
    800: '#F56565', // button (NoticeTheme)
    900: '#FF0000', // validation (NoticeTheme)
  },
  black: {
    400: '#C1C0C0', // subHeader (Slider)
    500: '#AFAFAF', // placeHolder (BookSearch)
    600: '#ACACAC', // placeHolder (MeetingEdit)
    700: '#727272', // subHeader (MeetingDetail)
    800: '#3D3D3D', // meetingPeriod (MeetingDetail)
    900: '#000000', // black
  },
  white: {
    400: '#CFCFCF', // placeHolder (MyPage)
    500: '#D9D9D9', // addBook (MeetingCreate)
    600: '#E3E3E3', // bookBorder (Bookaive)
    700: '#E2E8F0', // inputBorder (Common)
    800: '#FAFAFA', // backGround
    900: '#FFFFFF', // white
  },
  kakao: {
    brown: '#191600',
    yellow: '#fee102',
  },
};

interface SchemeTypings {
  component: 'button';
  colorScheme: 'orange' | 'kakao' | 'orange-fill';
  cssProps: {
    color: string;
    backgroundColor: string;
    border: string;
  };
}

const scheme: Record<
  SchemeTypings['component'],
  Record<SchemeTypings['colorScheme'], Partial<SchemeTypings['cssProps']>>
> = {
  button: {
    orange: {
      color: colors.main,
      border: `${colors.main} 0.1rem solid`,
    },
    'orange-fill': {
      color: colors.white[900],
      backgroundColor: colors.main,
    },
    kakao: {
      color: colors.kakao.brown,
      backgroundColor: colors.kakao.yellow,
    },
  },
};

const shadows = {
  default: '0px 0px 7px -5px #000000', // BoxShadow (MeetingList Box)
};

const theme: ThemeOverride = extendTheme({
  fontSizes,
  colors,
  scheme,
  fonts: {
    heading: `'LineSeed', sans-serif`,
    body: `'LineSeed', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        fontSize: '62.5%',
        bg: 'white.800',
        maxWidth: '43rem',
        margin: '0 auto',
      },
    },
  },
  shadows,
});

export default theme;

export type Scheme = typeof scheme;

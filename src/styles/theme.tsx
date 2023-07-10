import {
  ChakraStyledOptions,
  extendTheme,
  ThemeOverride,
} from '@chakra-ui/react';

const fontSizes = {
  xs: '1.2rem',
  sm: '1.4rem',
  md: '1.6rem',
  lg: '1.8rem',
  xl: '2rem',
  '2xl': '2.2rem',
} as const;

const buttonSizes = {
  md: {
    padding: '1.3rem 1rem',
    height: '3.5rem',
  },
  lg: {
    padding: '2.5rem 1.8rem',
    height: '4.5rem',
  },
} as const;

const colors = {
  main: '#F6AD55', // Main Theme
  red: {
    800: '#F56565', // button (NoticeTheme)
    900: '#FF0000', // validation (NoticeTheme)
  },
  yellow: {
    200: '#FFD4802E',
    900: '#FFA436',
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
} as const;

interface SchemeTypings {
  component: 'button';
  colorScheme: 'orange' | 'kakao' | 'orange-fill' | 'grey' | 'grey-fill';
  cssProps: ChakraStyledOptions;
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
      _hover: {
        opacity: 0.8,
      },
    },
    grey: {
      color: colors.black[900],
      border: `${colors.white[400]} 0.1rem solid`,
      backgroundColor: colors.white[900],
      _hover: {
        color: colors.black['800'],
        backgroundColor: colors.white[400],
      },
    },
    'grey-fill': {
      color: colors.black[600],
      backgroundColor: colors.white[400],
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
  buttonSizes,
  colors,
  scheme,
  styles: {
    global: {
      'html, body': {
        fontSize: '62.5%',
        bg: '#FCFCFC',
        maxWidth: '43rem',
        margin: '0 auto',
      },
      'input[type="date"]': {
        position: 'relative',
      },
      'input[type="date"]::-webkit-inner-spin-button, input[type="date"]::-webkit-calendar-picker-indicator':
        {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          background: 'transparent',
          color: 'transparent',
          cursor: 'pointer',
        },
    },
  },
  shadows,
});

export default theme;

export type ChakraTheme = typeof theme;

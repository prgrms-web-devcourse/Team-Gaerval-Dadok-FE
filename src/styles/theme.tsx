'use client';

import { extendTheme, ThemeOverride } from '@chakra-ui/react';

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
};

const theme: ThemeOverride = extendTheme({
  colors,
  styles: {
    global: {
      'html, body': {
        fontSize: '62.5%',
        bg: 'white.800',
        overflowY: 'scroll',
        maxWidth: '76.8rem',
        margin: '0 auto',
      },
    },
  },
});

export default theme;

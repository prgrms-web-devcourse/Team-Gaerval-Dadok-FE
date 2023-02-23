'use client';

import theme from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { NextPage } from 'next/types';

interface PropTypes {
  children: React.ReactNode;
}

const ChakraThemeProvider: NextPage<PropTypes> = ({ children }) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraThemeProvider;

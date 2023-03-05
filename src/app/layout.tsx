'use client';

import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvier from '@/components/ReactQueryProvider';
import { RecoilRoot } from 'recoil';
import { Box } from '@chakra-ui/react';

import BottomNavigation from '@/ui/BottomNavigation';
import { LineSeed } from '@/styles/font';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <head />
      <body className={LineSeed.className}>
        <RecoilRoot>
          <ReactQueryProvier>
            <ChakraThemeProvider>
              <Box mb="9rem">{children}</Box>
              <BottomNavigation />
            </ChakraThemeProvider>
          </ReactQueryProvier>
        </RecoilRoot>
      </body>
    </html>
  );
}

'use client';

import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvier from '@/components/ReactQueryProvider';
import BottomNavigation from '@/ui/BottomNavigation';
import { LineSeed } from '@/styles/font';
import { Box } from '@chakra-ui/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <head />
      <body className={LineSeed.className}>
        <ReactQueryProvier>
          <ChakraThemeProvider>
            <Box mb="9rem">{children}</Box>
            <BottomNavigation />
          </ChakraThemeProvider>
        </ReactQueryProvier>
      </body>
    </html>
  );
}

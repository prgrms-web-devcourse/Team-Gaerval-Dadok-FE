import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import { LineSeed } from '@/styles/font';
import BottomNavigation from '@/ui/BottomNavigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <head />
      <body className={LineSeed.className}>
        <ChakraThemeProvider>
          {children}
          <BottomNavigation />
        </ChakraThemeProvider>
      </body>
    </html>
  );
}

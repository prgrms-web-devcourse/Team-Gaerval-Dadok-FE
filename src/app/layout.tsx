import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvier from '@/components/ReactQueryProvider';
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
        <ReactQueryProvier>
          <ChakraThemeProvider>
            {children}
            <BottomNavigation />
          </ChakraThemeProvider>
        </ReactQueryProvier>
      </body>
    </html>
  );
}

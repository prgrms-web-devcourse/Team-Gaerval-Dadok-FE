import ChakraThemeProvider from '@/components/ChakraThemeProvider';
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
        <ChakraThemeProvider>{children}</ChakraThemeProvider>
      </body>
    </html>
  );
}

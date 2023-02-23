import ChakraThemeProvider from '@/components/ChakraThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko-KR">
      <head />
      <body>
        <ChakraThemeProvider>{children}</ChakraThemeProvider>
      </body>
    </html>
  );
}

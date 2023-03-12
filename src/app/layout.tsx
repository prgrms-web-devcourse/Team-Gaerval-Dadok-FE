'use client';

import { RecoilRoot } from 'recoil';

import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvier from '@/components/ReactQueryProvider';
import Layout from '@/ui/common/Layout';
import { LineSeed } from '@/styles/font';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './_error';

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
              <ErrorBoundary fallbackRender={ErrorPage}>
                <Layout>{children}</Layout>
              </ErrorBoundary>
            </ChakraThemeProvider>
          </ReactQueryProvier>
        </RecoilRoot>
      </body>
    </html>
  );
}

'use client';

import { RecoilRoot } from 'recoil';
import { LineSeed } from '@/styles/font';
import Layout from '@/ui/common/Layout';
import { Global } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './error';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <head>
        <title>다독다독</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Global styles={LineSeed.className} />
        <RecoilRoot>
          <ReactQueryProvider>
            <ChakraThemeProvider>
              <ErrorBoundary fallbackRender={ErrorPage}>
                <Layout>{children}</Layout>
              </ErrorBoundary>
            </ChakraThemeProvider>
          </ReactQueryProvider>
        </RecoilRoot>
      </body>
    </html>
  );
};

export default RootLayout;

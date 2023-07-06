'use client';

import { RecoilRoot } from 'recoil';
import { LineSeed } from '@/styles/font';
import Layout from '@/ui/common/Layout';
import { Global } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { PropsWithChildren } from 'react';
import ErrorPage from '@/app/error';

const ContextProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
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
    </>
  );
};

export default ContextProvider;

'use client';

import { RecoilRoot } from 'recoil';
import Layout from '@/ui/common/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ReactNode } from 'react';
import ErrorPage from '@/app/error';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
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

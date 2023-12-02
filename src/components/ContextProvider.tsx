'use client';

import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import { ReactNode } from 'react';
import ErrorPage from '@/app/error';
import ToastProvider from '@/ui/Base/Toast/ToastProvider';
import Layout from '@/v1/layout/Layout';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <RecoilRoot>
        <ReactQueryProvider>
          <ChakraThemeProvider>
            <ErrorBoundary fallbackRender={ErrorPage}>
              <ToastProvider>
                <Layout>{children}</Layout>
              </ToastProvider>
            </ErrorBoundary>
          </ChakraThemeProvider>
        </ReactQueryProvider>
      </RecoilRoot>
    </>
  );
};

export default ContextProvider;

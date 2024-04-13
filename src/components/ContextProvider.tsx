'use client';

import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { RecoilRoot } from 'recoil';

import ErrorPage from '@/app/error';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import ToastProvider from '@/v1/base/Toast/ToastProvider';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <ReactQueryProvider>
        <ChakraThemeProvider>
          <ErrorBoundary fallbackRender={ErrorPage}>
            <ToastProvider>{children}</ToastProvider>
          </ErrorBoundary>
        </ChakraThemeProvider>
      </ReactQueryProvider>
    </RecoilRoot>
  );
};

export default ContextProvider;

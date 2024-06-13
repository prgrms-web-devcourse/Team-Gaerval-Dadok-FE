'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import PWAServiceWorkerProvider from './PWAServiceWorkerProvider';
import ChakraThemeProvider from './ChakraThemeProvider';
import ReactQueryProvider from './ReactQueryProvider';

import ToastProvider from '@/v1/base/Toast/ToastProvider';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PWAServiceWorkerProvider>
      <RecoilRoot>
        <ReactQueryProvider>
          <ChakraThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ChakraThemeProvider>
        </ReactQueryProvider>
      </RecoilRoot>
    </PWAServiceWorkerProvider>
  );
};

export default ContextProvider;

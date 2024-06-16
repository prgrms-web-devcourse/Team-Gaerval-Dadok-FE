'use client';

import { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import PWAServiceWorkerProvider from '@/components/PWAServiceWorkerProvider';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';

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

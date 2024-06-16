'use client';

import { ReactNode } from 'react';

import PWAServiceWorkerProvider from '@/v1/base/PWAServiceWorkerProvider';
import ReactQueryProvider from '@/v1/base/ReactQueryProvider';

import ToastProvider from '@/v1/base/Toast/ToastProvider';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PWAServiceWorkerProvider>
      <ReactQueryProvider>
        <ToastProvider>{children}</ToastProvider>
      </ReactQueryProvider>
    </PWAServiceWorkerProvider>
  );
};

export default ContextProvider;

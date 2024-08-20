'use client';

import { ReactNode } from 'react';

import PWAServiceWorkerProvider from '@/components/PWAServiceWorkerProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';

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

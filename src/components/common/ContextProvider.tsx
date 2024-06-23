'use client';

import { ReactNode } from 'react';

import PWAServiceWorkerProvider from '@/components/common/PWAServiceWorkerProvider';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';

import ToastProvider from '@/components/common/Toast/ToastProvider';

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

'use client';

import { ReactNode, Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';

import ErrorPage from '@/app/error';
import ReactQueryProvider from '@/components/ReactQueryProvider';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import Layout from '@/ui/common/Layout';
import Loading from '@/ui/Base/Loading';
import ToastProvider from '@/ui/Base/Toast/ToastProvider';

const ContextProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <RecoilRoot>
        <ReactQueryProvider>
          <ChakraThemeProvider>
            <ErrorBoundary fallbackRender={ErrorPage}>
              <ToastProvider>
                <Suspense fallback={<Loading fullpage />}>
                  <Layout>{children}</Layout>
                </Suspense>
              </ToastProvider>
            </ErrorBoundary>
          </ChakraThemeProvider>
        </ReactQueryProvider>
      </RecoilRoot>
    </>
  );
};

export default ContextProvider;

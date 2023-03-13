import { RecoilRoot } from 'recoil';

import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import Layout from '@/ui/common/Layout';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './error';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Global } from '@emotion/react';
import { LineSeed } from '@/styles/font';

const App = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: 0,
      },
    },
  });
  return (
    <>
      <Head>
        <title>다독다독</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={LineSeed.className} />
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <ChakraThemeProvider>
            <ErrorBoundary fallbackRender={ErrorPage}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </ChakraThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default App;

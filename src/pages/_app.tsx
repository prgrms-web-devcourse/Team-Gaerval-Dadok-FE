import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { LineSeed } from '@/styles/font';
import Layout from '@/ui/common/Layout';
import { Global } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './error';
import ChakraThemeProvider from '@/components/ChakraThemeProvider';
import ReactQueryProvider from '@/components/ReactQueryProvider';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>다독다독</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={LineSeed.className} />
      <RecoilRoot>
        <ReactQueryProvider>
          <ChakraThemeProvider>
            <ErrorBoundary fallbackRender={ErrorPage}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ErrorBoundary>
          </ChakraThemeProvider>
        </ReactQueryProvider>
      </RecoilRoot>
    </>
  );
};

export default App;

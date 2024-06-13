import type { Metadata } from 'next';

import { appleSplashScreens } from '@/constants/metadata';

import ContextProvider from '@/components/ContextProvider';
import AuthFailedErrorBoundary from '@/components/AuthFailedErrorBoundary';
import Layout from '@/v1/layout/Layout';

import { LineSeedKR } from '@/styles/font';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_HOST}`),
  title: {
    template: '%s | 다독다독',
    default: '다독다독',
  },
  description: '책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼',
  themeColor: '#FFA436',
  keywords: [
    '다독다독',
    'dadok',
    'dadokdadok',
    '책장',
    '책추천',
    '도서검색',
    '독서모임',
    '책',
    '독서',
  ],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  verification: {
    google: '72kN3MWyQHuvSb8V67dVkfPUPMrw102Tm6BsvTvfKmg',
    other: {
      'naver-site-verification': '9046af5eda448309a92e2e923a45cb874df986a0',
    },
  },
  icons: [
    { rel: 'apple-touch-icon', url: 'favicon.ico' },
    { rel: 'icon', url: 'favicon.ico' },
  ],
  appleWebApp: {
    title: '다독다독',
    statusBarStyle: 'black-translucent',
    startupImage: appleSplashScreens,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1"
          name="viewport"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      {/* @todo Chakra 제거시 app-layout 프로퍼티 제거. */}
      <body className={`${LineSeedKR.variable} app-layout font-lineseed`}>
        <Layout>
          <ContextProvider>
            <AuthFailedErrorBoundary>{children}</AuthFailedErrorBoundary>
          </ContextProvider>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;

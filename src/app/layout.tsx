import type { Metadata } from 'next';

import { appleSplashScreens } from '@/constants/metadata';

import ContextProvider from '@/components/common/ContextProvider';
import AuthFailedErrorBoundary from '@/components/common/AuthFailedErrorBoundary';
import Layout from '@/components/layout/Layout';

import { LineSeedKR } from '@/styles/font';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_HOST}`),
  title: {
    template: '%s | 다독다독',
    default: '다독다독',
  },
  description: '책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼',
  themeColor: '#FFFFFF',
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
    { rel: 'apple-touch-icon', url: '/images/icon-192x192.png' },
    { rel: 'icon', url: '/favicon.ico' },
  ],
  appleWebApp: {
    title: '다독다독',
    startupImage: appleSplashScreens,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
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

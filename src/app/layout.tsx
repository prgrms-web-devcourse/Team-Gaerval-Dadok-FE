import type { Metadata } from 'next';

import { appleSplashScreens } from '@/constants/metadata';

import GoogleAnalytics from '@/components/common/GoogleAnalytics';
import AuthFailedErrorBoundary from '@/components/common/AuthFailedErrorBoundary';
import PWAServiceWorkerProvider from '@/components/common/PWAServiceWorkerProvider';
import ReactQueryProvider from '@/components/common/ReactQueryProvider';
import ToastProvider from '@/components/common/Toast/ToastProvider';
import NavigationSchemaScript from '@/components/common/NavigationSchemaScript';
import Layout from '@/components/layout/Layout';

import { LineSeedKR } from '@/styles/font';
import '@/styles/global.css';

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_DEPLOYMENT_URL}`),
  title: {
    template: '%s | 다독다독',
    default: '다독다독',
  },
  description: '책에 대한 인사이트를 공유하고 소통하는 독서 소셜 플랫폼',
  themeColor: '#FFFFFF',
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  verification: {
    google: 'a9BQOn0FrycbbErhMCQ8RDJK0v9BBdJxFjAoJ84BWhY',
    other: {
      'naver-site-verification': 'd838b57100508b70db53a7d15014627456c5ac28',
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
        <GoogleAnalytics />
        <PWAServiceWorkerProvider>
          <ToastProvider>
            <ReactQueryProvider>
              <AuthFailedErrorBoundary>
                <Layout>{children}</Layout>
              </AuthFailedErrorBoundary>
            </ReactQueryProvider>
          </ToastProvider>
        </PWAServiceWorkerProvider>
        <NavigationSchemaScript />
      </body>
    </html>
  );
};

export default RootLayout;

import ContextProvider from '@/components/ContextProvider';
import { ReactNode } from 'react';

import '@/styles/global.css';
import { LineSeedKR } from '@/styles/font';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ko">
      <head>
        <title>다독다독</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ContextProvider>
          <main className={`${LineSeedKR.variable} font-lineseed`}>
            {children}
          </main>
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;

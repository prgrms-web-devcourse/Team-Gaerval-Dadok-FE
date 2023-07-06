import ContextProvider from '@/components/ContextProvider';
import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html>
      <head>
        <title>다독다독</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;

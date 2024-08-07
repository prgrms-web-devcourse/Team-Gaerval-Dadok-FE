'use client';

import AuthRefreshIgnoredError from '@/types/customError/AuthRefreshIgnoredError';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next/types';
import { useState } from 'react';

interface PropTypes {
  children: React.ReactNode;
}

const ReactQueryProvider: NextPage<PropTypes> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (_count, error) => {
              if (error instanceof AuthRefreshIgnoredError) {
                return true;
              }

              return false;
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;

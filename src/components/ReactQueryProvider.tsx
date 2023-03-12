import { ReactNode } from 'react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryProvier = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
        retry: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        {children}
      </Hydrate>
    </QueryClientProvider>
  );
};

export default ReactQueryProvier;

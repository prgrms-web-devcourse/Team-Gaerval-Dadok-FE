import React from 'react';
import { rest } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Preview } from '@storybook/react';

import Layout from '../src/v1/layout/Layout';
import ToastProvider from '../src/v1/base/Toast/ToastProvider';

import '@/styles/global.css';

const nextApi = (path: string) =>
  new URL(path, process.env.NEXT_HOST).toString();

const serviceApi = (path: string) =>
  new URL(path, process.env.NEXT_PUBLIC_API_URL).toString();

initialize({}, [
  rest.get(nextApi('/service-api/*'), async (req, res, ctx) => {
    const [_, path] = req.url.pathname.split('/service-api');

    const originResponse = await ctx.fetch(serviceApi(`/api${path}`));
    const originResponseData = await originResponse.json();

    return res(ctx.json({ ...originResponseData }));
  }),
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    layout: 'fullscreen',
  },
  loaders: [mswLoader],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Layout>
            <Story />
          </Layout>
        </ToastProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;

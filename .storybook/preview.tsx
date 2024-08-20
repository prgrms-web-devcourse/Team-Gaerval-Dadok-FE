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
    const { pathname } = req.url;
    const match = /\/service-api(?<path>.*)/g.exec(pathname);

    if (!match || !match.groups || !match.groups.path) {
      return res(ctx.status(404, 'Invalid Request URL'));
    }

    const { path } = match.groups;
    const originResponse = await ctx.fetch(serviceApi(`/api${path}`));
    const originResponseData = await originResponse.json();

    return res(ctx.json({ ...originResponseData }));
  }),
  rest.get(
    nextApi('/aladin-api?QueryType=Bestseller&Cover=Big'),
    async (req, res, ctx) => {
      return res(
        ctx.json({
          item: [
            {
              isbn: '9791162242742',
              title: '리팩터링',
              author: '마틴 파울러',
              cover:
                'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20231207165435',
              bestRank: 1,
              link: 'https://search.daum.net/search?w=bookpage&bookId=5326912&q=%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81',
            },
          ],
        })
      );
    }
  ),
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

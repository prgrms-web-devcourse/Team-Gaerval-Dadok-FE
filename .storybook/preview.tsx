import React from 'react';
import { rest } from 'msw';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Preview } from '@storybook/react';

import ToastProvider from '../src/components/common/Toast/ToastProvider';

import '@/styles/global.css';

const nextApi = (path: string) =>
  new URL(path, process.env.NEXT_HOST).toString();

const serviceApi = (path: string) =>
  new URL(path, process.env.NEXT_PUBLIC_API_URL).toString();

initialize({}, [
  rest.get(nextApi('/service-api/*'), async (req, res, ctx) => {
    const { pathname, search } = req.url;
    const match = /\/service-api(?<path>.*)/g.exec(pathname);

    if (!match || !match.groups || !match.groups.path) {
      return res(ctx.status(404, 'Invalid Request URL'));
    }

    const { path } = match.groups;
    const originResponse = await ctx.fetch(serviceApi(`/api${path}${search}`));
    const originResponseData = await originResponse.json();

    return res(ctx.json({ ...originResponseData }));
  }),
  rest.post(nextApi('/service-api/*'), async (req, res, ctx) => {
    const { pathname, search } = req.url;
    const match = /\/service-api(?<path>.*)/g.exec(pathname);

    if (!match || !match.groups || !match.groups.path) {
      return res(ctx.status(404, 'Invalid Request URL'));
    }

    const { path } = match.groups;

    const { headers, mode } = req;
    const data = await req.json();
    const body = JSON.stringify(data);
    const originRequest = {
      method: 'POST',
      body,
      headers,
      mode,
    };

    const originResponse = await ctx.fetch(
      serviceApi(`/api${path}${search}`),
      originRequest
    );
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
      refetchOnWindowFocus: false,
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
  },
  loaders: [mswLoader],
  decorators: [
    Story => (
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </QueryClientProvider>
    ),
  ],
};

export default preview;

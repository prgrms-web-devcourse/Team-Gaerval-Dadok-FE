import React from 'react';

import type { Preview } from '@storybook/react';
import '@/styles/global.css';

import Layout from '../src/v1/layout/Layout';
import ToastProvider from '../src/v1/base/Toast/ToastProvider';

import ReactQueryProvider from '../src/components/ReactQueryProvider';

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
  decorators: [
    Story => (
      <ReactQueryProvider>
        <ToastProvider>
          <Layout>
            <Story />
          </Layout>
        </ToastProvider>
      </ReactQueryProvider>
    ),
  ],
};

export default preview;

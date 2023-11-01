import React from 'react';

import type { Preview } from '@storybook/react';
import '@/styles/global.css';

import ToastProvider from '../src/ui/Base/Toast/ToastProvider';

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
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default preview;

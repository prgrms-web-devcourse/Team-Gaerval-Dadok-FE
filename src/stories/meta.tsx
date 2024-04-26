import { Meta } from '@storybook/react';
import Layout from '@/v1/layout/Layout';

export const appLayoutMeta: Meta = {
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div className="m-auto max-w-[43rem] bg-white">
        <Layout>
          <Story />
        </Layout>
      </div>
    ),
  ],
};

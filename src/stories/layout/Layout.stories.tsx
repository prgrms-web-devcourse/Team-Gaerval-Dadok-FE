import Layout from '@/v1/layout/Layout';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Layout> = {
  title: 'layout/Layout',
  component: Layout,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Layout>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/bookarchive',
      },
    },
  },
  render: () => {
    return <Layout>{'hello'}</Layout>;
  },
};

export const NotOnRootPath: Story = {
  render: () => {
    return <Layout>{'hello'}</Layout>;
  },
};

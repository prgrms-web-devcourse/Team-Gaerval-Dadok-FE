import { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/components/common/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Common/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {},
};

export const WithSrc: Story = {
  args: { src: '/icons/logo.svg', name: 'dadok', size: 'large' },
};

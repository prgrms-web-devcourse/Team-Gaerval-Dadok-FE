import { Meta, StoryObj } from '@storybook/react';

import Avatar from '@/ui/Base/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Base/Avatar',
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

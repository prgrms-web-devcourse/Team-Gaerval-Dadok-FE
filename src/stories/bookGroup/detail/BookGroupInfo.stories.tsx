import { Meta, StoryObj } from '@storybook/react';

import BookGroupInfo from '@/v1/bookGroup/detail/BookGroupInfo';

const meta: Meta<typeof BookGroupInfo> = {
  title: 'bookgroup/detail/BookGroupInfo',
  component: BookGroupInfo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookGroupInfo>;

export const Default: Story = {
  args: {
    groupId: 1,
  },
};

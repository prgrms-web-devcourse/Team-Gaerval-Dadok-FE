import BookGroupStatus from '@/v1/bookGroup/BookGroupStatus';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BookGroupStatus> = {
  title: 'bookgroup/BookGroupStatus',
  component: BookGroupStatus,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookGroupStatus>;

export const Default: Story = {
  args: {
    start: '2023-12-31',
    end: '2024-01-08',
  },
};

import { Meta, StoryObj } from '@storybook/react';
import BookInfo from '@/components/book/detail/BookInfo';

const meta: Meta<typeof BookInfo> = {
  title: 'book/detail/BookInfo',
  component: BookInfo,
};

export default meta;

type Story = StoryObj<typeof BookInfo>;

export const Default: Story = {
  args: { bookId: 22 },
};

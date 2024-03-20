import { Meta, StoryObj } from '@storybook/react';
import BookInfoCard from '@/v1/bookGroup/BookInfoCard';

const meta: Meta<typeof BookInfoCard> = {
  title: 'bookGroup/BookInfoCard',
  component: BookInfoCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookInfoCard>;

export const Default: Story = {
  args: { bookId: 23 },
};

export const Removable: Story = {
  args: { bookId: 23, removable: true },
};

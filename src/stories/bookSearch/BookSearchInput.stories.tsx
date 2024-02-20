import { Meta, StoryObj } from '@storybook/react';
import BookSearchInput from '@/v1/bookSearch/BookSearchInput';

const meta: Meta<typeof BookSearchInput> = {
  title: 'bookSearch/BookSearchInput',
  component: BookSearchInput,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookSearchInput>;

export const Default: Story = {
  args: {
    value: '',
  },
};

import { Meta, StoryObj } from '@storybook/react';
import BestSellers from '@/components/bookSearch/BestSellers';

const meta: Meta<typeof BestSellers> = {
  title: 'bookSearch/BestSellers',
  component: BestSellers,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BestSellers>;

export const Default: Story = {};

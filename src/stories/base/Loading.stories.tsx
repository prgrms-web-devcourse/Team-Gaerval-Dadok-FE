import { Meta, StoryObj } from '@storybook/react';
import Loading from '@/v1/base/Loading';

const meta: Meta<typeof Loading> = {
  title: 'Base/Loading',
  component: Loading,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};

export const Main: Story = {
  args: { color: 'main' },
};

export const Grey: Story = {
  args: { color: 'grey' },
};

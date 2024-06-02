import { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '@/v1/base/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Base/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 30 },
};

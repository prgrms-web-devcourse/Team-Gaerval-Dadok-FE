import { Meta, StoryObj } from '@storybook/react';
import ProgressBar from '@/components/common/ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Common/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 30 },
};

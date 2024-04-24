import { SetUpDetailStep } from '@/v1/bookGroup/create/funnel';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SetUpDetailStep> = {
  title: 'bookGroup/funnel/SetUpDetailStep',
  component: SetUpDetailStep,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SetUpDetailStep>;

export const Default: Story = {
  args: {},
};

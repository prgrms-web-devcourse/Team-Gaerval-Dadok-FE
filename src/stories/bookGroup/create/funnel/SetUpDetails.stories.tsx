import { SetUpDetails } from '@/v1/bookGroup/create/funnel';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SetUpDetails> = {
  title: 'bookGroup/funnel/SetUpDetails',
  component: SetUpDetails,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SetUpDetails>;

export const Default: Story = {
  args: {},
};

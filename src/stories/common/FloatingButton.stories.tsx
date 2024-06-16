import { Meta, StoryObj } from '@storybook/react';
import FloatingButton from '@/components/common/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Common/FloatingButton',
  component: FloatingButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FloatingButton>;

export const Default: Story = {
  args: {
    position: 'bottom-right',
  },
  render: args => <FloatingButton {...args} />,
};

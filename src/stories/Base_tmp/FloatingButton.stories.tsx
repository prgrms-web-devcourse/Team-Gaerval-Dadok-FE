import { Meta, StoryObj } from '@storybook/react';
import FloatingButton from '@/v1/base/FloatingButton';

const meta: Meta<typeof FloatingButton> = {
  title: 'Base/FloatingButton',
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

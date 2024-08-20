import { Meta, StoryObj } from '@storybook/react';
import Stepper from '@/v1/base/Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Base/Stepper',
  component: Stepper,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: { activeIndex: 0 },

  render: args => (
    <Stepper {...args}>
      <Stepper.Step />
      <Stepper.Step />
      <Stepper.Step />
    </Stepper>
  ),
};

import { Meta, StoryObj } from '@storybook/react';
import MySwitch from './Switch';

const meta: Meta<typeof MySwitch> = {
  title: 'Example/MySwitch',
  component: MySwitch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MySwitch>;

export const Primary: Story = {
  args: {},
};

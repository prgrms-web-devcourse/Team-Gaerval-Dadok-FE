import { Meta, StoryObj } from '@storybook/react';
import Select from '@/ui/Base/Select';

const meta: Meta<typeof Select> = {
  title: 'Base/Select',
  component: Select,
  tags: ['autodocs'],
};

const numbers = [1, 2, 3, 4, 5] as const;

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    placeholder: '입력해 주세요.',
  },
  render: args => (
    <Select {...args}>
      {numbers.map(number => (
        <Select.Option key={number} value={number}>
          {number}
        </Select.Option>
      ))}
    </Select>
  ),
};

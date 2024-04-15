import { Meta, StoryObj } from '@storybook/react';
import Textarea from '@/v1/base/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Base/Textarea',
  component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: { placeholder: '어떤 이야기를 모임에서 나누면 좋을까요?' },
};

import LikeButton from '@/v1/base/LikeButton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LikeButton> = {
  title: 'Base/LikeButton',
  component: LikeButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LikeButton>;

export const Default: Story = {
  args: {
    isLiked: false,
    likeCount: 10,
  },
};

export const IsLiked: Story = {
  args: {
    isLiked: true,
    likeCount: 999,
  },
};

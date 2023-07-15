import { Meta, StoryObj } from '@storybook/react';
import TopNavigation from '@/ui/Base/TopNavigation';

const meta: Meta<typeof TopNavigation> = {
  title: 'Base/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const TitleCenter: Story = {
  args: {
    titleAlign: 'center',
    title: '리팩터링 2판',
    isOwner: false,
  },
};

export const TitleLeft: Story = {
  args: {
    titleAlign: 'left',
    title: '프롱이 리팩터링 스터디',
    isOwner: true,
  },
};

import { Meta, StoryObj } from '@storybook/react';
import TopNavigation from '@/ui/Base/TopNavigation';

const meta: Meta<typeof TopNavigation> = {
  title: 'Example/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Primary: Story = {
  args: {
    titleAlign: 'center',
    backgroundColor: 'bg-background',
    backButton: true,
    title: '리팩터링 2판',
    isOwner: false,
  },
};

export const Secondary: Story = {
  args: {
    titleAlign: 'left',
    backgroundColor: 'bg-white',
    backButton: true,
    title: '프롱이 리팩터링 스터디',
    isOwner: true,
  },
};

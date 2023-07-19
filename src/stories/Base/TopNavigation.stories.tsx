import { Meta, StoryObj } from '@storybook/react';
import TopNavigation from '@/ui/Base/TopNavigation';
import { IconPost, IconShare } from '@public/icons';

const meta: Meta<typeof TopNavigation> = {
  title: 'Base/TopNavigation',
  component: TopNavigation,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  args: {
    title: 'Refactoring 2nd(리팩터링 2판)',
  },
  render: args => <TopNavigation {...args} />,
};

export const BookshelfPage: Story = {
  args: {
    titleAlign: 'center',
    children: <IconShare />,
  },
  render: args => <TopNavigation {...args} />,
};

export const GroupPage: Story = {
  args: {
    titleAlign: 'left',
    title: '프롱이 리팩터링 스터디',
    isOwner: true,
    children: <IconPost />,
  },
  render: args => <TopNavigation {...args} />,
};

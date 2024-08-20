import { Meta, StoryObj } from '@storybook/react';

import BottomNavigation from '@/ui/Base/BottomNavigation';

const meta: Meta<typeof BottomNavigation> = {
  title: 'Base/BottomNavigation',
  component: BottomNavigation,
  tags: ['autodocs'],
  parameters: {
    docs: {
      story: {
        inline: false,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: { pathname: '/bookarchive' },
  render: args => <BottomNavigation {...args} />,
};

export const Search: Story = {
  args: { pathname: '/book/search' },
  render: args => <BottomNavigation {...args} />,
};

export const Group: Story = {
  args: { pathname: '/group' },
  render: args => <BottomNavigation {...args} />,
};

export const Profile: Story = {
  args: { pathname: '/profile/me' },
  render: args => <BottomNavigation {...args} />,
};

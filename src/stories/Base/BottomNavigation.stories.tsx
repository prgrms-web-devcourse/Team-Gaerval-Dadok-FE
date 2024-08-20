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
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/bookarchive',
      },
    },
  },
  render: () => {
    return <BottomNavigation />;
  },
};

export const Search: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/book/search',
      },
    },
  },
  render: () => {
    return <BottomNavigation />;
  },
};

export const Group: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/group',
      },
    },
  },
  render: () => {
    return <BottomNavigation />;
  },
};

export const Profile: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/profile/me',
      },
    },
  },
  render: () => {
    return <BottomNavigation />;
  },
};

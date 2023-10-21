import EditMyProfilePage from '@/v1/profile/EditMyProfilePage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof EditMyProfilePage> = {
  title: 'profile/EditMyProfilePage',
  component: EditMyProfilePage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EditMyProfilePage>;

export const Default: Story = {
  args: {},
  render: () => <EditMyProfilePage />,
};

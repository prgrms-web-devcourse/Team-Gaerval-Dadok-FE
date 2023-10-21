import CreateMyProfilePage from '@/v1/profile/CreateMyProfilePage';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CreateMyProfilePage> = {
  title: 'profile/CreateMyProfilePage',
  component: CreateMyProfilePage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CreateMyProfilePage>;

export const Default: Story = {
  args: {},
  render: () => <CreateMyProfilePage />,
};

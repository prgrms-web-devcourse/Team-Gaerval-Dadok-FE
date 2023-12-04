import { Meta, StoryObj } from '@storybook/react';
import { IconHamburger } from '@public/icons';
import TopHeader from '@/v1/base/TopHeader';

const meta: Meta<typeof TopHeader> = {
  title: 'Base/TopHeader',
  component: TopHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  args: { pathname: '/bookarchive' },
  render: args => <TopHeader {...args} />,
};

export const WithMenu: Story = {
  args: { pathname: '/profile/me' },
  render: args => (
    <TopHeader {...args}>
      <button
        onClick={() => {
          alert('HAMBURGUR MENU!🍔');
        }}
      >
        <IconHamburger width={20} height={20} alt="햄버거메뉴" />
      </button>
    </TopHeader>
  ),
};

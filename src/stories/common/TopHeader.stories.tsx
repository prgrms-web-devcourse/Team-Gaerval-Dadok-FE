import { Meta, StoryObj } from '@storybook/react';
import { IconHamburger } from '@public/icons';
import TopHeader from '@/components/common/TopHeader';

const meta: Meta<typeof TopHeader> = {
  title: 'Common/TopHeader',
  component: TopHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopHeader>;

export const Default: Story = {
  render: () => (
    <TopHeader>
      <h1 className="text-main-900 font-heading-bold">BookArchive</h1>
    </TopHeader>
  ),
};

export const WithChildren: Story = {
  args: {
    className: 'flex items-center justify-between',
  },
  render: args => (
    <main className="w-full max-w-[43rem] bg-black-300">
      <TopHeader {...args}>
        <h1 className="text-main-900 font-heading-bold">Profile</h1>
        <button
          onClick={() => {
            alert('HAMBURGUR MENU!🍔');
          }}
        >
          <IconHamburger width={20} height={20} alt="햄버거메뉴" />
        </button>
      </TopHeader>
    </main>
  ),
};

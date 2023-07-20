import { Meta, StoryObj } from '@storybook/react';
import { IconMore } from '@public/icons';
import TopHeader from '@/ui/Base/TopHeader';

const meta: Meta<typeof TopHeader> = {
  title: 'Base/TopHeader',
  component: TopHeader,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TopHeader>;

const TopHeaderWithMenu = () => {
  return (
    <TopHeader label="Profile">
      <button
        onClick={() => {
          alert('HAMBURGUR MENU!🍔');
        }}
      >
        <IconMore width={25} height={25} alt="햄버거메뉴" />
      </button>
    </TopHeader>
  );
};

export const Default: Story = {
  args: { label: 'BookArchive' },
};

export const Menu: Story = {
  render: () => <TopHeaderWithMenu />,
};

import { Meta, StoryObj } from '@storybook/react';
import Image from 'next/image';

import TopHeader from '@/ui/Base/TopHeader';
import more from '/public/icons/more.svg';

const meta: Meta<typeof TopHeader> = {
  title: 'Example/TopHeader',
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
        <Image src={more} width={25} height={25} alt="대체" />
      </button>
    </TopHeader>
  );
};

export const Primary: Story = {
  args: { label: 'BookArchive' },
};

export const Menu: Story = {
  render: () => <TopHeaderWithMenu />,
};

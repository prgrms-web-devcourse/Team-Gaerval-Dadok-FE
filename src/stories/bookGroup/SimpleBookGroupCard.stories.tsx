import { Meta, StoryObj } from '@storybook/react';
import SimpleBookGroupCard from '@/v1/bookGroup/SimpleBookGroupCard';

const meta: Meta<typeof SimpleBookGroupCard> = {
  title: 'BookGroup/SimpleBookGroupCard',
  component: SimpleBookGroupCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SimpleBookGroupCard>;

const handleClick = () => {
  alert('모임 상세 페이지로 이동');
};

export const Default: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: false,
    onClick: handleClick,
  },
};

export const OwnerCase: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: true,
    onClick: handleClick,
  },
};

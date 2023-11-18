import { Meta, StoryObj } from '@storybook/react';
import SimpleBookGroupCard from '@/v1/bookGroup/SimpleBookGroupCard';

const meta: Meta<typeof SimpleBookGroupCard> = {
  title: 'BookGroup/SimpleBookGroupCard',
  component: SimpleBookGroupCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SimpleBookGroupCard>;

export const Default: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: false,
    bookGroupId: 1,
  },
};

export const OwnerCase: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: true,
    bookGroupId: 1,
  },
};

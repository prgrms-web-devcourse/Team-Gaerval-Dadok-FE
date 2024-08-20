import { Meta, StoryObj } from '@storybook/react';
import SimpleGroup from '@/v1/bookgroup/SimpleGroup';

const meta: Meta<typeof SimpleGroup> = {
  title: 'BookGroup/SimpleGroup',
  component: SimpleGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SimpleGroup>;

const moveGroupDetail = () => {
  alert('모임 상세 페이지로 이동');
};

export const Default: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: false,
    handleClick: moveGroupDetail,
  },
};

export const OwnerCase: Story = {
  args: {
    title: '데일카네기 인간관계론',
    imageSource: 'https://image.yes24.com/goods/79297023/XL',
    isOwner: true,
    handleClick: moveGroupDetail,
  },
};

import Badge from '@/v1/base/Badge';
import { IconHeart } from '@public/icons';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Badge> = {
  title: 'Base/Badge',
  component: Badge,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    size: 'small',
    colorScheme: 'main-light',
    fontWeight: 'bold',
  },
  render: args => <Badge {...args}>프론트엔드 개발자</Badge>,
};

export const BookshelfLike: Story = {
  args: {
    size: 'small',
    colorScheme: 'red',
    fontWeight: 'bold',
  },
  render: args => (
    <Badge {...args}>
      <div className="h-[1.3rem] w-[1.3rem] fill-white">
        <IconHeart />
      </div>
      99
    </Badge>
  ),
};

export const GroupProgress: Story = {
  args: {
    size: 'large',
    colorScheme: 'main',
    fontWeight: 'bold',
  },
  render: args => <Badge {...args}>진행중</Badge>,
};

export const GroupDisclosure: Story = {
  args: {
    size: 'medium',
    colorScheme: 'grey',
    fontWeight: 'normal',
  },
  render: args => <Badge {...args}>공개</Badge>,
};

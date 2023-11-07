import { Meta, StoryObj } from '@storybook/react';

import MemberItem from '@/ui/bookgroup/detail/MemberItem';

const meta: Meta<typeof MemberItem> = {
  title: 'bookgroup/detail/MemberItem',
  component: MemberItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof MemberItem>;

export const Default: Story = {
  args: {
    profileImageSrc: 'https://bit.ly/dan-abramov',
    name: '댄',
    job: { group: '개발', name: '프론트엔드 개발자' },
    isOwner: true,
  },
};

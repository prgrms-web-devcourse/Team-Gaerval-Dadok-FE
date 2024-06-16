import { Meta, StoryObj } from '@storybook/react';

import ShortMemberInfo from '@/components/bookGroup/detail/ShortMemberInfo';

const meta: Meta<typeof ShortMemberInfo> = {
  title: 'bookgroup/detail/ShortMemberInfo',
  component: ShortMemberInfo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ShortMemberInfo>;

export const Default: Story = {
  args: {
    members: [
      {
        id: 1,
        profileImageSrc: 'https://bit.ly/dan-abramov',
        name: '댄',
        job: { group: '개발', name: '프론트엔드 개발자' },
        isOwner: true,
      },
      {
        id: 2,
        profileImageSrc: 'https://bit.ly/kent-c-dodds',
        name: '콜라',
        job: { group: '개발', name: '백엔드 개발자' },
        isOwner: false,
      },
      {
        id: 3,
        profileImageSrc: 'https://bit.ly/code-beast',
        name: 'Code Beast',
        job: { group: '디자인', name: 'UI/UX 디자이너' },
        isOwner: false,
      },
      {
        id: 4,
        profileImageSrc: 'https://bit.ly/ryan-florence',
        name: 'Ryan',
        job: { group: '개발', name: '유니티 개발자' },
        isOwner: false,
      },
    ],
  },
};

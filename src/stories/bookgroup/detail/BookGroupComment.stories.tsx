import { Meta, StoryObj } from '@storybook/react';

import BookGroupComment from '@/ui/bookgroup/detail/BookGroupCommentList';

const meta: Meta<typeof BookGroupComment> = {
  title: 'bookgroup/detail/BookGroupComment',
  component: BookGroupComment,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookGroupComment>;

export const Default: Story = {
  args: {
    comments: [
      {
        id: 1,
        writer: { id: 10, name: '소피아', profileImageSrc: '/icons/logo.svg' },
        createdAt: '2023.10.22',
        content: '프론트엔드 개발자라면 꼭 읽어봐야 할 책이라고 생각해요.',
      },
      {
        id: 2,
        writer: { id: 21, name: '다독이', profileImageSrc: '' },
        createdAt: '2023.10.18',
        content: '이 책 덕분에 프로젝트 리팩터링에 도전할 수 있었어요.',
      },
    ],
  },
};

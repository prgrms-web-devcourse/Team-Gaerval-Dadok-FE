import { Meta, StoryObj } from '@storybook/react';

import BookGroupInfo from '@/ui/bookgroup/detail/BookGroupInfo';

const meta: Meta<typeof BookGroupInfo> = {
  title: 'bookgroup/BookGroupInfo',
  component: BookGroupInfo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookGroupInfo>;

export const Default: Story = {
  args: {
    title: '프롱이 리팩터링 스터디',
    description:
      '제 1차 프롱이 기수연합 독서 스터디 입니다. 마틴 파울러의 저서 ‘리팩터링 2판’과 함께 진행합니다.',
    book: {
      title: '리팩터링 2판',
      author: '마틴 파울러',
      bookImageSrc: 'https://image.yes24.com/goods/89649360/XL',
    },
    date: {
      start: '2023-10-31',
      end: '2023-11-27',
    },
    memberCount: {
      current: 3,
      max: 20,
    },
    owner: {
      isMe: true,
      name: '소피아',
      profileImageSrc: '/icons/logo.svg',
    },
    isPublic: false,
  },
};

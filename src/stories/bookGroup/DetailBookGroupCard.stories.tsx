import { Meta, StoryObj } from '@storybook/react';

import DetailBookGroupCard from '@/components/bookGroup/DetailBookGroupCard';

const meta: Meta<typeof DetailBookGroupCard> = {
  title: 'bookgroup/DetailBookGroupCard',
  component: DetailBookGroupCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DetailBookGroupCard>;

export const Default: Story = {
  args: {
    title: '프롱이 리팩터링 스터디',
    description:
      '제1차 프롱이 기수연합 독서 스터디 입니다. 마틴 파울러의 저서 ‘리팩터링 2판’과 함께 진행합니다.',
    bookImageSrc: 'https://image.yes24.com/goods/89649360/XL',
    date: {
      start: '2023-10-31',
      end: '2023-11-27',
    },
    memberCount: 3,
    owner: {
      id: 3,
      name: '소피아',
      profileImageSrc: '',
    },
    isPublic: false,
    commentCount: 12,
    bookGroupId: 1,
  },
};

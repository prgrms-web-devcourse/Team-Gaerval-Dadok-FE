import { Meta, StoryObj } from '@storybook/react';

import DetailMyGroup from '@/v1/bookgroup/DetailMyGroup';

const meta: Meta<typeof DetailMyGroup> = {
  title: 'bookgroup/DetailMyGroup',
  component: DetailMyGroup,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DetailMyGroup>;

export const Default: Story = {
  args: {
    title: '프롱이 리팩터링 스터디',
    description:
      '제1차 프롱이 기수연합 독서 스터디 입니다. 마틴 파울러의 저서 ‘리팩터링 2판’과 함께 진행합니다.',
    book: {
      title: '리팩터링 2판',
      bookImageSrc: 'https://image.yes24.com/goods/89649360/XL',
    },
    date: {
      start: '2023-10-31',
      end: '2023-11-27',
    },
    memberCount: 3,
    owner: {
      name: '소피아',
      profileImageSrc: '',
    },
    isPublic: false,
    commentCount: 12,
    handleClick: () => {
      alert('모임 상세 페이지로 이동');
    },
  },
};

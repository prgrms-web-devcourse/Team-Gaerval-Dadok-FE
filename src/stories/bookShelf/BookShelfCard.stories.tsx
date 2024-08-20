import BookShelfCard from '@/components/bookShelf/BookShelfCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof BookShelfCard> = {
  title: 'bookShelf/BookShelf',
  component: BookShelfCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookShelfCard>;

// TODO: 스토리북에서 이미지를 불러올 때 발생하는 CORS 이슈 해결
export const Default: Story = {
  args: {
    bookshelfId: 9,
    bookshelfName: '백민종님의 책장',
    books: [
      {
        bookId: 3,
        title: '리액트를 다루는 기술',
        imageUrl: '/images/book-cover/book1.jpeg',
      },
      {
        bookId: 11,
        title: '모던 자바스크립트 Deep Dive',
        imageUrl: '/images/book-cover/book2.jpeg',
      },
      {
        bookId: 22,
        title: '이펙티브 타입스크립트',
        imageUrl: '/images/book-cover/book3.jpeg',
      },
      {
        bookId: 23,
        title: '리팩터링 2판',
        imageUrl: '/images/book-cover/book4.jpeg',
      },
    ],
    likeCount: 3,
  },
};

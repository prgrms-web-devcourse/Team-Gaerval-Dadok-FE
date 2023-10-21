import Bookshelf from '@/ui/Bookshelf';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Bookshelf> = {
  title: 'Bookshelf/Bookshelf',
  component: Bookshelf,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Bookshelf>;

// TODO: 스토리북에서 이미지를 불러올 때 발생하는 CORS 이슈 해결
export const Default: Story = {
  args: {
    bookshelfId: 9,
    bookshelfName: '백민종님의 책장',
    books: [
      {
        bookId: 3,
        title: 'L2 원급비교(as-as)',
        imageUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F4809492%3Ftimestamp%3D20190302213625',
      },
      {
        bookId: 11,
        title: '슬램덩크 리소스(THE FIRST SLAM DUNK re:SOURCE)',
        imageUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6269015%3Ftimestamp%3D20230307155520',
      },
      {
        bookId: 22,
        title: '리팩터링',
        imageUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20230430144257',
      },
      {
        bookId: 23,
        title: '쏙쏙 들어오는 함수형 코딩',
        imageUrl:
          'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F6052931%3Ftimestamp%3D20230629180034',
      },
    ],
    likeCount: 3,
  },
};

import { Meta, StoryObj } from '@storybook/react';
import type { APISearchedBook } from '@/types/book';
import BookSearchList from '@/v1/bookSearch/BookSearchList';

const meta: Meta<typeof BookSearchList> = {
  title: 'bookSearch/BookSearchList',
  component: BookSearchList,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof BookSearchList>;

const SEARCHED_BOOK: APISearchedBook = {
  title: '리팩터링',
  author: '마틴 파울러',
  isbn: '9791162242742',
  contents:
    '지난 20년간 전 세계 프로그래머에게 리팩터링의 교본이었던 이 책의 1판은, 기존 코드의 디자인을 개선하고 소프트웨어 유지 관리 능력을 향상시켰으며 기존 코드를 이해하기 쉽게 만드는 데 도움을 주었습니다. 간절히 기다려온 이번 개정판에는 프로그래밍 환경의 중요한 변화가 대거 반영되었습니다.  새로운 리팩터링 카탈로그를 자바스크립트 코드로 제시합니다. 리팩터링 원칙부터 클래스 없이 리팩터링하는 방법과 데이터 조직화, 조건부 로직 간소화 방법을 다룹니다. 또한',
  url: 'https://search.daum.net/search?w=bookpage&bookId=5326912&q=%EB%A6%AC%ED%8C%A9%ED%84%B0%EB%A7%81',
  imageUrl:
    'https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F5326912%3Ftimestamp%3D20231207165435',
  publisher: '한빛미디어',
  apiProvider: 'KAKAO',
};

export const Default: Story = {
  args: {
    books: [SEARCHED_BOOK, SEARCHED_BOOK, SEARCHED_BOOK, SEARCHED_BOOK],
  },
};

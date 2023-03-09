'use client';

import { RecommendedBooks, RecommendedBookshelf } from '@/ui/Recommended';
import { Flex, VStack } from '@chakra-ui/react';

export default function BookArchive() {
  /**
   * TODO
   * 로그인 했는지 안했는지 구분하기
   * API 연결하기
   */

  return (
    <VStack as="main" width="100%" spacing="2rem">
      <Flex direction="column" width="100%" gap="3rem">
        <RecommendedBookshelf
          bookshelfId={RECOMMEND_BOOKSHELF[0].bookshelfId}
          bookshelfName={RECOMMEND_BOOKSHELF[0].bookshelfName}
          books={RECOMMEND_BOOKSHELF[0].books}
        />
        <RecommendedBookshelf
          bookshelfId={RECOMMEND_BOOKSHELF[1].bookshelfId}
          bookshelfName={RECOMMEND_BOOKSHELF[1].bookshelfName}
          books={RECOMMEND_BOOKSHELF[1].books}
        />
      </Flex>

      <RecommendedBooks
        jobGroup={RECOMMEND_BOOKS.jobGroupKoreanName}
        books={RECOMMEND_BOOKS.books}
      />

      <Flex direction="column" width="100%" gap="3rem">
        <RecommendedBookshelf
          bookshelfId={RECOMMEND_BOOKSHELF[1].bookshelfId}
          bookshelfName={RECOMMEND_BOOKSHELF[0].bookshelfName}
          books={RECOMMEND_BOOKSHELF[0].books}
        />
        <RecommendedBookshelf
          bookshelfId={RECOMMEND_BOOKSHELF[1].bookshelfId}
          bookshelfName={RECOMMEND_BOOKSHELF[1].bookshelfName}
          books={RECOMMEND_BOOKSHELF[1].books}
        />
      </Flex>
    </VStack>
  );
}

const RECOMMEND_BOOKS = {
  isFirst: true,
  isLast: true,
  hasNext: false,
  count: 4,
  isEmpty: false,
  jobGroup: 'DEVELOPMENT',
  jobGroupKoreanName: '개발',
  books: [
    {
      bookId: 1,
      imageUrl:
        'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      title: 'jpa',
      author: '김영한',
      isbn: '123456789',
      publisher: '영진',
      url: 'http://이미지링크4.com',
      jobGroup: '개발',
      jobName: '백엔드 개발자',
      count: 10,
    },
    {
      bookId: 2,
      imageUrl:
        'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      title: '리액트',
      author: '김민준',
      isbn: '123456789',
      publisher: '영진',
      url: 'http://이미지링크4.com',
      jobGroup: '개발',
      jobName: '프론트 개발자',
      count: 10,
    },
    {
      bookId: 3,
      imageUrl:
        'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      title: '리팩터링',
      author: '마틴 파울러',
      isbn: '123456789',
      publisher: '영진',
      url: 'http://이미지링크4.com',
      jobGroup: '개발',
      jobName: '프론트 개발자',
      count: 10,
    },
    {
      bookId: 99,
      imageUrl:
        'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      title: '스프링부트',
      author: '이동욱',
      isbn: '123456789',
      publisher: '영풍',
      url: 'http://이미지링크5.com',
      jobGroup: '개발',
      jobName: '백엔드 개발자',
      count: 8,
    },
  ],
};

const RECOMMEND_BOOKSHELF = [
  {
    bookshelfId: 13,
    bookshelfName: '규란님의 책장',
    books: [
      {
        bookId: 1,
        title: '해리포터1',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 2,
        title: '해리포터2',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 3,
        title: '해리포터1',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 4,
        title: '해리포터2',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
    ],
  },
  {
    bookshelfId: 23,
    bookshelfName: '영지님의 책장',
    books: [
      {
        bookId: 1,
        title: '해리포터1',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 2,
        title: '해리포터2',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 3,
        title: '해리포터1',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
      {
        bookId: 4,
        title: '해리포터2',
        imageUrl:
          'https://www.producttalk.org/wp-content/uploads/2018/06/www.maxpixel.net-Ears-Zoo-Hippopotamus-Eye-Animal-World-Hippo-2878867.jpg',
      },
    ],
  },
];

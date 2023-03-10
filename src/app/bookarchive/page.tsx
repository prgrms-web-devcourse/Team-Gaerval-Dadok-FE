'use client';

import { useAuth } from '@/hooks/auth';
import { BookArchiveForUnAuth } from '@/ui/BookArchive';
import { RecommendedBooks, RecommendedBookshelf } from '@/ui/Recommended';
import { Flex, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function BookArchive() {
  const { isAuthed } = useAuth();

  const [isLogined, setIsLogined] = useState<boolean>(false);

  useEffect(() => {
    setIsLogined(isAuthed);
  }, [isAuthed]);

  return (
    <VStack as="main" width="100%" spacing="2rem">
      {isLogined ? (
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
          <RecommendedBooks
            jobGroup={RECOMMEND_BOOKS.jobGroupKoreanName}
            books={RECOMMEND_BOOKS.books}
          />
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
      ) : (
        <BookArchiveForUnAuth />
      )}
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
      imageUrl: 'https://image.yes24.com/goods/92742567/m',
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
        'https://image.aladin.co.kr/product/20481/95/cover200/k662635453_1.jpg',
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
        'https://image.aladin.co.kr/product/29234/92/coveroff/k682837293_1.jpg',
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
      bookId: 4,
      imageUrl:
        'https://image.aladin.co.kr/product/23618/61/cover200/k932638523_1.jpg',
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
      bookId: 5,
      imageUrl:
        'https://image.aladin.co.kr/product/21856/89/cover200/8965402603_2.jpg',
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
      bookId: 6,
      imageUrl:
        'https://image.aladin.co.kr/product/20481/95/cover200/k662635453_1.jpg',
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
      bookId: 7,
      imageUrl:
        'https://image.aladin.co.kr/product/23618/61/cover200/k932638523_1.jpg',
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
        'https://image.aladin.co.kr/product/29234/92/coveroff/k682837293_1.jpg',
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
          'https://image.aladin.co.kr/product/21856/89/cover200/8965402603_2.jpg',
      },
      {
        bookId: 2,
        title: '해리포터2',
        imageUrl:
          'https://image.aladin.co.kr/product/29234/92/coveroff/k682837293_1.jpg',
      },
      {
        bookId: 3,
        title: '해리포터1',
        imageUrl:
          'https://image.aladin.co.kr/product/23618/61/cover200/k932638523_1.jpg',
      },
      {
        bookId: 4,
        title: '해리포터2',
        imageUrl:
          'https://image.aladin.co.kr/product/20481/95/cover200/k662635453_1.jpg',
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
          'https://image.aladin.co.kr/product/20481/95/cover200/k662635453_1.jpg',
      },
      {
        bookId: 2,
        title: '해리포터2',
        imageUrl: 'https://image.yes24.com/goods/92742567/m',
      },
      {
        bookId: 3,
        title: '해리포터1',
        imageUrl:
          'https://image.aladin.co.kr/product/29234/92/coveroff/k682837293_1.jpg',
      },
      {
        bookId: 4,
        title: '해리포터2',
        imageUrl:
          'https://image.aladin.co.kr/product/23618/61/cover200/k932638523_1.jpg',
      },
    ],
  },
];

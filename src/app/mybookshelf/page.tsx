'use client';

import { USERS_BOOKSHELF_BOOKLIST } from '@/pages/api/dummyBooks';
import { APISummaryBook } from '@/types/book';
import { APIBookshelfBookList } from '@/types/bookshelf';
import TopNavigation from '@/ui/common/TopNavigation';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import { VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const BOOKSHELF_BOOK_LIMIT = 4;

export default function MyBookShelf() {
  // TODO: 이후 bookshelfBookList로 response값 받기.
  const [bookshelfBookList, setBookshelfBookList] =
    useState<APIBookshelfBookList>(USERS_BOOKSHELF_BOOKLIST);
  const [slicedBookLists, setSlicedBookLists] = useState<APISummaryBook[][]>([
    [],
  ]);

  const sliceBookList = (bookshelfBookList: APIBookshelfBookList) => {
    const slicedList = [];

    for (let i = 0; i < bookshelfBookList.count; i += BOOKSHELF_BOOK_LIMIT) {
      slicedList.push(
        bookshelfBookList.books.slice(i, i + BOOKSHELF_BOOK_LIMIT)
      );
    }

    return slicedList;
  };

  useEffect(() => {
    setBookshelfBookList(USERS_BOOKSHELF_BOOKLIST);
  }, []);
  useEffect(() => {
    setSlicedBookLists(sliceBookList(bookshelfBookList));
  }, [bookshelfBookList]);

  return (
    <VStack
      width="100%"
      height="100%"
      maxWidth="43rem"
      padding="2rem 2rem 9rem 2rem"
    >
      <TopNavigation pageTitle="내 책장" />
      <VStack width="100%" spacing="2rem>">
        {slicedBookLists.map((bookList, idx) => (
          <InteractiveBookShelf key={idx} bookList={bookList} />
        ))}
      </VStack>
    </VStack>
  );
}

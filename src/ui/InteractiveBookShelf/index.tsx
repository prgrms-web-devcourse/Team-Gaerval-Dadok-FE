'use client';

import { APISummaryBook } from '@/types/book';
import InteractiveBook from '@/ui//InteractiveBook';
import { Flex, useTheme } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type BookListTypes = {
  bookList: APISummaryBook[];
};

const InteractiveBookShelf = ({ bookList }: BookListTypes) => {
  const theme = useTheme();

  const [books, setBooks] = useState<APISummaryBook[]>(bookList);

  useEffect(() => {
    setBooks(bookList);
  }, [bookList]);

  return (
    <Flex
      width="100%"
      height="13.2rem"
      maxWidth="39.8rem"
      padding="0 1.6rem"
      border={`0.07rem solid ${theme.colors.white[600]}`}
      shadow="md"
      marginTop="0.8rem"
      gap="24%"
      justifyContent="flex-start"
    >
      {books.map((book: APISummaryBook, idx: number) => (
        // TODO: 이후에 key값 bookID로 바꿀 것
        // <InteractiveBook key={book.bookId} src={book.imageUrl} />
        <InteractiveBook key={idx} src={book.imageUrl} />
      ))}
    </Flex>
  );
};

export default InteractiveBookShelf;

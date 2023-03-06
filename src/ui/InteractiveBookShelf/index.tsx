'use client';

import { APIDefaultBook } from '@/types/book';
import { APIBookshelfBookList } from '@/types/bookshelf';
import InteractiveBook from '@/ui//InteractiveBook';
import { Flex, useTheme } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

const BOOKSHELF_BOOK_LIMIT = 4;

const InteractiveBookShelf = ({
  books,
}: {
  books: APIBookshelfBookList['books'] | APIDefaultBook[];
}) => {
  const theme = useTheme();

  const [slicedBooks, setSlicedBooks] = useState<APIDefaultBook[][]>([[]]);

  const sliceBooks = useCallback(() => {
    const response = [];

    for (let i = 0; i < books.length; i += BOOKSHELF_BOOK_LIMIT) {
      response.push(books.slice(i, i + BOOKSHELF_BOOK_LIMIT));
    }

    return response;
  }, [books]);

  useEffect(() => {
    setSlicedBooks(sliceBooks());
  }, [sliceBooks]);

  return (
    <>
      {slicedBooks.map((books, idx) => (
        <Flex
          key={idx}
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
          {books.map(book => (
            <InteractiveBook key={book.bookId} imageUrl={book.imageUrl} />
          ))}
        </Flex>
      ))}
    </>
  );
};

export default InteractiveBookShelf;

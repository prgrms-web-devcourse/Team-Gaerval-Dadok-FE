'use client';

import { APIDefaultBook } from '@/types/book';
import InteractiveBook from '@/ui//InteractiveBook';
import { Flex } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';

const BOOKSHELF_BOOK_LIMIT = 4;

const InteractiveBookShelf = ({ books }: { books: APIDefaultBook[] }) => {
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
          shadow="md"
          justifyContent="flex-start"
          borderRadius={10}
          boxShadow="0 4px 2px -2px #8080806e"
        >
          {books.map(({ bookId, imageUrl }) => (
            <InteractiveBook key={bookId} bookId={bookId} imageUrl={imageUrl} />
          ))}
        </Flex>
      ))}
    </>
  );
};

export default InteractiveBookShelf;

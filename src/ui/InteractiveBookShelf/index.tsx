import { APIDefaultBook } from '@/types/book';
import InteractiveBook from '@/ui//InteractiveBook';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
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
          w="100%"
          direction="column"
          position="relative"
          height="15.2rem"
          justify="flex-end"
          gap="2rem"
        >
          <Box
            position="absolute"
            width="100%"
            bottom="0"
            bgColor="white.500"
            height="4rem"
            borderBottomRadius={10}
          />
          <SimpleGrid
            columns={4}
            key={idx}
            width="100%"
            height="15.2rem"
            shadow="md"
            alignItems="center"
            borderRadius={10}
            boxShadow="inset 0px 0px 20px 2px #9595956e"
          >
            {books.map(({ bookId, imageUrl }) => (
              <Box key={bookId}>
                <InteractiveBook
                  key={bookId}
                  bookId={bookId}
                  imageUrl={imageUrl}
                />
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      ))}
    </>
  );
};

export default InteractiveBookShelf;

'use client';

import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import { Flex } from '@chakra-ui/react';
import { RecommendedBookshelf } from '../Recommended';

const BookArchiveForUnAuth = () => {
  const { data, isSuccess } = useUnAuthRecommendedBookshelfQuery();

  if (!isSuccess) return null;

  return (
    <Flex direction="column" width="100%" gap="3rem">
      {data.bookshelfResponses.map(({ bookshelfId, bookshelfName, books }) => (
        <RecommendedBookshelf
          key={bookshelfId}
          bookshelfId={bookshelfId}
          bookshelfName={bookshelfName}
          books={books}
        />
      ))}
    </Flex>
  );
};

export default BookArchiveForUnAuth;

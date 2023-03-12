'use client';

import useAuthRecommendedBooks from '@/queries/recommend/useAuthRecommendedBooks';
import useAuthRecommendedBookshelf from '@/queries/recommend/useAuthRecommendedBookshelf';
import { APIJobGroup } from '@/types/job';
import { Flex } from '@chakra-ui/react';
import { RecommendedBooks, RecommendedBookshelf } from '@/ui/Recommended';

const BookArchiveForAuth = ({
  userJobGroup,
}: {
  userJobGroup: APIJobGroup['name'];
}) => {
  const { data: bookshelfData, isSuccess: bookshelfIsSuccess } =
    useAuthRecommendedBookshelf(userJobGroup);
  const { data: booksData, isSuccess: booksIsSuccess } =
    useAuthRecommendedBooks(userJobGroup);

  const isSuccess = bookshelfIsSuccess && booksIsSuccess;

  if (!isSuccess) return null;
  if (!bookshelfData || !booksData) return null;

  return (
    <Flex direction="column" width="100%" gap="3rem">
      {bookshelfData.bookshelfResponses
        .slice(0, 2)
        .map(({ bookshelfId, bookshelfName, books }) => (
          <RecommendedBookshelf
            key={bookshelfId}
            bookshelfId={bookshelfId}
            bookshelfName={bookshelfName}
            books={books}
          />
        ))}
      <RecommendedBooks
        jobGroup={booksData.jobGroupKoreanName}
        books={booksData.books}
      />
      {bookshelfData.bookshelfResponses
        .slice(2)
        .map(({ bookshelfId, bookshelfName, books }) => (
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

export default BookArchiveForAuth;

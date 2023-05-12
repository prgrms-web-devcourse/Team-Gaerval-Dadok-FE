import useAuthRecommendedBooks from '@/queries/recommend/useAuthRecommendedBooks';
import useAuthRecommendedBookshelf from '@/queries/recommend/useAuthRecommendedBookshelf';
import { APIJobGroup } from '@/types/job';
import { RecommendedBooks, RecommendedBookshelf } from '@/ui/Recommended';
import { Flex, Skeleton, VStack } from '@chakra-ui/react';

const BookArchiveForAuth = ({
  userJobGroup,
}: {
  userJobGroup: APIJobGroup['name'];
}) => {
  const {
    data: bookshelfData,
    isSuccess: bookshelfIsSuccess,
    isLoading: bookshelfIsLoading,
  } = useAuthRecommendedBookshelf(userJobGroup);
  const {
    data: booksData,
    isSuccess: booksIsSuccess,
    isLoading: booksIsLoading,
  } = useAuthRecommendedBooks(userJobGroup);

  const isSuccess = bookshelfIsSuccess && booksIsSuccess;
  const isLoading = bookshelfIsLoading && booksIsLoading;

  if (isLoading) {
    return (
      <VStack gap="3rem">
        <Skeleton width="39rem" height="19.6rem" />
        <Skeleton width="39rem" height="19.6rem" />
        <Skeleton width="39rem" height="19.6rem" />
      </VStack>
    );
  }

  if (!isSuccess) return null;
  if (!bookshelfData || !booksData) return null;

  return (
    <Flex direction="column" width="100%" gap="3rem">
      <RecommendedBooks
        jobGroup={booksData.jobGroupKoreanName}
        books={booksData.books}
      />
      {bookshelfData.bookshelfResponses.map(
        ({ bookshelfId, bookshelfName, books, likeCount }) => (
          <RecommendedBookshelf
            key={bookshelfId}
            bookshelfId={bookshelfId}
            bookshelfName={bookshelfName}
            books={books}
            likeCount={likeCount}
          />
        )
      )}
    </Flex>
  );
};

export default BookArchiveForAuth;

import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import { Flex, Skeleton, VStack } from '@chakra-ui/react';
import { RecommendedBookshelf } from '../Recommended';

const BookArchiveForUnAuth = () => {
  const { data, isSuccess, isLoading } = useUnAuthRecommendedBookshelfQuery();

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

  return (
    <Flex direction="column" width="100%" gap="3rem">
      {data.bookshelfResponses.map(
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

export default BookArchiveForUnAuth;

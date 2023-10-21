import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import { Flex, Skeleton, VStack } from '@chakra-ui/react';
import Bookshelf from '../Bookshelf';

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
      {data.bookshelfResponses.map(bookshelf => (
        <Bookshelf key={bookshelf.bookshelfId} {...bookshelf} />
      ))}
    </Flex>
  );
};

export default BookArchiveForUnAuth;

import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import { Skeleton, VStack } from '@chakra-ui/react';
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
    <div className="flex w-full flex-col gap-[3rem]">
      {data.bookshelfResponses.map(bookshelf => (
        <Bookshelf key={bookshelf.bookshelfId} {...bookshelf} />
      ))}
    </div>
  );
};

export default BookArchiveForUnAuth;

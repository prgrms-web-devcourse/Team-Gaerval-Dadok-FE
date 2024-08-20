import useUnAuthRecommendedBookshelfQuery from '@/queries/recommend/useUnAuthRecommendedBookshelfQuery';
import { Skeleton, VStack } from '@chakra-ui/react';
import Bookshelf from '@/v1/bookShelf/BookShelf';

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
    <div className="flex w-full flex-col gap-[1.5rem]">
      <div className="text-md font-bold">🔥 인기 책장</div>
      <div className="flex w-full flex-col gap-[3rem]">
        {data.bookshelfResponses.map(bookshelf => (
          <Bookshelf key={bookshelf.bookshelfId} {...bookshelf} />
        ))}
      </div>
    </div>
  );
};

export default BookArchiveForUnAuth;

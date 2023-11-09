import useAuthRecommendedBooks from '@/queries/recommend/useAuthRecommendedBooks';
import useAuthRecommendedBookshelf from '@/queries/recommend/useAuthRecommendedBookshelf';
import { APIJobGroup } from '@/types/job';
import BookCover from '@/v1/book/BookCover';
import BookShelf from '@/v1/bookShelf/BookShelf';
import { Skeleton, VStack } from '@chakra-ui/react';

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
    <div className="flex w-full flex-col gap-[1.5rem] text-md font-bold">
      <div>👀 이런 책들이 많이 꽂혔어요</div>
      <div className="flex gap-[1.5rem] overflow-auto">
        {booksData.books.map(({ bookId, imageUrl, title }) => (
          <div key={bookId}>
            <BookCover src={imageUrl} title={title} size="large" />
            <div className="line-clamp-2 break-keep text-center text-xs font-normal">
              {title}
            </div>
          </div>
        ))}
      </div>
      <div>🔥 인기 책장</div>
      <div className="flex w-full flex-col gap-[3rem]">
        {bookshelfData.bookshelfResponses.map(bookshelf => (
          <BookShelf key={bookshelf.bookshelfId} {...bookshelf} />
        ))}
      </div>
    </div>
  );
};

export default BookArchiveForAuth;

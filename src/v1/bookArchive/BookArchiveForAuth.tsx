'use client';

import useAuthRecommendedBooks from '@/queries/recommend/useAuthRecommendedBooks';
import useAuthRecommendedBookshelf from '@/queries/recommend/useAuthRecommendedBookshelf';
import { APIJobGroup } from '@/types/job';
import BookCover from '@/v1/book/BookCover';
import Link from 'next/link';
import BookShelfCard from '../bookShelf/BookShelfCard';

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
    // TODO: 스켈레톤 컴포넌트로 교체
    return null;
  }

  if (!isSuccess) return null;
  if (!bookshelfData || !booksData) return null;

  return (
    <div className="flex w-full flex-col gap-[1.5rem] text-md font-bold">
      <h2 className="font-body1-bold">👀 이런 책들이 많이 꽂혔어요</h2>
      <ul className="flex gap-[1.5rem] overflow-auto pb-[1.5rem]">
        {booksData.books.map(({ bookId, imageUrl, title }) => (
          <li key={bookId} className="max-w-[9rem]">
            <Link href={`/book/${bookId}`} className="flex flex-col gap-[1rem]">
              <BookCover src={imageUrl} title={title} size="large" />
              <span className="line-clamp-2 break-keep text-center font-caption1-regular ">
                {title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className="font-body1-bold">🔥 인기 책장</h2>
      {...bookshelfData.bookshelfResponses.map(bookShelf => (
        <BookShelfCard key={bookShelf.bookshelfId} {...bookShelf} />
      ))}
    </div>
  );
};

export default BookArchiveForAuth;

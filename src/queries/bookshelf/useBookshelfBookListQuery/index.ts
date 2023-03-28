import bookshelfAPI from '@/apis/bookshelf';
import { APIBookshelf } from '@/types/bookshelf';
import { useInfiniteQuery } from '@tanstack/react-query';

const useBookshelfBooksQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
}) =>
  useInfiniteQuery(
    ['bookshelfBooks'],
    ({ pageParam = '' }) =>
      bookshelfAPI
        .getBookshelfBooks(bookshelfId, pageParam)
        .then(response => response.data),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.books[15].bookshelfItemId : undefined,
      staleTime: 3000,
    }
  );

export default useBookshelfBooksQuery;

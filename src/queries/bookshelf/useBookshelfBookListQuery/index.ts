import bookshelfAPI from '@/apis/bookshelf';
import { APIDefaultBookshelf } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useBookshelfBooksQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIDefaultBookshelf['bookshelfId'];
}) =>
  useQuery(['bookshelfBooks', bookshelfId], () =>
    bookshelfAPI
      .getBookshelfBooks({ bookshelfId })
      .then(response => response.data)
  );

export default useBookshelfBooksQuery;

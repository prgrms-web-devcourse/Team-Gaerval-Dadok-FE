import bookshelfAPI from '@/apis/bookshelf';
import { APIDefaultBookshelf } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useBookshelfBookListQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIDefaultBookshelf['bookshelfId'];
}) =>
  useQuery(['defaultBookshelf', bookshelfId], () =>
    bookshelfAPI
      .getBookshelfBookList({ bookshelfId })
      .then(response => response.data)
  );

export default useBookshelfBookListQuery;

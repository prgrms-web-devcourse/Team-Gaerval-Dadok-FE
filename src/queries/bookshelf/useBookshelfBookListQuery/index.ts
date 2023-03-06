import bookshelfAPI from '@/apis/bookshelf';
import { APIDefaultBookshelf } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useBookshelfBookListQuery = ({
  bookshelvesId,
}: {
  bookshelvesId: APIDefaultBookshelf['bookshelfId'];
}) =>
  useQuery(['defaultBookshelf', bookshelvesId], () =>
    bookshelfAPI
      .getBookshelfBookList({ bookshelvesId })
      .then(response => response.data)
  );

export default useBookshelfBookListQuery;

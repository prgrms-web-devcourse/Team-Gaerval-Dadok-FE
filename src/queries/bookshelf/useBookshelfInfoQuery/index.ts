import bookshelfAPI from '@/apis/bookshelf';
import { APIBookshelfInfo } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useBookshelfInfoQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelfInfo['bookshelfId'];
}) =>
  useQuery(['bookshelfInfo', bookshelfId], () =>
    bookshelfAPI
      .getBookshelfInfo({ bookshelfId })
      .then(response => response.data)
  );

export default useBookshelfInfoQuery;

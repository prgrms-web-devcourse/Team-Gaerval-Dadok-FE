import bookshelfAPI from '@/apis/bookshelf';
import { APIBookshelfInfo } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';
import bookShelfKeys from './key';

const useBookShelfInfoQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelfInfo['bookshelfId'];
}) =>
  useQuery(bookShelfKeys.info(bookshelfId), () =>
    bookshelfAPI.getBookshelfInfo(bookshelfId).then(response => response.data)
  );

export default useBookShelfInfoQuery;

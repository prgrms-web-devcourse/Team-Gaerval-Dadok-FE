import { UseQueryOptions } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookshelfAPI from '@/apis/bookshelf';
import bookShelfKeys from './key';

const useBookShelfInfoQuery = <TData = APIBookshelfInfo>(
  bookshelfId: APIBookshelfInfo['bookshelfId'],
  options?: UseQueryOptions<APIBookshelfInfo, unknown, TData>
) =>
  useQueryWithSuspense(
    bookShelfKeys.info(bookshelfId),
    () =>
      bookshelfAPI
        .getBookshelfInfo(bookshelfId)
        .then(response => response.data),
    options
  );

export default useBookShelfInfoQuery;

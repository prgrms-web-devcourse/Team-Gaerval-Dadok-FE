import { UseQueryOptions } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookshelfAPI from '@/apis/bookshelf';
import bookShelfKeys from './key';
import { getSafeNickname } from '@/utils/converter';

const useBookShelfInfoQuery = <TData = APIBookshelfInfo>(
  bookshelfId: APIBookshelfInfo['bookshelfId'],
  options?: UseQueryOptions<APIBookshelfInfo, unknown, TData>
) =>
  useQueryWithSuspense(
    bookShelfKeys.info(bookshelfId),
    () =>
      bookshelfAPI.getBookshelfInfo(bookshelfId).then(({ data }) => ({
        ...data,
        userNickname: getSafeNickname(data.userId, data.userNickname),
      })),
    options
  );

export default useBookShelfInfoQuery;

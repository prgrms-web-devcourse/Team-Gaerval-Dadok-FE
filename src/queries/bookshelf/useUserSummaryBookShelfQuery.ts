import bookshelfAPI from '@/apis/bookshelf';
import type { QueryOptions } from '@/types/query';
import type { APIUser } from '@/types/user';
import type { APIBookshelf } from '@/types/bookshelf';
import bookShelfKeys from './key';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';

const useUserSummaryBookshlefQuery = (
  userId: APIUser['userId'],
  options?: QueryOptions<APIBookshelf>
) =>
  useQueryWithSuspense(
    bookShelfKeys.summary(String(userId)),
    () =>
      bookshelfAPI.getUserSummaryBookshelf({ userId }).then(({ data }) => data),
    options
  );

export default useUserSummaryBookshlefQuery;

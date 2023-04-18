import bookshelfAPI from '@/apis/bookshelf';
import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '@/types/query';
import type { APIUser } from '@/types/user';
import type { APIBookshelf } from '@/types/bookshelf';

const useUserSummaryBookshlefQuery = (
  userId: APIUser['userId'],
  options?: QueryOptions<APIBookshelf>
) =>
  useQuery(
    ['summaryBookshlef', String(userId)],
    () =>
      bookshelfAPI.getUserSummaryBookshelf({ userId }).then(({ data }) => data),
    options
  );

export default useUserSummaryBookshlefQuery;

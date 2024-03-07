import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import type { UseQueryOptions } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIRecentSearches } from '@/types/book';

import bookKeys from './key';

const useRecentSearchesQuery = <TData = APIRecentSearches>(
  options?: UseQueryOptions<APIRecentSearches, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.recentSearch(),
    () => bookAPI.getRecentSearches().then(({ data }) => data),
    options
  );

export default useRecentSearchesQuery;

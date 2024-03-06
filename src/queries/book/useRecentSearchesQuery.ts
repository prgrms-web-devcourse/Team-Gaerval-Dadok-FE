import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import type { QueryOptions } from '@/types/query';

import bookAPI from '@/apis/book';
import type { APIRecentSearches } from '@/types/book';
import bookKeys from './key';

const useRecentSearchesQuery = (options?: QueryOptions<APIRecentSearches>) =>
  useQueryWithSuspense(
    bookKeys.recentSearch(),
    () => bookAPI.getRecentSearches().then(({ data }) => data),
    options
  );

export default useRecentSearchesQuery;

import { useQuery } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIRecentSearches } from '@/types/book';
import type { QueryOptions } from '@/types/query';

const useRecentSearchesQuery = (options?: QueryOptions<APIRecentSearches>) =>
  useQuery(
    ['keywords'],
    () => bookAPI.getRecentSearches().then(({ data }) => data),
    options
  );

export default useRecentSearchesQuery;

import useQueryWithSuspense, {
  type UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';

import bookAPI from '@/apis/book';
import type { APIRecentSearches } from '@/types/book';

import bookKeys from './key';

const useRecentSearchesQuery = <TData = APIRecentSearches>(
  options?: UseQueryOptionWithoutSuspense<APIRecentSearches, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.recentSearch(),
    () => bookAPI.getRecentSearches().then(({ data }) => data),
    options
  );

export default useRecentSearchesQuery;

export const useRecentSearchListQuery = ({ enabled }: { enabled: boolean }) =>
  useRecentSearchesQuery({
    select: ({ bookRecentSearchResponses }) => bookRecentSearchResponses,
    enabled,
  });

import bookshelfAPI from '@/apis/bookshelf';
import type { APIBookshelf } from '@/types/bookshelf';
import type { QueryOptions } from '@/types/query';

import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookShelfKeys from './key';

const useMySummaryBookshelfQuery = (options?: QueryOptions<APIBookshelf>) =>
  useQueryWithSuspense(
    bookShelfKeys.summary('me'),
    () => bookshelfAPI.getMySummaryBookshelf().then(({ data }) => data),
    options
  );

export default useMySummaryBookshelfQuery;

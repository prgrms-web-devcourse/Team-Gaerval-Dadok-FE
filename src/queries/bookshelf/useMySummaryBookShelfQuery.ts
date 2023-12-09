import bookshelfAPI from '@/apis/bookshelf';
import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '@/types/query';
import type { APIBookshelf } from '@/types/bookshelf';
import bookShelfKeys from './key';

const useMySummaryBookshlefQuery = (options?: QueryOptions<APIBookshelf>) =>
  useQuery(
    bookShelfKeys.summary('me'),
    () => bookshelfAPI.getMySummaryBookshelf().then(({ data }) => data),
    options
  );

export default useMySummaryBookshlefQuery;

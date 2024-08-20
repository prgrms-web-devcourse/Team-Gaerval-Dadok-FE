import bookshelfAPI from '@/apis/bookshelf';
import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '@/types/query';
import type { APIBookshelf } from '@/types/bookshelf';

const useMySummaryBookshlefQuery = (options?: QueryOptions<APIBookshelf>) =>
  useQuery(
    ['summaryBookshlef', 'me'],
    () => bookshelfAPI.getMySummaryBookshelf().then(({ data }) => data),
    options
  );

export default useMySummaryBookshlefQuery;

import bookshelfAPI from '@/apis/bookshelf';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Options = Pick<
  UseQueryOptions<
    Awaited<ReturnType<typeof bookshelfAPI.getMySummaryBookshelf>>['data']
  >,
  'suspense'
>;

const useMySummaryBookshlefQuery = (options?: Options) =>
  useQuery(
    ['summaryBookshlef', 'me'],
    () => bookshelfAPI.getMySummaryBookshelf().then(({ data }) => data),
    options
  );

export default useMySummaryBookshlefQuery;

import bookshelfAPI from '@/apis/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useMySummaryBookshlefQuery = () =>
  useQuery(['summaryBookshlef', 'me'], () =>
    bookshelfAPI.getMySummaryBookshelf().then(({ data }) => data)
  );

export default useMySummaryBookshlefQuery;

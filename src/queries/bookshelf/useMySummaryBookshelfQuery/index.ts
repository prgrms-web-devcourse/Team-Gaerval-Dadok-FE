import bookshelfAPI from '@/apis/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useMySummaryBookshlefQuery = () =>
  useQuery(['summaryBookshlef', 'me'], () =>
    bookshelfAPI.getMySummaryBookshelf().then(response => response.data)
  );

export default useMySummaryBookshlefQuery;

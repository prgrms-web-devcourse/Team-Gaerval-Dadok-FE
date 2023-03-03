import api from '@/apis';
import { useQuery } from '@tanstack/react-query';

const useMySummaryBookshlefQuery = () =>
  useQuery(['summaryBookshlef', 'me'], () =>
    api.bookshelf.getMySummaryBookshelf().then(response => response.data)
  );

export default useMySummaryBookshlefQuery;

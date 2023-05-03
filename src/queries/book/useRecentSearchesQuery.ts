import bookAPI from '@/apis/book';
import { useQuery } from '@tanstack/react-query';

const useRecentSearchesQuery = () =>
  useQuery(['keywords'], () =>
    bookAPI.getRecentSearches().then(({ data }) => data)
  );

export default useRecentSearchesQuery;

import bookAPI from '@/apis/book';
import { useInfiniteQuery } from '@tanstack/react-query';

const useBookSearchQuery = ({
  query,
  page,
  pageSize,
}: {
  query: string;
  page: number;
  pageSize: number;
}) =>
  useInfiniteQuery(
    ['booksearch', query],
    ({ pageParam = page }) =>
      bookAPI
        .searchBooks({ query, page: pageParam, pageSize })
        .then(response => response.data),
    {
      getNextPageParam: pages => {
        return pages.isLast ? undefined : pages.requestedPageNumber + 1;
      },
      staleTime: 3000,
      enabled: !!query,
    }
  );

export default useBookSearchQuery;

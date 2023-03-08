import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIDefaultBook } from '@/types/book';

const useBookInfoQuery = (
  bookId: APIDefaultBook['bookId'],
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof bookAPI.getBookInfo>>['data']>,
    'onSuccess' | 'onError'
  >
) =>
  useQuery(
    ['bookInfo', bookId],
    () => bookAPI.getBookInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookInfoQuery;

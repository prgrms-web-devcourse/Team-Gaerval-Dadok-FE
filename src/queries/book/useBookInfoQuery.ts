import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIBook } from '@/types/book';

const useBookInfoQuery = (
  bookId: APIBook['bookId'],
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

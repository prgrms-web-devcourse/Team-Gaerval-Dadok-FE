import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIBook } from '@/types/book';

const useBookCommentsQuery = (
  bookId: APIBook['bookId'],
  options?: Pick<
    UseQueryOptions<Awaited<ReturnType<typeof bookAPI.getComments>>['data']>,
    'onSuccess' | 'onError'
  >
) =>
  useQuery(
    ['bookComments', bookId],
    () => bookAPI.getComments(bookId).then(({ data }) => data),
    options
  );

export default useBookCommentsQuery;

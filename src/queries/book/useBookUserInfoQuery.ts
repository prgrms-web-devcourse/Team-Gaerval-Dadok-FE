import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import bookAPI from '@/apis/book';

const useBookUserInfoQuery = (
  bookId: number,
  options?: Pick<
    UseQueryOptions<
      Awaited<ReturnType<typeof bookAPI.getBookUserInfo>>['data']
    >,
    'enabled'
  >
) =>
  useQuery(
    ['bookUserInfo', bookId],
    () => bookAPI.getBookUserInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookUserInfoQuery;

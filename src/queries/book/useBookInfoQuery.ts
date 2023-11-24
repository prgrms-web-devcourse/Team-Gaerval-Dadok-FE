import type { APIBook, APIBookDetail } from '@/types/book';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';
import bookAPI from '@/apis/book';

const useBookInfoQuery = (
  bookId: APIBook['bookId'],
  options?: UseQueryOptionWithoutSuspense<APIBookDetail>
) =>
  useQueryWithSuspense(
    ['bookInfo', bookId],
    () => bookAPI.getBookInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookInfoQuery;

import type { APIBook, APIBookDetail } from '@/types/book';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';
import bookAPI from '@/apis/book';
import bookKeys from './key';

const useBookInfoQuery = (
  bookId: APIBook['bookId'],
  options?: UseQueryOptionWithoutSuspense<APIBookDetail>
) =>
  useQueryWithSuspense(
    bookKeys.detail(bookId),
    () => bookAPI.getBookInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookInfoQuery;

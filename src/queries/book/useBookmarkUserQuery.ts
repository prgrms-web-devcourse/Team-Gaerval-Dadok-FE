import { UseQueryOptions } from '@tanstack/react-query';
import { APIBookmarkedUserList } from '@/types/book';
import bookAPI from '@/apis/book';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookKeys from './key';

const useBookmarkUserQuery = <TData = APIBookmarkedUserList>(
  bookId: number,
  options?: UseQueryOptions<APIBookmarkedUserList, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.bookmark(bookId),
    () => bookAPI.getBookmarkUserInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookmarkUserQuery;

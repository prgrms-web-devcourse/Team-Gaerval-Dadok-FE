import { UseQueryOptions } from '@tanstack/react-query';
import { APIBookmarkedUserList } from '@/types/book';
import bookAPI from '@/apis/book';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookKeys from './key';

const useBookUserInfoQuery = <TData = APIBookmarkedUserList>(
  bookId: number,
  options?: UseQueryOptions<APIBookmarkedUserList, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.bookmark(bookId),
    () => bookAPI.getBookUserInfo(bookId).then(({ data }) => data),
    options
  );

export default useBookUserInfoQuery;

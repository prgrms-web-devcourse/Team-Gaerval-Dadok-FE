import { useQuery } from '@tanstack/react-query';
import bookAPI from '@/apis/book';

const useBookUserInfoQuery = (bookId: number) =>
  useQuery(['bookUserInfo', bookId], () =>
    bookAPI.getBookUserInfo(bookId).then(({ data }) => data)
  );

export default useBookUserInfoQuery;

import bookshelfAPI from '@/apis/bookshelf';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useBookshelfInfoQuery = ({ userId }: { userId: APIUser['userId'] }) =>
  useQuery(['defaultBookshelfUserId', userId], () =>
    bookshelfAPI.getBookshelfInfo({ userId }).then(response => response.data)
  );

export default useBookshelfInfoQuery;

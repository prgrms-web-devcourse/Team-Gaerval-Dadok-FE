import bookshelfAPI from '@/apis/bookshelf';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useBookshelfBookListQuery = ({ userId }: { userId: APIUser['userId'] }) =>
  useQuery(['defaultBookshelf', userId], () =>
    bookshelfAPI.getBookshelfInfo({ userId }).then(response => response.data)
  );

export default useBookshelfBookListQuery;

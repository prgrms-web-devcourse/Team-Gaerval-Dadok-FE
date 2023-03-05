import bookshelfAPI from '@/apis/bookshelf';
import type { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useUserSummaryBookshlefQuery = ({ id }: { id: APIUser['userId'] }) =>
  useQuery(['summaryBookshlef', id], () =>
    bookshelfAPI.getUserSummaryBookshelf({ id }).then(response => response.data)
  );

export default useUserSummaryBookshlefQuery;

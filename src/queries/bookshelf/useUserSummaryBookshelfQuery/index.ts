import bookshelfAPI from '@/apis/bookshelf';
import type { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useUserSummaryBookshlefQuery = ({
  userId,
}: {
  userId: APIUser['userId'];
}) =>
  useQuery(['summaryBookshlef', userId], () =>
    bookshelfAPI
      .getUserSummaryBookshelf({ userId })
      .then(response => response.data)
  );

export default useUserSummaryBookshlefQuery;

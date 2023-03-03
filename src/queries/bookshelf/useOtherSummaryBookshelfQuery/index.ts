import api from '@/apis';
import type { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useOtherSummaryBookshlefQuery = ({ id }: { id: APIUser['userId'] }) =>
  useQuery(['summaryBookshlef', id], () =>
    api.bookshelf.getMySummaryBookshelf().then(response => response.data)
  );

export default useOtherSummaryBookshlefQuery;

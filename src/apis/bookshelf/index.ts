import { APISummaryBookshelf } from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

export default {
  getOtherSummaryBookshelf: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APISummaryBookshelf>(`/api/users/${id}/bookshelves`, {
      data: null,
    }),

  getMySummaryBookshelf: () =>
    publicApi.get<APISummaryBookshelf>('/api/bookshelves/me', { data: null }),
} as const;

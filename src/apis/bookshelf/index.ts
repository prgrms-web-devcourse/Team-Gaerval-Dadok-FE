import { APISummaryBookshelf } from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APISummaryBookshelf>(`/api/users/${id}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APISummaryBookshelf>('/api/bookshelves/me'),
};

export default bookshelfAPI;

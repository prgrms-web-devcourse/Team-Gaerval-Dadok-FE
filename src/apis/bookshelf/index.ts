import {
  APIBookshelfBookList,
  APIBookshelfInfo,
  APIDefaultBookshelf,
  APIProfileBookshelf,
} from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIProfileBookshelf>(`/api/users/${id}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APIProfileBookshelf>('/api/bookshelves/me'),

  getBookshelfInfo: ({
    bookshelfId,
  }: {
    bookshelfId: APIBookshelfInfo['bookshelfId'];
  }) => publicApi.get<APIBookshelfInfo>(`/api/bookshelves/${bookshelfId}`),

  getBookshelfBooks: ({
    bookshelfId,
  }: {
    bookshelfId: APIDefaultBookshelf['bookshelfId'];
  }) =>
    publicApi.get<APIBookshelfBookList>(
      `/api/bookshelves/${bookshelfId}/books?type=READ&pageSize=16&bookCursorId=3&sortDirection=DESC`
    ),
};

export default bookshelfAPI;

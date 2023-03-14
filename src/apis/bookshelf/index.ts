import {
  APIBookshelfBookList,
  APIBookshelfInfo,
  APIDefaultBookshelf,
  APIProfileBookshelf,
} from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ userId }: { userId: APIUser['userId'] }) =>
    publicApi.get<APIProfileBookshelf>(`/api/users/${userId}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APIProfileBookshelf>('/api/bookshelves/me'),

  getBookshelfInfo: (bookshelfId: APIBookshelfInfo['bookshelfId']) =>
    publicApi.get<APIBookshelfInfo>(`/api/bookshelves/${bookshelfId}`),

  getBookshelfBooks: (
    bookshelfId: APIDefaultBookshelf['bookshelfId'],
    pageParam: string
  ) =>
    publicApi.get<APIBookshelfBookList>(
      `/api/bookshelves/${bookshelfId}/books?type=READ&pageSize=16&bookCursorId=` +
        pageParam
    ),
};

export default bookshelfAPI;

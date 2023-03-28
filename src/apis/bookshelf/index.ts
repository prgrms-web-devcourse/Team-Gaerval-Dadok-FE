import {
  APIBookshelf,
  APIBookshelfInfo,
  APIBookshelfPagination,
} from '@/types/bookshelf';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const bookshelfAPI = {
  getUserSummaryBookshelf: ({ userId }: { userId: APIUser['userId'] }) =>
    publicApi.get<APIBookshelf>(`/service-api/users/${userId}/bookshelves`),

  getMySummaryBookshelf: () =>
    publicApi.get<APIBookshelf>('/service-api/bookshelves/me'),

  getBookshelfInfo: (bookshelfId: APIBookshelf['bookshelfId']) =>
    publicApi.get<APIBookshelfInfo>(`/service-api/bookshelves/${bookshelfId}`),

  getBookshelfBooks: (
    bookshelfId: APIBookshelf['bookshelfId'],
    pageParam: string
  ) =>
    publicApi.get<APIBookshelfPagination>(
      `/service-api/bookshelves/${bookshelfId}/books?type=READ&pageSize=16&bookshelfItemCursorId=` +
        pageParam
    ),
};

export default bookshelfAPI;

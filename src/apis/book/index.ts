import { publicApi } from '../core/axios';
import type {
  APIBook,
  APIBookInfo,
  APIDefaultBook,
  APICreateBookCommentRequest,
  APIBookCommentList,
  APIBookComment,
  APIPatchBookCommentRequest,
  APIDefaultComment,
  APIBookUserInfo,
} from '@/types/book';
import bookshelfAPI from '../bookshelf';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/api/books?query=${query}`
    ),

  getBookInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookInfo>(`/api/books/${bookId}`),

  getBookUserInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookUserInfo>(`/api/books/${bookId}/users`),

  createBook: ({ book }: { book: APIBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/api/books', book),

  creaetComment: (
    bookId: APIDefaultBook['bookId'],
    comment: APICreateBookCommentRequest
  ) =>
    publicApi.post<APICreateBookCommentRequest>(
      `/api/books/${bookId}/comment`,
      comment
    ),

  getComments: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookCommentList>(`/api/books/${bookId}/comments`, {
      params: {
        bookCommentCursorId: 99,
        pageSize: 10,
        sortDirection: 'DESC',
      },
    }),

  patchComment: ({
    bookId,
    data,
  }: {
    bookId: APIDefaultBook['bookId'];
    data: APIPatchBookCommentRequest;
  }) => publicApi.patch<APIBookComment>(`/api/books/${bookId}/comment`, data),

  deletComment: (
    bookId: APIDefaultBook['bookId'],
    commentId: APIDefaultComment['commentId']
  ) =>
    publicApi.delete(`/api/books/${bookId}/comment`, { data: { commentId } }),

  setBookMarked: (bookId: APIDefaultBook['bookId']) =>
    bookshelfAPI.getMySummaryBookshelf().then(({ data: { bookshelfId } }) =>
      publicApi.post(`/api/bookshelves/${bookshelfId}/books`, {
        bookId,
      })
    ),

  unsetBookMarked: (bookId: APIDefaultBook['bookId']) =>
    bookshelfAPI
      .getMySummaryBookshelf()
      .then(({ data: { bookshelfId } }) =>
        publicApi.delete(`/api/bookshelves/${bookshelfId}/books/${bookId}`)
      ),
};

export default bookAPI;

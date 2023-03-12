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
      `/service-api/books?query=${query}`
    ),

  getBookInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookInfo>(`/service-api/books/${bookId}`),

  getBookUserInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookUserInfo>(`/service-api/books/${bookId}/users`),

  createBook: ({ book }: { book: APIBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/service-api/books', book),

  creaetComment: (
    bookId: APIDefaultBook['bookId'],
    comment: APICreateBookCommentRequest
  ) =>
    publicApi.post<APICreateBookCommentRequest>(
      `/service-api/books/${bookId}/comment`,
      comment
    ),

  getComments: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookCommentList>(`/service-api/books/${bookId}/comments`, {
      params: {
        bookCommentCursorId: 999,
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
  }) =>
    publicApi.patch<APIBookComment>(
      `/service-api/books/${bookId}/comment`,
      data
    ),

  deletComment: (
    bookId: APIDefaultBook['bookId'],
    commentId: APIDefaultComment['commentId']
  ) => publicApi.delete(`/service-api/books/${bookId}/comment/${commentId}`),

  setBookMarked: (bookId: APIDefaultBook['bookId']) =>
    bookshelfAPI.getMySummaryBookshelf().then(({ data: { bookshelfId } }) =>
      publicApi.post(`/service-api/bookshelves/${bookshelfId}/books`, {
        bookId,
      })
    ),

  unsetBookMarked: (bookId: APIDefaultBook['bookId']) =>
    bookshelfAPI
      .getMySummaryBookshelf()
      .then(({ data: { bookshelfId } }) =>
        publicApi.delete(
          `/service-api/bookshelves/${bookshelfId}/books/${bookId}`
        )
      ),
};

export default bookAPI;

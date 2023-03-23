import type {
  APIBook,
  APIBookComment,
  APIBookCommentInfo,
  APIBookCommentList,
  APIBookDetail,
  APIBookDetailUserList,
} from '@/types/book';
import bookshelfAPI from '../bookshelf';
import { publicApi } from '../core/axios';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/service-api/books?query=${query}`
    ),

  getBookInfo: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookDetail>(`/service-api/books/${bookId}`),

  getBookUserInfo: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookDetailUserList>(`/service-api/books/${bookId}/users`),

  createBook: ({ book }: { book: APIBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/service-api/books', book),

  creaetComment: (
    bookId: APIBook['bookId'],
    { comment }: { comment: APIBookComment['comment'] }
  ) =>
    publicApi.post<APIBookComment['comment']>(
      `/service-api/books/${bookId}/comments`,
      { comment }
    ),

  getComments: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookCommentList>(`/service-api/books/${bookId}/comments`, {
      params: {
        pageSize: 10,
        sortDirection: 'DESC',
      },
    }),

  patchComment: ({
    bookId,
    data,
  }: {
    bookId: APIBook['bookId'];
    data: APIBookComment;
  }) =>
    publicApi.patch<APIBookCommentInfo>(
      `/service-api/books/${bookId}/comments`,
      data
    ),

  deletComment: (
    bookId: APIBook['bookId'],
    commentId: APIBookComment['commentId']
  ) => publicApi.delete(`/service-api/books/${bookId}/comments/${commentId}`),

  setBookMarked: (bookId: APIBook['bookId']) =>
    bookshelfAPI.getMySummaryBookshelf().then(({ data: { bookshelfId } }) =>
      publicApi.post(`/service-api/bookshelves/${bookshelfId}/books`, {
        bookId,
      })
    ),

  unsetBookMarked: (bookId: APIBook['bookId']) =>
    bookshelfAPI
      .getMySummaryBookshelf()
      .then(({ data: { bookshelfId } }) =>
        publicApi.delete(
          `/service-api/bookshelves/${bookshelfId}/books/${bookId}`
        )
      ),
};

export default bookAPI;

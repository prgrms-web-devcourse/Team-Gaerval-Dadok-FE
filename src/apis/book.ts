import type {
  APIBook,
  APIBookComment,
  APIBookCommentPagination,
  APIBookDetail,
  APIBookmarkedUserList,
  APICreateBookCommentRequest,
  APIPatchBookCommentRequest,
  APISearchedBook,
  APISearchedBookPagination,
  APIRecentSearches,
  APIBestSellerRes,
} from '@/types/book';
import bookshelfAPI from './bookshelf';
import { publicApi } from './core/axios';

const bookAPI = {
  searchBooks: ({
    query,
    page,
    pageSize,
  }: {
    query: string;
    page: number;
    pageSize: number;
  }) =>
    publicApi.get<APISearchedBookPagination>(
      `/service-api/books?query=${query}&page=${page}&pageSize=${pageSize}`
    ),

  getRecentSearches: () =>
    publicApi.get<APIRecentSearches>('/service-api/books/recent-searches', {
      params: {
        limit: 10,
      },
    }),

  getBookInfo: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookDetail>(`/service-api/books/${bookId}`),

  getBookmarkUserInfo: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookmarkedUserList>(`/service-api/books/${bookId}/users`),

  createBook: ({ book }: { book: APISearchedBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/service-api/books', book),

  creaetComment: (
    bookId: APIBook['bookId'],
    comment: APICreateBookCommentRequest['comment']
  ) =>
    publicApi.post<APICreateBookCommentRequest['comment']>(
      `/service-api/books/${bookId}/comments`,
      { comment }
    ),

  getComments: (bookId: APIBook['bookId']) =>
    publicApi.get<APIBookCommentPagination>(
      `/service-api/books/${bookId}/comments`,
      {
        params: {
          pageSize: 10,
          sortDirection: 'DESC',
        },
      }
    ),

  patchComment: ({
    bookId,
    data,
  }: {
    bookId: APIBook['bookId'];
    data: APIPatchBookCommentRequest;
  }) =>
    publicApi.patch<APIBookComment>(
      `/service-api/books/${bookId}/comments`,
      data
    ),

  deletComment: (
    bookId: APIBook['bookId'],
    commentId: APIBookComment['commentId']
  ) => publicApi.delete(`/service-api/books/${bookId}/comments/${commentId}`),

  addBookmark: (bookId: APIBook['bookId']) =>
    bookshelfAPI.getMySummaryBookshelf().then(({ data: { bookshelfId } }) =>
      publicApi.post(`/service-api/bookshelves/${bookshelfId}/books`, {
        bookId,
      })
    ),

  removeBookmark: (bookId: APIBook['bookId']) =>
    bookshelfAPI
      .getMySummaryBookshelf()
      .then(({ data: { bookshelfId } }) =>
        publicApi.delete(
          `/service-api/bookshelves/${bookshelfId}/books/${bookId}`
        )
      ),

  getBestSellers: () =>
    publicApi.get<APIBestSellerRes>(
      `/aladin-api?QueryType=Bestseller&Cover=Big`
    ),

  storeRecentSearch: (queryKeyword: string) =>
    publicApi.get(
      `/service-api/books?page=1&pageSize=1&query=${queryKeyword}&isStoreRecent=true`
    ),
};

export default bookAPI;

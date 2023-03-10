import { publicApi } from '../core/axios';
import type {
  APIBook,
  APIBookInfo,
  APIDefaultBook,
  APICreateBookCommentRequest,
} from '@/types/book';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/api/books?query=${query}`
    ),
  getBookInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookInfo>(`/api/books/${bookId}`),
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
};

export default bookAPI;

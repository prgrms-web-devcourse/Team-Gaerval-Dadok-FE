import { publicApi } from '../core/axios';
import type { APIBook, APIBookInfo, APIDefaultBook } from '@/types/book';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/api/books?query=${query}`
    ),
  getBookInfo: (bookId: APIDefaultBook['bookId']) =>
    publicApi.get<APIBookInfo>(`/api/books/${bookId}`),
  createBook: ({ book }: { book: APIBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/api/books', book),
};

export default bookAPI;

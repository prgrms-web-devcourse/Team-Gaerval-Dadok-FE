import { publicApi } from '../core/axios';
import type { APIBook } from '@/types/book';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/api/books?query=${query}`
    ),

  createBook: ({ book }: { book: APIBook }) =>
    publicApi.post<Pick<APIBook, 'bookId'>>('/api/books', book),
};

export default bookAPI;

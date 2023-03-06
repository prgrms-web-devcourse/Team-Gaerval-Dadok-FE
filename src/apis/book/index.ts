import { publicApi } from '../core/axios';
import type { APIBook } from '@/types/book';

const bookAPI = {
  getBooks: ({ query }: { query: string }) =>
    publicApi.get<{ searchBookResponseList: APIBook[] }>(
      `/api/books?query=${query}`
    ),
};

export default bookAPI;

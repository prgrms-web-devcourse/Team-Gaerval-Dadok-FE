import { APIBookshelf } from '@/types/bookshelf';

const bookShelfKeys = {
  all: ['bookShelf'] as const,
  info: (bookshelfId: APIBookshelf['bookshelfId']) =>
    [...bookShelfKeys.all, bookshelfId] as const,
  books: (bookshelfId: APIBookshelf['bookshelfId']) =>
    [...bookShelfKeys.all, bookshelfId, 'books'] as const,
  summary: (userId: string) => [...bookShelfKeys.all, 'summary', userId],
};

export default bookShelfKeys;

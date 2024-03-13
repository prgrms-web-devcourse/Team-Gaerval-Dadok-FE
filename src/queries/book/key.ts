import { APIBook } from '@/types/book';

const bookKeys = {
  all: ['book'] as const,
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (bookId: APIBook['bookId']) =>
    [...bookKeys.details(), bookId] as const,
  bookmark: (bookId: APIBook['bookId']) =>
    [...bookKeys.detail(bookId), 'bookmark'] as const,
  comments: (bookId: APIBook['bookId']) =>
    [...bookKeys.detail(bookId), 'comments'] as const,
  bookSearch: (query: string) =>
    [...bookKeys.all, 'bookSearch', query] as const,
  recentSearch: () => [...bookKeys.all, 'recentSearch'] as const,
  bestSeller: () => [...bookKeys.all, 'bestSeller'] as const,
};

export default bookKeys;

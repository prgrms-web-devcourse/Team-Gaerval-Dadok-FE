import { APIBook } from '@/types/book';

const bookKeys = {
  all: ['book'],
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (bookId: APIBook['bookId']) =>
    [...bookKeys.details(), bookId] as const,
  bestSeller: () => [...bookKeys.all, 'bestSeller'],
};

export default bookKeys;

import { APIBook, APIBestSellerSearchRangeTypes } from '@/types/book';

const bookKeys = {
  all: ['book'],
  details: () => [...bookKeys.all, 'detail'] as const,
  detail: (bookId: APIBook['bookId']) =>
    [...bookKeys.details(), bookId] as const,
  bestSellers: () => [...bookKeys.all, 'bestSeller'] as const,
  bestSeller: (searchRange: APIBestSellerSearchRangeTypes) =>
    [...bookKeys.bestSellers(), searchRange] as const,
};

export default bookKeys;

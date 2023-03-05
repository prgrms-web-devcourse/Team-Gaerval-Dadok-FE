import { APISummaryBook } from './book';

export interface APISummaryBookshelf extends APIBookshelf {
  bookshelfId: number;
  bookshelfName: string;
}

export interface APIBookshelfBookList extends APIBookshelf {
  count: number;
  empty: boolean;
  first: boolean;
  last: boolean;
}

export interface APIBookshelf {
  books: APISummaryBook[];
}

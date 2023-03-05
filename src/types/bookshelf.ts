import { APISummaryBook } from './book';

export interface APISummaryBookshelf {
  bookshelfId: number;
  bookshelfName: string;
  books: APISummaryBook[];
}

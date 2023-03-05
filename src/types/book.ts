export interface APISummaryBook {
  bookId: number;
  title: string;
  imageUrl: string;
}

export type APIBook = {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  contents: string;
  imageUrl: string;
  url: string;
  publisher: string;
};

export type APIBookshelfBookList = {
  count: number;
  books: APIBook[];
  empty: boolean;
  first: boolean;
  last: boolean;
};

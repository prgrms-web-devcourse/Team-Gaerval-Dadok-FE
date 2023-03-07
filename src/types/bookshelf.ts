import { APIBook, APIDefaultBook } from './book';
import { APIProfileJob } from './job';

export interface APIDefaultBookshelf {
  bookshelfId: number;
  bookshelfName: string;
}

export interface APIProfileBookshelf extends APIDefaultBookshelf {
  books: APIDefaultBook[];
}

export interface APIBookshelfBookList {
  count: number;
  books: APIBook[];
  empty: boolean;
  first: boolean;
  last: boolean;
}

export interface APIBookshelfInfo extends APIDefaultBookshelf {
  isPublic: boolean;
  userId: number;
  username: string;
  userNickname: string;
  userProfileImage: string;
  job: APIProfileJob;
}

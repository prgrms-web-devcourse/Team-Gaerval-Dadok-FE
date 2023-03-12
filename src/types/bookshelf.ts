import { APIBook, APIDefaultBook } from './book';
import { APIJobGroup, APIProfileJob } from './job';

export interface APIDefaultBookshelf {
  bookshelfId: number;
  bookshelfName: string;
}

export interface APIBookshelfCursorId {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
}

export interface APIProfileBookshelf extends APIDefaultBookshelf {
  books: APIDefaultBook[];
}

export interface APIBookshelfBookList extends APIBookshelfCursorId {
  books: APIBook[];
}

export interface APIBookshelfInfo extends APIDefaultBookshelf {
  isPublic: boolean;
  userId: number;
  username: string;
  userNickname: string;
  userProfileImage: string;
  job: APIProfileJob;
}

export interface APIBookshelfResponses extends APIBookshelfCursorId {
  jobGroupName: APIJobGroup['name'];
  bookshelfResponses: APIProfileBookshelf[];
}

import { APIBook } from './book';
import { APIJobGroup, APIProfileJob } from './job';

interface APIBookshelfBook extends APIBook {
  bookshelfItemId: number;
}

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
  books: APIBook[];
}

export interface APIBookshelfBookList extends APIBookshelfCursorId {
  books: APIBookshelfBook[];
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

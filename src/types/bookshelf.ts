import { APIBook, APIDefaultBook } from './book';

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
  // TODO: APIJob 타입 나오면 상속받기
  job: {
    jobGroupKoreanName: string;
    jobGroupName: string;
    jobNameKoreanName: string;
    jobName: string;
    order: number;
  };
}

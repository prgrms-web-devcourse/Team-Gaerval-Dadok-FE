import { Pagination } from './common';
import { APIJobGroup } from './job';
import { APIUser } from './user';

export interface APIBook {
  bookId: number;
  title: string;
  author: string;
  isbn: string;
  contents: string;
  url: string;
  imageUrl: string;
  publisher: string;
}

export interface APIBookSearched
  extends Pick<
    APIBook,
    'title' | 'author' | 'isbn' | 'contents' | 'url' | 'imageUrl' | 'publisher'
  > {
  apiProvider: string;
}

export interface APIBookDetail extends APIBook {
  apiProvider: string;
  imageKey: string;
}

type APIBookDetailUser = {
  userId: APIUser['userId'];
  profileImage: APIUser['profileImage'];
};

export interface APIBookDetailUserList {
  bookId: APIBook['bookId'];
  totalCount: number;
  isInMyBookshelf: boolean;
  users: APIBookDetailUser[];
}

export interface APIBookRecommended
  extends Pick<APIBook, 'bookId' | 'title' | 'author' | 'isbn' | 'url'> {
  jobGroup: APIJobGroup['koreanName'];
  count: number;
}

export type APIBookComment = {
  commentId: number;
  comment: string;
};

export type APIBookCommentInfo = {
  commentId: APIBookComment['commentId'];
  contents: APIBookComment['comment'];
  bookId: APIBook['bookId'];
  userId: APIUser['userId'];
  userProfileImage: APIUser['profileImage'];
  createdAt: string;
  modifiedAt: string;
  nickname: APIUser['nickname'];
  writtenByCurrentUser: boolean;
};

export interface APIBookCommentPagination extends Pagination {
  bookComments: APIBookCommentInfo[];
}

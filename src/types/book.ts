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

export interface APISearchedBook
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

type APIBookmarkedUser = {
  userId: APIUser['userId'];
  profileImage: APIUser['profileImage'];
};

export interface APIBookmarkedUserList {
  bookId: APIBook['bookId'];
  totalCount: number;
  isInMyBookshelf: boolean;
  users: APIBookmarkedUser[];
}

export interface APIRecommendedBook
  extends Pick<APIBook, 'bookId' | 'title' | 'author' | 'isbn' | 'url'> {
  jobGroup: APIJobGroup['koreanName'];
  count: number;
}

export interface APIBookComment {
  commentId: number;
  contents: string;
  bookId: APIBook['bookId'];
  userId: APIUser['userId'];
  userProfileImage: APIUser['profileImage'];
  createdAt: string;
  modifiedAt: string;
  nickname: APIUser['nickname'];
  writtenByCurrentUser: boolean;
}

export interface APIPatchBookCommentRequest
  extends Pick<APIBookComment, 'commentId'> {
  comment: string;
}

export interface APIBookCommentPagination extends Pagination {
  bookComments: APIBookComment[];
}

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

export interface APISearchedWordInfo {
  keyword: string;
  modifiedAt: string;
}

export interface APIRecentSearches {
  count: number;
  isEmpty: boolean;
  bookRecentSearchResponses: APISearchedWordInfo[];
}

export interface APISearchedBookPagination {
  searchBookResponseList: APISearchedBook[];
  requestedPageNumber: number;
  requestedPageSize: number;
  isLast: boolean;
  pageableCount: number;
  totalCount: number;
}

export interface APIBookDetail extends APIBook {
  apiProvider: string;
  imageKey: string;
}

export interface BookDetail {
  bookId: APIBookDetail['bookId'];
  title: APIBookDetail['title'];
  author: APIBookDetail['author'];
  isbn: APIBookDetail['isbn'];
  summary: APIBookDetail['contents'];
  bookUrl: APIBookDetail['url'];
  imageUrl: APIBookDetail['imageUrl'];
  publisher: APIBookDetail['publisher'];
}

export interface APIBookmarkedUserList {
  bookId: APIBook['bookId'];
  totalCount: number;
  isInMyBookshelf: boolean;
  users: Pick<APIUser, 'userId' | 'profileImage'>[];
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

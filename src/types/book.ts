import { BookSearchPagination, Pagination } from './common';
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

export interface APISearchedBook extends Omit<APIBook, 'bookId'> {
  apiProvider: string;
}

export interface APIBookRecentSearchResponse {
  keyword: string;
  modifiedAt: string;
}

export interface APIRecentSearches {
  count: number;
  isEmpty: boolean;
  bookRecentSearchResponses: APIBookRecentSearchResponse[];
}

export interface APISearchedBookPagination extends BookSearchPagination {
  searchBookResponseList: APISearchedBook[];
}

export interface APIBookDetail extends APIBook {
  apiProvider: string;
  imageKey: string;
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

export interface APIBestSeller {
  isbn: string;
  title: string;
  author: string;
  cover: string;
  bestRank: number;
  link: string;
}

export interface APIBestSellerRes {
  item: APIBestSeller[];
  itemsPerPage: number;
  link: string;
  logo: string;
  pubDate: string;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  startIndex: number;
  title: string;
  totalResults: number;
  version: string;
}

// export interface APIBestSellerPagination extends BookSearchPagination {
//   bestSellerBookResponseList: APIBestSeller[];
// }

export type APIBestSellerSearchRangeTypes = 'WEEKLY' | 'MONTHLY' | 'YEARLY';

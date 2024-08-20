import { APIBook } from './book';
import { Pagination } from './common';
import { APIJobGroup, APIProfileJob } from './job';
import { APIUser } from './user';

interface APISearchedBook extends APIBook {
  bookshelfItemId: number;
}

interface APIRecommendedBook extends APIBook {
  jobGroup: APIJobGroup['name'];
  count: number;
}

type APIRecommendedJobGroup = {
  jobGroup: APIJobGroup['name'];
  jobGroupKoreanName: APIJobGroup['koreanName'];
};

export type APIBookshelf = {
  bookshelfId: number;
  bookshelfName: string;
  likeCount: number;
  books: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>[];
};

export interface APIBookshelfInfo
  extends Pick<APIBookshelf, 'bookshelfId' | 'bookshelfName' | 'likeCount'>,
    Pick<APIUser, 'userId' | 'name'> {
  isLiked: boolean;
  isPublic: boolean;
  job: APIProfileJob;
  userNickname: string;
  userProfileImage: string;
}

export interface APIBookshelfPagination extends Pagination {
  books: APISearchedBook[];
}

export interface APIRecommendedBooksPagination
  extends Pagination,
    APIRecommendedJobGroup {
  books: APIRecommendedBook[];
}

export interface APIRecommendedBookshelf {
  bookshelfResponses: APIBookshelf[];
}

export interface APIAuthRecommendedBookshelf extends APIRecommendedJobGroup {
  bookshelfResponses: APIBookshelf[];
}

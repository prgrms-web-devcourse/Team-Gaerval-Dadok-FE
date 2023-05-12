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
  books: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>[];
};

export interface APIBookshelfInfo
  extends Pick<APIBookshelf, 'bookshelfId' | 'bookshelfName'>,
    Pick<APIUser, 'userId' | 'name' | 'nickname' | 'profileImage'> {
  isPublic: boolean;
  job: APIProfileJob;
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

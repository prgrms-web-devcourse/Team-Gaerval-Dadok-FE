export interface APIDefaultBook {
  bookId: number;
  title: string;
  imageUrl: string;
}

export interface APISubBook {
  author: string;
  isbn: string;
  url: string;
  publisher: string;
}

export interface APIRecommendedBook extends APIDefaultBook, APISubBook {
  jobGroup: string;
  jobName: string;
  count: number;
}

export interface APIBook extends APIDefaultBook, APISubBook {
  contents: string;
}

export interface APIBookInfo extends APIDefaultBook, APISubBook {
  contents: string;
  apiProvider: string;
  imageKey: string;
}

export interface APICreateBookCommentRequest {
  comment: string;
}

export interface APIBookComment {
  commentId: number;
  contents: string;
  bookId: number;
  userId: number;
  userProfileImage: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  writtenByCurrentUser: boolean;
}

export interface APIBookCommentList {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
  bookGroupComments: APIBookComment[];
}

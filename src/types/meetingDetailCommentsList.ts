export interface APIBookGroupComments {
  commentId: number;
  contents: string;
  bookGroupId: number;
  parentCommentId: number;
  userId: number;
  userProfileImage: string;
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  writtenByCurrentUser: boolean;
}

export interface APIMeetingDetailCommentsList {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
  bookGroupComments: APIBookGroupComments[];
}

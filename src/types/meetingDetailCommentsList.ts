export interface APIDateAt {
  createdAt: number;
  modifiedAt: number;
}

export interface APIBookGroupComments {
  commentId: number;
  contents: string;
  bookGroupId: number;
  parentCommentId: number;
  userId: number;
  userProfileImage: string;
  createdAt: APIDateAt[];
  modifiedAt: APIDateAt[];
}

export interface APIMeetingDetailCommentsList {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
  bookGroupComments: APIBookGroupComments[];
}

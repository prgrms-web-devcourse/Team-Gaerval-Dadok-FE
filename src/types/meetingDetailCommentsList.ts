export interface APIDateAt {
  createdAt: number;
  modifiedAt: number;
}

export interface APIBookGroupComments extends APIDateAt {
  commentId: number;
  contents: string;
  bookGroupId: number;
  parentCommentId: number;
  userId: number;
  userProfileImage: string;
}

export interface APIMeetingDetailCommentsList {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
  bookGroupComments: APIBookGroupComments[];
}

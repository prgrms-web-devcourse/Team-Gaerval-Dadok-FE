import { APIBook } from './book';
import { APIUser, Writer } from './user';
import { Pagination } from './common';

type APIGroupOwner = {
  id: APIUser['userId'];
  profileUrl: APIUser['profileImage'];
  // FIXME nickname: APIUser['nickname'] nullable 하지 않게 수정 후 다시 반영
  nickname: string;
};

type APIGroupBook = {
  id: APIBook['bookId'];
  title: APIBook['title'];
  imageUrl: APIBook['imageUrl'];
};

export interface APIGroup {
  title: string;
  introduce: string;
  startDate: string;
  endDate: string;
  maxMemberCount: number | null;
  hasJoinPasswd: boolean;
  isPublic: boolean;
  bookGroupId: number;
  currentMemberCount: number;
  commentCount: number;
  book: APIGroupBook;
  owner: APIGroupOwner;
}

export interface APIGroupDetail extends APIGroup {
  joinQuestion: string;
  currentMemberCount: number;
  isOwner: boolean;
  isGroupMember: boolean;
}

export interface APIGroupPagination extends Pagination {
  bookGroups: (APIGroup & { memberCount: number })[];
}

export interface APICreateGroup
  extends Pick<APIBook, 'bookId'>,
    Pick<
      APIGroupDetail,
      | 'title'
      | 'startDate'
      | 'endDate'
      | 'maxMemberCount'
      | 'introduce'
      | 'hasJoinPasswd'
      | 'joinQuestion'
      | 'isPublic'
    > {
  joinPasswd: string;
}

export interface APIGroupComment {
  commentId: number;
  contents: string;
  bookGroupId: APIGroup['bookGroupId'];
  parentCommentId: number;
  userId: APIUser['userId'];
  userProfileImage: APIUser['profileImage'];
  createdAt: string;
  modifiedAt: string;
  nickname: string;
  writtenByCurrentUser: boolean;
}

export interface APIGroupCommentPagination extends Pagination {
  bookGroup: { isPublic: APIGroup['isPublic'] };
  bookGroupComments: APIGroupComment[];
}

export type BookGroupDetail = {
  title: APIGroupDetail['title'];
  description: APIGroupDetail['introduce'];
  bookId: APIBook['bookId'];
  owner: { isMe: boolean; id: APIUser['userId'] };
  date: { start: APIGroupDetail['startDate']; end: APIGroupDetail['endDate'] };
  memberCount: {
    current: APIGroupDetail['currentMemberCount'];
    max: APIGroupDetail['maxMemberCount'];
  };
  isPublic: APIGroupDetail['isPublic'];
  isMember: APIGroupDetail['isGroupMember'];
};

export type BookGroupComment = {
  id: APIGroup['bookGroupId'];
  writer: Writer;
  createdAt: APIGroupComment['createdAt'];
  content: APIGroupComment['contents'];
};

export type BookGroupEdit = {
  title: APIGroupDetail['title'];
  introduce: APIGroupDetail['introduce'];
  maxMemberCount: APIGroupDetail['maxMemberCount'];
  startDate: APIGroupDetail['startDate'];
  endDate: APIGroupDetail['endDate'];
};

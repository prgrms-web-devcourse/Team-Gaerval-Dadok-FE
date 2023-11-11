import { APIBook } from './book';
import { APIUser } from './user';
import { Pagination } from './common';

type APIGroupOwner = {
  id: APIUser['userId'];
  profileUrl: APIUser['profileImage'];
  nickname: APIUser['nickname'];
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

export type BookGroupDetail = {
  title: APIGroup['title'];
  description: APIGroup['introduce'];
  bookId: APIBook['bookId'];
  owner: { isMe: boolean; id: APIUser['userId'] };
  date: { start: APIGroup['startDate']; end: APIGroup['endDate'] };
  memberCount: {
    current: APIGroup['currentMemberCount'];
    max: APIGroup['maxMemberCount'];
  };
  isPublic: APIGroup['isPublic'];
  isMember: APIGroupDetail['isGroupMember'];
};

export interface APIGroupPagination extends Pagination {
  bookGroups: APIGroup[];
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
  nickname: APIUser['nickname'];
  writtenByCurrentUser: boolean;
}

export interface APIGroupCommentPagination extends Pagination {
  bookGroupComments: APIGroupComment[];
}

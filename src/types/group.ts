import { APIDefaultBook } from './book';
import { APIUser } from './user';
import { Pagination } from './common';

type APIGroupOwner = {
  id: APIUser['userId'];
  profileUrl: APIUser['profileImage'];
  nickname: APIUser['nickname'];
};

type APIGroupBook = {
  id: APIDefaultBook['bookId'];
  title: APIDefaultBook['title'];
  imageUrl: APIDefaultBook['imageUrl'];
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
  memberCount: number;
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
  bookGroups: APIGroup[];
}

export interface APICreateGroup
  extends Pick<APIDefaultBook, 'bookId'>,
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

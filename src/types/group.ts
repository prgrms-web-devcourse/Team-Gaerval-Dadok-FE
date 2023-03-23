import { APIDefaultBook } from './book';
import { APIUser } from './user';
import { DefaultPagination } from './common';

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

interface APIDefaultGroup {
  title: string;
  introduce: string;
  startDate: string;
  endDate: string;
  maxMemberCount: number | null;
  hasJoinPasswd: boolean;
  isPublic: boolean;
}

export interface APIGroup extends APIDefaultGroup {
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

export interface APIGroupPagination extends DefaultPagination {
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

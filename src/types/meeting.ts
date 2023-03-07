export interface APIMeetingOwner {
  id: number;
  profileUrl: string;
  nickname: string;
}

export interface APIMeetingBook {
  id: number;
  imageUrl: string;
}

export interface APIMeetingGroup {
  bookGroupId: number;
  title: string;
  introduce: string;
  maxMemberCount: number;
  hasJoinPasswd: true;
  isPublic: false;
  memberCount: number;
  commentCount: number;
  book: APIMeetingBook;
  owner: APIMeetingOwner;
}

export interface APIEntireMeetingList {
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  count: number;
  isEmpty: boolean;
  bookGroups: APIMeetingGroup[];
}

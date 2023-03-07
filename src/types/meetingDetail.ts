export interface APIOwner {
  id: number;
}

export interface APIBook {
  id: number;
  title: string;
  imageUrl: string;
}

export interface APIMeetingDetail {
  bookGroupId: number;
  title: string;
  introduce: string;
  startDate: string;
  endDate: string;
  hasJoinPasswd: boolean;
  isPublic: boolean;
  maxMemberCount: number;
  currentMemberCount: number;
  commentCount: number;
  owner: APIOwner;
  book: APIBook;
  isOwner: boolean;
  isGroupMember: boolean;
}

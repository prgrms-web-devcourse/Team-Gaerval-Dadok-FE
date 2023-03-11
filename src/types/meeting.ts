export interface APIMeetingOwner {
  id: number;
  profileUrl: string;
  nickname: string;
}

export interface APIMeetingBook {
  id: number;
  imageUrl: string;
}

interface APIDefaultMeeting {
  title: string;
  introduce: string;
  maxMemberCount: number | null;
  hasJoinPasswd: boolean;
  isPublic: boolean;
}

export interface APIMeetingGroup extends APIDefaultMeeting {
  bookGroupId: number;
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

export interface APICreateMeetingReqeust extends APIDefaultMeeting {
  bookId: number;
  joinQuestion: string;
  joinPasswd: string;
  startDate: string;
  endDate: string;
}

export interface APIBookshelfInfo {
  bookshelfId: number;
  bookshelfName: string;
  isPublic: boolean;
  userId: number;
  username: string;
  userNickname: string;
  userProfileImage: string;
  job: {
    jobGroupKoreanName: string;
    jobGroupName: string;
    jobNameKoreanName: string;
    jobName: string;
    order: number;
  };
}

export interface APIUser {
  userId: number;
  name: string | null;
  nickname: string;
  email: string | null;
  profileImage: string;
  gender: true;
  authProvider: true;
  job: {
    jobGroupKoreanName: string | null;
    jobGroupName: string | null;
    jobNameKoreanName: string | null;
    jobName: string | null;
    order: string | null;
  };
}

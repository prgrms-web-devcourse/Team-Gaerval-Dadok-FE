export interface APIUser {
  userId: number;
  name: string | null;
  nickname: string;
  email: string | null;
  profileImage: string;
  gender: true;
  authProvider: true;
  job: {
    jobGroupKoreanName: string;
    jobGroupName: string;
    jobNameKoreanName: string;
    jobName: string;
    order: string;
  } | null;
}

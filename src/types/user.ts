import { APIProfileJob } from './job';

export interface APIUser {
  userId: number;
  name: string | null;
  nickname: string | null;
  oauthNickname: string;
  email: string | null;
  profileImage: string;
  gender: string;
  authProvider: string;
  job: APIProfileJob;
}

export interface APIUserProfile {
  userId: number;
  nickname: string;
  profileImage: string;
  gender: string | null;
  job: APIProfileJob;
}

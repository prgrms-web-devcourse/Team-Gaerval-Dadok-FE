import { APIProfileJob } from './job';

export interface APIUserProfile {
  userId: number;
  nickname: string;
  profileImage: string;
  gender: string | null;
  job: APIProfileJob;
}

export interface APIMyProfile extends Omit<APIUserProfile, 'nickname'> {
  name: string | null;
  nickname: string | null;
  oauthNickname: string;
  email: string | null;
  gender: string;
  authProvider: string;
}

export type APIUser = APIUserProfile & { name: string | null };

export type Writer = {
  id: APIUser['userId'];
  profileImageSrc: APIUser['profileImage'];
  name: APIUser['nickname'];
};

import { APIJob } from './job';

export interface APIUser {
  userId: number;
  name?: string;
  nickname: string;
  email?: string;
  profileImage: string;
  gender: string;
  authProvider: string;
  job?: APIJob;
}

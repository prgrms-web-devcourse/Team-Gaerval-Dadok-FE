import { APIJob } from './job';

export interface APIUser {
  userId: number;
  name: string | null;
  nickname: string;
  email: string | null;
  profileImage: string;
  gender: true;
  authProvider: true;
  job: APIJob;
}

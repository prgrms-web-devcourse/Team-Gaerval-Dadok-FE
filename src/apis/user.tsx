import { APIJob, APIJobGroup } from '@/types/job';
import { APIUser } from '@/types/user';
import { publicApi } from './core/axios';

const userAPI = {
  getUserProfile: ({ userId }: { userId: APIUser['userId'] }) =>
    publicApi.get<APIUser>(`/service-api/users/${userId}/profile`),

  getMyProfile: () => publicApi.get<APIUser>('/service-api/users/me'),

  updateMyProfile: ({
    nickname,
    job,
  }: {
    nickname: APIUser['nickname'];
    job: { jobGroup: APIJobGroup['name']; jobName: APIJob['name'] };
  }) => publicApi.put<APIUser>('/service-api/users/profile', { nickname, job }),

  logout: () => publicApi.post('/service-api/auth/logout'),
};

export default userAPI;

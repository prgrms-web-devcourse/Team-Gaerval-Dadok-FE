import { APIJob, APIJobGroup } from '@/types/job';
import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const userAPI = {
  getUserProfile: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIUser>(`/api/users/${id}/profile`),

  getMyProfile: () => publicApi.get<APIUser>('/api/users/me'),

  updateMyProfile: ({
    nickname,
    job,
  }: {
    nickname: APIUser['nickname'];
    job: { jobGroup: APIJobGroup['name']; jobName: APIJob['name'] };
  }) => publicApi.put<APIUser>('/api/users/profile', { nickname, job }),
};

export default userAPI;

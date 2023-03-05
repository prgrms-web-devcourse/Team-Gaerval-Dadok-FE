import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

const userAPI = {
  getUserProfile: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIUser>(`/api/users/${id}/profile`),

  getMyProfile: () => publicApi.get<APIUser>('/api/users/me'),
};

export default userAPI;

import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

export default {
  getOtherProfile: ({ id }: { id: APIUser['userId'] }) =>
    publicApi.get<APIUser>(`/api/users/${id}/profile`, { data: null }),

  getMyProfile: () => publicApi.get<APIUser>('/api/users/me', { data: null }),
} as const;

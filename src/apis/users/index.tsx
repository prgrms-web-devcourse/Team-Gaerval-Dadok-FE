import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

export default {
  getProfile: ({ id }: { id: APIUser['userId'] }) => {
    return publicApi.get<APIUser>(`/api/users/${id}`, { data: null });
  },
} as const;

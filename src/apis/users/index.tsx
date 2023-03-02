import { APIUser } from '@/types/user';
import { publicApi } from '../core/axios';

export default {
  getProfile: ({ id }: { id: APIUser['userId'] | string }) =>
    publicApi.get<APIUser>(`/api/users/${id}`, { data: null }),
} as const;

import { APIUser } from '@/types/user';

const userKeys = {
  all: ['user'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: APIUser['userId']) => [...userKeys.details(), id] as const,
  me: () => [...userKeys.details(), 'me'] as const,
};

export default userKeys;

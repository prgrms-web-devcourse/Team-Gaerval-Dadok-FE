import userAPI from '@/apis/users';
import { useQuery } from '@tanstack/react-query';
import type { APIUser } from '@/types/user';
import type { QueryOptions } from '@/types/query';

const useUserProfileQuery = (
  userId: APIUser['userId'],
  options?: QueryOptions<APIUser>
) => {
  return useQuery(
    ['user', String(userId)],
    async () =>
      await userAPI.getUserProfile({ userId }).then(({ data }) => data),
    options
  );
};

export default useUserProfileQuery;

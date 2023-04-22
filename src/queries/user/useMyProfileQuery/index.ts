import { useQuery } from '@tanstack/react-query';
import userAPI from '@/apis/users';
import type { QueryOptions } from '@/types/query';
import type { APIUser } from '@/types/user';

const useMyProfileQuery = (options?: QueryOptions<APIUser>) =>
  useQuery(
    ['user', 'me'],
    () => userAPI.getMyProfile().then(({ data }) => data),
    options
  );

export default useMyProfileQuery;

import userAPI from '@/apis/users';
import useQueryWithSuspense, {
  useQueryOptionWithOutSuspense,
} from '@/hooks/useQueryWithSuspense';
import type { APIUser } from '@/types/user';

const useUserProfileQuery = (
  userId: APIUser['userId'],
  options?: useQueryOptionWithOutSuspense<APIUser>
) =>
  useQueryWithSuspense(
    ['user', String(userId)],
    () => userAPI.getUserProfile({ userId }).then(({ data }) => data),
    options
  );

export default useUserProfileQuery;

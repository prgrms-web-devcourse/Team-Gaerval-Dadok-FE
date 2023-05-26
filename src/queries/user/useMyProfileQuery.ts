import userAPI from '@/apis/users';
import type { APIUser } from '@/types/user';
import useQueryWithSuspense, {
  useQueryOptionWithOutSuspense,
} from '@/hooks/useQueryWithSuspense';

const useMyProfileQuery = (options?: useQueryOptionWithOutSuspense<APIUser>) =>
  useQueryWithSuspense(
    ['user', 'me'],
    () => userAPI.getMyProfile().then(({ data }) => data),
    options
  );

export default useMyProfileQuery;

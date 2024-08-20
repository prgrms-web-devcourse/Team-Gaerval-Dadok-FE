import userAPI from '@/apis/user';
import type { APIUser } from '@/types/user';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';
import userKeys from './key';

const useMyProfileQuery = (options?: UseQueryOptionWithoutSuspense<APIUser>) =>
  useQueryWithSuspense(
    userKeys.me(),
    () => userAPI.getMyProfile().then(({ data }) => data),
    options
  );

export default useMyProfileQuery;

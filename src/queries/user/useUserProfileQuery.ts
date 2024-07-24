import type { APIUser, APIUserProfile } from '@/types/user';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';
import { getSafeNickname } from '@/utils/converter';
import userAPI from '@/apis/user';
import userKeys from './key';

const useUserProfileQuery = (
  userId: APIUser['userId'],
  options?: UseQueryOptionWithoutSuspense<APIUserProfile>
) =>
  useQueryWithSuspense(
    userKeys.detail(userId),
    () =>
      userAPI.getUserProfile({ userId }).then(({ data }) => ({
        ...data,
        nickname: getSafeNickname(data.userId, data.nickname),
      })),
    options
  );

export default useUserProfileQuery;

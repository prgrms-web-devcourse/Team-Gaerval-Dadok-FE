import userAPI from '@/apis/user';
import type { APIUser } from '@/types/user';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';
import userKeys from './key';

const useMyProfileQuery = <TData = APIUser>(
  options?: UseQueryOptionWithoutSuspense<APIUser, unknown, TData>
) =>
  useQueryWithSuspense(
    userKeys.me(),
    () => userAPI.getMyProfile().then(({ data }) => data),
    { ...options, staleTime: Infinity }
  );

export default useMyProfileQuery;

export const useMyProfileId = (
  options?: Omit<
    UseQueryOptionWithoutSuspense<APIUser, unknown, unknown>,
    'select'
  >
) => useMyProfileQuery({ ...options, select: data => data.userId });

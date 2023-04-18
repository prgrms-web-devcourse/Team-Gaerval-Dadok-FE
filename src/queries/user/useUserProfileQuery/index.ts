import userAPI from '@/apis/users';
import { APIUser } from '@/types/user';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Options = Pick<
  UseQueryOptions<Awaited<ReturnType<typeof userAPI.getMyProfile>>['data']>,
  'enabled' | 'suspense'
>;

const useUserProfileQuery = ({
  userId,
  options,
}: {
  userId: APIUser['userId'];
  options?: Options;
}) => {
  return useQuery(
    ['user', userId],
    async () =>
      await userAPI.getUserProfile({ userId }).then(({ data }) => data),
    options
  );
};

export default useUserProfileQuery;

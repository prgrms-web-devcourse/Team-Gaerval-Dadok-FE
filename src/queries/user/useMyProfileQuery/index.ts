import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import userAPI from '@/apis/users';

type Options = Pick<
  UseQueryOptions<Awaited<ReturnType<typeof userAPI.getMyProfile>>['data']>,
  'suspense'
>;

const useMyProfileQuery = (options?: Options) =>
  useQuery(
    ['user', 'me'],
    () => userAPI.getMyProfile().then(({ data }) => data),
    options
  );

export default useMyProfileQuery;

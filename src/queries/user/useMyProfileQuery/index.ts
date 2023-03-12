import { useQuery } from '@tanstack/react-query';
import userAPI from '@/apis/users';

const useMyProfileQuery = (fetching = true) =>
  useQuery(
    ['user', 'me'],
    () => userAPI.getMyProfile().then(({ data }) => data),
    { enabled: fetching }
  );

export default useMyProfileQuery;

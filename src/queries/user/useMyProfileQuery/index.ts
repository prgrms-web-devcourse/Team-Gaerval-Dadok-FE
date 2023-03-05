import { useQuery } from '@tanstack/react-query';
import userAPI from '@/apis/users';

const useMyProfileQuery = () =>
  useQuery(['user', 'me'], () =>
    userAPI.getMyProfile().then(({ data }) => data)
  );

export default useMyProfileQuery;

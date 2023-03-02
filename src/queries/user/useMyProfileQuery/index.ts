import api from '@/apis';
import { useQuery } from '@tanstack/react-query';

const useMyProfileQuery = () =>
  useQuery(['user', 'me'], () =>
    api.users.getMyProfile().then(({ data }) => data)
  );

export default useMyProfileQuery;

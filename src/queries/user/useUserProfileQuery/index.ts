import api from '@/apis';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useUserProfileQuery = ({ id }: { id: APIUser['userId'] | string }) => {
  return useQuery(['user', id], async () => {
    const { data } = await api.users.getProfile({ id });
    return data;
  });
};

export default useUserProfileQuery;

import userAPI from '@/apis/users';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useUserProfileQuery = ({ id }: { id: APIUser['userId'] }) => {
  return useQuery(['user', id], async () => {
    const { data } = await userAPI.getUserProfile({ id });
    return data;
  });
};

export default useUserProfileQuery;

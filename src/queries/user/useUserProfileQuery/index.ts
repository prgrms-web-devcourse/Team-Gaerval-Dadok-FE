import userAPI from '@/apis/users';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useUserProfileQuery = ({ userId }: { userId: APIUser['userId'] }) => {
  return useQuery(['user', userId], async () => {
    const { data } = await userAPI.getUserProfile({ userId });
    return data;
  });
};

export default useUserProfileQuery;

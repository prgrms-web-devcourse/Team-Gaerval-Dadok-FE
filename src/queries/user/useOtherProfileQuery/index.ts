import api from '@/apis';
import { APIUser } from '@/types/user';
import { useQuery } from '@tanstack/react-query';

const useOtherProfileQuery = ({ id }: { id: APIUser['userId'] }) => {
  return useQuery(['user', id], async () => {
    const { data } = await api.users.getOtherProfile({ id });
    return data;
  });
};

export default useOtherProfileQuery;

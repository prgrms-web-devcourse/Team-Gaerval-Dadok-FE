import GroupAPI from '@/apis/group';
import { useQuery } from '@tanstack/react-query';

const useMyGroupsQuery = () =>
  useQuery(['groups', 'me'], () =>
    GroupAPI.getMyGroups().then(({ data }) => data)
  );

export default useMyGroupsQuery;

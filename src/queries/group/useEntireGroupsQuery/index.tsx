import GroupAPI from '@/apis/group';
import { useQuery } from '@tanstack/react-query';

const useEntireGroupsQuery = () =>
  useQuery(['entireGroups'], () =>
    GroupAPI.getEntireGroups().then(({ data }) => data)
  );

export default useEntireGroupsQuery;

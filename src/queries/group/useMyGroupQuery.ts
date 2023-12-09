import GroupAPI from '@/apis/group';
import { useQuery } from '@tanstack/react-query';
import type { QueryOptions } from '@/types/query';
import type { APIGroupPagination } from '@/types/group';
import bookGroupKeys from './key';

const useMyGroupsQuery = (options?: QueryOptions<APIGroupPagination>) =>
  useQuery(
    bookGroupKeys.me(),
    () => GroupAPI.getMyGroups().then(({ data }) => data),
    options
  );

export default useMyGroupsQuery;

import GroupAPI from '@/apis/group';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import type { QueryOptions } from '@/types/query';
import type { APIGroupPagination } from '@/types/group';
import bookGroupKeys from './key';

const useMyGroupsQuery = (options?: QueryOptions<APIGroupPagination>) =>
  useQueryWithSuspense(
    bookGroupKeys.me(),
    () => GroupAPI.getMyGroups().then(({ data }) => data),
    options
  );

export default useMyGroupsQuery;

import GroupAPI from '@/apis/group';
import { useInfiniteQuery } from '@tanstack/react-query';

const useEntireGroupsQuery = () =>
  useInfiniteQuery(
    ['entireGroups'],
    ({ pageParam = '' }) =>
      GroupAPI.getEntireGroups(pageParam).then(({ data }) => data),
    {
      getNextPageParam: lastPage =>
        !lastPage.isLast ? lastPage.bookGroups[9].bookGroupId : undefined,
      staleTime: 3000,
    }
  );

export default useEntireGroupsQuery;

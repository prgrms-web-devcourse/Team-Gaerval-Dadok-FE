import GroupAPI from '@/apis/group';
import { useQuery } from '@tanstack/react-query';
import { APIGroupDetail } from '@/types/group';

const useGroupInfoQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIGroupDetail['bookGroupId'];
}) => {
  return useQuery(['groupDetailInfo', bookGroupId], () =>
    GroupAPI.getGroupDetailInfo({ bookGroupId }).then(({ data }) => data)
  );
};

export default useGroupInfoQuery;

import GroupAPI from '@/apis/group';
import { APIGroupDetail } from '@/types/group';
import { useQuery } from '@tanstack/react-query';

const useGroupCommentsQuery = ({
  bookGroupId,
}: {
  bookGroupId: APIGroupDetail['bookGroupId'];
}) =>
  useQuery(['group', bookGroupId, 'comments'], () =>
    GroupAPI.getGroupComments({ bookGroupId }).then(({ data }) => data)
  );

export default useGroupCommentsQuery;

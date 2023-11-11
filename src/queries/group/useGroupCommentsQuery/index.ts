import { useQuery } from '@tanstack/react-query';
import { QueryOptions } from '@/types/query';
import { APIGroupCommentPagination, APIGroupDetail } from '@/types/group';

import GroupAPI from '@/apis/group';
import bookGroupKeys from '../key';

const transformComments = ({ bookGroupComments }: APIGroupCommentPagination) =>
  bookGroupComments.map(comment => ({
    id: comment.commentId,
    writer: {
      id: comment.userId,
      profileImageSrc: comment.userProfileImage,
      name: comment.nickname,
    },
    createdAt: comment.createdAt,
    content: comment.contents,
  }));

const useGroupCommentsQuery = <TData = APIGroupCommentPagination>(
  groupId: APIGroupDetail['bookGroupId'],
  select: QueryOptions<APIGroupCommentPagination, TData>['select']
) =>
  useQuery({
    queryKey: bookGroupKeys.comments(groupId),
    queryFn: () =>
      GroupAPI.getGroupComments({ bookGroupId: groupId }).then(
        ({ data }) => data
      ),
    select,
  });

export default useGroupCommentsQuery;

export const useBookGroupComments = (groupId: APIGroupDetail['bookGroupId']) =>
  useGroupCommentsQuery(groupId, transformComments);

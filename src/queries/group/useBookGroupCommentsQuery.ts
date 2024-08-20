import { useQuery } from '@tanstack/react-query';
import { QueryOptions } from '@/types/query';
import {
  APIGroupCommentPagination,
  APIGroupDetail,
  BookGroupComment,
} from '@/types/group';

import GroupAPI from '@/apis/group';
import bookGroupKeys from './key';

const transformComments = ({ bookGroupComments }: APIGroupCommentPagination) =>
  bookGroupComments.map<BookGroupComment>(comment => ({
    id: comment.commentId,
    writer: {
      id: comment.userId,
      profileImageSrc: comment.userProfileImage,
      name: comment.nickname,
    },
    createdAt: comment.createdAt,
    content: comment.contents,
  }));

const useBookGroupCommentsQuery = <TData = APIGroupCommentPagination>(
  groupId: APIGroupDetail['bookGroupId'],
  select?: QueryOptions<APIGroupCommentPagination, TData>['select']
) =>
  useQuery({
    queryKey: bookGroupKeys.comments(groupId),
    queryFn: () =>
      GroupAPI.getGroupComments({ bookGroupId: groupId }).then(
        ({ data }) => data
      ),
    select,
  });

export default useBookGroupCommentsQuery;

export const useBookGroupComments = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupCommentsQuery(groupId, transformComments);

import {
  APIGroupCommentPagination,
  APIGroupDetail,
  BookGroupComment,
} from '@/types/group';

import GroupAPI from '@/apis/group';
import bookGroupKeys from './key';
import useQueryWithSuspense, {
  UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';

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
  options?: UseQueryOptionWithoutSuspense<
    APIGroupCommentPagination,
    unknown,
    TData
  >
) =>
  useQueryWithSuspense(
    bookGroupKeys.comments(groupId),
    () =>
      GroupAPI.getGroupComments({ bookGroupId: groupId }).then(
        ({ data }) => data
      ),
    options
  );

export default useBookGroupCommentsQuery;

export const useBookGroupComments = (groupId: APIGroupDetail['bookGroupId']) =>
  useBookGroupCommentsQuery(groupId, {
    select: transformComments,
  });

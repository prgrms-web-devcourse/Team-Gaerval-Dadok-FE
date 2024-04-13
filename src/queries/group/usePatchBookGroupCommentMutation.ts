import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIGroup, APIGroupComment } from '@/types/group';
import groupAPI from '@/apis/group';
import bookGroupKeys from './key';

const usePatchBookGroupCommentMutation = (
  bookGroupId: APIGroup['bookGroupId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      comment,
    }: {
      commentId: APIGroupComment['commentId'];
      comment: string;
    }) =>
      groupAPI
        .updateGroupComment({ bookGroupId, commentId, comment })
        .then(({ data }) => data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: bookGroupKeys.comments(bookGroupId),
      });
    },
  });
};

export default usePatchBookGroupCommentMutation;

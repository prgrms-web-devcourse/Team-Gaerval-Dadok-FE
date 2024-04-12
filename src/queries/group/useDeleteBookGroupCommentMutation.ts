import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIGroup, APIGroupComment } from '@/types/group';
import groupAPI from '@/apis/group';
import bookGroupKeys from './key';

const useDeleteBookGroupCommentMutation = (
  bookGroupId: APIGroup['bookGroupId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: APIGroupComment['commentId']) =>
      groupAPI
        .deleteGroupComment({ bookGroupId, commentId })
        .then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookGroupKeys.comments(bookGroupId),
      });
    },
  });
};

export default useDeleteBookGroupCommentMutation;

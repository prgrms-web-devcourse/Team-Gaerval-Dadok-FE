import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIGroup } from '@/types/group';
import groupAPI from '@/apis/group';
import bookGroupKeys from './key';

const useCreateBookGroupCommentMutation = (
  bookGroupId: APIGroup['bookGroupId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (comment: string) =>
      groupAPI
        .createGroupComment({ bookGroupId, comment })
        .then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: bookGroupKeys.comments(bookGroupId),
      });
    },
  });
};

export default useCreateBookGroupCommentMutation;

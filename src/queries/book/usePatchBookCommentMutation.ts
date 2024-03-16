import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIBook, APIBookComment } from '@/types/book';
import bookAPI from '@/apis/book';
import bookKeys from './key';

const usePatchBookCommentMutation = (bookId: APIBook['bookId']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      commentId: APIBookComment['commentId'];
      comment: string;
    }) => bookAPI.patchComment({ bookId, data }).then(({ data }) => data),
    onSettled: () => {
      queryClient.invalidateQueries(bookKeys.comments(bookId));
    },
  });
};

export default usePatchBookCommentMutation;

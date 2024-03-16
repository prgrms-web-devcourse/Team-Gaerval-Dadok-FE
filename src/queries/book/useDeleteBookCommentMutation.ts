import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIBook, APIBookComment } from '@/types/book';
import bookAPI from '@/apis/book';
import bookKeys from './key';

const useDeleteBookCommentMutation = (bookId: APIBook['bookId']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: APIBookComment['commentId']) =>
      bookAPI.deletComment(bookId, commentId).then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.comments(bookId) });
    },
  });
};

export default useDeleteBookCommentMutation;

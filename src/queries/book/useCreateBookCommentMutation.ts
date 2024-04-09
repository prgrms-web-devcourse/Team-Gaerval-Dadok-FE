import { useMutation, useQueryClient } from '@tanstack/react-query';

import { APIBook } from '@/types/book';
import bookAPI from '@/apis/book';
import bookKeys from './key';

const useCreateBookCommentMutation = (bookId: APIBook['bookId']) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newComment: string) =>
      bookAPI.creaetComment(bookId, newComment).then(({ data }) => data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bookKeys.comments(bookId) });
    },
  });
};

export default useCreateBookCommentMutation;

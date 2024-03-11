import bookAPI from '@/apis/book';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import bookKeys from './key';

const usePatchBookCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof bookAPI.patchComment>[0]) =>
      bookAPI.patchComment(data).then(({ data }) => data),
    onSettled: (_data, _err, { bookId }) => {
      queryClient.invalidateQueries(bookKeys.comments(bookId));
    },
  });
};

export default usePatchBookCommentMutation;

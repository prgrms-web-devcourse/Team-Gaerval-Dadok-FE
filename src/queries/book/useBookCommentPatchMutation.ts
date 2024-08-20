import bookAPI from '@/apis/book';

import { useMutation, useQueryClient } from '@tanstack/react-query';

const useBookCommentPatchMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof bookAPI.patchComment>[0]) =>
      bookAPI.patchComment(data).then(({ data }) => data),
    onSettled: (_data, _err, { bookId }) => {
      queryClient.invalidateQueries(['bookComments', bookId]);
    },
  });
};

export default useBookCommentPatchMutation;

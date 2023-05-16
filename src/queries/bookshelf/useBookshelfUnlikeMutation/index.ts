import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

const useBookshelfUnlikeMutation = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.unlikeBookshelf(bookshelfId),
    onSuccess: () =>
      queryClient.invalidateQueries(['bookshelfInfo', bookshelfId]),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};

export default useBookshelfUnlikeMutation;

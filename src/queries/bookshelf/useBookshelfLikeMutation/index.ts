import { useMutation, useQueryClient } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

const useBookshelfLikeMutation = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.likeBookshelf(bookshelfId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookshelfInfo', bookshelfId],
      });
    },
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};

export default useBookshelfLikeMutation;

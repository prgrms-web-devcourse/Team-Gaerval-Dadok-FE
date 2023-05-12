import { useMutation } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

const useDeleteBookshelfLike = () => {
  return useMutation({
    mutationFn: async (data: {
      bookshelfId: APIBookshelfInfo['bookshelfId'];
    }) => bookshelfAPI.deleteBookshelfLike(data),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};

export default useDeleteBookshelfLike;

import { useMutation } from '@tanstack/react-query';
import { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

const usePostBookshelfLike = () => {
  return useMutation({
    mutationFn: async (data: {
      bookshelfId: APIBookshelfInfo['bookshelfId'];
    }) => bookshelfAPI.postBookshelfLike(data),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
  });
};

export default usePostBookshelfLike;

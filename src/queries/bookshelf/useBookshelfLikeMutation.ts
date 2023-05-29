import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

export const useBookshelfLike = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.likeBookshelf(bookshelfId),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookshelfInfo', bookshelfId],
      });
    },
  });
};

export const useBookshelfUnlike = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.unlikeBookshelf(bookshelfId),
    onError: (error: { message: string }) => {
      console.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookshelfInfo', bookshelfId],
      });
    },
  });
};

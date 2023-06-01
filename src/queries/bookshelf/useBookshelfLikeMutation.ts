import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';

export const useBookshelfLike = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.likeBookshelf(bookshelfId),
    onMutate: async () => {
      await queryClient.cancelQueries(['bookshelfInfo', bookshelfId]);

      const oldData = queryClient.getQueryData<APIBookshelfInfo>([
        'bookshelfInfo',
        bookshelfId,
      ]);

      if (!oldData) return;

      const newData: APIBookshelfInfo = {
        ...oldData,
        isLiked: !oldData.isLiked,
        likeCount: oldData.likeCount + 1,
      };

      queryClient.setQueryData<APIBookshelfInfo>(
        ['bookshelfInfo', bookshelfId],
        newData
      );

      return { oldData };
    },
    onError: (_error, _value, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(
          ['bookshelfInfo', bookshelfId],
          context.oldData
        );
      }
    },
    onSettled: () => {
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
    onMutate: async () => {
      await queryClient.cancelQueries(['bookshelfInfo', bookshelfId]);

      const oldData = queryClient.getQueryData<APIBookshelfInfo>([
        'bookshelfInfo',
        bookshelfId,
      ]);

      if (!oldData) return;

      const newData: APIBookshelfInfo = {
        ...oldData,
        isLiked: !oldData.isLiked,
        likeCount: oldData.likeCount - 1,
      };

      queryClient.setQueryData<APIBookshelfInfo>(
        ['bookshelfInfo', bookshelfId],
        newData
      );

      return { oldData };
    },
    onError: (_error, _value, context) => {
      if (context?.oldData) {
        queryClient.setQueryData(
          ['bookshelfInfo', bookshelfId],
          context.oldData
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['bookshelfInfo', bookshelfId],
      });
    },
  });
};

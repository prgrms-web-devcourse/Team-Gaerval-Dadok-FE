import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';
import bookShelfKeys from './key';

export const useBookshelfLike = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => bookshelfAPI.likeBookshelf(bookshelfId),
    onMutate: async () => {
      await queryClient.cancelQueries(bookShelfKeys.info(bookshelfId));

      const oldData = queryClient.getQueryData<APIBookshelfInfo>(
        bookShelfKeys.info(bookshelfId)
      );

      if (oldData) {
        const newData: APIBookshelfInfo = {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCount: oldData.likeCount + 1,
        };

        queryClient.setQueryData<APIBookshelfInfo>(
          bookShelfKeys.info(bookshelfId),
          newData
        );
      }

      return { oldData };
    },
    onError: (_error, _value, context) => {
      queryClient.setQueryData(
        bookShelfKeys.info(bookshelfId),
        context?.oldData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(bookShelfKeys.info(bookshelfId));
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
      await queryClient.cancelQueries(bookShelfKeys.info(bookshelfId));

      const oldData = queryClient.getQueryData<APIBookshelfInfo>(
        bookShelfKeys.info(bookshelfId)
      );

      if (oldData) {
        const newData: APIBookshelfInfo = {
          ...oldData,
          isLiked: !oldData.isLiked,
          likeCount: oldData.likeCount - 1,
        };

        queryClient.setQueryData<APIBookshelfInfo>(
          bookShelfKeys.info(bookshelfId),
          newData
        );
      }

      return { oldData };
    },
    onError: (_error, _value, context) => {
      queryClient.setQueryData(
        bookShelfKeys.info(bookshelfId),
        context?.oldData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(bookShelfKeys.info(bookshelfId));
    },
  });
};

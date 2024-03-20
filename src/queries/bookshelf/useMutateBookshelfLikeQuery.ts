import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { APIBookshelfInfo } from '@/types/bookshelf';
import bookshelfAPI from '@/apis/bookshelf';
import bookShelfKeys from './key';

const useMutateBookshelfLikeQuery = (
  bookshelfId: APIBookshelfInfo['bookshelfId']
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (isLiked: APIBookshelfInfo['isLiked']) =>
      !isLiked
        ? bookshelfAPI.likeBookshelf(bookshelfId)
        : bookshelfAPI.unlikeBookshelf(bookshelfId),
    onMutate: async () => {
      await queryClient.cancelQueries(bookShelfKeys.info(bookshelfId));

      const prevData = queryClient.getQueryData<APIBookshelfInfo>(
        bookShelfKeys.info(bookshelfId)
      );

      if (prevData) {
        const newData: APIBookshelfInfo = {
          ...prevData,
          isLiked: !prevData.isLiked,
          likeCount: prevData.isLiked
            ? prevData.likeCount - 1
            : prevData.likeCount + 1,
        };

        queryClient.setQueryData<APIBookshelfInfo>(
          bookShelfKeys.info(bookshelfId),
          newData
        );
      }

      return { prevData };
    },
    onError: (_error, _value, context) => {
      queryClient.setQueryData(
        bookShelfKeys.info(bookshelfId),
        context?.prevData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(bookShelfKeys.info(bookshelfId));
    },
  });
};

export default useMutateBookshelfLikeQuery;

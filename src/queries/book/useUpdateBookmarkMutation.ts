import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { APIBook, APIBookmarkedUserList } from '@/types/book';
import bookAPI from '@/apis/book';
import bookKeys from './key';

const updateBookmark = ({
  bookId,
  newValue,
}: {
  bookId: APIBook['bookId'];
  newValue: boolean;
}) => {
  return newValue
    ? bookAPI.addBookmark(bookId).then(({ data }) => data)
    : bookAPI.removeBookmark(bookId).then(({ data }) => data);
};

const useUpdateBookmarkMutation = (bookId: APIBook['bookId']) => {
  const queryClient = useQueryClient();
  const bookmarkQueryKey = bookKeys.bookmark(bookId);

  return useMutation({
    mutationFn: (newValue: boolean) => updateBookmark({ bookId, newValue }),
    onMutate: async newValue => {
      await queryClient.cancelQueries({ queryKey: bookmarkQueryKey });

      const previousData =
        queryClient.getQueryData<APIBookmarkedUserList>(bookmarkQueryKey);

      if (previousData) {
        // 낙관적 업데이트
        queryClient.setQueryData<APIBookmarkedUserList>(bookmarkQueryKey, {
          ...previousData,
          isInMyBookshelf: newValue,
        });
      }

      return { previousData };
    },
    onError: (_err, _variables, context) => {
      if (!context || !context.previousData) {
        return;
      }

      queryClient.setQueryData<APIBookmarkedUserList>(
        bookmarkQueryKey,
        context.previousData
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkQueryKey });
    },
  });
};

export default useUpdateBookmarkMutation;

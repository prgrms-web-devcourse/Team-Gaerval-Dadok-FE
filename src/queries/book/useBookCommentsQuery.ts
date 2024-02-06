import { UseQueryOptions } from '@tanstack/react-query';

import type {
  APIBook,
  APIBookCommentPagination,
  BookComment,
} from '@/types/book';
import bookAPI from '@/apis/book';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';

const useBookCommentsQuery = <TData = APIBookCommentPagination>(
  bookId: APIBook['bookId'],
  options?: UseQueryOptions<
    Awaited<ReturnType<typeof bookAPI.getComments>>['data'],
    unknown,
    TData
  >
) =>
  useQueryWithSuspense(
    ['bookComments', bookId],
    () => bookAPI.getComments(bookId).then(({ data }) => data),
    options
  );

export default useBookCommentsQuery;

const transformBookCommentsData = ({
  bookComments,
}: APIBookCommentPagination) => {
  return bookComments.map(
    ({ contents, createdAt, commentId, userId, userProfileImage, nickname }) =>
      ({
        id: commentId,
        writer: {
          id: userId,
          profileImageSrc: userProfileImage,
          name: nickname,
        },
        createdAt,
        content: contents,
      } as BookComment)
  );
};

export const useBookComments = (bookId: APIBook['bookId']) =>
  useBookCommentsQuery(bookId, {
    select: transformBookCommentsData,
  });

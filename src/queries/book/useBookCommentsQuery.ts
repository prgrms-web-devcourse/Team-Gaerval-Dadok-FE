import { UseQueryOptions } from '@tanstack/react-query';

import type {
  APIBook,
  APIBookCommentPagination,
  BookComment,
} from '@/types/book';
import bookAPI from '@/apis/book';
import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import bookKeys from './key';

const useBookCommentsQuery = <TData = APIBookCommentPagination>(
  bookId: APIBook['bookId'],
  options?: UseQueryOptions<
    Awaited<ReturnType<typeof bookAPI.getComments>>['data'],
    unknown,
    TData
  >
) =>
  useQueryWithSuspense(
    bookKeys.comments(bookId),
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

export const useHasBookComment = (bookId: APIBook['bookId']) =>
  useBookCommentsQuery(bookId, {
    select: ({ bookComments }) =>
      bookComments.filter(comment => comment.writtenByCurrentUser === true)
        .length,
  });

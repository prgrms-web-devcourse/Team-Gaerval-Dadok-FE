import type { APIBookComment } from '@/types/book';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookComments } from '@/queries/book/useBookCommentsQuery';
import usePatchBookCommentMutation from '@/queries/book/usePatchBookCommentMutation';
import useDeleteBookCommentMutation from '@/queries/book/useDeleteBookCommentMutation';

import useToast from '@/components/common/Toast/useToast';
import { checkAuthentication } from '@/utils/helpers';

import CommentList from '@/components/comment/CommentList';

const BookCommentList = ({ bookId }: { bookId: number }) => {
  const isAuthenticated = checkAuthentication();

  const { show: showToast } = useToast();

  const { data: comments } = useBookComments(bookId);
  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });

  const editComment = usePatchBookCommentMutation(bookId);
  const deleteComment = useDeleteBookCommentMutation(bookId);

  const handleBookCommentEdit = (
    commentId: APIBookComment['commentId'],
    comment: string
  ) => {
    editComment.mutate(
      { commentId, comment },
      {
        onSuccess: () =>
          showToast({ type: 'success', message: '코멘트를 수정했어요' }),
      }
    );
  };

  const handleBookCommentDelete = (commentId: APIBookComment['commentId']) => {
    deleteComment.mutate(commentId, {
      onSuccess: () =>
        showToast({ type: 'success', message: '코멘트를 삭제했어요' }),
    });
  };

  return (
    <CommentList
      name={'코멘트'}
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      emptyText={`아직 코멘트가 없어요.
                  가장 먼저 코멘트를 남겨보세요!`}
      onEditConfirm={handleBookCommentEdit}
      onDeleteConfirm={handleBookCommentDelete}
    />
  );
};

export default BookCommentList;

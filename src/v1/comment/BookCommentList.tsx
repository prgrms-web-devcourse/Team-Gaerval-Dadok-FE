import { APIBookComment } from '@/types/book';
import useToast from '@/v1/base/Toast/useToast';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookComments } from '@/queries/book/useBookCommentsQuery';
import usePatchBookCommentMutation from '@/queries/book/usePatchBookCommentMutation';
import { checkAuthentication } from '@/utils/helpers';

import CommentList from './CommentList';

const BookCommentList = ({ bookId }: { bookId: number }) => {
  const isAuthenticated = checkAuthentication();

  const { show: showToast } = useToast();

  const { data: comments } = useBookComments(bookId);
  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });

  const editComment = usePatchBookCommentMutation();

  const handleBookCommentEdit = (
    commentId: APIBookComment['commentId'],
    comment: string
  ) => {
    editComment.mutate(
      { bookId, data: { commentId, comment } },
      {
        onSuccess: () =>
          showToast({ type: 'success', message: '코멘트를 수정했어요' }),
      }
    );
  };

  return (
    <CommentList
      name={'코멘트'}
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      emptyText={`아직 코멘트가 없어요.
                  가장 먼저 코멘트를 남겨보세요!`}
      onEditConfirm={handleBookCommentEdit}
    />
  );
};

export default BookCommentList;

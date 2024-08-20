import { APIGroupComment } from '@/types/group';
import { useBookGroupComments } from '@/queries/group/useBookGroupCommentsQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookGroup } from '@/queries/group/useBookGroupQuery';
import usePatchBookGroupCommentMutation from '@/queries/group/usePatchBookGroupCommentMutation';
import useDeleteBookGroupCommentMutation from '@/queries/group/useDeleteBookGroupCommentMutation';

import useToast from '@/components/common/Toast/useToast';
import { checkAuthentication } from '@/utils/helpers';

import CommentList from '@/components/comment/CommentList';

const BookGroupCommentList = ({ groupId }: { groupId: number }) => {
  const isAuthenticated = checkAuthentication();

  const { show: showToast } = useToast();

  const { data: bookGroupInfo } = useBookGroup(groupId);
  const { data: comments } = useBookGroupComments(groupId);
  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });

  const editComment = usePatchBookGroupCommentMutation(groupId);
  const deleteComment = useDeleteBookGroupCommentMutation(groupId);

  const { isPublic, isMember } = bookGroupInfo;
  const isHidden = !isPublic && !isMember;

  const handleBookGroupCommentEdit = (
    commentId: APIGroupComment['commentId'],
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

  const handleBookGroupCommentDelete = (
    commentId: APIGroupComment['commentId']
  ) => {
    deleteComment.mutate(commentId, {
      onSuccess: () =>
        showToast({ type: 'success', message: '코멘트를 삭제했어요' }),
    });
  };

  return (
    <CommentList
      name={'게시글'}
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      isHidden={isHidden}
      hiddenText={`멤버만 볼 수 있어요 🥲`}
      emptyText={`아직 게시글이 없어요.
                  가장 먼저 게시글을 남겨보세요!`}
      onEditConfirm={handleBookGroupCommentEdit}
      onDeleteConfirm={handleBookGroupCommentDelete}
    />
  );
};

export default BookGroupCommentList;

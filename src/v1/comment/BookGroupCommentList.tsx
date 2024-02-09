import { useBookGroupComments } from '@/queries/group/useBookGroupCommentsQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookGroup } from '@/queries/group/useBookGroupQuery';
import { isAuthed } from '@/utils/helpers';

import CommentList from './CommentList';

const BookGroupCommentList = ({ groupId }: { groupId: number }) => {
  const { data: bookGroupInfo } = useBookGroup(groupId);
  const { data: comments } = useBookGroupComments(groupId);
  const { data: myId } = useMyProfileId({ enabled: isAuthed() });
  const { isPublic, isMember } = bookGroupInfo;

  const hidden = !isPublic && !isMember;

  return (
    <CommentList
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      hidden={hidden}
      hiddenText={`멤버만 볼 수 있어요 🥲`}
      emptyText={`아직 게시글이 없어요.
                  가장 먼저 게시글을 남겨보세요!`}
    />
  );
};

export default BookGroupCommentList;

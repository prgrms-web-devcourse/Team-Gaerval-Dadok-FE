import { useBookGroupComments } from '@/queries/group/useBookGroupCommentsQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookGroup } from '@/queries/group/useBookGroupQuery';
import { checkAuthentication } from '@/utils/helpers';

import CommentList from './CommentList';

const BookGroupCommentList = ({ groupId }: { groupId: number }) => {
  const isAuthenticated = checkAuthentication();
  const { data: bookGroupInfo } = useBookGroup(groupId);
  const { data: comments } = useBookGroupComments(groupId);
  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });
  const { isPublic, isMember } = bookGroupInfo;

  const isHidden = !isPublic && !isMember;

  return (
    <CommentList
      name={'게시글'}
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      isHidden={isHidden}
      hiddenText={`멤버만 볼 수 있어요 🥲`}
      emptyText={`아직 게시글이 없어요.
                  가장 먼저 게시글을 남겨보세요!`}
    />
  );
};

export default BookGroupCommentList;

import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { useBookComments } from '@/queries/book/useBookCommentsQuery';
import { isAuthed } from '@/utils/helpers';

import CommentList from './CommentList';

const BookCommentList = ({ bookId }: { bookId: number }) => {
  const { data: comments } = useBookComments(bookId);
  const { data: myId } = useMyProfileId({ enabled: isAuthed() });

  return (
    <CommentList
      name={'코멘트'}
      comments={comments}
      isEditableComment={({ writer }) => writer.id === myId}
      emptyText={`아직 코멘트가 없어요.
                  가장 먼저 코멘트를 남겨보세요!`}
    />
  );
};

export default BookCommentList;

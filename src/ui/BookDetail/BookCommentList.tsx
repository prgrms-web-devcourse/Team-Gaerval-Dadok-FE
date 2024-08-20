'use clinet';

import { useDisclosure, VStack } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

import bookAPI from '@/apis/book';
import useBookCommentsQuery from '@/queries/book/useBookCommentsQuery';
import Button from '@/ui/common/Button';
import BookComment from './BookComment';
import CommentDrawer from './CommentDrawer';

import type { APIBookComment, APIBookmarkedUserList } from '@/types/book';

import { SERVICE_ERROR_MESSAGE } from '@/constants';
import { useToast } from '@/hooks/toast';
import LoginBottomSheet from '@/ui/LoginBottomSheet';
import { isAuthed, isAxiosErrorWithCustomCode } from '@/utils/helpers';

interface Props {
  bookId: number;
  isInMyBookshelf: APIBookmarkedUserList['isInMyBookshelf'];
}

type CommentType = 'me' | 'user';
type CommentRecordType = Record<CommentType, APIBookComment[]>;

const BookCommentList = ({ bookId, isInMyBookshelf }: Props) => {
  const { showToast } = useToast();
  const commentTextAreaRef = useRef<HTMLTextAreaElement>(null);
  const bookCommentsQueryInfo = useBookCommentsQuery(bookId);

  const {
    isOpen: isCreateDrawerOpen,
    onOpen: onCreateDrawerOpen,
    onClose: onCreateDrawerClose,
  } = useDisclosure();
  const {
    isOpen: isLoginBottomSheetOpen,
    onOpen: onLoginBottomSheetOpen,
    onClose: onLoginBottomSheetsClose,
  } = useDisclosure();

  const comments = useMemo<CommentRecordType>(() => {
    const defaultComments = { me: [], user: [] };

    if (!bookCommentsQueryInfo.isSuccess) {
      return defaultComments;
    }

    return bookCommentsQueryInfo.data.bookComments
      .filter(comment => comment.bookId == bookId)
      .reduce<CommentRecordType>(
        (acc, comment) => ({
          ...acc,
          [comment.writtenByCurrentUser ? 'me' : 'user']: [
            ...acc[comment.writtenByCurrentUser ? 'me' : 'user'],
            comment,
          ],
        }),
        defaultComments
      );
  }, [bookCommentsQueryInfo, bookId]);

  const handleCommentError = (error: unknown) => {
    if (!isAxiosErrorWithCustomCode(error)) {
      return;
    }

    const { code } = error.response.data;
    const message = SERVICE_ERROR_MESSAGE[code];

    if (code === 'BC1' || code === 'BC2') {
      showToast({ message, duration: 3000 });
    }
  };

  const handleCommentCreate = () => {
    const comment = commentTextAreaRef.current?.value;

    if (!comment) {
      showToast({ message: '코멘트를 입력해주세요!' });
      return;
    }

    bookAPI
      .creaetComment(bookId, { comment })
      .then(() => bookCommentsQueryInfo.refetch())
      .catch(handleCommentError)
      .finally(onCreateDrawerClose);
  };

  const handleCommentEdit = (commentId: number, comment: string) => {
    bookAPI
      .patchComment({ bookId, data: { commentId, comment } })
      .then(() => bookCommentsQueryInfo.refetch())
      .catch(handleCommentError);
  };

  const handleCommentDelete = (commentId: number) => {
    bookAPI
      .deletComment(bookId, commentId)
      .then(() => bookCommentsQueryInfo.refetch())
      .catch(handleCommentError);
  };

  const handleCreateCommentDrawerOpen = () => {
    if (!isAuthed()) {
      onLoginBottomSheetOpen();
      return;
    }

    if (!isInMyBookshelf) {
      showToast({
        message: '책장에 책을 꽂은 후에 코멘트를 남길 수 있어요.',
        duration: 3000,
      });
      return;
    }

    onCreateDrawerOpen();
  };

  return (
    <VStack align="stretch" spacing="2rem" width="100%" pt="1rem">
      {!isAuthed() && (
        <LoginBottomSheet
          isOpen={isLoginBottomSheetOpen}
          onClose={onLoginBottomSheetsClose}
        />
      )}
      {!bookCommentsQueryInfo.isLoading && !comments.me.length && (
        <>
          <Button
            onClick={handleCreateCommentDrawerOpen}
            scheme="orange-fill"
            fullWidth
          >
            코멘트 남기기
          </Button>
          <CommentDrawer
            title="책 코멘트 남기기"
            placeholder="작성해주신 코멘트가 다른 사람들에게 많은 도움이 될 거예요!"
            isOpen={isCreateDrawerOpen}
            onClose={onCreateDrawerClose}
            onComplete={handleCommentCreate}
            textareaRef={commentTextAreaRef}
          />
        </>
      )}
      {comments.me.map(comment => (
        <BookComment
          key={comment.commentId}
          {...comment}
          editable
          onEdit={handleCommentEdit}
          onDelete={handleCommentDelete}
          style={{ border: '1px solid #ffe6c6' }}
        />
      ))}
      {comments.user.map(comment => (
        <BookComment key={comment.commentId} {...comment} />
      ))}
    </VStack>
  );
};

export default BookCommentList;

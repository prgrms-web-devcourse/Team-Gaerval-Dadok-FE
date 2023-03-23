'use clinet';

import { useMemo, useRef } from 'react';
import { useDisclosure, VStack } from '@chakra-ui/react';
import { isAxiosError } from 'axios';

import Button from '@/ui/common/Button';
import CommentDrawer from './CommentDrawer';
import BookComment from './BookComment';
import bookAPI from '@/apis/book';
import useBookCommentsQuery from '@/queries/book/useBookCommentsQuery';

import type { APIBookCommentInfo } from '@/types/book';
import { useAuth } from '@/hooks/auth';
import LoginBottomSheet from '../LoginBottomSheet';

interface Props {
  bookId: number;
}

type CommentType = 'me' | 'user';
type CommentRecordType = Record<CommentType, APIBookCommentInfo[]>;

const BookCommentList = ({ bookId }: Props) => {
  const { isAuthed } = useAuth();
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

  const handleCommentCreate = () => {
    const comment = commentTextAreaRef.current?.value;

    if (!comment) {
      console.log('입력된 코멘트가 없어요.');
      return;
    }

    bookAPI
      .creaetComment(bookId, { comment })
      .catch(error => {
        if (!isAxiosError(error)) {
          console.error(error);
          return;
        }

        const response = error.response;

        if (response && response.status === 400) {
          console.log('이미 사용자가 작성한 코멘트가 있어요.');
        }
      })
      .then(() => bookCommentsQueryInfo.refetch())
      .finally(onCreateDrawerClose);
  };

  const handleCommentEdit = (commentId: number, comment: string) => {
    bookAPI.patchComment({ bookId, data: { commentId, comment } }).then(() => {
      bookCommentsQueryInfo.refetch();
    });
  };

  const handleCommentDelete = (commentId: number) => {
    bookAPI
      .deletComment(bookId, commentId)
      .then(() => bookCommentsQueryInfo.refetch());
  };

  const handleCreateCommentDrawerOpen = () => {
    if (!isAuthed) {
      onLoginBottomSheetOpen();
      return;
    }

    onCreateDrawerOpen();
  };

  return (
    <VStack align="stretch" spacing="2rem" width="100%" pt="1rem">
      {!isAuthed && (
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

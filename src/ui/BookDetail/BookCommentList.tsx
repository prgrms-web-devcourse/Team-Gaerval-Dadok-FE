'use clinet';

import { useMemo, useState } from 'react';
import { VStack } from '@chakra-ui/react';

import Button from '@/ui/common/Button';
import BookComment from './BookComment';
import CreateCommentDrawer from './CreateCommentDrawer';
import useBookCommentsQuery from '@/queries/book/useBookCommentsQuery';

import type { APIBookComment } from '@/types/book';

interface Props {
  bookId: number;
}

type CommentType = 'me' | 'user';
type CommentRecordType = Record<CommentType, APIBookComment[]>;

const BookCommentList = ({ bookId }: Props) => {
  const bookCommentsQueryInfo = useBookCommentsQuery(bookId);

  const comments = useMemo<CommentRecordType>(() => {
    const defaultComments = { me: [], user: [] };

    if (!bookCommentsQueryInfo.isSuccess) {
      return defaultComments;
    }

    return bookCommentsQueryInfo.data.bookGroupComments.reduce<CommentRecordType>(
      (acc, comment) => ({
        ...acc,
        [comment.writtenByCurrentUser ? 'me' : 'user']: [
          ...acc[comment.writtenByCurrentUser ? 'me' : 'user'],
          comment,
        ],
      }),
      defaultComments
    );
  }, [bookCommentsQueryInfo]);

  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawerOpen = () => {
    setOpenDrawer(isOpen => !isOpen);
  };

  return (
    <VStack align="stretch" spacing="2rem" width="100%" pt="1rem">
      {!bookCommentsQueryInfo.isLoading && !comments.me.length && (
        <>
          <Button
            onClick={toggleDrawerOpen}
            scheme="orange-fill"
            mt="2rem"
            fullWidth
          >
            코멘트 남기기
          </Button>
          <CreateCommentDrawer
            bookId={bookId}
            isOpen={openDrawer}
            onClose={toggleDrawerOpen}
          />
        </>
      )}
      {comments.me.map(
        ({ commentId, contents, userProfileImage, createdAt, nickname }) => (
          <BookComment
            key={commentId}
            contents={contents}
            userProfileImage={userProfileImage}
            createdAt={createdAt}
            nickname={nickname}
            editable
            style={{ border: '1px solid #ffe6c6' }}
          />
        )
      )}
      {comments.user.map(
        ({ commentId, contents, userProfileImage, createdAt, nickname }) => (
          <BookComment
            key={commentId}
            contents={contents}
            userProfileImage={userProfileImage}
            createdAt={createdAt}
            nickname={nickname}
          />
        )
      )}
    </VStack>
  );
};

export default BookCommentList;

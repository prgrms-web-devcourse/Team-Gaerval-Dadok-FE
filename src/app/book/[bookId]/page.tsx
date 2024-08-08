'use client';
import { useRef } from 'react';

import { APIBook } from '@/types/book';
import { useBookTitle } from '@/queries/book/useBookInfoQuery';
import { useHasBookComment } from '@/queries/book/useBookCommentsQuery';
import useCreateBookCommentMutation from '@/queries/book/useCreateBookCommentMutation';
import useToast from '@/components/common/Toast/useToast';
import useDisclosure from '@/hooks/useDisclosure';
import {
  checkAuthentication,
  isAxiosErrorWithCustomCode,
} from '@/utils/helpers';
import { SERVICE_ERROR_MESSAGE } from '@/constants';

import Skeleton from '@/components/common/Skeleton';
import SSRSafeSuspense from '@/components/common/SSRSafeSuspense';
import TopNavigation from '@/components/common/TopNavigation';
import StickyFooter from '@/components/common/StickyFooter';
import LoginBottomActionButton from '@/components/common/LoginBottomActionButton';
import CommentDrawer from '@/components/comment/CommentDrawer';
import BackButton from '@/components/common/BackButton';
import BookInfo, { BookInfoSkeleton } from '@/components/book/detail/BookInfo';
import BookCommentList from '@/components/comment/BookCommentList';
import Button from '@/components/common/Button';

const BookDetailPage = ({
  params: { bookId },
}: {
  params: { bookId: APIBook['bookId'] };
}) => {
  const isAuthenticated = checkAuthentication();

  return (
    <>
      <BookTopNavigation bookId={bookId} />
      <SSRSafeSuspense fallback={<BookPageSkeleton />}>
        <div className="pb-action-button flex flex-col gap-[3rem] pt-[1rem]">
          <BookInfo bookId={bookId} />
          <div className="flex flex-col gap-[1rem]">
            <Heading text="책 코멘트" />
            <BookCommentList bookId={bookId} />
          </div>
        </div>
        {isAuthenticated ? (
          <AddBookCommentButton bookId={bookId} />
        ) : (
          <LoginBottomActionButton />
        )}
      </SSRSafeSuspense>
    </>
  );
};

export default BookDetailPage;

const BookPageSkeleton = () => (
  <div className="pt-[1rem]">
    <BookInfoSkeleton />
  </div>
);

const BookTopNavigation = ({ bookId }: { bookId: APIBook['bookId'] }) => (
  <TopNavigation>
    <TopNavigation.LeftItem>
      <BackButton />
    </TopNavigation.LeftItem>
    <TopNavigation.CenterItem textAlign="left">
      <SSRSafeSuspense fallback={<BookTitleSkeleton />}>
        <BookTitle bookId={bookId} />
      </SSRSafeSuspense>
    </TopNavigation.CenterItem>
  </TopNavigation>
);

const BookTitle = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const { data: title } = useBookTitle(bookId);
  return <p className="w-full truncate">{title}</p>;
};

const Heading = ({ text }: { text: string }) => (
  <p className="font-subheading-bold">{text}</p>
);

const AddBookCommentButton = ({ bookId }: { bookId: APIBook['bookId'] }) => {
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const { show: showToast } = useToast();

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const createComment = useCreateBookCommentMutation(bookId);

  const { data: hasBookComment } = useHasBookComment(bookId);

  const handleCommentCreate = () => {
    const comment = commentRef.current?.value;

    if (!comment) {
      return;
    }

    createComment.mutate(comment, {
      onSuccess: () => {
        onDrawerClose();
        showToast({ type: 'success', message: '코멘트를 등록했어요 🎉' });
      },
      onError: error => {
        if (isAxiosErrorWithCustomCode(error)) {
          const { code } = error.response.data;
          const message = SERVICE_ERROR_MESSAGE[code];
          showToast({ type: 'error', message });
          return;
        }

        showToast({ type: 'error', message: '코멘트를 등록하지 못했어요 🥲' });
      },
    });
  };

  if (hasBookComment) {
    return null;
  }

  return (
    <>
      <StickyFooter>
        <Button size="full" onClick={onDrawerOpen}>
          코멘트 작성하기
        </Button>
      </StickyFooter>
      <CommentDrawer
        isOpen={isDrawerOpen}
        onClose={onDrawerClose}
        title="책 코멘트 작성하기"
        placeholder="작성해주신 코멘트가 다른 사람들에게 많은 도움이 될 거예요!"
        onConfirm={handleCommentCreate}
        ref={commentRef}
      />
    </>
  );
};

const BookTitleSkeleton = () => (
  <Skeleton>
    <Skeleton.Text fontSize="medium" width="20rem" />
  </Skeleton>
);

'use client';

import { APIBook } from '@/types/book';
import { useBookTitle } from '@/queries/book/useBookInfoQuery';

import Skeleton from '@/v1/base/Skeleton';
import SSRSafeSuspense from '@/components/SSRSafeSuspense';
import TopNavigation from '@/v1/base/TopNavigation';
import BottomActionButton from '@/v1/base/BottomActionButton';
import BackButton from '@/v1/base/BackButton';
import BookInfo, { BookInfoSkeleton } from '@/v1/book/detail/BookInfo';
import BookCommentList from '@/v1/comment/BookCommentList';

const BookDetailPage = ({
  params: { bookId },
}: {
  params: { bookId: APIBook['bookId'] };
}) => {
  return (
    <>
      <BookTopNavigation bookId={bookId} />
      <SSRSafeSuspense fallback={<BookPageSkeleton />}>
        <div className="flex flex-col gap-[3rem] pb-[5rem] pt-[1rem]">
          <BookInfo bookId={bookId} />
          <div className="flex flex-col gap-[1rem]">
            <Heading text="책 코멘트" />
            <BookCommentList bookId={bookId} />
          </div>
        </div>
      </SSRSafeSuspense>
      <BottomActionButton>코멘트 작성하기</BottomActionButton>
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
  return <p>{title}</p>;
};

const Heading = ({ text }: { text: string }) => (
  <p className="text-xl font-bold">{text}</p>
);

const BookTitleSkeleton = () => (
  <Skeleton>
    <Skeleton.Text fontSize="medium" width="20rem" />
  </Skeleton>
);

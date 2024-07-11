'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { APIBookshelf } from '@/types/bookshelf';

import useBookShelfBooksQuery from '@/queries/bookshelf/useBookShelfBookListQuery';
import useBookShelfInfoQuery from '@/queries/bookshelf/useBookShelfInfoQuery';
import useMutateBookshelfLikeQuery from '@/queries/bookshelf/useMutateBookshelfLikeQuery';
import { useMyProfileId } from '@/queries/user/useMyProfileQuery';
import { checkAuthentication } from '@/utils/helpers';
import { IconKakao } from '@public/icons';

import useToast from '@/components/common/Toast/useToast';
import TopNavigation from '@/components/common/TopNavigation';
import BookShelfRow from '@/components/bookShelf/BookShelfRow';
import Button from '@/components/common/Button';
import LikeButton from '@/components/common/LikeButton';
import BackButton from '@/components/common/BackButton';
import ShareButton from '@/components/common/ShareButton';
import LoginLink from '@/components/common/LoginLink';

export default function UserBookShelfPage({
  params: { bookshelfId },
}: {
  params: {
    bookshelfId: APIBookshelf['bookshelfId'];
  };
}) {
  return (
    <div className="flex w-full flex-col">
      <TopNavigation>
        <TopNavigation.LeftItem>
          <BackButton />
        </TopNavigation.LeftItem>
        <TopNavigation.RightItem>
          <ShareButton />
        </TopNavigation.RightItem>
      </TopNavigation>

      <BookShelfInfo bookshelfId={bookshelfId} />
      <BookShelfContent bookshelfId={bookshelfId} />
    </div>
  );
}

const BookShelfInfo = ({ bookshelfId }: { bookshelfId: number }) => {
  const isAuthenticated = checkAuthentication();
  const { show: showToast } = useToast();

  const { data } = useBookShelfInfoQuery(bookshelfId);
  const { isLiked, likeCount, userId, userNickname, job } = data;

  const { mutate: mutateBookshelfLike } =
    useMutateBookshelfLikeQuery(bookshelfId);

  const { data: myId } = useMyProfileId({ enabled: isAuthenticated });

  const handleClickLikeButton = () => {
    if (!isAuthenticated) {
      showToast({ message: '로그인 후 이용해주세요' });
      return;
    }

    if (userId === myId) {
      showToast({
        message: '내 책장에는 좋아요를 누를 수 없어요',
      });
      return;
    }

    mutateBookshelfLike(isLiked);
  };

  return (
    <div className="mt-[0.8rem] flex flex-col gap-[0.8rem] pb-[2rem] pt-[1rem] font-bold">
      <h1 className="font-subheading-bold">
        <span className="text-main-900">{userNickname}</span>
        님의 책장
      </h1>
      <div className="flex items-center justify-between">
        <span className="text-black-600 font-body2-regular">
          {`${job.jobGroupKoreanName} • ${job.jobNameKoreanName}`}
        </span>
        <LikeButton
          isLiked={isLiked}
          likeCount={likeCount}
          onClick={handleClickLikeButton}
        />
      </div>
    </div>
  );
};

const BookShelfContent = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
}) => {
  const isAuthenticated = checkAuthentication();
  const { ref, inView } = useInView();

  const {
    data: booksData,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetchingNextPage,
  } = useBookShelfBooksQuery({ bookshelfId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  // TODO: Suspense 적용
  if (!isSuccess) return null;

  return isAuthenticated ? (
    <>
      {booksData.pages.map(page =>
        page.books.map((rowBooks, idx) => (
          <BookShelfRow key={idx} books={rowBooks} />
        ))
      )}
      {!isFetchingNextPage && <div ref={ref} />}
    </>
  ) : (
    <>
      <BookShelfRow books={booksData.pages[0].books[0]} />
      <DummyBookShelfRow />
      <BookShelfLoginBox bookshelfId={bookshelfId} />
    </>
  );
};
const DummyBookShelfRow = () => (
  <div className="pointer-events-none blur-sm">
    <BookShelfRow books={initialBookImageUrl} />
  </div>
);

const BookShelfLoginBox = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
}) => {
  const { data } = useBookShelfInfoQuery(bookshelfId);
  const { userNickname } = data;

  return (
    <div className="mt-[3.8rem] flex flex-col gap-[2rem] rounded-[4px] border border-shadow px-[1.7rem] py-[4rem]">
      <p className="text-center font-body1-bold">
        지금 로그인하면
        <br />
        책장에 담긴 모든 책을 볼 수 있어요!
      </p>
      <p className="text-center text-placeholder font-body2-regular">
        <span className="text-main-900">{userNickname}</span>님의 책장에서
        다양한
        <br />
        인사이트를 얻을 수 있어요.
      </p>
      <LoginLink>
        <Button colorScheme="kakao" size="full">
          <div className="flex items-center justify-center gap-[1rem]">
            <IconKakao width={16} height={'auto'} />
            <span className="font-body1-regular">카카오 로그인</span>
          </div>
        </Button>
      </LoginLink>
    </div>
  );
};

const initialBookImageUrl = [
  { bookId: 1, title: 'book1', imageUrl: '/images/book-cover/book1.jpeg' },
  { bookId: 2, title: 'book2', imageUrl: '/images/book-cover/book2.jpeg' },
  { bookId: 3, title: 'book3', imageUrl: '/images/book-cover/book3.jpeg' },
  { bookId: 4, title: 'book4', imageUrl: '/images/book-cover/book4.jpeg' },
];

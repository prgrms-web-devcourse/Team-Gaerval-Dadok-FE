'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import useBookShelfBooksQuery from '@/queries/bookshelf/useBookShelfBookListQuery';
import useBookShelfInfoQuery from '@/queries/bookshelf/useBookShelfInfoQuery';
import useMutateBookshelfLikeQuery from '@/queries/bookshelf/useMutateBookshelfLikeQuery';
import useToast from '@/v1/base/Toast/useToast';
import { checkAuthentication } from '@/utils/helpers';
import { IconKakao } from '@public/icons';
import TopNavigation from '@/v1/base/TopNavigation';
import BookShelfRow from '@/v1/bookShelf/BookShelfRow';
import Button from '@/v1/base/Button';
import LikeButton from '@/v1/base/LikeButton';
import BackButton from '@/v1/base/BackButton';
import ShareButton from '@/v1/base/ShareButton';
import type { APIBookshelf, APIBookshelfInfo } from '@/types/bookshelf';
import { KAKAO_LOGIN_URL } from '@/constants/url';

export default function UserBookShelfPage({
  params: { bookshelfId },
}: {
  params: {
    bookshelfId: APIBookshelf['bookshelfId'];
  };
}) {
  const isAuthenticated = checkAuthentication();
  const { data, isSuccess } = useBookShelfInfoQuery({ bookshelfId });
  const { mutate: mutateBookshelfLike } =
    useMutateBookshelfLikeQuery(bookshelfId);
  const { show: showToast } = useToast();

  if (!isSuccess) return null;

  const handleClickLikeButton = () => {
    if (!isAuthenticated) {
      showToast({ message: '로그인 후 이용해주세요.', type: 'normal' });
      return;
    }

    mutateBookshelfLike(data.isLiked);
  };

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
      <div className="mt-[0.8rem] flex flex-col gap-[0.8rem] pb-[2rem] pt-[1rem] font-bold">
        <h1 className="text-[1.8rem]">
          <span className="text-main-900">{data.userNickname}</span>
          님의 책장
        </h1>
        <div className="flex items-center justify-between">
          <span className="text-[1.4rem] text-[#939393]">
            {`${data.job.jobGroupKoreanName} • ${data.job.jobNameKoreanName}`}
          </span>
          <LikeButton
            isLiked={data.isLiked}
            likeCount={data.likeCount}
            onClick={handleClickLikeButton}
          />
        </div>
      </div>

      <BookShelfContent
        bookshelfId={bookshelfId}
        userNickname={data.userNickname}
      />
    </div>
  );
}

const BookShelfContent = ({
  bookshelfId,
  userNickname,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
  userNickname: APIBookshelfInfo['userNickname'];
}) => {
  const isAuthenticated = checkAuthentication();
  const { ref, inView } = useInView();

  const {
    data: booksData,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
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

      {isFetching && !isFetchingNextPage ? null : <div ref={ref} />}
    </>
  ) : (
    <>
      <BookShelfRow books={booksData.pages[0].books[0]} />
      <div className="pointer-events-none blur-sm">
        <BookShelfRow books={initialBookImageUrl} />
      </div>
      <div className="mt-[3.8rem] flex flex-col gap-[2rem] rounded-[4px] border border-[#CFCFCF] px-[1.7rem] py-[4rem]">
        <p className="text-center text-md font-bold">
          지금 로그인하면
          <br />
          책장에 담긴 모든 책을 볼 수 있어요!
        </p>
        <p className="text-center text-xs text-placeholder">
          <span className="text-main-900">{userNickname}</span>님의 책장에서
          다양한
          <br />
          인사이트를 얻을 수 있어요.
        </p>
        <Link href={KAKAO_LOGIN_URL}>
          <Button colorScheme="kakao" size="full">
            <div className="flex justify-center gap-[1rem]">
              <IconKakao width={16} height={'auto'} />
              <span className="text-md font-normal">카카오 로그인</span>
            </div>
          </Button>
        </Link>
      </div>
    </>
  );
};

const initialBookImageUrl = [
  { bookId: 1, title: 'book1', imageUrl: '/images/book-cover/book1.jpeg' },
  { bookId: 2, title: 'book2', imageUrl: '/images/book-cover/book2.jpeg' },
  { bookId: 3, title: 'book3', imageUrl: '/images/book-cover/book3.jpeg' },
  { bookId: 4, title: 'book4', imageUrl: '/images/book-cover/book4.jpeg' },
];

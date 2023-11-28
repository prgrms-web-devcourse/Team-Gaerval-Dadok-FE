'use client';

import { IconHeart, IconArrowLeft, IconShare, IconKakao } from '@public/icons';
import { useToast } from '@/hooks/toast';
import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import {
  useBookshelfLike,
  useBookshelfUnlike,
} from '@/queries/bookshelf/useBookshelfLikeMutation';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/ui/Base/Button';
import TopNavigation from '@/ui/Base/TopNavigation';
import BookShelfRow from '@/v1/bookShelf/BookShelfRow';
import { useRouter } from 'next/navigation';
import { isAuthed } from '@/utils/helpers';
import Link from 'next/link';
import type { APIBookshelf, APIBookshelfInfo } from '@/types/bookshelf';

const KAKAO_OAUTH_LOGIN_URL = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

export default function UserBookShelfPage({
  params: { bookshelfId },
}: {
  params: {
    bookshelfId: APIBookshelf['bookshelfId'];
  };
}) {
  const { data, isSuccess } = useBookshelfInfoQuery({ bookshelfId });
  const { mutate: likeBookshelf } = useBookshelfLike(bookshelfId);
  const { mutate: unlikeBookshelf } = useBookshelfUnlike(bookshelfId);
  const { showToast } = useToast();
  const router = useRouter();

  if (!isSuccess) return null;

  const handleClickShareButton = () => {
    const url = window.location.href;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        showToast({ message: '복사 성공!' });
      })
      .catch(() => {
        showToast({ message: '잠시 후 다시 시도해주세요' });
      });
  };

  const handleClickLikeButton = () => {
    !data.isLiked ? likeBookshelf() : unlikeBookshelf();
  };

  return (
    <div className="flex w-full flex-col">
      <TopNavigation>
        <TopNavigation.LeftItem>
          <button onClick={() => router.back()}>
            <IconArrowLeft />
          </button>
        </TopNavigation.LeftItem>
        <TopNavigation.RightItem>
          <button onClick={handleClickShareButton}>
            <IconShare />
          </button>
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
          <Button
            size="small"
            colorScheme="warning"
            fullRadius
            onClick={handleClickLikeButton}
          >
            <div className="bold flex items-center gap-[0.4rem] text-xs">
              <IconHeart fill="white" height="1.3rem" w="1.3rem" />
              {data.likeCount}
            </div>
          </Button>
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
  const { ref, inView } = useInView();

  const {
    data: booksData,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isFetching,
    isFetchingNextPage,
  } = useBookshelfBooksQuery({ bookshelfId });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage]);

  // TODO: Suspense 적용
  if (!isSuccess) return null;

  return isAuthed() ? (
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
        <Link href={KAKAO_OAUTH_LOGIN_URL}>
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

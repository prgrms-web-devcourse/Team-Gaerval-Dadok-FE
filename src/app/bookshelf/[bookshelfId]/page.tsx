'use client';

import { IconHeart, IconArrowLeft, IconShare } from '@public/icons';
import { useToast } from '@/hooks/toast';
import useBookshelfBooksQuery from '@/queries/bookshelf/useBookshelfBookListQuery';
import useBookshelfInfoQuery from '@/queries/bookshelf/useBookshelfInfoQuery';
import {
  useBookshelfLike,
  useBookshelfUnlike,
} from '@/queries/bookshelf/useBookshelfLikeMutation';
import { APIBookshelf } from '@/types/bookshelf';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/ui/Base/Button';
import TopNavigation from '@/ui/Base/TopNavigation';
import BookShelf from '@/v1/bookShelf/BookShelf';

// const kakaoUrl = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorize/kakao?redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_REDIRECT_URI}`;

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
          <IconArrowLeft />
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

      <BookShelfContent bookshelfId={bookshelfId} />
    </div>
  );
}

const BookShelfContent = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
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

  return (
    <>
      {booksData.pages.map(page =>
        page.books.map((rowBooks, idx) => (
          <BookShelf key={idx}>
            <div className="relative pb-[2.5rem] pt-[2rem] shadow-[0px_0px_10px_0px_#D1D1D1]">
              <BookShelf.Background />
              <BookShelf.Books books={rowBooks} />
            </div>
          </BookShelf>
        ))
      )}

      {isFetching && !isFetchingNextPage ? null : <div ref={ref} />}
    </>
  );
};

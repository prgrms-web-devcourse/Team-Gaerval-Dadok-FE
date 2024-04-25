'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

import useBookInfoQuery from '@/queries/book/useBookInfoQuery';

import { IconArrowLeft, IconBookPlus, IconDelete } from '@public/icons';
import BookCover from '@/v1/book/BookCover';
import { APIBook } from '@/types/book';

const BookInfoCard = ({
  bookId,
  removable = false,
  onBookIdChange: _onBookIdChange,
}: {
  bookId?: number;
  removable?: boolean;
  onBookIdChange?: (id: APIBook['bookId']) => void;
}) => {
  const [id, setId] = useState<typeof bookId | null>(bookId);

  useEffect(() => {
    setId(bookId);
  }, [bookId]);

  const handleBookSelect = () => {
    // TODO: 도서 선택 UI 제공 후 선택된 도서로 id 변경
    // setId(23);
    // onBookIdChange?.(23);
  };

  const handleBookInfoRemove = () => {
    setId(null);
  };

  if (!id) {
    return <EmptyBookInfoCard onBookSelect={handleBookSelect} />;
  }

  return (
    <Suspense fallback={<BookInfoCardSkeleton />}>
      <BookInfoContent
        bookId={id}
        removable={removable}
        onBookInfoRemove={handleBookInfoRemove}
      />
    </Suspense>
  );
};

export default BookInfoCard;

const BookInfoContent = ({
  bookId,
  removable = false,
  onBookInfoRemove,
}: {
  bookId: number;
  removable?: boolean;
  onBookInfoRemove?: () => void;
}) => {
  const { data: bookInfo } = useBookInfoQuery(bookId);

  return (
    <div className="flex min-h-[12.8rem] w-full gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
      <BookCover size="xsmall" src={bookInfo.imageUrl} title={bookInfo.title} />
      <div className="flex min-w-0 flex-grow flex-col">
        <span className="truncate text-sm font-bold">{bookInfo.title}</span>
        <span className="text-xs text-placeholder">{bookInfo.author}</span>
      </div>
      {removable ? (
        <IconDelete
          className="h-[2rem] w-[2rem] flex-shrink-0 cursor-pointer"
          onClick={onBookInfoRemove}
        />
      ) : (
        <Link href={`/book/${bookId}`} className="cursor-pointer">
          <IconArrowLeft className="h-[1.5rem] w-[1.5rem] flex-shrink-0 rotate-180" />
        </Link>
      )}
    </div>
  );
};

const EmptyBookInfoCard = ({ onBookSelect }: { onBookSelect?: () => void }) => {
  return (
    <div
      className="flex min-h-[12.8rem] w-full cursor-pointer flex-col items-center justify-center gap-[1rem] rounded-[0.5rem] border-[0.05rem] border-cancel shadow-bookcard"
      onClick={onBookSelect}
    >
      <IconBookPlus className="h-[2rem] w-[2rem] fill-placeholder" />
      <p className="text-xs text-placeholder">
        독서모임에 사용할 책을 선택해주세요
      </p>
    </div>
  );
};

const BookInfoCardSkeleton = () => {
  return (
    <div className="flex min-h-[12.8rem] w-full animate-pulse cursor-pointer items-center gap-[2.4rem] rounded-[0.5rem] border-[0.05rem] border-cancel px-[2.2rem] py-[1.8rem]">
      <div className="h-[9.1rem] w-[6.5rem] rounded-[0.5rem] bg-placeholder"></div>
      <div className="mt-[0.3rem] flex flex-col gap-[0.5rem] self-start">
        <div className="h-[1.4rem] w-[10rem] bg-placeholder"></div>
        <div className="h-[1.2rem] w-[3rem] bg-placeholder"></div>
      </div>
    </div>
  );
};

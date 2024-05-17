import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { APIBestSellerSearchRange, APISearchedBook } from '@/types/book';
import useBestSellersQuery from '@/queries/book/useBestSellersQuery';
import bookAPI from '@/apis/book';

import useToast from '@/v1/base/Toast/useToast';

import BookCover from '@/v1/book/BookCover';
import Skeleton from '@/v1/base/Skeleton';

const SEARCH_RANGES = {
  주간: 'WEEKLY',
  월간: 'MONTHLY',
  연간: 'YEARLY',
} as const;

type SearchRangeTypes = keyof typeof SEARCH_RANGES;

const BestSellers = () => {
  const [bestSellerSearchRange, setBestSellerSearchRange] =
    useState<APIBestSellerSearchRange>('WEEKLY');
  const searchRanges = Object.keys(SEARCH_RANGES) as SearchRangeTypes[];

  const bestSellersInfo = useBestSellersQuery();
  const bestSellers = bestSellersInfo.isSuccess
    ? bestSellersInfo.data.item
    : [];

  const router = useRouter();
  const toast = useToast();

  const handleClickBook = async (book: APISearchedBook) => {
    try {
      const {
        data: { bookId },
      } = await bookAPI.createBook({ book });

      router.push(`/book/${bookId}`);
    } catch (error) {
      toast.show({
        type: 'error',
        message: '잠시 후 다시 시도해주세요',
      });
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col gap-[1.5rem]">
      <h2 className="font-body1-regular">인기 도서</h2>
      <ul className="flex w-[calc(100%+2rem)] gap-[0.8rem] overflow-x-scroll whitespace-nowrap">
        <li className="rounded-[1.5rem] bg-[#5C5C5C] px-[1.5rem] py-[0.3rem]">
          <p className="font-normal text-white font-body2-regular">종합</p>
        </li>
      </ul>

      <ul className="flex w-full flex-row items-center divide-x divide-black-900 font-body2-regular">
        {searchRanges.map(keys => (
          <li
            className={`flex h-[1.1rem] cursor-pointer items-center px-[0.9rem] ${
              SEARCH_RANGES[keys] === bestSellerSearchRange
                ? 'text-black-700'
                : 'text-[#5c5c5c]'
            }`}
            key={keys}
            onClick={() => setBestSellerSearchRange(SEARCH_RANGES[keys])}
          >
            {keys}
          </li>
        ))}
      </ul>

      {bestSellerSearchRange === 'WEEKLY' ? (
        <ul className="flex w-[calc(100%+2rem)] overflow-x-scroll pb-[1rem]">
          {bestSellers.map(book => (
            <BestSeller
              key={book.isbn}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
              contents={book.description}
              url={book.link}
              imageUrl={book.cover}
              publisher={book.publisher}
              bestRank={book.bestRank}
              onClick={handleClickBook}
            />
          ))}
        </ul>
      ) : (
        <p className="mb-[2.4rem] text-center text-placeholder font-body2-regular">
          아직 준비중인 기능이에요 🔨
        </p>
      )}
    </section>
  );
};

export default BestSellers;

type BestSellerProps = {
  title: string;
  author: string;
  isbn: string;
  contents: string;
  url: string;
  imageUrl: string;
  publisher: string;
  bestRank: number;
  onClick: (book: APISearchedBook) => Promise<void>;
};

const BestSeller = ({
  title,
  author,
  isbn,
  contents,
  url,
  imageUrl,
  publisher,
  bestRank,
  onClick,
}: BestSellerProps) => {
  const bookReqBody = {
    title,
    author,
    isbn,
    contents,
    url,
    imageUrl,
    publisher,
    apiProvider: 'ALADIN',
  };

  return (
    <div
      className="flex w-[12.7rem] cursor-pointer flex-col gap-[1.3rem] px-[0.7rem]"
      onClick={() => onClick(bookReqBody)}
    >
      <BookCover src={imageUrl} title={title} size={'xlarge'} />
      <div className="flex flex-row gap-[1rem]">
        <p className="text-black-900 font-heading">{bestRank}</p>
        <div className="flex min-w-0 flex-col gap-[0.3rem] font-body2-regular">
          <p className="line-clamp-2 !leading-tight text-black-900 ">{title}</p>
          <p className="line-clamp-1 text-[#5c5c5c] ">{author}</p>
        </div>
      </div>
    </div>
  );
};

const BestSellerSkeleton = () => {
  return (
    <div className="flex w-[12.7rem] flex-col gap-[1.3rem] px-[0.7rem]">
      <Skeleton.Rect width="11rem" height="15.4rem" rounded="medium" />
      <div className="flex flex-row gap-[1rem]">
        <Skeleton.Text width="1.25rem" fontSize="2xlarge" />
        <div className="flex min-w-0 flex-col gap-[0.3rem]">
          <Skeleton.Text width="8.75rem" fontSize="2xlarge" />
          <Skeleton.Text width="7.25rem" fontSize="xlarge" />
        </div>
      </div>
    </div>
  );
};

export const BestSellersSkeleton = () => {
  return (
    <Skeleton>
      <section className="flex flex-col gap-[1.7rem]">
        <Skeleton.Text width="7rem" fontSize="2xlarge" />
        <ul className="flex w-full gap-[1rem] pb-[1rem]">
          <Skeleton.Rect width="5.5rem" height="2.7rem" rounded="large" />
        </ul>
        <ul className="flex w-[12.8rem] flex-row justify-around">
          <Skeleton.Text width="2.5rem" fontSize="xsmall" />
          <Skeleton.Text width="2.5rem" fontSize="xsmall" />
          <Skeleton.Text width="2.5rem" fontSize="xsmall" />
        </ul>
        <ul className="flex w-[calc(100%+2rem)] overflow-x-scroll">
          <BestSellerSkeleton />
          <BestSellerSkeleton />
          <BestSellerSkeleton />
          <BestSellerSkeleton />
        </ul>
      </section>
    </Skeleton>
  );
};

// 'w-[11.0rem] h-[15.4rem]'

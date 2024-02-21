import { useState } from 'react';
import Link from 'next/link';

import type { APIBestSellerSearchRange } from '@/types/book';
import useBestSellersQuery from '@/queries/book/useBestSellersQuery';

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

  const bestSellersInfo = useBestSellersQuery();

  const searchRanges = Object.keys(SEARCH_RANGES) as SearchRangeTypes[];

  const bestSellers = bestSellersInfo.isSuccess
    ? bestSellersInfo.data.item
    : [];

  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">인기 도서</h2>
      <ul className="flex w-[calc(100%+2rem)] gap-[0.8rem] overflow-x-scroll whitespace-nowrap">
        <li className="rounded-[1.5rem] bg-[#5C5C5C] px-[1.5rem] py-[0.3rem]">
          <p className="text-sm font-normal text-white">종합</p>
        </li>
      </ul>

      <ul className="flex w-full flex-row items-center divide-x divide-black-900 text-sm">
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
        <ul className="flex w-[calc(100%+2rem)] overflow-x-scroll">
          {bestSellers.map(book => (
            <BestSeller
              key={book.isbn}
              title={book.title}
              author={book.author}
              imageUrl={book.cover}
              bestRank={book.bestRank}
              link={book.link}
            />
          ))}
        </ul>
      ) : (
        <p className="mb-[2.4rem] text-center text-sm text-placeholder">
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
  imageUrl: string;
  bestRank: number;
  link: string;
};

const BestSeller = ({
  title,
  author,
  imageUrl,
  bestRank,
  link,
}: BestSellerProps) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="flex w-[12.7rem] flex-col gap-[1.3rem] px-[0.7rem]"
    >
      <BookCover src={imageUrl} title={title} size={'xlarge'} />
      <div className="flex flex-row gap-[1rem]">
        <p className="text-xl font-bold leading-tight text-black-900">
          {bestRank}
        </p>
        <div className="flex min-w-0 flex-col gap-[0.3rem]">
          <p className="line-clamp-2 text-sm leading-tight text-black-900">
            {title}
          </p>
          <p className="line-clamp-1 text-sm text-[#5c5c5c]">{author}</p>
        </div>
      </div>
    </Link>
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
    <section className="flex animate-pulse flex-col gap-[1.7rem]">
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
  );
};

// 'w-[11.0rem] h-[15.4rem]'

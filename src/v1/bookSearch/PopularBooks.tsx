'use client';

import Image from 'next/image';
import { useState } from 'react';

const PERIOD_RANGES = {
  주간: 'WEEKLY',
  월간: 'MONTHLY',
  연간: 'YEARLY',
} as const;

type PeriodRangeTypes = keyof typeof PERIOD_RANGES;

const PopularBooks = () => {
  const [periodRange, setPeriodRange] = useState<PeriodRangeTypes>('주간');

  const periodRanges = Object.keys(PERIOD_RANGES) as PeriodRangeTypes[];
  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">인기 도서</h2>
      <ul className="flex h-[2.5rem] w-[calc(100%+2rem)] gap-[0.8rem] overflow-x-scroll whitespace-nowrap">
        <div className="rounded-[1.5rem] bg-[#5C5C5C] px-[1.5rem] py-[0.3rem]">
          <p className="text-sm font-normal text-white">종합</p>
        </div>
      </ul>
      <ul className="flex h-[1.9rem] w-full flex-row items-center divide-x divide-black-900 text-sm">
        {periodRanges.map((value, idx) => (
          <li
            className={`flex h-[1.1rem] cursor-pointer items-center px-[0.9rem] ${
              periodRange === value ? 'text-black-700' : 'text-[#5c5c5c]'
            }`}
            key={`${idx}-${value}`}
            onClick={() => setPeriodRange(value)}
          >
            {value}
          </li>
        ))}
      </ul>
      <ul className="flex w-[calc(100%+2rem)] gap-[1.5rem] overflow-x-scroll whitespace-nowrap">
        {BestSellers.map(data => (
          <PopularBook
            key={data.isbn}
            title={data.title}
            author={data.author}
            imageUrl={data.imageUrl}
            bestRank={data.bestRank}
          />
        ))}
      </ul>
    </section>
  );
};

export default PopularBooks;

type PopularBookProps = {
  title: string;
  author: string;
  imageUrl: string;
  bestRank: number;
};

const PopularBook = ({
  title,
  author,
  imageUrl,
  bestRank,
}: PopularBookProps) => {
  return (
    <li className="flex h-[20.8rem] w-[12.7rem] flex-col gap-[1.3rem] px-[0.7rem]">
      <div className="h-[15.4rem] w-[11rem]">
        <Image
          className="h-[15.4rem] w-[11rem] rounded-[0.6rem]"
          src={imageUrl}
          alt={title}
          width={110}
          height={154}
        />
      </div>
      <div className="flex h-[4.1rem] w-full flex-row gap-[1.3rem]">
        <p className="text-xl font-bold text-black-900">{bestRank}</p>
        <div className="flex flex-col gap-[0.3rem]">
          <p className="text-sm text-black-900">{title}</p>
          <p className="text-sm text-[#5c5c5c]">{author}</p>
        </div>
      </div>
    </li>
  );
};

const BestSellers = [
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 1,
    isbn: '12387612874632',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 2,
    isbn: '19797835733841',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 3,
    isbn: '38785435924823',
  },
  {
    title: '리팩터링 2판',
    author: '마틴 파울러',
    imageUrl: '/images/book-cover/book4.jpeg',
    bestRank: 4,
    isbn: '98878454353534',
  },
];

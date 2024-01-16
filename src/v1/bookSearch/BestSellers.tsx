'use client';

import Image from 'next/image';

import type {
  APIBestSeller,
  APIBestSellerSearchRangeTypes,
} from '@/types/book';

const SEARCH_RANGES = {
  주간: 'WEEKLY',
  월간: 'MONTHLY',
  연간: 'YEARLY',
} as const;

type BestSellersProps = {
  bestSellers: APIBestSeller[];
  searchRange: APIBestSellerSearchRangeTypes;
  setSearchRange: React.Dispatch<
    React.SetStateAction<APIBestSellerSearchRangeTypes>
  >;
};

type SearchRangeTypes = keyof typeof SEARCH_RANGES;

const BestSellers = ({
  bestSellers,
  searchRange,
  setSearchRange,
}: BestSellersProps) => {
  const searchRanges = Object.keys(SEARCH_RANGES) as SearchRangeTypes[];

  return (
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">인기 도서</h2>
      <ul className="flex h-[2.5rem] w-[calc(100%+2rem)] gap-[0.8rem] overflow-x-scroll whitespace-nowrap">
        <div className="rounded-[1.5rem] bg-[#5C5C5C] px-[1.5rem] py-[0.3rem]">
          <p className="text-sm font-normal text-white">종합</p>
        </div>
      </ul>
      <ul className="flex h-[1.9rem] w-full flex-row items-center divide-x divide-black-900 text-sm">
        {searchRanges.map(keys => (
          <li
            className={`flex h-[1.1rem] cursor-pointer items-center px-[0.9rem] ${
              SEARCH_RANGES[keys] === searchRange
                ? 'text-black-700'
                : 'text-[#5c5c5c]'
            }`}
            key={keys}
            onClick={() => setSearchRange(SEARCH_RANGES[keys])}
          >
            {keys}
          </li>
        ))}
      </ul>
      {bestSellers.length !== 0 ? (
        <ul className="flex w-[calc(100%+2rem)] gap-[1.5rem] overflow-x-scroll whitespace-nowrap">
          {bestSellers.map(data => (
            <BestSeller
              key={data.isbn}
              title={data.title}
              author={data.author}
              imageUrl={data.imageUrl}
              bestRank={data.bestRank}
            />
          ))}
        </ul>
      ) : (
        <p className="mb-[2.4rem] text-center text-sm text-placeholder">
          로그인하면 기간별 인기도서를 확인할 수 있어요!
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
};

/**
 * @todo
 * BookCover로 대체할 것!!!
 */
const BestSeller = ({ title, author, imageUrl, bestRank }: BestSellerProps) => {
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

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import type { APIBestSellerSearchRange, APISearchedBook } from '@/types/book';
import useBestSellersQuery from '@/queries/book/useBestSellersQuery';
import bookAPI from '@/apis/book';

import BookCover from '@/v1/book/BookCover';
import useToast from '@/v1/base/Toast/useToast';

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
    <section className="flex flex-col gap-[1.7rem]">
      <h2 className="h-[2.4rem] text-lg">인기 도서</h2>
      <ul className="flex w-[calc(100%+2rem)] gap-[0.8rem] overflow-x-scroll whitespace-nowrap">
        <div className="rounded-[1.5rem] bg-[#5C5C5C] px-[1.5rem] py-[0.3rem]">
          <p className="text-sm font-normal text-white">종합</p>
        </div>
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
    </div>
  );
};

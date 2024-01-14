import Image from 'next/image';

import type { APISearchedBook } from '@/types/book';

import { DATA_URL } from '@/constants/dataUrl';
import LogoSmallIcon from '@public/icons/logo.svg';

type SearchResultProps = {
  searchedBooks: APISearchedBook[];
};

const SearchResult = ({ searchedBooks }: SearchResultProps) => {
  return (
    <ul className="grid grid-cols-3 gap-[0.6rem]">
      {searchedBooks.map((searchedBook, idx) => (
        <SearchResultItem
          key={`${searchedBook.isbn}-${idx}`}
          imageUrl={searchedBook.imageUrl}
          title={searchedBook.title}
        />
      ))}
    </ul>
  );
};

export default SearchResult;

const SearchResultItem = ({
  imageUrl,
  title,
}: {
  imageUrl: string;
  title: string;
}) => {
  return (
    <li className="flex max-h-[16.7rem] w-full min-w-[10.26rem] max-w-[11.5rem] flex-col justify-center gap-[0.5rem] rounded-[0.4rem] bg-white px-[1.25rem] py-[1rem] shadow-searchResultItem">
      <div className="max-h-[12.6rem] max-w-[9rem]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            blurDataURL={DATA_URL['placeholder']}
            className={
              'object-fit h-full w-full rounded-[0.5rem] shadow-bookcover'
            }
            width={90}
            height={126}
          />
        ) : (
          <div className="flex h-full max-h-[12.6rem] max-w-[9rem] justify-center">
            <LogoSmallIcon />
          </div>
        )}
      </div>
      <p className="max-w-[9rem] truncate text-center text-sm font-normal text-black-900">
        {title}
      </p>
    </li>
  );
};

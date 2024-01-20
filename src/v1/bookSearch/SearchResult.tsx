import Image from 'next/image';
import { useRouter } from 'next/navigation';

import bookAPI from '@/apis/book';
import type { APISearchedBook } from '@/types/book';

import { DATA_URL } from '@/constants/dataUrl';
import { LogoWithText } from '@public/icons';

type BookSearchResultsProps = {
  searchedBooks: APISearchedBook[];
};

const BookSearchResults = ({ searchedBooks }: BookSearchResultsProps) => {
  const router = useRouter();

  const handleClickBook = async (book: APISearchedBook) => {
    try {
      const {
        data: { bookId },
      } = await bookAPI.createBook({ book });

      router.push(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ul className="grid grid-cols-3 gap-[0.6rem]">
      {searchedBooks.map((searchedBook, idx) => (
        <SearchedBook
          key={`${searchedBook.isbn}-${idx}`}
          imageUrl={searchedBook.imageUrl}
          title={searchedBook.title}
          onClick={() => handleClickBook(searchedBook)}
        />
      ))}
    </ul>
  );
};

export default BookSearchResults;

const SearchedBook = ({
  imageUrl,
  title,
  onClick,
}: {
  imageUrl: string;
  title: string;
  onClick: () => Promise<void>;
}) => {
  return (
    <li
      onClick={onClick}
      className="flex max-h-[17.2rem] w-full min-w-[10.26rem] max-w-[11.5rem] cursor-pointer flex-col justify-center gap-[0.5rem] rounded-[0.4rem] bg-white px-[1.25rem] py-[1rem] shadow-searchResultItem"
    >
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
            <LogoWithText />
          </div>
        )}
      </div>
      <p className="max-w-[9rem] truncate text-center text-sm font-normal text-black-900">
        {title}
      </p>
    </li>
  );
};

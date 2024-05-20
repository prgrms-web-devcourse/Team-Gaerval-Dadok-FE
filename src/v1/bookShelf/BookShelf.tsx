'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ColorThief from 'colorthief';

import { APIBook } from '@/types/book';
import { APIBookshelf } from '@/types/bookshelf';
import { IconArrowRight, IconHeart } from '@public/icons';

import Badge from '@/v1/base/Badge';

const BookShelf = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const Background = () => {
  return (
    <div className="absolute bottom-0 w-full rounded-b-[inherit]">
      <div className="h-[3rem] bg-[#F2ECDF] shadow-[0px_-3px_8px_0px_#F1F1F1_inset]" />
      <div className="h-[1rem] rounded-b-[inherit] bg-[#F6F3EC] shadow-[0px_-1px_8px_-4.5px_#494949]" />
    </div>
  );
};

type InfoProps = Omit<APIBookshelf, 'books'>;

const Info = ({ bookshelfName, bookshelfId, likeCount }: InfoProps) => {
  return (
    <div className="flex flex-col gap-[1rem]">
      <div className="flex items-center justify-between">
        <div className="font-body2-bold">{bookshelfName}</div>
        <Link href={`/bookshelf/${bookshelfId}`}>
          <IconArrowRight width="1.8rem" height="1.8rem" />
        </Link>
      </div>
      <Badge colorScheme="red" fontWeight="bold" size="small">
        <div className="flex items-center gap-[0.4rem]">
          <IconHeart className="h-[1.3rem] w-[1.3rem] fill-warning-800 stroke-white stroke-[0.15rem]" />
          <div className="font-caption1-bold">{likeCount}</div>
        </div>
      </Badge>
    </div>
  );
};

type BooksProps = Pick<APIBookshelf, 'books'>;

const Books = ({ books }: BooksProps) => {
  return (
    <ul className="grid grid-cols-4 px-[0.5rem]">
      {books.map(book => (
        <li key={book.bookId} className="flex justify-center">
          <Book {...book} />
        </li>
      ))}
    </ul>
  );
};

const Book = ({
  imageUrl,
  bookId,
  title,
}: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>) => {
  const [bookSpineColor, setBookSpineColor] = useState<string>();
  const placeholderClassName = bookSpineColor ? '' : 'bg-blur';

  const handleOnLoadImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const colorHex = colorThief
      .getPalette(image, 2)[0]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
    setBookSpineColor(`#${colorHex}`);
  };

  return (
    <Link
      href={`/book/${bookId}`}
      className="relative flex"
      style={{
        transformStyle: 'preserve-3d',
        transform: 'perspective(140px)',
      }}
    >
      {/** 책 옆면 (책등) */}
      <div
        className={`h-full w-[1.5rem] ${placeholderClassName}`}
        style={{
          backgroundColor: bookSpineColor,
          transform: 'rotateY(320deg) translateX(1rem) translateZ(0.4rem)',
        }}
      >
        {/** 옆면과 표지 사이 여백을 메꾸기 위해 추가 */}
        <div
          className={`absolute -right-[0.5px] h-full w-[2px] ${placeholderClassName}`}
          style={{ backgroundColor: bookSpineColor }}
        />
      </div>

      {/** 책 하단 그림자 */}
      <div
        className="absolute bottom-0 h-2 w-[calc(100%-1.5rem)] shadow-[1px_4px_10px_4px_#b1b1b1]"
        style={{
          transform: 'rotateY(20deg) translateX(1.25rem) translateZ(-0.5rem)',
        }}
      />

      {/** 책 표지 */}
      <div
        className="bg-blur relative h-[9.1rem] w-[6.5rem] rounded-[2px] after:absolute after:inset-0 after:border-[1px] after:border-black-900/[.06]"
        style={{
          transform: 'rotateY(22deg) translateZ(0.3rem)',
        }}
      >
        <Image
          src={imageUrl}
          alt={title}
          onLoadingComplete={handleOnLoadImage}
          className=" rounded-[1px] object-cover"
          sizes="9.1rem"
          fill
          style={{ visibility: bookSpineColor ? 'visible' : 'hidden' }}
        />
      </div>
    </Link>
  );
};

BookShelf.Background = Background;
BookShelf.Info = Info;
BookShelf.Books = Books;

export default BookShelf;

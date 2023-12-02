import { APIBookshelf } from '@/types/bookshelf';
import { IconArrowRight, IconHeart } from '@public/icons';
import Link from 'next/link';
import Badge from '@/ui/Base/Badge';
import Image from 'next/image';
import { APIBook } from '@/types/book';
import { ReactNode, useState } from 'react';
import ColorThief from 'colorthief';

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
        <div className="text-md font-bold">{bookshelfName}</div>
        <Link href={`/bookshelf/${bookshelfId}`}>
          <IconArrowRight width="1.8rem" height="1.8rem" />
        </Link>
      </div>
      <Badge colorScheme="red" fontWeight="bold" size="small">
        <div className="flex items-center gap-[0.4rem]">
          <IconHeart
            fill="#F56565"
            stroke="white"
            stroke-width={1.5}
            height="1.3rem"
            w="1.3rem"
          />
          <div className="bold text-xs">{likeCount}</div>
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
}: Pick<APIBook, 'bookId' | 'title' | 'imageUrl'>) => {
  const [bookSpineColor, setBookSpineColor] = useState<string>();

  const handleOnLoadImage = (image: HTMLImageElement) => {
    const colorThief = new ColorThief();
    const colorHex = colorThief
      .getPalette(image, 2)[0]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
    setBookSpineColor(`#${colorHex}`);
  };

  return (
    <div
      className="relative flex"
      style={{
        visibility: bookSpineColor ? 'visible' : 'hidden',
        transformStyle: 'preserve-3d',
        transform: 'perspective(140px)',
      }}
    >
      <div
        className="h-full w-[1.5rem]"
        style={{
          backgroundColor: bookSpineColor,
          transform: 'rotateY(320deg) translateX(1rem) translateZ(0.4rem)',
        }}
      />
      <div
        className="absolute bottom-0 h-2 w-[calc(100%-1.5rem)] shadow-[1px_4px_10px_4px_#b1b1b1]"
        style={{
          transform: 'rotateY(20deg) translateX(1.25rem) translateZ(-0.5rem)',
        }}
      />
      <Link
        className="relative"
        href={`/book/${bookId}`}
        style={{
          transform: 'rotateY(22deg) translateZ(0.3rem)',
        }}
      >
        <Image
          src={imageUrl}
          width={60}
          height={90}
          alt="book cover"
          onLoadingComplete={handleOnLoadImage}
          quality={100}
        />
      </Link>
    </div>
  );
};

BookShelf.Background = Background;
BookShelf.Info = Info;
BookShelf.Books = Books;

export default BookShelf;

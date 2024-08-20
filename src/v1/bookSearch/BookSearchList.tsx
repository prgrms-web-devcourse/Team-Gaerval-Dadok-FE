import { useRouter } from 'next/navigation';

import bookAPI from '@/apis/book';
import type { APISearchedBook } from '@/types/book';

import useToast from '@/v1/base/Toast/useToast';

import BookCover from '../book/BookCover';

type BookSearchListProps = {
  books: APISearchedBook[];
  totalCount?: number;
};

const BookSearchList = ({ books, totalCount }: BookSearchListProps) => {
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

  if (!books.length) {
    return (
      <p className="mb-[2.4rem] text-center text-sm text-placeholder">
        검색된 도서가 없어요 🥲
      </p>
    );
  }

  return (
    <>
      <h3 className="mb-[1rem] font-bold">
        <span className="">검색 결과 </span>
        <span className="text-black-500">{totalCount}</span>
      </h3>
      <ul className="grid w-full grid-cols-3 gap-[1.6rem]">
        {books.map((book, idx) => (
          <BookSearchItem
            key={`${book.isbn}-${idx}`}
            imageUrl={book.imageUrl}
            title={book.title}
            onClick={() => handleClickBook(book)}
          />
        ))}
      </ul>
    </>
  );
};

export default BookSearchList;

const BookSearchItem = ({
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
      className="flex min-h-0 w-full cursor-pointer flex-col gap-[0.8rem] bg-white p-[0.2rem]"
    >
      <BookCover size="fill" src={imageUrl} title={title} />
      <p className="line-clamp-2 text-sm font-normal leading-tight text-black-900">
        {title}
      </p>
    </li>
  );
};

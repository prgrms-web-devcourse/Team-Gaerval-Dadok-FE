import type { APISearchedBook, SearchedBookWithId } from '@/types/book';

import bookAPI from '@/apis/book';
import useToast from '@/components/common/Toast/useToast';

import BookCover from '@/components/book/BookCover';

type BookSearchListProps = {
  books: APISearchedBook[];
  totalCount?: number;
  onBookClick?: (book: SearchedBookWithId) => void;
};

const BookSearchList = ({
  books,
  totalCount,
  onBookClick,
}: BookSearchListProps) => {
  const { show: showToast } = useToast();

  const handleBookClick = async (book: APISearchedBook) => {
    try {
      const { data } = await bookAPI.createBook({ book });
      const { bookId } = data;

      onBookClick && onBookClick({ ...book, bookId });
    } catch (error) {
      showToast({ type: 'error', message: '잠시 후 다시 시도해주세요' });
      console.error(error);
    }
  };

  if (!books.length) {
    return (
      <p className="mb-[2.4rem] text-center text-placeholder font-body2-regular">
        검색된 도서가 없어요 🥲
      </p>
    );
  }

  return (
    <>
      <h3 className="mb-[1rem] ">
        <span className="text-black-600 font-body1-bold">검색 결과 </span>
        <span className="pl-[0.2rem] text-black-500 font-body1-regular">
          {totalCount}
        </span>
      </h3>
      <ul className="grid w-full grid-cols-3 gap-[1.6rem]">
        {books.map((book, idx) => (
          <BookSearchItem
            key={`${book.isbn}-${idx}`}
            imageUrl={book.imageUrl}
            title={book.title}
            onClick={() => handleBookClick(book)}
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
  onClick: () => void;
}) => {
  return (
    <li
      onClick={onClick}
      className="flex min-h-0 w-full cursor-pointer flex-col gap-[0.8rem] bg-white p-[0.2rem]"
    >
      <BookCover size="fill" src={imageUrl} title={title} />
      <p className="line-clamp-2 !leading-tight text-black-900 font-body2-regular">
        {title}
      </p>
    </li>
  );
};

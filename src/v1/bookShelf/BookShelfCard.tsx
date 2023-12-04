import { APIBookshelf } from '@/types/bookshelf';
import BookShelf from './BookShelf';

const BookShelfCard = ({
  bookshelfName,
  bookshelfId,
  likeCount,
  books,
}: APIBookshelf) => {
  return (
    <BookShelf>
      <div className="relative rounded-[2rem] pb-[2.5rem] pt-[2rem] shadow-[0px_0px_10px_0px_#D1D1D1]">
        <BookShelf.Background />
        <div className="flex flex-col gap-[2.6rem] bg-white px-[2rem]">
          <BookShelf.Info
            bookshelfName={bookshelfName}
            bookshelfId={bookshelfId}
            likeCount={likeCount}
          />
          <BookShelf.Books books={books} />
        </div>
      </div>
    </BookShelf>
  );
};

export default BookShelfCard;

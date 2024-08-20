import { APIBookshelf } from '@/types/bookshelf';
import BookShelf from './BookShelf';

const BookShelfRow = ({ books }: Pick<APIBookshelf, 'books'>) => {
  return (
    <BookShelf>
      <div className="relative left-[-2rem] w-[calc(100%+4rem)] px-[-2rem] pb-[2.5rem] pt-[2rem] shadow-[0px_28px_20px_-16px_#D1D1D1]">
        <BookShelf.Background />
        <BookShelf.Books books={books} />
      </div>
    </BookShelf>
  );
};

export default BookShelfRow;

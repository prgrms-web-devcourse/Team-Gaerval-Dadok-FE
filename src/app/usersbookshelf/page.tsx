import { DUMMY_BOOKS } from '@/pages/api/dummyBooks';
import InteractiveBook from '@/ui/InteractiveBook';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UsersBookShelfPage from '@/ui/UsersBookShelfPage';

export default function MyBookShelf() {
  return (
    <UsersBookShelfPage>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 4) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 3) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 2) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 1) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf> 책 없음 </InteractiveBookShelf>
    </UsersBookShelfPage>
  );
}

import { DUMMY_BOOKS } from '@/pages/api/dummyBooks';
import InteractiveBook from '@/ui/InteractiveBook';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import MyBookShelfPage from '@/ui/MyBookShelfPage';

export default function MyBookShelf() {
  return (
    <MyBookShelfPage>
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
    </MyBookShelfPage>
  );
}

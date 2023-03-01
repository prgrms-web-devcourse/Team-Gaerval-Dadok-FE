import { DADOK2_BOOKS, DUMMY_BOOKS } from '@/pages/api/dummyBooks';
import InteractiveBook from '@/ui/InteractiveBook';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UsersBookShelfPage from '@/ui/UsersBookShelfPage';

const userName = '다독이';
const tags = ['개발', '프론트엔드'];

export default function MyBookShelf() {
  return (
    <UsersBookShelfPage userName={userName} tags={tags}>
              <InteractiveBookShelf>
        {DADOK2_BOOKS.slice(0, 4).map((book) => {
          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
              <InteractiveBookShelf>
        {DADOK2_BOOKS.slice(4).map((book) => {
          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      {/* <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 4) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 4) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {DUMMY_BOOKS.map((book, idx) => {
          if (idx >= 2) return;

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf> */}
    </UsersBookShelfPage>
  );
}

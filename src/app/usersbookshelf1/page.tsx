import { TOBI_BOOKS } from '@/pages/api/dummyBooks';
import InteractiveBook from '@/ui/InteractiveBook';
import InteractiveBookShelf from '@/ui/InteractiveBookShelf';
import UsersBookShelfPage from '@/ui/UsersBookShelfPage';

const userName = '토비';
const tags = ['개발', '백엔드'];

export default function MyBookShelf() {
  return (
    <UsersBookShelfPage userName={userName} tags={tags}>
      <InteractiveBookShelf>
        {TOBI_BOOKS.slice(0, 4).map((book, idx) => {

          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
      <InteractiveBookShelf>
        {TOBI_BOOKS.slice(4, 8).map((book, idx) => {
          return <InteractiveBook key={book.id} src={book.src} />;
        })}
      </InteractiveBookShelf>
    </UsersBookShelfPage>
  );
}

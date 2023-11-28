import bookshelfAPI from '@/apis/bookshelf';
import { APIBookshelf } from '@/types/bookshelf';
import { useInfiniteQuery } from '@tanstack/react-query';
import bookShelfKeys from './key';

const useBookShelfBooksQuery = ({
  bookshelfId,
}: {
  bookshelfId: APIBookshelf['bookshelfId'];
}) =>
  useInfiniteQuery({
    queryKey: bookShelfKeys.books(bookshelfId),
    queryFn: ({ pageParam = '' }) =>
      bookshelfAPI
        .getBookshelfBooks(bookshelfId, pageParam)
        .then(response => response.data),
    getNextPageParam: lastPage =>
      !lastPage.isLast ? lastPage.books[15].bookshelfItemId : undefined,
    staleTime: 3000,

    select: data => {
      const pages = data.pages.map(({ books, ...page }) => {
        const newBooks = [];
        for (let i = 0; i < books.length; i += 4) {
          newBooks.push(books.slice(i, i + 4));
        }
        return { ...page, books: newBooks };
      });

      return {
        pages,
        pageParams: [...data.pageParams],
      };
    },
  });

export default useBookShelfBooksQuery;

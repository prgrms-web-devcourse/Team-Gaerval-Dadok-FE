import type { APIBook } from '@/types/book';
import type { APIBookshelf, APIRecommendedBookshelf } from '@/types/bookshelf';
import type { APIGroup, APIGroupPagination } from '@/types/group';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  next: { revalidate: 60 * 60 * 24 },
};

const getBookArchiveBookshelves = async () => {
  const bookshelves: APIRecommendedBookshelf = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/suggestions/bookshelves/default`,
    options
  )
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
    .catch(() => {
      return [];
    });

  return bookshelves;
};

export const getBooksSitemaps = async () => {
  const bookshelves = await getBookArchiveBookshelves();
  const booksId: APIBook['bookId'][] = [];

  bookshelves.bookshelfResponses.forEach(bookshelf =>
    bookshelf.books.forEach(book => booksId.push(book.bookId))
  );

  const filteredBooksId = booksId.filter((bookId, idx) => {
    return booksId.indexOf(bookId) === idx;
  });

  const booksSitemap = filteredBooksId.map(bookId => ({
    url: `https://dadok.app/book/${bookId}`,
    lastModified: new Date(),
  }));

  return booksSitemap;
};

export const getBookshelvesSitemaps = async () => {
  const bookshelves = await getBookArchiveBookshelves();
  const bookshelvesId: APIBookshelf['bookshelfId'][] = [];

  bookshelves.bookshelfResponses.forEach(bookshelf =>
    bookshelvesId.push(bookshelf.bookshelfId)
  );

  const bookShelvesSitemap = bookshelvesId.map(bookshelfId => ({
    url: `https://dadok.app/bookshelf/${bookshelfId}`,
    lastModified: new Date(),
  }));

  return bookShelvesSitemap;
};

export const getBookGroupSitemaps = async () => {
  const entireBookGroups: APIGroupPagination = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/book-groups?pageSize=100`,
    options
  )
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }
      return response.json();
    })
    .catch(() => {
      return [];
    });

  const entireBookGroupsId: APIGroup['bookGroupId'][] = [];

  entireBookGroups.bookGroups.forEach(group =>
    entireBookGroupsId.push(group.bookGroupId)
  );

  const bookGroupsSitemap = entireBookGroupsId.map(bookGroupId => ({
    url: `https://dadok.app/group/${bookGroupId}`,
    lastModified: new Date(),
  }));

  return bookGroupsSitemap;
};

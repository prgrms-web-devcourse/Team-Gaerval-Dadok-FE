import type { MetadataRoute } from 'next';
import type { APIRecommendedBookshelf } from '@/types/bookshelf';
import type { APIBook } from '@/types/book';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  next: { revalidate: 60 * 60 * 24 },
};

export async function booksSitemap() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/suggestions/bookshelves/default`,
      options
    );

    if (!res.ok) {
      return Promise.reject();
    }

    const data: APIRecommendedBookshelf = await res.json();

    const books = new Set<APIBook['bookId']>();

    data.bookshelfResponses.forEach(bookshelf =>
      bookshelf.books.forEach(book => books.add(book.bookId))
    );

    const filteredBooks = Array.from(books);

    return filteredBooks;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const books = await booksSitemap();

  return books.map(bookId => ({
    url: `${process.env.NEXT_PUBLIC_HOST}/book/${bookId}`,
    lastModified: new Date(),
  }));
}

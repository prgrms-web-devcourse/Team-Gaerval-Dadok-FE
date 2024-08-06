import type { MetadataRoute } from 'next';
import type { APIRecommendedBookshelf } from '@/types/bookshelf';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  next: { revalidate: 60 * 60 * 24 },
};

export async function bookshelvesSitemap() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/suggestions/bookshelves/default`,
      options
    );

    if (!res.ok) {
      return Promise.reject();
    }

    const data: APIRecommendedBookshelf = await res.json();
    const bookshelves = data.bookshelfResponses.map(({ bookshelfId }) => ({
      bookshelfId,
    }));

    return bookshelves;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bookshelves = await bookshelvesSitemap();

  return bookshelves.map(({ bookshelfId }) => ({
    url: `${process.env.NEXT_DEPLOYMENT_URL}/bookshelf/${bookshelfId}`,
    lastModified: new Date(),
  }));
}

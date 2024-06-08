import {
  getBookGroupSitemaps,
  getBookshelvesSitemaps,
  getBooksSitemaps,
} from '@/utils/getSitemaps';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const booksSitemaps = await getBooksSitemaps();
  const bookshelvesSitemaps = await getBookshelvesSitemaps();
  const bookGroupSitemaps = await getBookGroupSitemaps();

  return [
    {
      url: 'https://dadok.app/bookarchive',
      lastModified: new Date(),
    },
    {
      url: 'https://dadok.app/book/search',
      lastModified: new Date(),
    },
    {
      url: 'https://dadok.app/group',
      lastModified: new Date(),
    },
    {
      url: 'https://dadok.app/profile/me',
      lastModified: new Date(),
    },
    ...booksSitemaps,
    ...bookshelvesSitemaps,
    ...bookGroupSitemaps,
  ];
}

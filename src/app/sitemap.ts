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
      url: `${process.env.NEXT_HOST}/bookarchive`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_HOST}/book/search`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_HOST}/group`,
      lastModified: new Date(),
    },
    {
      url: `${process.env.NEXT_HOST}/profile/me`,
      lastModified: new Date(),
    },
    ...booksSitemaps,
    ...bookshelvesSitemaps,
    ...bookGroupSitemaps,
  ];
}

import type { MetadataRoute } from 'next';

import { default as booksSitemap } from './book/[bookId]/sitemap';
import { default as bookshelvesSitemap } from './bookshelf/[bookshelfId]/sitemap';
import { default as bookGroupSitemap } from './group/[groupId]/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    ...(await booksSitemap()),
    ...(await bookshelvesSitemap()),
    ...(await bookGroupSitemap()),
  ];
}

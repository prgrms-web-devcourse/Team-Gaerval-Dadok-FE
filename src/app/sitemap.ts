import type { MetadataRoute } from 'next';

import { default as bookSitemap } from './book/sitemap';
import { default as bookshelfSitemap } from './bookshelf/sitemap';
import { default as bookGroupSitemap } from './group/sitemap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.NEXT_HOST}/bookarchive`,
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
    ...(await bookSitemap()),
    ...(await bookshelfSitemap()),
    ...(await bookGroupSitemap()),
  ];
}

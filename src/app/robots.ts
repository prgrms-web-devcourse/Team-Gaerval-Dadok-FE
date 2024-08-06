import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${process.env.NEXT_DEPLOYMENT_URL}/sitemap.xml`,
    host: `${process.env.NEXT_DEPLOYMENT_URL}`,
  };
}

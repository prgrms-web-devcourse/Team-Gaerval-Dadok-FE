import type { MetadataRoute } from 'next';
import type { APIGroupPagination } from '@/types/group';

const options = {
  headers: {
    'Content-Type': 'application/json',
  },
  next: { revalidate: 60 * 60 * 24 },
};

export const bookGroupSitemap = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/book-groups?pageSize=100`,
      options
    );

    if (!res.ok) {
      return Promise.reject();
    }

    const data: APIGroupPagination = await res.json();
    const bookGroups = data.bookGroups.map(group => group.bookGroupId);

    return bookGroups;
  } catch {
    return [];
  }
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const bookGroups = await bookGroupSitemap();

  return bookGroups.map(bookGroupId => ({
    url: `${process.env.NEXT_HOST}/group/${bookGroupId}`,
    lastModified: new Date(),
  }));
}

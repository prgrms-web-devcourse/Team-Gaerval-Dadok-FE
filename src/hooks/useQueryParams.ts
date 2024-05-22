import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type RouteOptions = 'push' | 'replace';

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const getQueryParam = useCallback(
    (queryKey: string) => {
      const queryParam = searchParams.get(queryKey);

      return queryParam;
    },
    [searchParams]
  );

  const setQueryParams = useCallback(
    (queryKey: string, queryValue: string, option?: RouteOptions) => {
      const prevParams = new URLSearchParams(searchParams.toString());
      prevParams.set(queryKey, queryValue);

      const newQueryParams = prevParams.toString();

      switch (option) {
        case 'replace':
          router.replace(pathname + `?${newQueryParams}`, { shallow: true });
          return;
        case 'push':
        default:
          router.push(pathname + `?${newQueryParams}`, { shallow: true });
          return;
      }
    },
    [router, searchParams, pathname]
  );

  const removeQueryParam = useCallback(
    (queryKey: string, option?: RouteOptions) => {
      const prevParams = new URLSearchParams(searchParams.toString());
      if (!prevParams.has(queryKey)) return;
      prevParams.delete(queryKey);

      const newQueryParams = prevParams.toString();

      switch (option) {
        case 'replace':
          router.replace(pathname + `?${newQueryParams}`, { shallow: true });
          return;
        case 'push':
        default:
          router.push(pathname + `?${newQueryParams}`, { shallow: true });
          return;
      }
    },
    [router, searchParams, pathname]
  );

  return { getQueryParam, setQueryParams, removeQueryParam };
};

export default useQueryParams;

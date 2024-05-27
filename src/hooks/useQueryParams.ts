import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type RouteOptions = 'push' | 'replace';

type QueryParams = { [key: string]: string };

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const queryParams = searchParams.toString();

  const getQueryParam = useCallback(
    (queryKey: string) => {
      const queryParam = searchParams.get(queryKey);

      return queryParam;
    },
    [searchParams]
  );

  const setQueryParams = useCallback(
    (queryParams: QueryParams, option?: RouteOptions) => {
      const prevParams = new URLSearchParams(searchParams.toString());

      for (const queryKey in queryParams) {
        prevParams.set(queryKey, queryParams[queryKey]);
      }

      const newQueryParams = prevParams.toString();

      switch (option) {
        case 'replace':
          router.replace(`?${newQueryParams}`, { shallow: true });
          return;
        case 'push':
        default:
          router.push(`?${newQueryParams}`, { shallow: true });
          return;
      }
    },
    [router, searchParams]
  );

  const removeQueryParam = useCallback(
    (queryKey: string, option?: RouteOptions) => {
      const prevParams = new URLSearchParams(searchParams.toString());
      if (!prevParams.has(queryKey)) return;
      prevParams.delete(queryKey);

      const newQueryParams = prevParams.toString();

      switch (option) {
        case 'replace':
          router.replace(`?${newQueryParams}`, { shallow: true });
          return;
        case 'push':
        default:
          router.push(`?${newQueryParams}`, { shallow: true });
          return;
      }
    },
    [router, searchParams]
  );

  return { queryParams, getQueryParam, setQueryParams, removeQueryParam };
};

export default useQueryParams;

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type RouteOptions = 'push' | 'replace';

const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [queryParams, _setQueryParams] = useState<string>(
    searchParams.toString()
  );

  const getQueryParam = (queryKey: string) => {
    const queryParam = searchParams.get(queryKey);

    return queryParam;
  };

  const setQueryParams = (
    queryKey: string,
    queryValue: string,
    option?: RouteOptions
  ) => {
    const prevParams = new URLSearchParams(searchParams.toString());
    prevParams.set(queryKey, queryValue);

    const newQueryParams = prevParams.toString();
    _setQueryParams(newQueryParams);

    switch (option) {
      case 'replace':
        router.replace(pathname + `/?${newQueryParams}`, { shallow: true });
        return;
      case 'push':
      default:
        router.push(pathname + `/?${newQueryParams}`, { shallow: true });
        return;
    }
  };

  const removeQueryParam = (queryKey: string, option?: RouteOptions) => {
    const prevParams = new URLSearchParams(searchParams.toString());
    if (!prevParams.get(queryKey)) return;
    prevParams.delete(queryKey);

    const newQueryParams = prevParams.toString();
    _setQueryParams(newQueryParams);

    switch (option) {
      case 'replace':
        router.replace(pathname + `/?${newQueryParams}`, { shallow: true });
        return;
      case 'push':
      default:
        router.push(pathname + `/?${newQueryParams}`, { shallow: true });
        return;
    }
  };

  return { queryParams, getQueryParam, setQueryParams, removeQueryParam };
};

export default useQueryParams;

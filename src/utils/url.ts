export const createQueryString = (
  params: URLSearchParams | Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return Array.from(searchParams).length ? `?${searchParams}` : '';
};

import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import type { UseQueryOptions } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIBestSellerRes } from '@/types/book';

import bookKeys from './key';

const useBestSellersQuery = <TData = APIBestSellerRes>(
  options?: UseQueryOptions<APIBestSellerRes, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.bestSeller(),
    () => bookAPI.getBestSellers().then(({ data }) => data),
    options
  );

export default useBestSellersQuery;

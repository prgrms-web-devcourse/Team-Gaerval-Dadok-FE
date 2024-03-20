import useQueryWithSuspense, {
  type UseQueryOptionWithoutSuspense,
} from '@/hooks/useQueryWithSuspense';

import bookAPI from '@/apis/book';
import type { APIBestSellerRes } from '@/types/book';

import bookKeys from './key';

const useBestSellersQuery = <TData = APIBestSellerRes>(
  options?: UseQueryOptionWithoutSuspense<APIBestSellerRes, unknown, TData>
) =>
  useQueryWithSuspense(
    bookKeys.bestSeller(),
    () => bookAPI.getBestSellers().then(({ data }) => data),
    options
  );

export default useBestSellersQuery;

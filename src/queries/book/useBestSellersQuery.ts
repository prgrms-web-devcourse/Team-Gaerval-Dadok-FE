import useQueryWithSuspense from '@/hooks/useQueryWithSuspense';
import type { QueryOptions } from '@/types/query';

import bookAPI from '@/apis/book';
import type { APIBestSellerRes } from '@/types/book';

import bookKeys from './key';

const useBestSellersQuery = (options?: QueryOptions<APIBestSellerRes>) =>
  useQueryWithSuspense(
    bookKeys.bestSeller(),
    () => bookAPI.getBestSellers().then(({ data }) => data),
    options
  );

export default useBestSellersQuery;

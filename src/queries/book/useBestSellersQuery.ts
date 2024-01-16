import { useInfiniteQuery } from '@tanstack/react-query';

import bookAPI from '@/apis/book';
import type { APIBestSellerSearchRangeTypes } from '@/types/book';
import bookKeys from './key';

const useBestSellersQuery = ({
  page = 1,
  pageSize = 10,
  categoryId = 0,
  searchRange = 'WEEKLY',
  enabled,
}: {
  page: number;
  pageSize: number;
  categoryId: number;
  searchRange: APIBestSellerSearchRangeTypes;
  enabled: boolean;
}) =>
  useInfiniteQuery({
    queryKey: bookKeys.bestSeller(searchRange),
    queryFn: ({ pageParam = page }) =>
      bookAPI
        .getBestSellers({ page: pageParam, pageSize, categoryId, searchRange })
        .then(response => response.data),
    getNextPageParam: pages => {
      return pages.isLast ? undefined : pages.requestedPageNumber + 1;
    },
    staleTime: 3000,
    enabled: enabled,
  });

export default useBestSellersQuery;

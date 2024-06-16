import { useQuery } from '@tanstack/react-query';

import recommendAPI from '@/apis/recommend';

const useUnAuthRecommendedBookshelfQuery = () =>
  useQuery(['unAuthRecommendedBookshelf'], () =>
    recommendAPI.getUnAuthRecommendedBookshelf().then(response => response.data)
  );

export default useUnAuthRecommendedBookshelfQuery;

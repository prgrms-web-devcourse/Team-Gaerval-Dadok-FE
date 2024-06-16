import recommendAPI from '@/apis/recommend';
import { useQuery } from '@tanstack/react-query';

const useUnAuthRecommendedBookshelfQuery = () =>
  useQuery(['unAuthRecommendedBookshelf'], () =>
    recommendAPI.getUnAuthRecommendedBookshelf().then(response => response.data)
  );

export default useUnAuthRecommendedBookshelfQuery;

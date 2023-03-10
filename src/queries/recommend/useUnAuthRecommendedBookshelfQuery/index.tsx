import RecommendAPI from '@/apis/recommend';
import { useQuery } from '@tanstack/react-query';

const useUnAuthRecommendedBookshelfQuery = () =>
  useQuery(['unAuthRecommendedBookshelf'], () =>
    RecommendAPI.getUnAuthRecommendedBookshelf().then(response => response.data)
  );

export default useUnAuthRecommendedBookshelfQuery;

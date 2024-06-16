import recommendAPI from '@/apis/recommend';
import { APIJobGroup } from '@/types/job';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBookshelf = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBookshelf', jobGroup], () =>
    recommendAPI
      .getAuthRecommendedBookshelf(jobGroup)
      .then(response => response.data)
  );

export default useAuthRecommendedBookshelf;

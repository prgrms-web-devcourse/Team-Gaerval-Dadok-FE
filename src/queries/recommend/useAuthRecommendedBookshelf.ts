import { useQuery } from '@tanstack/react-query';

import { APIJobGroup } from '@/types/job';
import recommendAPI from '@/apis/recommend';

const useAuthRecommendedBookshelf = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBookshelf', jobGroup], () =>
    recommendAPI
      .getAuthRecommendedBookshelf(jobGroup)
      .then(response => response.data)
  );

export default useAuthRecommendedBookshelf;

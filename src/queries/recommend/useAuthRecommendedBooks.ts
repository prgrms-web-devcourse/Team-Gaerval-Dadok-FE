import { useQuery } from '@tanstack/react-query';

import { APIJobGroup } from '@/types/job';
import recommendAPI from '@/apis/recommend';

const useAuthRecommendedBooks = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBooks', jobGroup], () =>
    recommendAPI
      .getAuthRecommendedBooks(jobGroup)
      .then(response => response.data)
  );

export default useAuthRecommendedBooks;

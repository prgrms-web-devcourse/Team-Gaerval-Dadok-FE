import recommendAPI from '@/apis/recommend';
import { APIJobGroup } from '@/types/job';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBooks = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBooks', jobGroup], () =>
    recommendAPI
      .getAuthRecommendedBooks(jobGroup)
      .then(response => response.data)
  );

export default useAuthRecommendedBooks;

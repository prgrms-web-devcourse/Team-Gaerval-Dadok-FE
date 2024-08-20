import RecommendAPI from '@/apis/recommend';
import { APIJobGroup } from '@/types/job';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBooks = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBooks', jobGroup], () =>
    RecommendAPI.getAuthRecommendedBooks(jobGroup).then(
      response => response.data
    )
  );

export default useAuthRecommendedBooks;

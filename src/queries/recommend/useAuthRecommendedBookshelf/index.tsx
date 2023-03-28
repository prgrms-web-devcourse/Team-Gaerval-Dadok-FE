import RecommendAPI from '@/apis/recommend';
import { APIJobGroup } from '@/types/job';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBookshelf = (jobGroup: APIJobGroup['name']) =>
  useQuery(['authRecommendedBookshelf', jobGroup], () =>
    RecommendAPI.getAuthRecommendedBookshelf(jobGroup).then(
      response => response.data
    )
  );

export default useAuthRecommendedBookshelf;

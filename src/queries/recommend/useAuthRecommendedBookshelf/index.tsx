import RecommendAPI from '@/apis/recommend';
import { APIBookshelfResponses } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBookshelf = (
  jobGroup: APIBookshelfResponses['jobGroupName']
) =>
  useQuery(['authRecommendedBookshelf', jobGroup], () =>
    RecommendAPI.getAuthRecommendedBookshelf(jobGroup).then(
      response => response.data
    )
  );

export default useAuthRecommendedBookshelf;

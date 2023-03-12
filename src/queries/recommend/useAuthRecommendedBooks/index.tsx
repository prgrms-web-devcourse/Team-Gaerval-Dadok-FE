import RecommendAPI from '@/apis/recommend';
import { APIBookshelfResponses } from '@/types/bookshelf';
import { useQuery } from '@tanstack/react-query';

const useAuthRecommendedBooks = (
  jobGroup: APIBookshelfResponses['jobGroupName']
) =>
  useQuery(['authRecommendedBooks', jobGroup], () =>
    RecommendAPI.getAuthRecommendedBooks(jobGroup).then(
      response => response.data
    )
  );

export default useAuthRecommendedBooks;

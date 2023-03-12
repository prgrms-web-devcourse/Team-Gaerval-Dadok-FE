import { APIBookshelfResponses } from '@/types/bookshelf';
import { publicApi } from '../core/axios';

const RecommendAPI = {
  getUnAuthRecommendedBookshelf: () =>
    publicApi.get<APIBookshelfResponses>(
      `/service-api/suggestions/bookshelves/default`
    ),

  getAuthRecommendedBookshelf: (
    jobGroup: APIBookshelfResponses['jobGroupName']
  ) =>
    publicApi.get<APIBookshelfResponses>(
      `/service-api/suggestions/bookshelves?job_group=${jobGroup}`
    ),

  getAuthRecommendedBooks: (jobGroup: APIBookshelfResponses['jobGroupName']) =>
    publicApi.get(
      `/service-api/books/suggestions?jobGroup=${jobGroup}&pageSize=10&bookCursorId=10&sortDirection=DESC`
    ),
};

export default RecommendAPI;

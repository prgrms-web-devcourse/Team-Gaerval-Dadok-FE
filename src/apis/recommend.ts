import {
  APIAuthRecommendedBookshelf,
  APIRecommendedBookshelf,
  APIRecommendedBooksPagination,
} from '@/types/bookshelf';
import { APIJobGroup } from '@/types/job';
import { publicApi } from '@/apis/core/axios';

const recommendAPI = {
  getUnAuthRecommendedBookshelf: () =>
    publicApi.get<APIRecommendedBookshelf>(
      `/service-api/suggestions/bookshelves/default`
    ),

  getAuthRecommendedBookshelf: (jobGroup: APIJobGroup['name']) =>
    publicApi.get<APIAuthRecommendedBookshelf>(
      `/service-api/suggestions/bookshelves?job_group=${jobGroup}`
    ),

  getAuthRecommendedBooks: (jobGroup: APIJobGroup['name']) =>
    publicApi.get<APIRecommendedBooksPagination>(
      `/service-api/books/suggestions?jobGroup=${jobGroup}&pageSize=10&sortDirection=DESC`
    ),
};

export default recommendAPI;

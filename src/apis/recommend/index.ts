import { APIBookshelfResponses } from '@/types/bookshelf';
import { publicApi } from '../core/axios';

const RecommendAPI = {
  getUnAuthRecommendedBookshelf: () =>
    publicApi.get<APIBookshelfResponses>(
      `/api/suggestions/bookshelves/default`
    ),
  // TODO: getAuthRecommendedBookshelf: () => publicApi.get(),
  // TODO: getAuthRecommendedBooks: () => publicApi.get(),
};

export default RecommendAPI;

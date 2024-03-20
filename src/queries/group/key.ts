import { APIGroupDetail } from '@/types/group';

const bookGroupKeys = {
  all: ['bookGroup'] as const,
  details: () => [...bookGroupKeys.all, 'detail'] as const,
  detail: (id: APIGroupDetail['bookGroupId']) =>
    [...bookGroupKeys.details(), id] as const,
  comments: (id: APIGroupDetail['bookGroupId']) =>
    [...bookGroupKeys.details(), id, 'comments'] as const,
  me: () => [...bookGroupKeys.all, 'me'],
};

export default bookGroupKeys;

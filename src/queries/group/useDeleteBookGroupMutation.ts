import { useMutation } from '@tanstack/react-query';

import type { APIGroup } from '@/types/group';

import groupAPI from '@/apis/group';

const useDeleteBookGroupMutation = () => {
  return useMutation({
    mutationFn: (bookGroupId: APIGroup['bookGroupId']) =>
      groupAPI.deleteGroup({ bookGroupId }).then(({ data }) => data),
  });
};

export default useDeleteBookGroupMutation;

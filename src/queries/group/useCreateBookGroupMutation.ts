import { useMutation } from '@tanstack/react-query';

import type { APICreateGroup } from '@/types/group';
import groupAPI from '@/apis/group';

const useCreateBookGroupMutation = () => {
  return useMutation({
    mutationFn: (formData: APICreateGroup) =>
      groupAPI.createGroup(formData).then(({ data }) => data),
  });
};

export default useCreateBookGroupMutation;

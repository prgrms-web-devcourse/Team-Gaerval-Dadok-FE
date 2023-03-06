import { useMutation } from '@tanstack/react-query';
import userAPI from '@/apis/users';
import { APIUser } from '@/types/user';
import { APIJob, APIJobGroup } from '@/types/job';

const useMyProfileMutation = () =>
  useMutation(
    ({
      nickname,
      job,
    }: {
      nickname: APIUser['nickname'];
      job: { jobGroup: APIJobGroup['name']; jobName: APIJob['name'] };
    }) => userAPI.updateMyProfile({ nickname, job }).then(({ data }) => data)
  );

export default useMyProfileMutation;

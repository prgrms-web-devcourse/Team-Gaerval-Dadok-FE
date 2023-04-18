import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProfileInfoPresenter from './ProfileInfoPresenter';

const MyProfileContainer = () => {
  const { isSuccess, data } = useMyProfileQuery({ suspense: true });
  const { pathname, replace } = useRouter();

  useEffect(() => {
    if (!isSuccess) return;
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) replace(`${pathname}/add`);
  }, [data, isSuccess, pathname, replace]);

  if (!isSuccess) return null;

  return <ProfileInfoPresenter {...data}></ProfileInfoPresenter>;
};

export default MyProfileContainer;

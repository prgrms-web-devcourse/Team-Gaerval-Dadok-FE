import useMyProfileQuery from '@/queries/user/useMyProfileQuery';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProfileInfoPresenter from './ProfileInfoPresenter';

const MyProfileContainer = () => {
  const { data } = useMyProfileQuery();
  const { pathname, replace } = useRouter();

  useEffect(() => {
    const {
      nickname,
      job: { jobGroupName, jobName },
    } = data;
    const isSavedAdditionalInfo = !!(nickname && jobGroupName && jobName);
    if (!isSavedAdditionalInfo) replace(`${pathname}/add`);
  }, [data, pathname, replace]);

  return <ProfileInfoPresenter {...data}></ProfileInfoPresenter>;
};

export default MyProfileContainer;
